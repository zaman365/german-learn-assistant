"use client";
import { UiText } from "@/components/ui-language";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { PublicRun } from "@/exams/service";
import AudioRecorder from "./audio-recorder";
import ExamAi from "./exam-ai";
import ExamTimeline from "./exam-timeline";
import RecordingPlayer from "./recording-player";
export default function ExamRunner({ initial }: { initial: PublicRun }) {
  const [run, setRun] = useState(initial),
    [answers, setAnswers] = useState(initial.answers),
    [step, setStep] = useState(0),
    [error, setError] = useState(""),
    [saved, setSaved] = useState(initial.updatedAt.toString()),
    [busy, setBusy] = useState(false),
    [seconds, setSeconds] = useState(0),
    [take, setTake] = useState("");
  const sequence = useRef(initial.sequence),
    serverOffset = useRef(0),
    dirty = useRef(false),
    chain = useRef(Promise.resolve()),
    latest = useRef(answers);
  useEffect(() => {
    serverOffset.current = new Date(initial.serverTime).getTime() - Date.now();
  }, [initial.serverTime]);
  const task = run.tasks[step],
    closed = run.state !== "active";
  useEffect(() => {
    setTake(crypto.randomUUID());
  }, [task.id]);
  const reload = useCallback(async () => {
    const response = await fetch("/api/exams/" + run.id);
    const value = await response.json();
    if (!response.ok) throw new Error(value.error);
    sequence.current = value.sequence;
    serverOffset.current = new Date(value.serverTime).getTime() - Date.now();
    setRun(value);
    setAnswers(value.answers);
    latest.current = value.answers;
    return value as PublicRun;
  }, [run.id]);
  const save = useCallback(
    (submit = false) => {
      const snapshot = { ...latest.current };
      dirty.current = false;
      chain.current = chain.current
        .then(async () => {
          const response = await fetch("/api/exams/" + run.id, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sequence: ++sequence.current,
              answers: snapshot,
              submit,
            }),
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.error);
          sequence.current = result.sequence;
          setSaved(result.savedAt);
          if (result.state !== "active") await reload();
        })
        .catch((e) => {
          dirty.current = true;
          setError((e as Error).message);
        });
      return chain.current;
    },
    [run.id, reload],
  );
  useEffect(() => {
    if (closed) return;
    const timer = setInterval(() => {
      const left = Math.max(
        0,
        Math.ceil(
          (new Date(run.deadline).getTime() -
            (Date.now() + serverOffset.current)) /
            1000,
        ),
      );
      setSeconds(left);
      if (left === 0) void reload().catch((e) => setError(e.message));
    }, 1000);
    return () => clearInterval(timer);
  }, [run.id, run.deadline, closed, reload]);
  useEffect(() => {
    if (closed || !dirty.current) return;
    const timer = setTimeout(() => void save(), 700);
    return () => clearTimeout(timer);
  }, [answers, closed, save]);
  useEffect(() => {
    const prevent = (e: BeforeUnloadEvent) => {
      if (dirty.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", prevent);
    return () => window.removeEventListener("beforeunload", prevent);
  }, []);
  const change = (value: string) => {
    dirty.current = true;
    latest.current = { ...latest.current, [task.id]: value };
    setAnswers(latest.current);
  };
  const result = run.results as {
    correct: number;
    possible: number;
    explanation: string;
    reading?: number | null;
    listening?: number | null;
    writing?: number | null;
    speaking?: number | null;
    total?: number | null;
    feedback?: Record<
      string,
      {
        summary?: string;
        criteria?: {
          index: number;
          rating: number;
          explanation: string;
          evidence?: string;
        }[];
      }
    >;
  } | null;
  return (
    <>
      <Link className="inline-link" href="/exam">
        {" "}
        <UiText>{"← Exam lab"}</UiText>{" "}
      </Link>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            {run.mockId} ·{" "}
            {run.mode === "practice"
              ? "SECTION PRACTICE"
              : "PAPER-REFERENCE REHEARSAL"}
          </span>
          <h1 style={{ marginTop: 12 }}>{run.title}</h1>
          <p className="muted">
            {" "}
            <UiText>{"Original, unofficial practice ·"}</UiText>{" "}
            {run.definition.blocks[run.block].title}
          </p>
        </div>
        <span className="badge neutral" role="timer">
          {closed
            ? run.state === "between_blocks"
              ? "Block closed"
              : "Submitted"
            : Math.floor(seconds / 60) +
              ":" +
              String(seconds % 60).padStart(2, "0")}
        </span>
      </div>
      {run.state === "between_blocks" && (
        <section className="card" style={{ marginBottom: 24 }}>
          <h2>
            <UiText>{"Block saved"}</UiText>
          </h2>
          <p>
            Your previous responses are locked. The next block starts its own
            server timer when you continue.
          </p>
          <button
            className="button"
            onClick={async () => {
              try {
                const r = await fetch("/api/exams/" + run.id + "/advance", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ block: run.block }),
                });
                if (!r.ok) throw new Error((await r.json()).error);
                await reload();
                setStep(0);
              } catch (e) {
                setError((e as Error).message);
              }
            }}
          >
            {" "}
            <UiText>{"Begin next block"}</UiText>{" "}
          </button>
        </section>
      )}
      {run.state === "submitted" && (
        <section className="card" style={{ marginBottom: 24 }}>
          <h2>
            <UiText>{"Saved practice evidence"}</UiText>
          </h2>
          <p>
            {result?.correct ?? 0} <UiText>{"of"}</UiText>{" "}
            {result?.possible ?? 0}{" "}
            <UiText>{"objective items correct."}</UiText>{" "}
          </p>
          <p className="muted">{result?.explanation}</p>
          <div className="chips">
            {(["reading", "listening", "writing", "speaking"] as const).map(
              (skill) => (
                <span className="badge neutral" key={skill}>
                  {skill}: {result?.[skill] ?? "unassessed"}
                  {result?.[skill] != null ? " / 60" : ""}
                </span>
              ),
            )}
          </div>
          <span className="badge neutral">
            <UiText>{"Overall readiness incomplete"}</UiText>
          </span>
          <ExamAi examId={run.id} evaluate onComplete={() => void reload()} />
          {result?.feedback &&
            Object.entries(result.feedback)
              .filter(
                ([, value]) =>
                  value && typeof value === "object" && !Array.isArray(value),
              )
              .map(([name, value]) => (
                <details className="disclosure" key={name}>
                  <summary>{name} · AI coaching evidence</summary>
                  <p>{value.summary}</p>
                  {value.criteria?.map((c) => (
                    <p className="small" key={c.index}>
                      <strong>
                        {" "}
                        <UiText>{"Criterion"}</UiText> {c.index + 1} ·{" "}
                        {c.rating}/3
                      </strong>{" "}
                      {c.explanation} {c.evidence && "— " + c.evidence}
                    </p>
                  ))}
                </details>
              ))}
        </section>
      )}
      {run.block === 1 && run.mode !== "practice" && !closed && (
        <ExamTimeline examId={run.id} />
      )}
      <section className="card">
        <div className="row">
          <span className="eyebrow">
            {task.section} · {step + 1}/{run.tasks.length}
          </span>
          <span className="small muted">
            {closed ? (
              <UiText>{"Review"}</UiText>
            ) : answers[task.id] ? (
              "Draft saved or saving"
            ) : (
              "Not answered"
            )}
          </span>
        </div>
        <h2 style={{ marginTop: 20 }}>{task.title}</h2>
        {task.stimulus && (
          <div
            className="example"
            lang="de"
            style={{ whiteSpace: "pre-line", lineHeight: 1.85 }}
          >
            {task.stimulus}
          </div>
        )}
        {task.audioId && run.mode === "practice" && (
          <div className="example">
            <p className="small">
              Original synthetic recording · replay is allowed in section
              practice.
            </p>
            <audio
              controls
              src={"/api/exams/" + run.id + "/audio/" + task.audioId}
              aria-label={task.title}
              style={{ width: "100%" }}
            />
          </div>
        )}
        <p lang="de" style={{ fontSize: 18, lineHeight: 1.7 }}>
          {task.prompt}
        </p>
        {task.kind === "speaking" ? (
          <>
            {answers[task.id]?.match(/\[Recording ([a-f0-9]{64})\]/)?.[1] && (
              <RecordingPlayer mediaId={answers[task.id].slice(11, -1)} />
            )}
            {!closed && (
              <AudioRecorder
                key={task.id + take}
                exerciseId={task.id}
                attemptKey={take}
                examId={run.id}
                onExamSaved={(r) => {
                  sequence.current = r.run.sequence;
                  setRun(r.run);
                  setAnswers(r.run.answers);
                  latest.current = r.run.answers;
                  dirty.current = false;
                  setSaved(r.run.updatedAt.toString());
                }}
              />
            )}
            <p className="small muted">
              Record your own response. For dialogue phases, alternate with the
              partner for at least two recorded turns. All turns remain in the
              saved performance. You can save up to six turns per task.
            </p>
            {!closed && (
              <>
                <ExamAi
                  key={task.id + (answers[task.id] || "")}
                  examId={run.id}
                  taskId={task.id}
                  recordingId={
                    answers[task.id]?.match(/\[Recording ([a-f0-9]{64})\]/)?.[1]
                  }
                />
                {answers[task.id] && (
                  <button
                    className="button secondary"
                    onClick={() => setTake(crypto.randomUUID())}
                  >
                    {" "}
                    <UiText>{"Record another turn"}</UiText>{" "}
                  </button>
                )}
              </>
            )}
          </>
        ) : task.options ? (
          <fieldset disabled={closed} style={{ border: 0, padding: 0 }}>
            <legend className="screen-reader">
              <UiText>{"Choose an answer"}</UiText>
            </legend>
            {task.options.map((option) => (
              <label
                className={
                  "option " + (answers[task.id] === option ? "selected" : "")
                }
                key={option}
              >
                <input
                  type="radio"
                  name={task.id}
                  value={option}
                  checked={answers[task.id] === option}
                  onChange={() => change(option)}
                />
                <span lang="de">{option}</span>
              </label>
            ))}
          </fieldset>
        ) : (
          <div className="field">
            <label htmlFor="exam-response">
              <UiText>{"Your response in German"}</UiText>
            </label>
            <textarea
              id="exam-response"
              value={answers[task.id] || ""}
              onChange={(e) => change(e.target.value)}
              maxLength={12000}
              disabled={closed}
              spellCheck={false}
              rows={12}
            />
            <span className="small muted">
              {
                (answers[task.id] || "").trim().split(/\s+/).filter(Boolean)
                  .length
              }{" "}
              <UiText>{"words · saved automatically"}</UiText>{" "}
            </span>
          </div>
        )}
        {closed && (
          <div className="feedback">
            <strong>
              {run.feedback?.find((f) => f.id === task.id)?.answer ||
                "Productive response retained for rubric review"}
            </strong>
            <p>{run.feedback?.find((f) => f.id === task.id)?.rationale}</p>
          </div>
        )}
        {error && (
          <p className="feedback error" role="alert">
            {error}
          </p>
        )}
        <div className="row section-space">
          <button
            className="button secondary"
            disabled={step === 0 || busy}
            onClick={async () => {
              setBusy(true);
              if (!closed) await save();
              setStep((s) => s - 1);
              setBusy(false);
            }}
          >
            {" "}
            <UiText>{"Previous"}</UiText>{" "}
          </button>
          <span className="small muted" role="status">
            {" "}
            <UiText>{"Saved at"}</UiText> {new Date(saved).toLocaleTimeString()}
          </span>
          <button
            className="button"
            disabled={step === run.tasks.length - 1 || busy}
            onClick={async () => {
              setBusy(true);
              if (!closed) await save();
              setStep((s) => s + 1);
              setBusy(false);
            }}
          >
            {" "}
            <UiText>{"Next"}</UiText>{" "}
          </button>
        </div>
        {!closed && (
          <details className="disclosure section-space">
            <summary>
              <UiText>{"Finish this section"}</UiText>
            </summary>
            <p className="small">
              Submitting closes the section and shows feedback. Unanswered
              objective items receive zero points. You can start a fresh
              practice attempt later.
            </p>
            <button
              className="button"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                await save(true);
                setBusy(false);
              }}
            >
              {" "}
              <UiText>{"Submit section"}</UiText>{" "}
            </button>
          </details>
        )}
      </section>
    </>
  );
}
