import { createHash } from "node:crypto";
import { and, eq, desc, isNull } from "drizzle-orm";
import { getDb } from "@/db";
import { contentVersions, examAttempts, media } from "@/db/schema";
import { AppError } from "@/learning/service";
import { mocks } from "../../content/exams";
import { examDefinition } from "./definition";
import { mockSchema, publicTask, type Mock } from "./types";
import { inspectWav } from "@/audio/wav";
import { putAsset, readAsset, removeAsset } from "@/audio/storage";
import { capabilities } from "@/ai/provider";
import { wavFromPcm } from "@/audio/pcm";
import { MAX_AUDIO_BYTES, mediaUrl } from "@/audio/service";
import { isReviewedClip, isReviewedTimeline } from "@/audio/readiness";
export type Run = typeof examAttempts.$inferSelect;
export async function publishedMock(
  id: string,
  version?: number,
): Promise<Mock> {
  const row = (
    await getDb()
      .select()
      .from(contentVersions)
      .where(
        and(
          eq(contentVersions.id, id),
          version === undefined
            ? undefined
            : eq(contentVersions.version, version),
          eq(contentVersions.type, "mock"),
          eq(contentVersions.published, true),
        ),
      )
      .orderBy(desc(contentVersions.version))
      .limit(1)
  )[0];
  if (!row)
    throw new AppError(
      404,
      "This mock has not been published. Run the content seed.",
    );
  return mockSchema.parse(row.payload);
}
export function mockVersionOf(run: Pick<Run, "definitionVersion">) {
  const match = run.definitionVersion.match(/\/mock-(\d+)$/);
  if (!match || Number(match[1]) < 1)
    throw new AppError(
      409,
      "This attempt has no supported content version. Preserve it as historical evidence.",
    );
  return Number(match[1]);
}
async function owned(userId: string, id: string) {
  const row = (
    await getDb()
      .select()
      .from(examAttempts)
      .where(and(eq(examAttempts.id, id), eq(examAttempts.userId, userId)))
  )[0];
  if (!row) throw new AppError(404, "Exam attempt not found.");
  return row;
}
export async function examCatalog(userId: string) {
  const history = await getDb()
    .select()
    .from(examAttempts)
    .where(eq(examAttempts.userId, userId))
    .orderBy(desc(examAttempts.startedAt));
  const assets = await getDb()
    .select()
    .from(media)
    .where(and(eq(media.state, "ready"), isNull(media.deletedAt)));
  const readyClip = (script: Mock["audio"][number]) =>
    isReviewedClip(
      assets.find((asset) => asset.id === script.id),
      script,
    );
  const readyTimeline = (mock: Mock) =>
    isReviewedTimeline(
      assets.find(
        (asset) => asset.id === mock.id + "-timeline-v" + mock.version,
      ),
      mock,
    );
  const providers = capabilities();
  return {
    definition: examDefinition,
    mocks: mocks.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      reserved: m.reserved,
      version: m.version,
      audioReady: m.audio.every(readyClip),
      timelineReady: readyTimeline(m),
      fullReady:
        readyTimeline(m) &&
        [
          providers.text,
          providers.transcription,
          providers.speech,
          providers.soundAnalysis,
        ].every(Boolean),
      attempted: history.some((h) => h.mockId === m.id),
      quality: m.quality,
    })),
    history: history.map(({ answers: _answers, ...row }) => row),
  };
}
export async function startExam(
  userId: string,
  input: {
    id: string;
    mockId: string;
    mode: "practice" | "timed_reference" | "simulation";
    block?: number;
  },
  now = new Date(),
) {
  const existing = (
    await getDb()
      .select()
      .from(examAttempts)
      .where(eq(examAttempts.id, input.id))
  )[0];
  if (existing) {
    if (existing.userId !== userId)
      throw new AppError(404, "Exam attempt not found.");
    if (
      existing.mockId !== input.mockId ||
      existing.mode !== input.mode ||
      (input.mode === "practice" && existing.block !== (input.block ?? 0))
    )
      throw new AppError(409, "This start key belongs to another attempt.");
    return getExam(userId, existing.id, now);
  }
  const mock = await publishedMock(input.mockId),
    block = input.mode === "practice" ? (input.block ?? 0) : 0;
  if (input.mode === "simulation")
    throw new AppError(
      409,
      "Verified simulation is not released: applicable navigation/pass rules and the full spoken partner workflow require verification. Choose section practice.",
    );
  if (mock.reserved && input.mode === "practice")
    throw new AppError(
      409,
      "This original set is reserved for a later complete rehearsal.",
    );
  if (input.mode === "timed_reference") {
    const status = (await examCatalog(userId)).mocks.find(
      (m) => m.id === mock.id,
    );
    if (!status?.fullReady)
      throw new AppError(
        503,
        "Prepare the reviewed 25-minute timeline and configure text, speech, transcription and sound-analysis models before a full paper-reference rehearsal.",
      );
  }
  if (block === 1) {
    const ready = (await examCatalog(userId)).mocks.find(
      (m) => m.id === mock.id,
    );
    if (!ready?.audioReady)
      throw new AppError(
        503,
        "Generate and review this set's listening recordings before listening practice.",
      );
  }
  const prior = await getDb()
    .select({ id: examAttempts.id })
    .from(examAttempts)
    .where(
      and(eq(examAttempts.userId, userId), eq(examAttempts.mockId, mock.id)),
    )
    .limit(1);
  await getDb()
    .insert(examAttempts)
    .values({
      id: input.id,
      userId,
      mockId: mock.id,
      definitionVersion: examDefinition.version + "/mock-" + mock.version,
      mode: input.mode,
      block,
      state: "active",
      startedAt: now,
      deadline: new Date(
        now.getTime() + examDefinition.blocks[block].seconds * 1000,
      ),
      answers: {},
      flags: [
        "unofficial",
        input.mode === "practice"
          ? "section-practice"
          : "paper-reference-rehearsal",
        "rules-unverified",
        "quality-review-pending",
        ...(prior.length ? ["previously-exposed"] : []),
      ],
      updatedAt: now,
    })
    .onConflictDoNothing();
  return getExam(userId, input.id, now);
}
export function objectiveResult(
  mock: Mock,
  answers: Record<string, string>,
  block?: number,
) {
  const tasks = mock.tasks.filter(
    (t) => block === undefined || t.block === block,
  );
  const objective = tasks.filter((t) => t.answer !== undefined);
  const points = (skill: string) =>
    objective
      .filter((t) => t.skill === skill)
      .reduce(
        (sum, t) => sum + (answers[t.id] === t.answer ? t.halfPoints : 0),
        0,
      ) / 2;
  return {
    reading: block === undefined || block === 0 ? points("reading") : null,
    listening: block === undefined || block === 1 ? points("listening") : null,
    languageElements:
      block === undefined || block === 2 ? points("writing") : null,
    writing: null,
    speaking: null,
    total: null,
    readiness: "incomplete",
    correct: objective.filter((t) => answers[t.id] === t.answer).length,
    possible: objective.length,
    missing: tasks.filter((t) => !answers[t.id]).map((t) => t.id),
    explanation:
      "Objective items use the paper-reference point weights. Extended writing and actual speech need separate rubric evidence. A section score does not establish exam readiness.",
  };
}
async function settle(row: Run, now: Date) {
  if (row.state !== "active" || now < row.deadline) return row;
  const mock = await publishedMock(row.mockId, mockVersionOf(row));
  const changed = await getDb()
    .update(examAttempts)
    .set({
      state:
        row.mode === "practice" || row.block === 3
          ? "submitted"
          : "between_blocks",
      results: objectiveResult(
        mock,
        row.answers,
        row.mode === "practice" ? row.block : undefined,
      ),
      flags: [...new Set([...row.flags, "time-expired"])],
      updatedAt: now,
    })
    .where(
      and(
        eq(examAttempts.id, row.id),
        eq(examAttempts.state, "active"),
        eq(examAttempts.sequence, row.sequence),
      ),
    )
    .returning();
  return changed[0] || owned(row.userId, row.id);
}
export async function getExam(userId: string, id: string, now = new Date()) {
  const row = await settle(await owned(userId, id), now),
    mock = await publishedMock(row.mockId, mockVersionOf(row));
  const tasks = mock.tasks.filter(
    (t) =>
      (row.state === "submitted" && row.mode !== "practice") ||
      t.block === row.block,
  );
  return {
    ...row,
    answers: Object.fromEntries(
      Object.entries(row.answers).filter(([key]) =>
        tasks.some((t) => t.id === key),
      ),
    ),
    title: mock.title,
    serverTime: now.toISOString(),
    tasks: tasks.map(publicTask),
    feedback:
      row.state === "submitted"
        ? tasks.map((t) => ({
            id: t.id,
            answer: t.answer,
            rationale: t.rationale,
            correct:
              t.answer === undefined ? null : row.answers[t.id] === t.answer,
          }))
        : null,
    definition: examDefinition,
    coachingOnly: true,
  };
}
export async function saveExam(
  userId: string,
  id: string,
  input: {
    sequence: number;
    answers: Record<string, string>;
    submit?: boolean;
  },
  now = new Date(),
) {
  const before = await owned(userId, id),
    mock = await publishedMock(before.mockId, mockVersionOf(before));
  return getDb().transaction(async (tx) => {
    // A row lock serializes timer expiry, autosave, and explicit submission.
    const row = (
      await tx
        .select()
        .from(examAttempts)
        .where(and(eq(examAttempts.id, id), eq(examAttempts.userId, userId)))
        .for("update")
    )[0];
    if (!row) throw new AppError(404, "Exam attempt not found.");
    if (row.state !== "active")
      return {
        id: row.id,
        state: row.state,
        sequence: row.sequence,
        savedAt: row.updatedAt.toISOString(),
      };
    const tasks = mock.tasks.filter((t) => t.block === row.block);
    if (now >= row.deadline) {
      await tx
        .update(examAttempts)
        .set({
          state:
            row.mode === "practice" || row.block === 3
              ? "submitted"
              : "between_blocks",
          results: objectiveResult(
            mock,
            row.answers,
            row.mode === "practice" ? row.block : undefined,
          ),
          flags: [...row.flags, "time-expired"],
          updatedAt: now,
        })
        .where(eq(examAttempts.id, id));
      return {
        id,
        state: "submitted",
        sequence: row.sequence,
        savedAt: now.toISOString(),
      };
    }
    if (input.sequence <= row.sequence)
      throw new AppError(
        409,
        "A newer exam draft is saved. Reload this attempt.",
      );
    for (const [taskId, value] of Object.entries(input.answers)) {
      const task = tasks.find((t) => t.id === taskId);
      if (!task)
        throw new AppError(400, "The answer does not belong to this section.");
      if (task.kind === "speaking" && value !== row.answers[taskId])
        throw new AppError(400, "Use the recorder for spoken responses.");
      if (task.options && value && !task.options.includes(value))
        throw new AppError(400, "Choose a listed answer.");
    }
    // Omitted fields are preserved; an explicit empty string clears a draft.
    const answers = { ...row.answers, ...input.answers },
      state = input.submit
        ? row.mode === "practice" || row.block === 3
          ? "submitted"
          : "between_blocks"
        : "active";
    await tx
      .update(examAttempts)
      .set({
        answers,
        sequence: input.sequence,
        state,
        results: input.submit
          ? objectiveResult(
              mock,
              answers,
              row.mode === "practice" ? row.block : undefined,
            )
          : null,
        updatedAt: now,
      })
      .where(eq(examAttempts.id, id));
    return { id, state, sequence: input.sequence, savedAt: now.toISOString() };
  });
}
export async function examAudio(
  userId: string,
  runId: string,
  audioId: string,
) {
  const row = await owned(userId, runId),
    mock = await publishedMock(row.mockId, mockVersionOf(row));
  if (row.mode !== "practice")
    throw new AppError(
      403,
      "Use the continuous timeline in a complete rehearsal.",
    );
  if (!mock.tasks.some((t) => t.block === row.block && t.audioId === audioId))
    throw new AppError(404, "Audio not available in this section.");
  const asset = (
    await getDb()
      .select()
      .from(media)
      .where(
        and(
          eq(media.id, audioId),
          eq(media.state, "ready"),
          isNull(media.deletedAt),
        ),
      )
  )[0];
  const script = mock.audio.find((clip) => clip.id === audioId);
  if (!script || !isReviewedClip(asset, script))
    throw new AppError(503, "The reviewed audio for this script is not ready.");
  return readAsset(asset.key);
}
export async function recordExam(
  userId: string,
  id: string,
  taskId: string,
  key: string,
  bytes: Buffer,
) {
  if (bytes.length > MAX_AUDIO_BYTES)
    throw new AppError(413, "The recording exceeds 20 MB.");
  const properties = inspectWav(bytes),
    row = await owned(userId, id),
    mock = await publishedMock(row.mockId, mockVersionOf(row));
  if (row.state !== "active" || new Date() >= row.deadline)
    throw new AppError(409, "This section is already closed.");
  if (
    !mock.tasks.some(
      (t) => t.id === taskId && t.block === row.block && t.kind === "speaking",
    )
  )
    throw new AppError(400, "Select a spoken task.");
  const mediaId = createHash("sha256")
      .update(userId + ":" + id + ":" + key)
      .digest("hex"),
    checksum = createHash("sha256").update(bytes).digest("hex"),
    assetKey = "recordings/" + userId + "/" + mediaId + ".wav";
  const savedTurns: string[] = JSON.parse(
    row.answers["$turns:" + taskId] || "[]",
  );
  if (savedTurns.length >= 6 && !savedTurns.includes(mediaId))
    throw new AppError(
      409,
      "This task has six saved turns. Move to the next task.",
    );
  const previous = (
    await getDb().select().from(media).where(eq(media.id, mediaId))
  )[0];
  if (
    previous &&
    (previous.checksum !== checksum ||
      previous.deletedAt ||
      (previous.metadata as { taskId?: string }).taskId !== taskId)
  )
    throw new AppError(409, "This recording key has already been used.");
  if (!previous || previous.state === "failed") {
    const claimed = previous
      ? await getDb()
          .update(media)
          .set({ state: "uploading" })
          .where(and(eq(media.id, mediaId), eq(media.state, "failed")))
          .returning()
      : await getDb()
          .insert(media)
          .values({
            id: mediaId,
            userId,
            key: assetKey,
            mime: "audio/wav",
            bytes: bytes.length,
            checksum,
            kind: "learner_recording",
            state: "uploading",
            metadata: {
              ...properties,
              examId: id,
              taskId,
              source: "microphone",
              transcriptEdited: false,
            },
          })
          .onConflictDoNothing()
          .returning();
    if (!claimed.length)
      throw new AppError(
        409,
        "This upload is already being processed. Retry after it finishes.",
      );
    try {
      await putAsset(assetKey, bytes, "audio/wav");
      await getDb()
        .update(media)
        .set({ state: "ready" })
        .where(eq(media.id, mediaId));
    } catch (error) {
      await getDb()
        .update(media)
        .set({ state: "failed" })
        .where(eq(media.id, mediaId));
      await removeAsset(assetKey).catch(() => {});
      throw error;
    }
  } else if (previous.state !== "ready")
    throw new AppError(
      409,
      "This recording is still being uploaded. Retry shortly.",
    );
  await getDb().transaction(async (tx) => {
    const current = (
      await tx
        .select()
        .from(examAttempts)
        .where(and(eq(examAttempts.id, id), eq(examAttempts.userId, userId)))
        .for("update")
    )[0];
    if (current.state !== "active" || new Date() >= current.deadline)
      throw new AppError(
        409,
        "The section closed before upload finished. The private take is retained.",
      );
    const turns: string[] = JSON.parse(
      current.answers["$turns:" + taskId] || "[]",
    );
    if (turns.includes(mediaId)) return;
    if (turns.length >= 6)
      throw new AppError(
        409,
        "This task already has six saved turns. The additional private recording is retained without replacing a turn.",
      );
    await tx
      .update(examAttempts)
      .set({
        answers: {
          ...current.answers,
          [taskId]: "[Recording " + mediaId + "]",
          ["$turns:" + taskId]: JSON.stringify([...turns, mediaId]),
        },
        sequence: current.sequence + 1,
        updatedAt: new Date(),
      })
      .where(eq(examAttempts.id, id));
  });
  return {
    media: {
      id: mediaId,
      duration: properties.duration,
      url: await mediaUrl(userId, mediaId),
    },
    run: await getExam(userId, id),
  };
}
export type PublicRun = Awaited<ReturnType<typeof getExam>>;

export async function advanceExam(
  userId: string,
  id: string,
  expectedBlock: number,
  now = new Date(),
) {
  return getDb().transaction(async (tx) => {
    const row = (
      await tx
        .select()
        .from(examAttempts)
        .where(and(eq(examAttempts.id, id), eq(examAttempts.userId, userId)))
        .for("update")
    )[0];
    if (!row) throw new AppError(404, "Exam attempt not found.");
    if (row.block > expectedBlock) return { id: row.id };
    if (
      row.mode === "practice" ||
      row.state !== "between_blocks" ||
      row.block !== expectedBlock ||
      row.block >= 3
    )
      throw new AppError(409, "The next block is not available.");
    const block = row.block + 1;
    await tx
      .update(examAttempts)
      .set({
        block,
        state: "active",
        deadline: new Date(
          now.getTime() + examDefinition.blocks[block].seconds * 1000,
        ),
        updatedAt: now,
      })
      .where(eq(examAttempts.id, id));
    return { id };
  });
}
export async function timelineAudio(
  userId: string,
  id: string,
  now = new Date(),
) {
  const row = await owned(userId, id);
  if (
    row.mode !== "timed_reference" ||
    row.block !== 1 ||
    row.state !== "active" ||
    now >= row.deadline
  )
    throw new AppError(403, "The listening block is not active.");
  const asset = (
    await getDb()
      .select()
      .from(media)
      .where(
        and(
          eq(media.id, row.mockId + "-timeline-v" + mockVersionOf(row)),
          eq(media.state, "ready"),
        ),
      )
  )[0];
  const mock = await publishedMock(row.mockId, mockVersionOf(row));
  if (!isReviewedTimeline(asset, mock))
    throw new AppError(
      503,
      "The reviewed timeline for this content version is unavailable.",
    );
  const bytes = await readAsset(asset.key),
    elapsed = Math.max(
      0,
      1500 - (row.deadline.getTime() - now.getTime()) / 1000,
    );
  // Our authored timeline is 16 kHz mono PCM with a canonical 44-byte header.
  // Reconnection resumes at server elapsed time; it cannot restart the sequence.
  const trimmed = wavFromPcm(
    bytes.subarray(44 + Math.floor(elapsed * 16000) * 2),
  );
  if (elapsed > 10 && !row.flags.includes("audio-joined-late"))
    await getDb()
      .update(examAttempts)
      .set({ flags: [...row.flags, "audio-joined-late"], updatedAt: now })
      .where(eq(examAttempts.id, id));
  return trimmed;
}

export async function markExamSupport(
  userId: string,
  id: string,
  kind: "partner-transcript",
) {
  return getDb().transaction(async (tx) => {
    const row = (
      await tx
        .select()
        .from(examAttempts)
        .where(and(eq(examAttempts.id, id), eq(examAttempts.userId, userId)))
        .for("update")
    )[0];
    if (!row) throw new AppError(404, "Exam attempt not found.");
    await tx
      .update(examAttempts)
      .set({
        flags: [...new Set([...row.flags, "study-support", kind])],
        updatedAt: new Date(),
      })
      .where(eq(examAttempts.id, id));
    return { saved: true };
  });
}
