/** Disposable-service checks only. The WAV is a synthetic tone, never speech evidence. */
import "dotenv/config";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { randomUUID, createHash } from "node:crypto";
import { eq, inArray } from "drizzle-orm";
import { getDb, closeDb } from "../src/db";
import { user, media, jobs } from "../src/db/schema";
import {
  learnerLesson,
  submitAttempt,
  saveProfile,
  defaultProfile,
} from "../src/learning/service";
import { startExam, saveExam, getExam } from "../src/exams/service";
import { exportData } from "../src/exports/service";
import {
  uploadRecording,
  getSignedMedia,
  mediaUrl,
  deleteRecording,
} from "../src/audio/service";
import { putAsset, readAsset } from "../src/audio/storage";
import { encodeWav } from "../src/audio/encode";

async function main() {
  assert.equal(
    process.env.REHEARSAL_ONLY,
    "true",
    "Explicit disposable-instance opt-in required.",
  );
  assert.match(
    process.env.OWNER_EMAIL || "",
    /@example\.test$/,
    "Use a synthetic test owner.",
  );
  assert.equal(process.env.STORAGE_DRIVER, "s3");
  assert(
    !process.env.OPENAI_API_KEY,
    "Remove provider credentials from this isolated rehearsal.",
  );
  const db = getDb();
  const owner = (
    await db.select().from(user).where(eq(user.email, process.env.OWNER_EMAIL!))
  )[0];
  assert(owner, "Create the test owner first.");
  const receipt =
    process.env.REHEARSAL_RECEIPT || ".data/rehearsal/receipt.json";
  if (process.argv[2] === "prepare") {
    await saveProfile(owner.id, {
      ...defaultProfile("Recovery Learner"),
      onboardingComplete: true,
      recordingRetentionDays: 1,
    });
    const lesson = await learnerLesson(owner.id, "B2-02-L01");
    const attempt = await submitAttempt(owner.id, {
      lessonId: lesson.lesson.id,
      version: lesson.lesson.version,
      exerciseId: lesson.lesson.exercises[0].id,
      response: "der",
      attemptKey: randomUUID(),
    });
    const exam = await startExam(owner.id, {
      id: randomUUID(),
      mockId: "MOCK-01",
      mode: "practice",
      block: 0,
    });
    const answer = exam.tasks[0].options![0];
    await saveExam(owner.id, exam.id, {
      sequence: 1,
      answers: { [exam.tasks[0].id]: answer },
    });
    const tone = Float32Array.from(
      { length: 32000 },
      (_, i) => 0.05 * Math.sin((i * 2 * Math.PI * 440) / 16000),
    );
    const bytes = Buffer.from(await encodeWav([tone], 16000).arrayBuffer());
    const recording = await uploadRecording(owner.id, bytes, {
      lessonId: "B2-12-L05",
      exerciseId: "B2-12-L05-P01",
      attemptKey: randomUUID(),
    });
    const asset = (
      await db.select().from(media).where(eq(media.id, recording.media.id))
    )[0];
    await db
      .update(media)
      .set({
        metadata: {
          ...(asset.metadata as object),
          source: "synthetic_test_tone_not_speech",
        },
      })
      .where(eq(media.id, asset.id));
    const cleanup = [] as string[];
    for (const state of ["uploading", "ready", "deleting"]) {
      const id = createHash("sha256").update(randomUUID()).digest("hex");
      const key = "recordings/" + owner.id + "/" + id + ".wav";
      await putAsset(key, bytes, "audio/wav");
      await db.insert(media).values({
        id,
        userId: owner.id,
        key,
        mime: "audio/wav",
        bytes: bytes.length,
        checksum: asset.checksum,
        kind: "learner_recording",
        state,
        metadata: { source: "synthetic_cleanup_fixture" },
        createdAt: new Date(Date.now() - 2 * 86400000),
        deletedAt: state === "deleting" ? new Date() : null,
      });
      cleanup.push(id);
    }
    const staleJob = randomUUID(),
      queuedJob = randomUUID();
    await db.insert(jobs).values([
      {
        id: staleJob,
        userId: owner.id,
        operation: "evaluate",
        status: "running",
        input: { attemptId: randomUUID() },
        updatedAt: new Date(Date.now() - 10 * 60000),
      },
      {
        id: queuedJob,
        userId: owner.id,
        operation: "evaluate",
        status: "queued",
        input: { attemptId: randomUUID() },
      },
    ]);
    await fs.writeFile(
      receipt,
      JSON.stringify({
        owner: owner.id,
        attempt: attempt.attempt.id,
        exam: exam.id,
        task: exam.tasks[0].id,
        answer,
        recording: recording.media.id,
        checksum: asset.checksum,
        cleanup,
        staleJob,
        queuedJob,
      }),
      { mode: 0o600 },
    );
    console.log(
      "Prepared synthetic lesson, exam, tone, interrupted uploads and jobs. Start the worker, then run check.",
    );
    return;
  }
  const saved = JSON.parse(await fs.readFile(receipt, "utf8"));
  assert.equal(owner.id, saved.owner);
  const exported = await exportData(owner.id);
  assert(exported.attempts.some((a) => a.id === saved.attempt));
  const exam = await getExam(owner.id, saved.exam);
  assert.equal(exam.answers[saved.task], saved.answer);
  const url = new URL(
    await mediaUrl(owner.id, saved.recording),
    "http://local",
  );
  const result = await getSignedMedia(
    owner.id,
    saved.recording,
    url.searchParams.get("expires"),
    url.searchParams.get("signature"),
  );
  assert.equal(
    createHash("sha256").update(result.bytes).digest("hex"),
    saved.checksum,
  );
  await assert.rejects(
    getSignedMedia(
      owner.id,
      saved.recording,
      String(Math.floor(Date.now() / 1000) - 1),
      url.searchParams.get("signature"),
    ),
    { status: 403 },
  );
  await assert.rejects(
    getSignedMedia(
      "another-owner",
      saved.recording,
      url.searchParams.get("expires"),
      url.searchParams.get("signature"),
    ),
    { status: 403 },
  );
  for (const row of await db
    .select()
    .from(media)
    .where(inArray(media.id, saved.cleanup))) {
    assert.equal(row.state, "deleted");
    await assert.rejects(readAsset(row.key));
  }
  const recovered = await db
    .select()
    .from(jobs)
    .where(inArray(jobs.id, [saved.staleJob, saved.queuedJob]));
  assert.equal(recovered.length, 2);
  assert(recovered.every((j) => j.status === "failed"));
  assert.equal(
    recovered.find((j) => j.id === saved.staleJob)!.attempts,
    0,
    "An ambiguous running call must not be automatically replayed.",
  );
  assert.equal(
    recovered.find((j) => j.id === saved.queuedJob)!.attempts,
    1,
    "The orphaned queued job must run once and fail before any provider call.",
  );
  if (process.argv[2] === "restore-check") {
    await deleteRecording(owner.id, saved.recording);
    await assert.rejects(readAsset(result.row.key));
    await assert.rejects(mediaUrl(owner.id, saved.recording), { status: 404 });
  }
  console.log(
    "PASS: saved lesson/exam/export, private S3 checksum, signed expiry/owner isolation, worker recovery, stale upload, retention and deletion" +
      (process.argv[2] === "restore-check"
        ? ", including restored recording deletion."
        : "."),
  );
}
main().finally(closeDb);
