"use client";
import { UiText } from "@/components/ui-language";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  Lightbulb,
  RotateCcw,
} from "lucide-react";
import type { learnerLesson, submitAttempt } from "@/learning/service";
import type { Lesson, LexicalEntry } from "@/content/types";
import { api } from "@/lib/api";
import AiFeedback from "./ai-feedback";
import AudioRecorder from "./audio-recorder";
import CourseAudio from "./course-audio";
type Initial = Awaited<ReturnType<typeof learnerLesson>>;
type Result = Awaited<ReturnType<typeof submitAttempt>>;
export function LessonBlock({ block }: { block: Lesson["blocks"][number] }) {
  if (block.type === "text")
    return (
      <section lang="en" className="prose">
        {block.title && <h2>{block.title}</h2>}
        <p>{block.body}</p>
      </section>
    );
  if (block.type === "example")
    return (
      <div className="example">
        <p lang="de" style={{ fontSize: "1.12rem", fontWeight: 550 }}>
          {block.german}
        </p>
        <p lang="en" className="muted small" style={{ marginTop: 8 }}>
          {block.english}
        </p>
        {block.note && (
          <p className="small" style={{ marginTop: 12 }}>
            {block.note}
          </p>
        )}
      </div>
    );
  if (block.type === "reading")
    return (
      <section
        className="card"
        style={{ background: "#fafbf9", margin: "22px 0" }}
      >
        <span className="eyebrow">
          <UiText>{"WORKPLACE TEXT"}</UiText>
        </span>
        <h3 style={{ marginTop: 10 }}>{block.title}</h3>
        <p
          lang="de"
          style={{ lineHeight: 1.9, marginBottom: 0, whiteSpace: "pre-line" }}
        >
          {block.body}
        </p>
      </section>
    );
  if (block.type === "table")
    return (
      <section style={{ margin: "24px 0" }}>
        <h3>{block.title}</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th scope="col" key={h}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  if (block.type === "diagram")
    return (
      <figure
        style={{
          margin: "24px 0",
          padding: 20,
          background: "#f1f6f2",
          borderRadius: 10,
        }}
      >
        <figcaption
          className="small"
          style={{ fontWeight: 650, marginBottom: 16 }}
        >
          {block.title}
        </figcaption>
        <ol
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
            gap: 12,
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {block.steps.map((s, i) => (
            <li
              key={s.label}
              style={{
                padding: 14,
                background: "white",
                borderRadius: 8,
                border: "1px solid #dce7df",
              }}
            >
              <div className="eyebrow" style={{ fontSize: 12 }}>
                {i + 1}. {s.label}
              </div>
              <div lang="en" style={{ marginTop: 8, fontSize: 14 }}>
                {s.detail}
              </div>
            </li>
          ))}
        </ol>
      </figure>
    );
  return <CourseAudio id={block.mediaId} title={block.title} />;
}
export default function LessonViewer({
  initial,
  words = [],
  onlyPractice = false,
  reviewId,
}: {
  initial: Initial;
  words?: LexicalEntry[];
  onlyPractice?: boolean;
  reviewId?: string;
}) {
  const { lesson } = initial;
  const initialAnswered = new Set(
    initial.history.map((h) => h.attempt.exerciseId),
  );
  const initialStep =
    initial.draft?.data.step ??
    Math.max(
      0,
      lesson.exercises.findIndex((e) => !initialAnswered.has(e.id)),
    );
  const [step, setStep] = useState(
    Math.min(initialStep, lesson.exercises.length - 1),
  );
  const [response, setResponse] = useState(initial.draft?.data.response || "");
  const [attemptKey, setAttemptKey] = useState(
    initial.draft?.data.attemptKey || "",
  );
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [help, setHelp] = useState("");
  const [saved, setSaved] = useState(
    initial.draft?.updatedAt
      ? new Date(initial.draft.updatedAt).toISOString()
      : "",
  );
  const [saving, setSaving] = useState(false);
  const [answered, setAnswered] = useState(initialAnswered);
  const [practice, setPractice] = useState(
    onlyPractice || /^D[1-5]$/.test(lesson.id),
  );
  const [finished, setFinished] = useState(false);
  const sequence = useRef(initial.draftSequence);
  const exercise = lesson.exercises[step];
  const practiceRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!attemptKey) setAttemptKey(crypto.randomUUID());
  }, [attemptKey]);
  useEffect(() => {
    if (!attemptKey || feedback || finished) return;
    setSaving(true);
    const id = setTimeout(() => {
      const seq = ++sequence.current;
      api<{ savedAt: string }>("draft", {
        lessonId: lesson.id,
        exerciseId: exercise.id,
        response,
        attemptKey,
        sequence: seq,
        version: lesson.version,
        step,
      })
        .then((r) => setSaved(r.savedAt))
        .catch((e) => setError(e.message))
        .finally(() => setSaving(false));
    }, 650);
    return () => clearTimeout(id);
  }, [
    response,
    attemptKey,
    exercise.id,
    lesson.id,
    lesson.version,
    step,
    feedback,
    finished,
  ]);
  const next = () => {
    setFeedback(null);
    setResponse("");
    setHelp("");
    setError("");
    setAttemptKey(crypto.randomUUID());
    if (step + 1 < lesson.exercises.length) setStep(step + 1);
    else setFinished(true);
  };
  const submit = async () => {
    setBusy(true);
    setError("");
    try {
      const r = await api<Result>("attempt", {
        lessonId: lesson.id,
        exerciseId: exercise.id,
        version: lesson.version,
        response,
        attemptKey,
        reviewId,
      });
      setFeedback(r);
      setAnswered((s) => new Set([...s, exercise.id]));
      setSaved(new Date().toISOString());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const showHelp = async (kind: "hint" | "solution" | "transcript") => {
    setBusy(true);
    try {
      const r = await api<{ text: string }>("reveal", {
        lessonId: lesson.id,
        exerciseId: exercise.id,
        version: lesson.version,
        attemptKey,
        kind,
      });
      setHelp(r.text);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <Link
        href="/course"
        className="inline-link row"
        style={{ display: "inline-flex", gap: 7, marginBottom: 22 }}
      >
        <ArrowLeft size={15} /> <UiText>{"Back to course"}</UiText>{" "}
      </Link>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            {/^D[1-5]$/.test(lesson.id)
              ? "YOUR STARTING POINT"
              : `${lesson.moduleId} · ${lesson.stage.toUpperCase()}`}
          </span>
          <h1 style={{ marginTop: 12, marginBottom: 8 }}>{lesson.title}</h1>
          <p className="muted" lang="de">
            {lesson.subtitle}
          </p>
        </div>
        <span className="badge neutral">
          <Clock3 size={14} />
          {lesson.minutes} min
        </span>
      </div>
      <div className="lesson-grid">
        <article className="card lesson-main">
          {!onlyPractice && !/^D[1-5]$/.test(lesson.id) && (
            <div className="tabs">
              <button
                onClick={() => setPractice(false)}
                className={!practice ? "selected" : ""}
              >
                {" "}
                <UiText>{"Learn"}</UiText>{" "}
              </button>
              <button
                onClick={() => setPractice(true)}
                className={practice ? "selected" : ""}
              >
                {" "}
                <UiText>{"Practise ·"}</UiText> {answered.size}/
                {lesson.exercises.length}
              </button>
            </div>
          )}
          {!practice && (
            <>
              <div className="example">
                <h3>
                  <UiText>{"By the end, you can…"}</UiText>
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {lesson.objectives.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
              {lesson.blocks.map((block, i) => (
                <LessonBlock key={i} block={block} />
              ))}
              <button
                className="button"
                onClick={() => {
                  setPractice(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {" "}
                <UiText>{"Put it into practice"}</UiText>{" "}
                <ArrowRight size={17} />
              </button>
            </>
          )}
          {practice && !finished && (
            <div ref={practiceRef}>
              {/^D[1-5]$/.test(lesson.id) && step === 0 && (
                <p className="muted">
                  Take your time. Your answers help choose the right lessons;
                  this does not assign you a CEFR level.
                </p>
              )}
              <div className="row">
                <span className="eyebrow">
                  {" "}
                  <UiText>{"QUESTION"}</UiText> {step + 1}{" "}
                  <UiText>{"OF"}</UiText> {lesson.exercises.length}
                </span>
                <span className="badge neutral">
                  {exercise.exit
                    ? "Exit check"
                    : exercise.type === "writing"
                      ? "Your own words"
                      : "Practice"}
                </span>
              </div>
              <div className="progress-track" style={{ margin: "15px 0 26px" }}>
                <div
                  className="progress-fill"
                  style={{
                    width: `${(step / lesson.exercises.length) * 100}%`,
                  }}
                />
              </div>
              {exercise.mediaId && (
                <CourseAudio
                  id={exercise.mediaId}
                  title="Listen to the workplace recording"
                />
              )}
              {exercise.stimulus && (
                <div className="example" lang="de">
                  {exercise.stimulus}
                </div>
              )}
              <h2 style={{ fontSize: "1.3rem", lineHeight: 1.6 }}>
                {exercise.prompt}
              </h2>
              {exercise.type === "speaking" ? (
                <AudioRecorder
                  key={exercise.id + attemptKey}
                  lessonId={lesson.id}
                  exerciseId={exercise.id}
                  attemptKey={attemptKey}
                  onSaved={(r) => {
                    setFeedback(r);
                    setAnswered((s) => new Set([...s, exercise.id]));
                    setSaved(new Date().toISOString());
                  }}
                />
              ) : exercise.options ? (
                <div role="radiogroup" aria-label="Your answer">
                  {exercise.options.map((option, i) => (
                    <label
                      key={option}
                      className={`option ${response === option ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name={exercise.id}
                        value={option}
                        checked={response === option}
                        onChange={() => setResponse(option)}
                        disabled={!!feedback || busy}
                      />
                      <span className="badge neutral">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span lang="de">{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="field">
                  <label htmlFor="answer">
                    <UiText>{"Your answer"}</UiText>
                  </label>
                  {exercise.type === "writing" ? (
                    <textarea
                      id="answer"
                      lang="de"
                      autoComplete="off"
                      spellCheck={false}
                      value={response}
                      disabled={!!feedback}
                      onChange={(e) => setResponse(e.target.value)}
                      maxLength={12000}
                    />
                  ) : (
                    <input
                      id="answer"
                      lang="de"
                      autoComplete="off"
                      spellCheck={false}
                      value={response}
                      disabled={!!feedback}
                      onChange={(e) => setResponse(e.target.value)}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          response &&
                          !busy &&
                          !feedback
                        ) {
                          e.preventDefault();
                          void submit();
                        }
                      }}
                      maxLength={1000}
                    />
                  )}
                </div>
              )}
              {exercise.rubric && (
                <details className="disclosure">
                  <summary className="small">
                    <UiText>{"What this task checks"}</UiText>
                  </summary>
                  <ul>
                    {exercise.rubric.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </details>
              )}
              {help && (
                <div className="example" style={{ whiteSpace: "pre-line" }}>
                  <span className="eyebrow">
                    <UiText>{"ASSISTED PRACTICE"}</UiText>
                  </span>
                  <p style={{ marginTop: 8 }}>{help}</p>
                </div>
              )}
              {error && (
                <p role="alert" className="feedback error">
                  {error}
                </p>
              )}
              {feedback && (
                <div
                  role="status"
                  className={`feedback ${feedback.evaluation.data.correct === false ? "incorrect" : ""}`}
                >
                  <strong>
                    {feedback.evaluation.status === "pending"
                      ? "Saved for feedback"
                      : feedback.evaluation.data.correct
                        ? "That’s right."
                        : "A useful correction."}
                  </strong>
                  {feedback.evaluation.data.correction && (
                    <p lang="de" style={{ fontWeight: 600, margin: "10px 0" }}>
                      {feedback.evaluation.data.correction}
                    </p>
                  )}
                  <p className="small" style={{ margin: "8px 0" }}>
                    {feedback.evaluation.data.explanation}
                  </p>
                  {feedback.attempt.assisted && (
                    <span className="badge neutral">
                      {" "}
                      <UiText>
                        {"Assisted · does not establish independent mastery"}
                      </UiText>{" "}
                    </span>
                  )}
                  {feedback.evaluation.status === "pending" && (
                    <p className="small muted">
                      Your text is saved. Rubric feedback needs the configured
                      AI service; no passing score has been invented.
                    </p>
                  )}
                </div>
              )}
              <div className="row section-space" style={{ flexWrap: "wrap" }}>
                {!feedback ? (
                  <>
                    {exercise.type !== "speaking" && (
                      <button
                        className="button"
                        onClick={submit}
                        disabled={busy || !response.trim() || !attemptKey}
                      >
                        {busy ? "Saving…" : "Check my answer"}
                        <ArrowRight size={16} />
                      </button>
                    )}
                    <button
                      className="button ghost"
                      onClick={() => showHelp("hint")}
                      disabled={busy}
                    >
                      <Lightbulb size={16} />
                      <UiText>{"A hint"}</UiText>{" "}
                    </button>
                  </>
                ) : (
                  <>
                    <button className="button" onClick={next}>
                      {step + 1 === lesson.exercises.length
                        ? "Finish this session"
                        : "Next question"}
                      <ArrowRight size={16} />
                    </button>
                    {!feedback.evaluation.data.correct &&
                      feedback.evaluation.status !== "pending" && (
                        <button
                          className="button ghost"
                          onClick={() => {
                            setFeedback(null);
                            setResponse("");
                            setAttemptKey(crypto.randomUUID());
                            setHelp(
                              "Repair this answer. You have seen the correction, so use a new task later to demonstrate independent transfer.",
                            );
                          }}
                        >
                          <RotateCcw size={15} />{" "}
                          <UiText>{"Try a repair"}</UiText>{" "}
                        </button>
                      )}
                  </>
                )}
              </div>
              {!feedback && (
                <button
                  className="button ghost small"
                  style={{ marginTop: 12 }}
                  onClick={() => showHelp("solution")}
                  disabled={busy}
                >
                  {" "}
                  <UiText>{"Show the explained solution"}</UiText>{" "}
                </button>
              )}
              <p className="status-note" role="status">
                {saving
                  ? "Saving your draft…"
                  : saved
                    ? `Saved at ${new Date(saved).toLocaleTimeString()}`
                    : "Your answer will save as you work."}
              </p>
            </div>
          )}
          {feedback && exercise.mediaId && (
            <button
              className="button secondary"
              onClick={() => showHelp("transcript")}
            >
              {" "}
              <UiText>{"Open transcript · assisted study"}</UiText>{" "}
            </button>
          )}
          {feedback && exercise.rubric && (
            <AiFeedback
              key={feedback.attempt.id}
              attemptId={feedback.attempt.id}
              mode={exercise.type === "speaking" ? "audio" : "evaluate"}
            />
          )}
          {!practice && (
            <AiFeedback
              lessonId={lesson.id}
              exerciseId={exercise.id}
              attemptKey={attemptKey}
              mode="explain"
            />
          )}
          {finished && (
            <div>
              <span className="badge">
                <Check size={14} /> <UiText>{"Session saved"}</UiText>{" "}
              </span>
              <h2 className="serif" style={{ fontSize: "2rem", marginTop: 20 }}>
                {" "}
                <UiText>{"One useful step forward."}</UiText>{" "}
              </h2>
              <p>{lesson.reflection}</p>
              <p className="muted">
                Your attempts, corrections and due reviews are saved. Completion
                and mastery depend on the exit checks and later independent
                evidence.
              </p>
              <div
                className="row"
                style={{ justifyContent: "flex-start", flexWrap: "wrap" }}
              >
                <Link href="/today" className="button">
                  {" "}
                  <UiText>{"See my next step"}</UiText> <ArrowRight size={16} />
                </Link>
                <Link href="/progress" className="button secondary">
                  {" "}
                  <UiText>{"View progress"}</UiText>{" "}
                </Link>
              </div>
            </div>
          )}
        </article>
        <aside className="stack">
          <section className="card">
            <div className="card-header">
              <h3>
                <UiText>{"Lesson companion"}</UiText>
              </h3>
              <BookOpen size={18} />
            </div>
            <p className="small muted">
              {" "}
              <UiText>
                {"Every explanation you need stays within reach."}
              </UiText>{" "}
            </p>
            {lesson.references.map((id) => (
              <Link
                key={id}
                href={`/reference/${id === "plurals" ? "noun-endings" : id}`}
                className="activity"
                style={{ padding: "12px 0", fontSize: 14 }}
              >
                {id.replaceAll("-", " ")}
                <ArrowRight size={15} style={{ marginLeft: "auto" }} />
              </Link>
            ))}
            {!lesson.references.length && (
              <p className="small muted">
                Try the diagnostic independently first. You can revisit the
                reference library afterwards.
              </p>
            )}
          </section>
          {words.length > 0 && (
            <section className="card">
              <h3>
                <UiText>{"Words in this lesson"}</UiText>
              </h3>
              {words.map((w) => (
                <details className="disclosure" key={w.id}>
                  <summary lang="de">
                    {w.article && <span className="muted">{w.article} </span>}
                    {w.word}
                  </summary>
                  <div className="small">
                    <p style={{ marginTop: 10 }}>
                      {w.meaning}
                      {w.plural && ` · Plural: ${w.plural}`}
                    </p>
                    <p lang="de">{w.phrase}</p>
                    <p className="muted">{w.example}</p>
                  </div>
                </details>
              ))}
            </section>
          )}
        </aside>
      </div>
    </>
  );
}
