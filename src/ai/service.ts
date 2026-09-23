import { createHash, randomUUID } from "node:crypto";
import { and, eq, desc, sql } from "drizzle-orm";
import { getDb } from "@/db";
import {
  jobs,
  attempts,
  evaluations,
  errorPatterns,
  usageLimits,
  exposures,
  lessonProgress,
  reviews,
  type EvaluationData,
} from "@/db/schema";
import {
  AppError,
  publishedLesson,
  profileFor,
  refreshPlacement,
} from "@/learning/service";
import { publicLesson } from "@/content/types";
import { localDate, scheduleReview } from "@/learning/policies";
import { assessRubric } from "./contracts";
import { capabilities, evaluateText, tutor } from "./provider";
import { enqueue } from "@/jobs/queue";
import { processAudioAssessment } from "@/audio/assessment";
import { processExamPartner, processExamEvaluation } from "@/exams/ai";
import { courseAudio } from "../../content/audio";
type JobInput = {
  version?: number;
  attemptId?: string;
  lessonId?: string;
  exerciseId?: string;
  attemptKey?: string;
  question?: string;
  parentId?: string;
  language?: string;
};
export async function getJob(userId: string, id: string) {
  const row = (
    await getDb()
      .select()
      .from(jobs)
      .where(and(eq(jobs.id, id), eq(jobs.userId, userId)))
  )[0];
  if (!row) throw new AppError(404, "Feedback not found.");
  const saved = row.output as { evaluation?: EvaluationData } | null;
  if (
    row.status === "completed" &&
    (row.input as JobInput).attemptId &&
    saved?.evaluation?.correct != null
  )
    await updateProductiveProgress(
      userId,
      (row.input as JobInput).attemptId!,
      saved.evaluation,
    );
  return {
    id: row.id,
    status: row.status,
    operation: row.operation,
    output: row.output,
    error: row.error,
    model: row.model,
    updatedAt: row.updatedAt,
  };
}
export async function requestJob(
  userId: string,
  operation: "evaluate" | "explain" | "roleplay" | "audio",
  input: JobInput,
  key: string,
) {
  if (
    !(operation === "audio"
      ? capabilities().transcription
      : capabilities().text)
  )
    throw new AppError(
      503,
      "AI feedback is not configured yet. Your saved work remains available.",
    );
  const db = getDb(),
    profile = (await profileFor(userId)).data;
  if (operation === "evaluate" || operation === "audio") {
    const attempt = (
      await db
        .select()
        .from(attempts)
        .where(
          and(eq(attempts.id, input.attemptId!), eq(attempts.userId, userId)),
        )
    )[0];
    if (!attempt) throw new AppError(404, "Response not found.");
    if (operation === "audio" && attempt.modality !== "speaking")
      throw new AppError(400, "Select a recorded response.");
    if (operation === "evaluate" && attempt.modality === "speaking")
      throw new AppError(
        400,
        "Use the recording feedback action for spoken work.",
      );
    const lesson = await publishedLesson(
        attempt.lessonId,
        attempt.contentVersion,
      ),
      ex = lesson.exercises.find((e) => e.id === attempt.exerciseId);
    if (!ex?.rubric?.length)
      throw new AppError(400, "This task uses objective feedback.");
    key = operation + ":" + attempt.id;
    input = { attemptId: attempt.id, language: profile.language };
  } else {
    const lesson = await publishedLesson(input.lessonId!);
    if (input.parentId) await getJob(userId, input.parentId);
    if (input.exerciseId && input.attemptKey) {
      const ex = lesson.exercises.find((e) => e.id === input.exerciseId);
      if (!ex) throw new AppError(400, "Unknown exercise.");
      await db
        .insert(exposures)
        .values({
          id: randomUUID(),
          userId,
          exerciseId: ex.id,
          contentVersion: lesson.version,
          attemptKey: input.attemptKey,
          kind: "tutor",
        })
        .onConflictDoNothing();
    }
    input = { ...input, version: lesson.version, language: profile.language };
  }
  const id = createHash("sha256")
    .update(userId + ":" + operation + ":" + key)
    .digest("hex");
  const quotaKey =
    "ai:" + userId + ":" + localDate(new Date(), profile.timezone);
  const limit = Math.max(
    1,
    Math.min(200, Number(process.env.AI_DAILY_REQUEST_LIMIT) || 40),
  );
  const inserted = await db.transaction(async (tx) => {
    const existing = (await tx.select().from(jobs).where(eq(jobs.id, id)))[0];
    if (existing) return false;
    const count = (
      await tx
        .insert(usageLimits)
        .values({
          key: quotaKey,
          count: operation === "audio" ? 2 : 1,
          expiresAt: new Date(Date.now() + 172800000),
        })
        .onConflictDoUpdate({
          target: usageLimits.key,
          set: {
            count: sql.raw(
              '"usage_limits"."count" + ' + (operation === "audio" ? "2" : "1"),
            ),
          },
        })
        .returning()
    )[0];
    if (count.count > limit)
      throw new AppError(
        429,
        "Today's AI practice allowance is used. Saved lessons and objective practice remain available.",
      );
    await tx
      .insert(jobs)
      .values({ id, userId, operation, status: "queued", input });
    return true;
  });
  if (inserted) {
    if (capabilities().worker) {
      try {
        await enqueue(id);
      } catch {
        await db
          .update(jobs)
          .set({
            error: "Waiting for the worker. The request is safely queued.",
          })
          .where(eq(jobs.id, id));
      }
    } else if (process.env.NODE_ENV !== "production") await processJob(id);
    else
      throw new AppError(
        503,
        "The background worker is not enabled. The request is saved.",
      );
  }
  return getJob(userId, id);
}
export async function processJob(id: string) {
  const db = getDb();
  const claimed = (
    await db
      .update(jobs)
      .set({
        status: "running",
        attempts: sql.raw('"ai_jobs"."attempts" + 1'),
        updatedAt: new Date(),
        error: null,
      })
      .where(and(eq(jobs.id, id), eq(jobs.status, "queued")))
      .returning()
  )[0];
  if (!claimed) return;
  try {
    const input = claimed.input as JobInput;
    if (claimed.operation === "exam_partner") {
      await processExamPartner(claimed);
    } else if (claimed.operation === "exam_evaluate") {
      await processExamEvaluation(claimed);
    } else if (claimed.operation === "audio") {
      await processAudioAssessment(claimed);
    } else if (claimed.operation === "evaluate") {
      const attempt = (
        await db
          .select()
          .from(attempts)
          .where(
            and(
              eq(attempts.id, input.attemptId!),
              eq(attempts.userId, claimed.userId),
            ),
          )
      )[0];
      if (!attempt) throw new Error("Missing response.");
      const lesson = await publishedLesson(
          attempt.lessonId,
          attempt.contentVersion,
        ),
        exercise = lesson.exercises.find((e) => e.id === attempt.exerciseId)!;
      const source = exercise.mediaId
        ? courseAudio.find((a) => a.id === exercise.mediaId)?.script
        : exercise.stimulus;
      const result = await evaluateText(
        { ...exercise, stimulus: source },
        attempt.response,
        input.language || "en",
        id,
      );
      const data = assessRubric(
        result.value,
        exercise.rubric || [],
        attempt.response,
      );
      await db.transaction(async (tx) => {
        const previous = (
          await tx
            .select()
            .from(evaluations)
            .where(
              and(
                eq(evaluations.attemptId, attempt.id),
                eq(evaluations.userId, claimed.userId),
              ),
            )
            .orderBy(desc(evaluations.createdAt))
            .limit(1)
        )[0];
        await tx
          .insert(evaluations)
          .values({
            id,
            attemptId: attempt.id,
            userId: claimed.userId,
            status: data.correct === null ? "inconclusive" : "completed",
            source: "ai_coaching",
            data,
            rubricVersion: "course-rubric-v1/prompt-v1",
            model: result.model,
            supersedesId: previous?.id,
          })
          .onConflictDoNothing();
        const patterns = new Set<string>();
        if (data.correct !== null)
          for (const correction of result.value.corrections.filter(
            (c) => c.kind === "error",
          )) {
            const pattern = attempt.skill + ":" + correction.tag;
            if (patterns.has(pattern)) continue;
            patterns.add(pattern);
            await tx
              .insert(errorPatterns)
              .values({
                id: randomUUID(),
                userId: claimed.userId,
                skill: attempt.skill,
                tag: correction.tag,
                rootCause: correction.cause,
                original: correction.original,
                correction: correction.corrected,
                explanation: correction.explanation,
                lessonId: lesson.id,
                exerciseId: exercise.id,
                attemptId: attempt.id,
              })
              .onConflictDoUpdate({
                target: [
                  errorPatterns.userId,
                  errorPatterns.skill,
                  errorPatterns.tag,
                ],
                set: {
                  count: sql.raw('"error_patterns"."count" + 1'),
                  status: "open",
                  original: correction.original,
                  correction: correction.corrected,
                  explanation: correction.explanation,
                  rootCause: correction.cause,
                  attemptId: attempt.id,
                  lessonId: lesson.id,
                  exerciseId: exercise.id,
                  updatedAt: new Date(),
                },
              });
          }
        await tx
          .update(jobs)
          .set({
            status: "completed",
            model: result.model,
            output: {
              ...result.value,
              evaluation: data,
              source: "AI coaching estimate",
              usage: result.usage,
            },
            updatedAt: new Date(),
          })
          .where(eq(jobs.id, id));
      });
      if (data.correct !== null)
        await updateProductiveProgress(claimed.userId, attempt.id, data);
      if (/^D[1-5]$/.test(lesson.id)) await refreshPlacement(claimed.userId);
    } else if (
      claimed.operation === "explain" ||
      claimed.operation === "roleplay"
    ) {
      const lesson = await publishedLesson(input.lessonId!, input.version);
      const history: { role: "user" | "assistant"; text: string }[] = [];
      let parent = input.parentId;
      for (let i = 0; parent && i < 4; i++) {
        const row = (
          await db
            .select()
            .from(jobs)
            .where(and(eq(jobs.id, parent), eq(jobs.userId, claimed.userId)))
        )[0];
        if (!row) throw new Error("Missing conversation turn.");
        const previous = row.input as JobInput;
        if (previous.lessonId !== lesson.id)
          throw new Error("Conversation context mismatch.");
        const out = row.output as { answer?: string };
        if (out?.answer)
          history.unshift(
            { role: "user", text: previous.question || "" },
            { role: "assistant", text: out.answer },
          );
        parent = previous.parentId;
      }
      const result = await tutor(
        {
          lesson: publicLesson(lesson),
          question: input.question || "Explain this more simply.",
          language: input.language || "en",
          history,
          mode: claimed.operation,
        },
        id,
      );
      const value = {
        ...result.value,
        referenceIds: result.value.referenceIds.filter((ref) =>
          lesson.references.includes(ref),
        ),
      };
      await db
        .update(jobs)
        .set({
          status: "completed",
          output: value,
          model: result.model,
          updatedAt: new Date(),
        })
        .where(eq(jobs.id, id));
    } else throw new Error("Unsupported operation.");
  } catch {
    await db
      .update(jobs)
      .set({
        status: "failed",
        error:
          "The provider did not return usable feedback. Your response is saved and remains unscored. No automatic paid retry was made.",
        updatedAt: new Date(),
      })
      .where(and(eq(jobs.id, id), eq(jobs.status, "running")));
  }
}
export async function updateProductiveProgress(
  userId: string,
  attemptId: string,
  data: EvaluationData,
) {
  const db = getDb(),
    attempt = (
      await db
        .select()
        .from(attempts)
        .where(and(eq(attempts.id, attemptId), eq(attempts.userId, userId)))
    )[0];
  if (!attempt || data.correct === null) return;
  const lesson = await publishedLesson(
      attempt.lessonId,
      attempt.contentVersion,
    ),
    today = localDate(new Date(), (await profileFor(userId)).data.timezone);
  const history = await db
    .select({ attempt: attempts, evaluation: evaluations })
    .from(attempts)
    .innerJoin(evaluations, eq(evaluations.attemptId, attempts.id))
    .where(
      and(
        eq(attempts.userId, userId),
        eq(attempts.lessonId, lesson.id),
        eq(attempts.contentVersion, lesson.version),
      ),
    )
    .orderBy(desc(evaluations.createdAt));
  const latest = history.filter(
    (h, i) => history.findIndex((x) => x.attempt.id === h.attempt.id) === i,
  );
  const complete =
    lesson.exercises.every((e) =>
      latest.some((h) => h.attempt.exerciseId === e.id),
    ) &&
    lesson.exercises
      .filter((e) => e.exit)
      .every((e) =>
        latest.some(
          (h) =>
            h.attempt.exerciseId === e.id &&
            h.evaluation.status === "completed" &&
            h.evaluation.data.correct,
        ),
      );
  await db
    .update(lessonProgress)
    .set({
      state: complete ? "completed" : "in_progress",
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(lessonProgress.userId, userId),
        eq(lessonProgress.lessonId, lesson.id),
      ),
    );
  const current = (
    await db
      .select()
      .from(reviews)
      .where(
        and(
          eq(reviews.userId, userId),
          eq(reviews.targetId, attempt.skill),
          eq(reviews.mode, "production"),
        ),
      )
  )[0];
  const next =
    !current || !data.correct
      ? scheduleReview(
          current,
          { correct: data.correct, assisted: attempt.assisted },
          today,
        )
      : current;
  await db
    .insert(reviews)
    .values({
      id: current?.id || randomUUID(),
      userId,
      targetId: attempt.skill,
      mode: "production",
      ...next,
      timezone: attempt.timezone,
    })
    .onConflictDoUpdate({
      target: [reviews.userId, reviews.targetId, reviews.mode],
      set: { step: next.step, dueDate: next.dueDate, lastDate: next.lastDate },
    });
}

export async function retryJob(userId: string, id: string) {
  const db = getDb(),
    profile = (await profileFor(userId)).data;
  const row = (
    await db
      .select()
      .from(jobs)
      .where(and(eq(jobs.id, id), eq(jobs.userId, userId)))
  )[0];
  if (!row) throw new AppError(404, "Feedback not found.");
  if (row.status !== "failed" || row.attempts >= 3)
    throw new AppError(
      409,
      "Only failed requests with fewer than three tries can be retried.",
    );
  const quota = "ai:" + userId + ":" + localDate(new Date(), profile.timezone),
    cost =
      row.operation === "exam_partner"
        ? 3
        : ["audio", "exam_evaluate"].includes(row.operation)
          ? 2
          : 1;
  await db.transaction(async (tx) => {
    const claim = await tx
      .update(jobs)
      .set({ status: "queued", error: null, updatedAt: new Date() })
      .where(
        and(
          eq(jobs.id, id),
          eq(jobs.userId, userId),
          eq(jobs.status, "failed"),
        ),
      )
      .returning();
    if (!claim.length) throw new AppError(409, "The retry is already queued.");
    const usage = (
      await tx
        .insert(usageLimits)
        .values({
          key: quota,
          count: cost,
          expiresAt: new Date(Date.now() + 172800000),
        })
        .onConflictDoUpdate({
          target: usageLimits.key,
          set: { count: sql.raw('"usage_limits"."count" + ' + cost) },
        })
        .returning()
    )[0];
    if (
      usage.count >
      Math.max(
        1,
        Math.min(200, Number(process.env.AI_DAILY_REQUEST_LIMIT) || 40),
      )
    )
      throw new AppError(429, "Today's AI allowance is used.");
  });
  if (capabilities().worker) await enqueue(id);
  else if (process.env.NODE_ENV !== "production") await processJob(id);
  return getJob(userId, id);
}
