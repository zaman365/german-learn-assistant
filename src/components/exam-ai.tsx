"use client";
import { useEffect, useState } from "react";
import RecordingPlayer from "./recording-player";
type Job = {
  id: string;
  status: string;
  error?: string;
  output?: {
    answer?: string;
    followUp?: string;
    audioId?: string;
    transcript?: string;
    summary?: string;
  };
};
export default function ExamAi({
  examId,
  taskId,
  recordingId,
  evaluate = false,
  onComplete,
}: {
  examId: string;
  taskId?: string;
  recordingId?: string;
  evaluate?: boolean;
  onComplete?: () => void;
}) {
  const [job, setJob] = useState<Job | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [transcriptVisible, setTranscriptVisible] = useState(false);
  useEffect(() => {
    if (!job || !["queued", "running"].includes(job.status)) return;
    const timer = setInterval(async () => {
      try {
        const r = await fetch("/api/learning/job/" + job.id),
          j = await r.json();
        if (!r.ok) throw new Error(j.error);
        setJob(j);
        if (j.status === "completed" && evaluate) onComplete?.();
      } catch (e) {
        setError((e as Error).message);
      }
    }, 1800);
    return () => clearInterval(timer);
  }, [job, evaluate, onComplete]);
  async function ask() {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/exams/" + examId + "/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            operation: evaluate ? "exam_evaluate" : "exam_partner",
            taskId,
            recordingId,
            initial: !recordingId,
          }),
        }),
        j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setJob(j);
      if (j.status === "completed" && evaluate) onComplete?.();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="example section-space">
      <h3>{evaluate ? "Exam rubric coaching" : "Your spoken AI partner"}</h3>
      <p className="small muted">
        {evaluate
          ? "Submitted texts and recordings are sent to your configured AI models. The result is coaching, with missing evidence left unassessed."
          : "The partner listens to your recorded turn and replies with a synthetic German voice. The server timer continues while replies are prepared."}
      </p>
      {job?.output?.audioId && <RecordingPlayer mediaId={job.output.audioId} />}
      {!evaluate && job?.output?.answer && (
        <div className="disclosure">
          {!transcriptVisible ? (
            <button
              className="button secondary"
              onClick={async () => {
                try {
                  const response = await fetch(
                    "/api/exams/" + examId + "/support",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ kind: "partner-transcript" }),
                    },
                  );
                  if (!response.ok)
                    throw new Error(
                      "Could not save the support marker. Try again.",
                    );
                  setTranscriptVisible(true);
                } catch (error) {
                  setError((error as Error).message);
                }
              }}
            >
              Show partner transcript · marks study support
            </button>
          ) : (
            <>
              <p lang="de">{job.output.answer}</p>
              <p lang="de">{job.output.followUp}</p>
            </>
          )}
          <p className="small muted">
            Reading this supports practice. A rehearsal with study support is
            not independent listening evidence.
          </p>
        </div>
      )}
      {job?.status === "failed" && (
        <button
          className="button secondary"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              const r = await fetch("/api/learning/ai-retry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: job.id }),
              });
              const value = await r.json();
              if (!r.ok) throw new Error(value.error);
              setJob(value);
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          Retry · uses AI allowance again
        </button>
      )}
      {job?.output?.summary && <p>{job.output.summary}</p>}
      {(error || job?.error) && (
        <p className="feedback error" role="alert">
          {error || job?.error}
        </p>
      )}
      {["queued", "running"].includes(job?.status || "") && (
        <p role="status">Preparing your saved request…</p>
      )}
      <button
        className="button secondary"
        disabled={
          busy || ["queued", "running", "completed"].includes(job?.status || "")
        }
        onClick={ask}
      >
        {busy
          ? "Saving…"
          : evaluate
            ? "Assess submitted exam work"
            : recordingId
              ? "Ask the partner to reply"
              : "Hear the partner’s opening turn"}
      </button>
    </section>
  );
}
