import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { randomUUID, createHash } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { eq } from "drizzle-orm";
import { migrate as embeddedMigrate } from "drizzle-orm/pglite/migrator";
import { migrate as postgresMigrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/pglite";
import { getDb, closeDb, getDatabaseDriver } from "@/db";
import {
  user,
  contentVersions,
  attempts,
  evaluations,
  errorPatterns,
  reviews,
} from "@/db/schema";
import { lessons, diagnostics } from "@/content/catalog";
import { mocks } from "../../content/exams";
import {
  startExam,
  getExam,
  saveExam,
  recordExam,
  markExamSupport,
} from "@/exams/service";
import { exportData, previewImport, importData } from "@/exports/service";
import {
  uploadRecording,
  mediaUrl,
  getSignedMedia,
  deleteRecording,
} from "@/audio/service";
import { encodeWav } from "@/audio/encode";
import {
  submitAttempt,
  learnerLesson,
  reveal,
  saveDraft,
  dashboard,
} from "@/learning/service";
let directory: string;
const owner = randomUUID(),
  other = randomUUID();
beforeAll(async () => {
  if (!process.env.DATABASE_URL) {
    directory = await mkdtemp(path.join(os.tmpdir(), "german-test-"));
    process.env.DEV_DATABASE_PATH = directory;
  }
  process.env.BETTER_AUTH_SECRET =
    "isolated-integration-test-secret-at-least-32";
  process.env.STORAGE_DRIVER = "local";
  process.env.STORAGE_LOCAL_PATH = directory
    ? path.join(directory, "media")
    : path.join(os.tmpdir(), "german-integration-media-" + owner);
  const db = getDb(),
    driver = getDatabaseDriver();
  if (driver.embedded)
    await embeddedMigrate(drizzle(driver.embedded), {
      migrationsFolder: "drizzle",
    });
  else await postgresMigrate(db, { migrationsFolder: "drizzle" });
  for (const id of [owner, other])
    await db
      .insert(user)
      .values({ id, name: "Integration learner", email: `${id}@example.test` });
  for (const lesson of [...lessons, ...diagnostics])
    await db
      .insert(contentVersions)
      .values({
        id: lesson.id,
        version: lesson.version,
        type: "lesson",
        hash: createHash("sha256").update(JSON.stringify(lesson)).digest("hex"),
        payload: lesson,
        published: true,
      })
      .onConflictDoNothing();
  for (const mock of mocks)
    await db
      .insert(contentVersions)
      .values({
        id: mock.id,
        version: mock.version,
        type: "mock",
        hash: createHash("sha256").update(JSON.stringify(mock)).digest("hex"),
        payload: mock,
        published: true,
      })
      .onConflictDoNothing();
});
describe("exam timing and private media", () => {
  it("resumes the same deadline, hides answers, closes expired work and isolates owners", async () => {
    const now = new Date("2026-09-23T12:00:00Z"),
      id = randomUUID();
    const run = await startExam(
      owner,
      { id, mockId: "MOCK-01", mode: "practice", block: 0 },
      now,
    );
    expect(run.tasks[0]).not.toHaveProperty("answer");
    expect(run.feedback).toBeNull();
    expect(
      (
        await startExam(
          owner,
          { id, mockId: "MOCK-01", mode: "practice", block: 0 },
          new Date(now.getTime() + 5000),
        )
      ).deadline,
    ).toEqual(run.deadline);
    await expect(
      startExam(
        owner,
        { id, mockId: "MOCK-01", mode: "practice", block: 2 },
        now,
      ),
    ).rejects.toMatchObject({ status: 409 });
    await expect(getExam(other, id, now)).rejects.toMatchObject({
      status: 404,
    });
    await saveExam(
      owner,
      id,
      {
        sequence: 1,
        answers: { [run.tasks[0].id]: mocks[0].tasks[0].answer! },
      },
      now,
    );
    await expect(
      saveExam(owner, id, { sequence: 1, answers: {} }, now),
    ).rejects.toMatchObject({ status: 409 });
    const expired = await getExam(
      owner,
      id,
      new Date(now.getTime() + 65 * 60000 + 1),
    );
    expect(expired.state).toBe("submitted");
    await saveExam(
      owner,
      id,
      { sequence: 2, answers: { [run.tasks[0].id]: "changed" } },
      new Date(now.getTime() + 65 * 60000 + 1000),
    );
    expect((await getExam(owner, id)).answers[run.tasks[0].id]).toBe(
      mocks[0].tasks[0].answer,
    );
    await expect(
      startExam(owner, {
        id: randomUUID(),
        mockId: "MOCK-03",
        mode: "practice",
      }),
    ).rejects.toMatchObject({ status: 409 });
    await expect(
      startExam(owner, {
        id: randomUUID(),
        mockId: "MOCK-01",
        mode: "simulation",
      }),
    ).rejects.toMatchObject({ status: 409 });
  });
  it("preserves six spoken turns, idempotent retries, and a saved support marker", async () => {
    const id = randomUUID();
    const run = await startExam(owner, {
      id,
      mockId: "MOCK-01",
      mode: "practice",
      block: 3,
    });
    const task = run.tasks[0],
      bytes = Buffer.from(
        await encodeWav([new Float32Array(16000)], 16000).arrayBuffer(),
      );
    const keys = Array.from({ length: 6 }, () => randomUUID());
    for (const key of keys) await recordExam(owner, id, task.id, key, bytes);
    const previous = await getExam(owner, id);
    const duplicate = await recordExam(owner, id, task.id, keys[5], bytes);
    expect(duplicate.run.sequence).toBe(previous.sequence);
    await expect(
      recordExam(owner, id, task.id, randomUUID(), bytes),
    ).rejects.toMatchObject({ status: 409 });
    expect((await getExam(owner, id)).answers).toEqual(previous.answers);
    await markExamSupport(owner, id, "partner-transcript");
    expect((await getExam(owner, id)).flags).toContain("study-support");
    await expect(
      markExamSupport(other, id, "partner-transcript"),
    ).rejects.toMatchObject({ status: 404 });
  });
  it("requires real spoken bytes and enforces recording ownership, signing and deletion", async () => {
    const spoken = lessons.find(
        (l) =>
          l.exercises.some((e) => e.type === "speaking") &&
          !l.exercises.some((e) => e.mediaId),
      )!,
      exercise = spoken.exercises.find((e) => e.type === "speaking")!;
    const input = {
      lessonId: spoken.id,
      exerciseId: exercise.id,
      attemptKey: randomUUID(),
    };
    await expect(
      submitAttempt(owner, {
        ...input,
        version: spoken.version,
        response: "Typed words",
      }),
    ).rejects.toMatchObject({ status: 400 });
    const blob = encodeWav([new Float32Array(16000).fill(0.1)], 16000),
      bytes = Buffer.from(await blob.arrayBuffer());
    const saved = await uploadRecording(owner, bytes, input);
    expect(saved.attempt.modality).toBe("speaking");
    const retry = await uploadRecording(owner, bytes, input);
    expect(retry.attempt.id).toBe(saved.attempt.id);
    await expect(mediaUrl(other, saved.media.id)).rejects.toMatchObject({
      status: 404,
    });
    const url = new URL(
      await mediaUrl(owner, saved.media.id),
      "http://localhost",
    );
    expect(
      (
        await getSignedMedia(
          owner,
          saved.media.id,
          url.searchParams.get("expires"),
          url.searchParams.get("signature"),
        )
      ).bytes,
    ).toEqual(bytes);
    await deleteRecording(owner, saved.media.id);
    await expect(
      getSignedMedia(
        owner,
        saved.media.id,
        url.searchParams.get("expires"),
        url.searchParams.get("signature"),
      ),
    ).rejects.toMatchObject({ status: 404 });
  });
});
describe("data portability", () => {
  it("previews and merges evidence transactionally into the current owner without duplicates", async () => {
    const source = randomUUID(),
      target = randomUUID();
    for (const id of [source, target])
      await getDb()
        .insert(user)
        .values({
          id,
          name: "Portability fixture",
          email: id + "@example.test",
        });
    for (const task of lesson.exercises)
      await submitAttempt(source, {
        lessonId: lesson.id,
        version: lesson.version,
        exerciseId: task.id,
        response: task.accepted![0],
        attemptKey: randomUUID(),
      });
    const bundle = await exportData(source),
      preview = await previewImport(target, bundle);
    expect(preview.valid).toBe(true);
    expect(preview.newAttempts).toBeGreaterThan(0);
    await expect(
      importData(target, bundle, "0".repeat(64)),
    ).rejects.toMatchObject({ status: 409 });
    const imported = await importData(target, bundle, preview.hash);
    expect(imported.imported).toBe(true);
    const before = await getDb()
      .select()
      .from(attempts)
      .where(eq(attempts.userId, target));
    expect(before).toHaveLength(bundle.attempts.length);
    expect(before.every((a) => a.userId === target)).toBe(true);
    expect((await importData(target, bundle, preview.hash)).duplicate).toBe(
      true,
    );
    expect(
      await getDb().select().from(attempts).where(eq(attempts.userId, target)),
    ).toHaveLength(before.length);
    expect((await dashboard(target)).stats.completed).toBeGreaterThan(0);
    const edited = {
      ...bundle,
      attempts: bundle.attempts.map((a, i) =>
        i ? a : { ...a, response: "tampered" },
      ),
    };
    expect((await previewImport(target, edited)).valid).toBe(false);
    for (const id of [source, target])
      await getDb().delete(user).where(eq(user.id, id));
  });
  it("imports an empty legacy template without awarding a skill", async () => {
    const target = randomUUID();
    await getDb()
      .insert(user)
      .values({
        id: target,
        name: "Legacy fixture",
        email: target + "@example.test",
      });
    const data = {
        _schema: { states: ["demonstrated"] },
        skills: {},
        modules: {},
        errors: [],
        writing_samples: [],
        mocks: [],
      },
      preview = await previewImport(target, data);
    await importData(target, data, preview.hash);
    expect((await dashboard(target)).stats.attempts).toBe(0);
    expect((await dashboard(target)).stats.demonstrated).toBe(0);
    await getDb().delete(user).where(eq(user.id, target));
  });
});
afterAll(async () => {
  const db = getDb();
  for (const id of [owner, other]) await db.delete(user).where(eq(user.id, id));
  await closeDb();
  if (directory) await rm(directory, { recursive: true, force: true });
});
const lesson = lessons[0];
const ex = lesson.exercises[0];
function input(response = ex.accepted![0], exercise = ex) {
  return {
    lessonId: lesson.id,
    exerciseId: exercise.id,
    version: lesson.version,
    response,
    attemptKey: randomUUID(),
  };
}
describe("durable first journey", () => {
  it("persists one immutable submission and one evaluation under retries", async () => {
    const request = input();
    const first = await submitAttempt(owner, request);
    const retry = await submitAttempt(owner, request);
    expect(retry.attempt.id).toBe(first.attempt.id);
    expect(retry.duplicate).toBe(true);
    expect(
      await getDb()
        .select()
        .from(evaluations)
        .where(eq(evaluations.attemptId, first.attempt.id)),
    ).toHaveLength(1);
    await expect(
      submitAttempt(owner, { ...request, response: "changed" }),
    ).rejects.toMatchObject({ status: 409 });
  });
  it("isolates owners and never accepts a foreign review ID", async () => {
    expect((await learnerLesson(other, lesson.id)).history).toHaveLength(0);
    const review = (
      await getDb().select().from(reviews).where(eq(reviews.userId, owner))
    )[0];
    await expect(
      submitAttempt(other, { ...input(), reviewId: review.id }),
    ).rejects.toMatchObject({ status: 400 });
    expect(
      await getDb().select().from(attempts).where(eq(attempts.userId, other)),
    ).toHaveLength(0);
  });
  it("preserves assistance when a learner changes their attempt key", async () => {
    const exercise = lesson.exercises[1];
    await reveal(owner, { ...input("", exercise), kind: "hint" });
    const result = await submitAttempt(
      owner,
      input(exercise.accepted![0], exercise),
    );
    expect(result.attempt.assisted).toBe(true);
    expect(
      (await dashboard(owner)).skills.find((s) => s.id === exercise.skill)
        ?.state,
    ).not.toBe("independently_demonstrated");
  });
  it("rejects stale autosaves without losing a newer empty draft", async () => {
    const draft = {
      lessonId: lesson.id,
      exerciseId: ex.id,
      response: "draft",
      attemptKey: randomUUID(),
      sequence: 5,
      step: 0,
    };
    await saveDraft(owner, draft);
    await saveDraft(owner, { ...draft, response: "", sequence: 6 });
    await expect(
      saveDraft(owner, { ...draft, sequence: 4 }),
    ).rejects.toMatchObject({ status: 409 });
    expect((await learnerLesson(owner, lesson.id)).draft?.data.response).toBe(
      "",
    );
  });
  it("records errors once per submission, not per retry", async () => {
    const request = input("an incorrect response", lesson.exercises[2]);
    await submitAttempt(owner, request);
    const count = (
      await getDb()
        .select()
        .from(errorPatterns)
        .where(eq(errorPatterns.userId, owner))
    ).reduce((n, e) => n + e.count, 0);
    await submitAttempt(owner, request);
    expect(
      (
        await getDb()
          .select()
          .from(errorPatterns)
          .where(eq(errorPatterns.userId, owner))
      ).reduce((n, e) => n + e.count, 0),
    ).toBe(count);
  });
  it("requires passed exit checks and retains data after reopening the connection", async () => {
    for (const exercise of lesson.exercises)
      await submitAttempt(owner, input(exercise.accepted![0], exercise));
    expect((await learnerLesson(owner, lesson.id)).progress?.state).toBe(
      "completed",
    );
    await closeDb();
    const resumed = await learnerLesson(owner, lesson.id);
    expect(resumed.progress?.state).toBe("completed");
    expect(resumed.history.length).toBeGreaterThanOrEqual(
      lesson.exercises.length,
    );
    expect(
      (await dashboard(owner)).skills.filter((s) => s.state === "retained"),
    ).toHaveLength(0);
  });
});
