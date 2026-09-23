import { UiText } from "@/components/ui-language";
import { and, eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { requireUser } from "@/auth/server";
import { getDb } from "@/db";
import { attempts, evaluations, jobs } from "@/db/schema";
import { publishedLesson } from "@/learning/service";
import AiFeedback from "@/components/ai-feedback";
import RecordingPlayer from "@/components/recording-player";
export default async function FeedbackPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const user = await requireUser(),
    { attemptId } = await params,
    db = getDb();
  const attempt = (
    await db
      .select()
      .from(attempts)
      .where(and(eq(attempts.id, attemptId), eq(attempts.userId, user.id)))
  )[0];
  if (!attempt) notFound();
  const lesson = await publishedLesson(
      attempt.lessonId,
      attempt.contentVersion,
    ),
    exercise = lesson.exercises.find((e) => e.id === attempt.exerciseId)!;
  const evaluation = (
    await db
      .select()
      .from(evaluations)
      .where(
        and(
          eq(evaluations.attemptId, attempt.id),
          eq(evaluations.userId, user.id),
        ),
      )
      .orderBy(desc(evaluations.createdAt))
      .limit(1)
  )[0];
  const savedJobs = await db
    .select()
    .from(jobs)
    .where(eq(jobs.userId, user.id))
    .orderBy(desc(jobs.createdAt));
  const job = savedJobs.find(
    (j) => (j.input as { attemptId?: string }).attemptId === attempt.id,
  );
  return (
    <>
      <Link href="/progress" className="inline-link">
        {" "}
        <UiText>{"← Back to progress"}</UiText>{" "}
      </Link>
      <div className="page-heading section-space">
        <div>
          <span className="eyebrow">
            <UiText>{"SAVED RESPONSE ·"}</UiText> {attempt.localDate}
          </span>
          <h1>{lesson.title}</h1>
        </div>
      </div>
      <section className="card">
        <h2>{exercise.prompt}</h2>
        <p className="small muted">
          {attempt.assisted ? "Assisted practice" : "Unaided submission"}{" "}
          <UiText>{"· Content version"}</UiText> {attempt.contentVersion}
        </p>
        <div className="example" lang="de" style={{ whiteSpace: "pre-wrap" }}>
          {attempt.modality === "speaking" ? (
            <RecordingPlayer
              mediaId={attempt.response.match(/[a-f0-9]{64}/)?.[0] || ""}
            />
          ) : (
            attempt.response
          )}
        </div>
        {exercise.rubric && (
          <ul>
            {exercise.rubric.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
        {exercise.rubric ? (
          <AiFeedback
            mode={attempt.modality === "speaking" ? "audio" : "evaluate"}
            attemptId={attempt.id}
            initial={
              job
                ? {
                    id: job.id,
                    status: job.status,
                    error: job.error,
                    model: job.model,
                    output: job.output as never,
                  }
                : null
            }
          />
        ) : (
          <div className="feedback">
            {evaluation?.data.explanation || "Assessment is pending."}
          </div>
        )}
      </section>
    </>
  );
}
