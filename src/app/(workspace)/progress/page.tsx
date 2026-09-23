import { UiText } from "@/components/ui-language";
import Link from "next/link";
import { requireUser } from "@/auth/server";
import { dashboard } from "@/learning/service";
export default async function Progress() {
  const user = await requireUser();
  const d = await dashboard(user.id);
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <UiText>{"YOUR LEARNING RECORD"}</UiText>
          </span>
          <h1 style={{ marginTop: 12 }}>
            <UiText>{"Progress you can point to."}</UiText>
          </h1>
          <p className="muted">
            {" "}
            <UiText>
              {
                "Course completion, demonstrated skill and exam readiness tell different stories."
              }
            </UiText>{" "}
          </p>
        </div>
        <Link href="/settings" className="button secondary">
          {" "}
          <UiText>{"Export progress"}</UiText>{" "}
        </Link>
      </div>
      <div className="metric-grid">
        <div className="card metric">
          <span className="stat-label">
            <UiText>{"Course completion"}</UiText>
          </span>
          <strong>
            {d.stats.completed} / {d.stats.total}
          </strong>
          <span className="small muted">
            <UiText>{"Published lessons completed"}</UiText>
          </span>
        </div>
        <div className="card metric">
          <span className="stat-label">
            <UiText>{"Demonstrated objectives"}</UiText>
          </span>
          <strong>
            {d.stats.demonstrated} / {d.skills.length}
          </strong>
          <span className="small muted">
            <UiText>{"Separate-day independent tasks"}</UiText>
          </span>
        </div>
        <div className="card metric">
          <span className="stat-label">
            <UiText>{"Exam readiness"}</UiText>
          </span>
          <strong style={{ fontSize: "1.35rem" }}>
            <UiText>{"Not assessed"}</UiText>
          </strong>
          <span className="small muted">
            {" "}
            <UiText>{"Full valid mock evidence is still needed"}</UiText>{" "}
          </span>
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="stack">
          <section className="card">
            <h2>
              <UiText>{"Stage checkpoints"}</UiText>
            </h2>
            <p lang="en" className="small muted">
              These coaching targets guide the next stage. Missing sound or
              feedback remains unassessed. Suitable C1 work and early exam
              practice remain available; a completed checkpoint is not delayed
              retention or certification.
            </p>
            {d.checkpoints.map((c) => (
              <div className="activity" key={c.lessonId + c.kind}>
                <div className="grow">
                  <h3>
                    <Link href={"/learn/" + c.lessonId}>
                      {c.stage === "bridge" ? "B2 → C1" : "C1 → DTB"} ·{" "}
                      <UiText>{c.label}</UiText>
                    </Link>
                  </h3>
                  <p className="small muted">
                    {c.correct}/{c.total} · <UiText>{"Target"}</UiText>:{" "}
                    {c.minimum} · {c.assessed}/{c.total}{" "}
                    <UiText>{"assessed"}</UiText>
                  </p>
                </div>
                <span className="badge neutral">
                  <UiText>
                    {d.catalog.find((l) => l.id === c.lessonId)
                      ?.audioUnavailable
                      ? "Audio preparation needed"
                      : c.state}
                  </UiText>
                </span>
              </div>
            ))}
          </section>
          <section className="card">
            <h2>
              <UiText>{"Your past seven days"}</UiText>
            </h2>
            <p>
              {d.weekly.attempts} <UiText>{"saved attempts across"}</UiText>{" "}
              {d.weekly.activeDays} <UiText>{"study days."}</UiText>{" "}
            </p>
            <p className="small muted">
              {d.weekly.unassessedSkills.length
                ? "Still missing assessed practice: " +
                  d.weekly.unassessedSkills.join(", ") +
                  ". Your plan makes room for available tasks in these skills."
                : "All four main skills have assessed practice this week."}
            </p>
            <p className="small muted">
              {d.completedTasks.length} session segments saved today. Finishing
              a segment does not by itself establish mastery.
            </p>
          </section>
          <section className="card">
            <h2>
              <UiText>{"Skill evidence"}</UiText>
            </h2>
            <p className="small muted">
              Retained means a successful later transfer check, at least seven
              days after independent demonstration.
            </p>
            {d.skills.map((s) => (
              <div key={s.id} className="activity">
                <div className="grow">
                  <h3 style={{ textTransform: "capitalize" }}>
                    <UiText>{s.id}</UiText>
                  </h3>
                  <p className="small muted">
                    {s.evidenceCount} <UiText>{"assessed attempts"}</UiText>{" "}
                    {s.demonstratedAt
                      ? ` · demonstrated ${s.demonstratedAt}`
                      : ""}
                  </p>
                </div>
                <span
                  className={`badge ${s.state === "not_assessed" ? "neutral" : s.needsRepair ? "amber" : ""}`}
                >
                  <UiText>{s.needsRepair ? "Needs repair" : s.state}</UiText>
                </span>
              </div>
            ))}
          </section>
          <section className="card">
            <h2>
              <UiText>{"Recent work"}</UiText>
            </h2>
            {!d.history.length ? (
              <p className="muted">
                <UiText>{"Your first attempt will appear here."}</UiText>
              </p>
            ) : (
              d.history
                .slice(-12)
                .reverse()
                .map((h) => (
                  <div className="activity" key={h.attempt.id}>
                    <div className="grow">
                      <h3>
                        <Link
                          href={"/feedback/" + h.attempt.id}
                          className="inline-link"
                        >
                          {h.attempt.skill.replaceAll("-", " ")}
                        </Link>
                      </h3>
                      <p className="small muted">
                        {h.attempt.localDate} · {h.attempt.lessonId} ·{" "}
                        {h.attempt.assisted ? "assisted" : "unaided"}
                      </p>
                      <p
                        lang="de"
                        className="small"
                        style={{ overflowWrap: "anywhere" }}
                      >
                        {h.attempt.response.slice(0, 140)}
                      </p>
                    </div>
                    <span className="badge neutral">
                      {h.evaluation.status !== "completed"
                        ? "Awaiting feedback"
                        : h.evaluation.data.correct
                          ? "Correct"
                          : "Repair"}
                    </span>
                  </div>
                ))
            )}
          </section>
        </div>
        <aside className="stack">
          <section className="card">
            <h2>
              <UiText>{"Coming up for review"}</UiText>
            </h2>
            {d.reviews.length ? (
              d.reviews.map((r) => (
                <div className="activity" key={r.id}>
                  <div>
                    <h3>{r.targetId.replaceAll("-", " ")}</h3>
                    <p className="small muted">
                      <UiText>{r.mode}</UiText> · {r.dueDate}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="muted small">
                Reviews are scheduled after practice. Reading an explanation
                alone does not create a successful retrieval.
              </p>
            )}
          </section>
          <section className="card">
            <h2>
              <UiText>{"Your bridge placement"}</UiText>
            </h2>
            {d.routes.length ? (
              d.routes.map((r) => (
                <details className="disclosure" key={r.moduleId}>
                  <summary className="small">
                    {r.moduleId} · <UiText>{r.route}</UiText>
                  </summary>
                  <p className="small muted" style={{ marginTop: 10 }}>
                    {r.rationale}
                  </p>
                </details>
              ))
            ) : (
              <p className="small muted">
                {" "}
                <UiText>
                  {
                    "Complete a diagnostic segment to start building your route."
                  }
                </UiText>{" "}
              </p>
            )}
          </section>
        </aside>
      </div>
    </>
  );
}
