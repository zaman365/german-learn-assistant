import { UiText } from "@/components/ui-language";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  RotateCcw,
  Sparkles,
  Target,
  ChartNoAxesCombined,
} from "lucide-react";
import { requireUser } from "@/auth/server";
import { dashboard } from "@/learning/service";
import TimeBudget from "@/components/time-budget";
import { translate, planText } from "@/i18n";
export default async function Today() {
  const user = await requireUser();
  const d = await dashboard(user.id);
  const t = (s: string) => translate(s, d.profile.language);
  if (!d.profile.onboardingComplete) redirect("/onboarding");
  const main =
    d.tasks.find((t) => !t.completedAt && t.kind !== "reflection") ||
    d.tasks.find((t) => !t.completedAt);
  const stage =
    d.catalog.find((lesson) => main?.href === "/learn/" + lesson.id)?.stage ||
    "bridge";
  const stageNames: Record<string, string> = {
    bridge: "B2 → C1 bridge",
    c1: "Professional C1",
    exam: "DTB C1 preparation",
    c2: "Toward C2",
    article: "Article toolkit",
    pronunciation: "Pronunciation",
  };
  const routeIndex = Math.max(0, ["bridge", "c1", "exam", "c2"].indexOf(stage));
  const mainText = main ? planText(main, d.profile.language, d.catalog) : null;
  const date = new Date(`${d.today}T12:00:00Z`).toLocaleDateString(
    d.profile.language === "de" ? "de-DE" : "en-GB",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
    },
  );
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">{date}</div>
          <h1 style={{ marginTop: 12, marginBottom: 0 }}>
            {" "}
            <UiText>{"A little closer,"}</UiText> {d.profile.name.split(" ")[0]}
            .
          </h1>
          <p className="muted">
            {t(
              d.diagnosticDone
                ? "Your next steps, shaped by what you’ve practised."
                : "Let’s find the right place to begin.",
            )}
          </p>
        </div>
        <TimeBudget profile={d.profile} />
      </div>
      <div className="metric-grid">
        <div className="card metric">
          <div className="stat-label">
            <BookOpen size={17} /> <UiText>{"Lessons completed"}</UiText>{" "}
          </div>
          <strong>
            {d.stats.completed}
            <span className="muted" style={{ fontSize: "1rem" }}>
              {" "}
              / {d.stats.total}
            </span>
          </strong>
          <span className="small muted">
            <UiText>{"Published course lessons"}</UiText>
          </span>
        </div>
        <div className="card metric">
          <div className="stat-label">
            <RotateCcw size={17} /> <UiText>{"Reviews due"}</UiText>{" "}
          </div>
          <strong>{d.due.length}</strong>
          <span className="small muted">
            {" "}
            <UiText>{"A little retrieval goes a long way"}</UiText>{" "}
          </span>
        </div>
        <div className="card metric">
          <div className="stat-label">
            <Target size={17} />{" "}
            <UiText>{"Demonstrated objectives"}</UiText>{" "}
          </div>
          <strong>{d.stats.demonstrated}</strong>
          <span className="small muted">
            <UiText>{"Based on independent evidence"}</UiText>
          </span>
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="stack">
          <section className="card focus-card">
            <div className="row">
              <span className="eyebrow">
                <UiText>{"YOUR NEXT BEST STEP"}</UiText>
              </span>
              <Sparkles size={19} color="#c2d9cb" />
            </div>
            <h2 className="serif">
              {mainText?.title || t("Explore your learning record")}
            </h2>
            <p>
              {mainText?.reason ||
                t(
                  "Your completed work is saved. Review your progress and choose your next practice.",
                )}
            </p>
            <div className="focus-meta">
              <span className="row" style={{ gap: 6 }}>
                <Clock3 size={15} />
                {main?.estimatedMinutes || 5} min
              </span>
              <span>{t(stageNames[stage])}</span>
            </div>
            <Link className="button light" href={main?.href || "/progress"}>
              {" "}
              {t(
                main?.kind !== "diagnostic"
                  ? "Continue learning"
                  : "Start the short diagnostic",
              )}
              <ArrowRight size={17} />
            </Link>
          </section>
          <section className="card">
            <div className="card-header">
              <h2>
                <UiText>{"Your session"}</UiText>
              </h2>
              <span className="badge neutral">
                {d.tasks
                  .filter((t) => !t.completedAt)
                  .reduce((sum, t) => sum + t.estimatedMinutes, 0)}{" "}
                <UiText>{"min remaining"}</UiText>{" "}
              </span>
            </div>
            {d.tasks.map((task, i) => (
              <Link
                className="activity"
                style={{ textDecoration: "none" }}
                key={task.activityId}
                href={task.href}
              >
                <span className="activity-icon">
                  {task.completedAt ? (
                    <Check size={20} />
                  ) : task.kind === "review" ? (
                    <RotateCcw size={20} />
                  ) : task.kind === "reflection" ? (
                    <Check size={20} />
                  ) : (
                    <BookOpen size={20} />
                  )}
                </span>
                <div className="grow">
                  <h3>
                    {i + 1}.{" "}
                    {planText(task, d.profile.language, d.catalog).title}
                    {task.completedAt ? " · " + t("done") : ""}
                  </h3>
                  <p className="small muted">
                    {planText(task, d.profile.language, d.catalog).reason}
                  </p>
                </div>
                <span className="small muted" style={{ whiteSpace: "nowrap" }}>
                  {task.estimatedMinutes} min
                </span>
              </Link>
            ))}
          </section>
          <section className="card">
            <div className="card-header">
              <h2>
                <UiText>{"Make it your own"}</UiText>
              </h2>
              <Link href="/practice" className="inline-link">
                {" "}
                <UiText>{"All practice →"}</UiText>{" "}
              </Link>
            </div>
            <div className="grid-two">
              <Link href="/practice/articles" className="row">
                <div>
                  <h3>
                    <UiText>{"Article drill"}</UiText>
                  </h3>
                  <p className="small muted" style={{ margin: 0 }}>
                    {" "}
                    <UiText>
                      {"Gender, case, then the whole phrase."}
                    </UiText>{" "}
                  </p>
                </div>
                <ArrowRight size={18} />
              </Link>
              <Link href="/errors" className="row">
                <div>
                  <h3>
                    <UiText>{"Practise my mistakes"}</UiText>
                  </h3>
                  <p className="small muted" style={{ margin: 0 }}>
                    {" "}
                    <UiText>
                      {"Turn a correction into a useful habit."}
                    </UiText>{" "}
                  </p>
                </div>
                <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </div>
        <aside className="stack">
          <section className="card">
            <div className="card-header">
              <h2>
                <UiText>{"Your route"}</UiText>
              </h2>
              <span className="badge">{t(stageNames[stage])}</span>
            </div>
            <div className="journey">
              {[
                {
                  title: "A comfortable C1 starting point",
                  text: "B2 foundations, where you need them",
                },
                {
                  title: "German for professional life",
                  text: "18 C1 modules",
                },
                {
                  title: "DTB C1 preparation",
                  text: "Format, practice and mock exams",
                },
                {
                  title: "Toward C2",
                  text: "Nuance, precision and flexibility",
                },
              ].map((s, i) => (
                <div
                  className={`journey-item ${i === routeIndex ? "current" : ""}`}
                  key={s.title}
                >
                  <span className="journey-dot">{i + 1}</span>
                  <div>
                    <h3>{t(s.title)}</h3>
                    <p>{t(s.text)}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/course"
              className="inline-link"
              style={{ display: "block", marginTop: 22 }}
            >
              {" "}
              <UiText>{"View your course map →"}</UiText>{" "}
            </Link>
          </section>
          <section className="card">
            <span className="eyebrow">
              <UiText>{"A SMALL DISTINCTION"}</UiText>
            </span>
            <h2 style={{ marginTop: 12 }}>
              <UiText>{"Gender stays. Case changes."}</UiText>
            </h2>
            <div className="article-demo">
              <div className="article-tile">
                <b>der</b>
                <span>Vertrag</span>
              </div>
              <div className="article-tile fem">
                <b>die</b>
                <span>Firma</span>
              </div>
              <div className="article-tile neut">
                <b>das</b>
                <span>Angebot</span>
              </div>
            </div>
            <p lang="en" className="small muted">
              <span lang="de">Die Firma → mit der Firma.</span> Still feminine.
              The article changes because <i>mit</i> takes dative.
            </p>
            <Link href="/reference/gender" className="inline-link">
              {" "}
              <UiText>{"Open the article toolkit →"}</UiText>{" "}
            </Link>
          </section>
          <Link
            href="/progress"
            className="card row"
            style={{ textDecoration: "none" }}
          >
            <ChartNoAxesCombined size={24} />
            <div className="grow">
              <h3 style={{ margin: 0 }}>
                <UiText>{"Your evidence, clearly"}</UiText>
              </h3>
              <p className="small muted" style={{ margin: 0 }}>
                {d.stats.attempts} <UiText>{"saved attempts ·"}</UiText>{" "}
                {d.stats.retained} <UiText>{"retained objectives"}</UiText>{" "}
              </p>
            </div>
            <ArrowRight size={17} />
          </Link>
        </aside>
      </div>
    </>
  );
}
