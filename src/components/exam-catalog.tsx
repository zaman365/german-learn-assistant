"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { examCatalog } from "@/exams/service";
const labels = [
  "Reading + customer reply",
  "Listening + phone note",
  "Language elements + statement",
  "Speaking tasks",
];
export default function ExamCatalog({
  initial,
}: {
  initial: Awaited<ReturnType<typeof examCatalog>>;
}) {
  const router = useRouter(),
    [busy, setBusy] = useState(""),
    [error, setError] = useState("");
  async function start(mockId: string, block: number, full = false) {
    setBusy(mockId + "-" + block);
    setError("");
    try {
      const response = await fetch("/api/exams/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          mockId,
          block,
          mode: full ? "timed_reference" : "practice",
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      router.push("/exam/" + data.id);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy("");
    }
  }
  return (
    <>
      <section className="card">
        <h2>Your exam format matters</h2>
        <p>
          The paper reference has shared blocks of 65 minutes for reading and
          the customer reply, 25 minutes for listening and the phone note, and
          45 minutes for language elements and the statement. Speaking takes
          about 16 minutes in a pair.
        </p>
        <p className="small muted">
          telc announces digital DTB from 1 May 2027. Applicable digital rules
          and exact pass-boundary wording remain verification gates. These
          original activities give practice evidence, without an official
          pass/fail prediction.
        </p>
        <a
          className="inline-link"
          href={initial.definition.sources.transition.url}
          target="_blank"
          rel="noreferrer"
        >
          Official format update
        </a>
      </section>
      <div className="grid-two section-space">
        {initial.mocks.map((mock) => (
          <section className="card" key={mock.id}>
            <span className="badge neutral">
              {mock.reserved
                ? "Reserved for later"
                : mock.attempted
                  ? "Previously opened"
                  : "Original · not yet opened"}
            </span>
            <h2 style={{ marginTop: 16 }}>{mock.title}</h2>
            <p className="muted" lang="de">
              {mock.description}
            </p>
            {mock.reserved ? (
              <p className="small">
                This set stays out of ordinary practice and tutor context.
                Complete paper-reference rehearsals open when reviewed audio and
                all spoken partner models are configured.
              </p>
            ) : (
              <div className="stack">
                {labels.map((label, block) => (
                  <button
                    className="button secondary"
                    disabled={!!busy || (block === 1 && !mock.audioReady)}
                    key={label}
                    onClick={() => start(mock.id, block)}
                  >
                    {busy === mock.id + "-" + block ? "Opening…" : label}
                    {block === 1 && !mock.audioReady ? " · audio pending" : ""}
                  </button>
                ))}
              </div>
            )}
            <button
              className="button section-space"
              disabled={!!busy || !mock.fullReady}
              onClick={() => start(mock.id, 0, true)}
            >
              {mock.fullReady
                ? "Start complete paper-reference rehearsal"
                : "Full rehearsal · audio/provider setup required"}
            </button>
            <p className="small muted">
              Unofficial, AI-authored material awaiting independent review.
              Section practice uses a saved server timer and can be revisited as
              a new, exposed attempt.
            </p>
          </section>
        ))}
      </div>
      {error && (
        <p role="alert" className="feedback error">
          {error}
        </p>
      )}
      <section className="card section-space">
        <h2>Your exam practice history</h2>
        {initial.history.length ? (
          initial.history.map((run) => (
            <Link href={"/exam/" + run.id} className="module-row" key={run.id}>
              <div>
                <strong>
                  {initial.mocks.find((m) => m.id === run.mockId)?.title}
                </strong>
                <p className="small muted">
                  {labels[run.block]} · {run.state} ·{" "}
                  {new Date(run.startedAt).toLocaleDateString()}
                </p>
              </div>
              <span className="badge neutral">Open</span>
            </Link>
          ))
        ) : (
          <p className="muted">
            Your saved attempts will appear here. No exam readiness has been
            inferred.
          </p>
        )}
      </section>
    </>
  );
}
