"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import type { RubricOutput } from "@/ai/contracts";
type Job = {
  id: string;
  status: string;
  error: string | null;
  model: string | null;
  output:
    | (Partial<RubricOutput> & {
        answer?: string;
        followUp?: string;
        referenceIds?: string[];
        transcript?: string;
        transcriptNotice?: string;
        sound?: {
          observations: {
            dimension: string;
            startSeconds: number;
            endSeconds: number;
            observation: string;
            practice: string;
          }[];
        } | null;
        evaluation?: {
          correct: boolean | null;
          score: number | null;
          limitations?: string[];
        };
      })
    | null;
};
export default function AiFeedback({
  attemptId,
  lessonId,
  exerciseId,
  attemptKey,
  mode = "evaluate",
  initial,
}: {
  attemptId?: string;
  lessonId?: string;
  exerciseId?: string;
  attemptKey?: string;
  mode?: "evaluate" | "explain" | "roleplay" | "audio";
  initial?: Job | null;
}) {
  const [job, setJob] = useState<Job | null>(initial || null),
    [question, setQuestion] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [available, setAvailable] = useState<boolean | null>(null);
  useEffect(() => {
    api<{ text: boolean; transcription: boolean }>("capabilities")
      .then((c) => setAvailable(mode === "audio" ? c.transcription : c.text))
      .catch(() => setAvailable(false));
  }, [mode]);
  useEffect(() => {
    if (!job || !["queued", "running"].includes(job.status)) return;
    const timer = setInterval(() => {
      api<Job>("job/" + job.id)
        .then(setJob)
        .catch((e) => setError(e.message));
    }, 2000);
    return () => clearInterval(timer);
  }, [job]);
  async function ask() {
    setBusy(true);
    setError("");
    try {
      const next = await api<Job>("ai", {
        operation: mode,
        key: crypto.randomUUID(),
        attemptId,
        lessonId,
        exerciseId,
        attemptKey,
        question: question || "Explain this more simply.",
        parentId: mode === "roleplay" ? job?.id : undefined,
      });
      setJob(next);
      setQuestion("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const output = job?.output;
  return (
    <section className="section-space">
      <div className="row">
        <h3>
          <MessageCircle
            size={17}
            style={{ display: "inline", marginRight: 8 }}
          />
          {mode === "audio"
            ? "Recording feedback"
            : mode === "evaluate"
              ? "Rubric feedback"
              : mode === "roleplay"
                ? "AI conversation partner"
                : "Your learning copilot"}
        </h3>
      </div>
      <p className="small muted">
        {["evaluate", "audio"].includes(mode)
          ? "Your response and task are sent to the configured AI service for coaching feedback."
          : "Your message and this lesson are sent to the configured AI service. Help during a task is recorded as assistance."}
      </p>
      {available === false && (
        <p className="example small">
          Personal AI feedback is not configured yet. Your work is saved; the
          lesson, explanations and objective checks remain available.
        </p>
      )}
      {!["evaluate", "audio"].includes(mode) && (
        <div className="field">
          <label htmlFor={"tutor-" + mode}>
            {mode === "roleplay"
              ? "Your next turn · in German"
              : "What would you like explained?"}
          </label>
          <textarea
            id={"tutor-" + mode}
            value={question}
            maxLength={4000}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={
              mode === "roleplay"
                ? "Guten Tag, ich möchte über … sprechen."
                : "Explain the example more simply."
            }
          />
        </div>
      )}
      {error && (
        <p className="feedback error" role="alert">
          {error}
        </p>
      )}
      {job?.error && <p className="feedback error">{job.error}</p>}
      {["queued", "running"].includes(job?.status || "") && (
        <p role="status">
          Your request is saved. Feedback is being prepared… You can return to
          it later.
        </p>
      )}
      {job?.status === "failed" && (
        <button
          className="button secondary"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              setJob(await api<Job>("ai-retry", { id: job.id }));
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          Retry feedback · uses AI allowance again
        </button>
      )}
      {output && (
        <div className="feedback">
          <span className="badge neutral">AI coaching · {job?.model}</span>
          <p style={{ whiteSpace: "pre-line", marginTop: 14 }}>
            {output.summary || output.answer}
          </p>
          {output.evaluation && (
            <p className="small">
              <strong>
                {output.evaluation.correct === null
                  ? "Inconclusive · no score"
                  : output.evaluation.correct
                    ? "Task criteria met"
                    : "Some criteria need more work"}
              </strong>
            </p>
          )}
          {output.transcript && (
            <details className="disclosure">
              <summary>Automatic German transcript</summary>
              <p className="small muted">{output.transcriptNotice}</p>
              <p lang="de" style={{ whiteSpace: "pre-wrap" }}>
                {output.transcript}
              </p>
            </details>
          )}
          {output.sound?.observations.map((o, i) => (
            <div className="example small" key={i}>
              <strong>
                {o.dimension} · {o.startSeconds}–{o.endSeconds}s
              </strong>
              <p>{o.observation}</p>
              <p>
                <strong>Practise:</strong> {o.practice}
              </p>
            </div>
          ))}
          {output.criteria && (
            <div className="stack">
              {output.criteria.map((c) => (
                <div key={c.index} className="example small">
                  <strong>
                    Criterion {c.index + 1} ·{" "}
                    {["not met", "partly met", "met", "strongly met"][c.rating]}
                  </strong>
                  <p lang="de" style={{ marginTop: 8 }}>
                    “{c.evidence}”
                  </p>
                  <p>{c.explanation}</p>
                </div>
              ))}
            </div>
          )}
          {output.corrections && output.corrections.length > 0 && (
            <>
              <h3 className="section-space">Priority corrections</h3>
              {output.corrections.slice(0, 7).map((c, i) => (
                <div key={i} className="disclosure small">
                  <span className="badge neutral">
                    {c.kind === "error" ? c.tag : "C1-Variante"}
                  </span>
                  <p lang="de" style={{ marginTop: 8 }}>
                    {c.original}
                    <ArrowRight
                      size={13}
                      style={{ display: "inline", margin: "0 7px" }}
                    />
                    {c.corrected}
                  </p>
                  <p>{c.explanation}</p>
                  {c.cause === "needs_probe" && (
                    <p className="muted">
                      The root cause needs a short follow-up check.
                    </p>
                  )}
                </div>
              ))}
              {output.corrections.length > 7 && (
                <details>
                  <summary>All remaining corrections</summary>
                  {output.corrections.slice(7).map((c, i) => (
                    <p key={i} className="small">
                      {c.original} → {c.corrected}: {c.explanation}
                    </p>
                  ))}
                </details>
              )}
            </>
          )}
          {output.nextTask && (
            <p>
              <strong>Next practice:</strong> {output.nextTask}
            </p>
          )}
          {output.followUp && <p lang="de">{output.followUp}</p>}
          {[
            ...new Set([
              ...(output.limitations || []),
              ...(output.evaluation?.limitations || []),
            ]),
          ].map((l) => (
            <p className="small muted" key={l}>
              {l}
            </p>
          ))}
          {output.referenceIds?.map((id) => (
            <Link
              className="inline-link"
              style={{ display: "block" }}
              key={id}
              href={"/reference/" + id}
            >
              {id.replaceAll("-", " ")}
            </Link>
          ))}
        </div>
      )}
      <button
        type="button"
        className="button secondary"
        disabled={
          available !== true ||
          busy ||
          ["queued", "running"].includes(job?.status || "") ||
          (["evaluate", "audio"].includes(mode) && !!job)
        }
        onClick={ask}
      >
        {busy
          ? "Saving request…"
          : mode === "audio"
            ? "Transcribe and assess recording"
            : mode === "evaluate"
              ? "Get rubric feedback"
              : mode === "roleplay"
                ? "Send my turn"
                : "Explain more simply"}
        <ArrowRight size={15} />
      </button>
    </section>
  );
}
