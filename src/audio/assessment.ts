import { and, eq, desc } from "drizzle-orm";
import { getDb } from "@/db";
import { attempts, evaluations, jobs, type EvaluationData } from "@/db/schema";
import { publishedLesson } from "@/learning/service";
import { transcribe, analyzeSound, capabilities } from "@/ai/provider";
import { ownedMedia } from "./service";
import { readAsset } from "./storage";
import { inspectWav } from "./wav";
import { courseAudio } from "../../content/audio";
import { refreshPlacement } from "@/learning/service";
import { updateProductiveProgress } from "@/ai/service";
export async function processAudioAssessment(job: typeof jobs.$inferSelect) {
  const db = getDb(),
    input = job.input as { attemptId: string };
  const attempt = (
    await db
      .select()
      .from(attempts)
      .where(
        and(eq(attempts.id, input.attemptId), eq(attempts.userId, job.userId)),
      )
  )[0];
  if (!attempt || attempt.modality !== "speaking")
    throw new Error("Missing spoken response.");
  const id = attempt.response.match(/^\[Recording ([a-f0-9]{64})\]$/)?.[1];
  if (!id) throw new Error("Missing recording reference.");
  const asset = await ownedMedia(job.userId, id),
    bytes = await readAsset(asset.key),
    audio = inspectWav(bytes);
  const lesson = await publishedLesson(
      attempt.lessonId,
      attempt.contentVersion,
    ),
    exercise = lesson.exercises.find((e) => e.id === attempt.exerciseId)!;
  const transcript = await transcribe(bytes, job.id + "-transcription");
  await db
    .update(jobs)
    .set({
      output: {
        transcript,
        transcriptEdited: false,
        transcriptNotice:
          "Automatic transcription may normalize or mishear your speech. It is not exact evidence of pronunciation.",
      },
      updatedAt: new Date(),
    })
    .where(eq(jobs.id, job.id));
  const result = capabilities().soundAnalysis
    ? await analyzeSound(
        bytes,
        JSON.stringify({
          prompt: exercise.prompt,
          rubric: exercise.rubric,
          source:
            courseAudio.find((a) => a.id === exercise.mediaId)?.script ||
            exercise.stimulus,
        }),
        audio.duration,
        job.id + "-sound",
      )
    : null;
  const rubric = exercise.rubric || [],
    criteria = result?.value.criteria || [];
  const covered =
    rubric.length > 0 &&
    criteria.length === rubric.length &&
    new Set(criteria.map((c) => c.index)).size === rubric.length &&
    rubric.every((_, i) => criteria.some((c) => c.index === i));
  const valid = result?.value.status === "assessed" && covered;
  const data: EvaluationData = {
    correct: valid ? criteria.every((c) => c.rating >= 2) : null,
    score: valid
      ? criteria.reduce((n, c) => n + c.rating, 0) / (rubric.length * 3)
      : null,
    explanation:
      result?.value.summary ||
      "Transcription is saved. Audio analysis is not configured; pronunciation and spoken performance remain unassessed.",
    criteria: criteria.map((c) => ({
      criterion: rubric[c.index] || "Unmapped criterion",
      result: ["not met", "partly met", "met", "strongly met"][c.rating],
      evidence:
        String(c.startSeconds) +
        "–" +
        String(c.endSeconds) +
        " s: " +
        c.explanation,
    })),
    limitations: [
      ...(result?.value.limitations || []),
      "Audio feedback is an AI coaching estimate, not a phoneme score or CEFR certificate.",
    ],
  };
  await db.transaction(async (tx) => {
    const previous = (
      await tx
        .select()
        .from(evaluations)
        .where(
          and(
            eq(evaluations.attemptId, attempt.id),
            eq(evaluations.userId, job.userId),
          ),
        )
        .orderBy(desc(evaluations.createdAt))
        .limit(1)
    )[0];
    await tx
      .insert(evaluations)
      .values({
        id: job.id,
        attemptId: attempt.id,
        userId: job.userId,
        status: data.correct === null ? "inconclusive" : "completed",
        source: result ? "audio_ai_coaching" : "transcription_only",
        data,
        rubricVersion: "spoken-course-v1/prompt-v1",
        model: result?.model || process.env.OPENAI_TRANSCRIPTION_MODEL,
        supersedesId: previous?.id,
      })
      .onConflictDoNothing();
    await tx
      .update(jobs)
      .set({
        status: "completed",
        model: result?.model || process.env.OPENAI_TRANSCRIPTION_MODEL,
        output: {
          transcript,
          transcriptEdited: false,
          summary: data.explanation,
          sound: result?.value || null,
          evaluation: data,
          limitations: data.limitations,
          transcriptNotice:
            "Automatic transcription may normalize or mishear your speech. Audio observations below are based on the recording, not inferred from this text.",
        },
        updatedAt: new Date(),
      })
      .where(eq(jobs.id, job.id));
  });
  if (data.correct !== null)
    await updateProductiveProgress(job.userId, attempt.id, data);
  await refreshPlacement(job.userId);
}
