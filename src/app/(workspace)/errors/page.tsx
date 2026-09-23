import ArticleProbe from "@/components/article-probe";
import { articleProbe } from "@/learning/repairs";
import { vocabulary } from "@/content/catalog";
import { UiText } from "@/components/ui-language";
import Link from "next/link";
import { requireUser } from "@/auth/server";
import { dashboard } from "@/learning/service";
import { CheckCircle2, ArrowRight } from "lucide-react";
export default async function Errors() {
  const user = await requireUser();
  const d = await dashboard(user.id);
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <UiText>{"YOUR CORRECTION NOTEBOOK"}</UiText>
          </span>
          <h1 style={{ marginTop: 12 }}>
            <UiText>{"Make the next attempt stronger."}</UiText>
          </h1>
          <p className="muted">
            {" "}
            <UiText>
              {
                "Understand the reason, repair the pattern, then try it in a new context."
              }
            </UiText>{" "}
          </p>
        </div>
      </div>
      {d.errors.length ? (
        <div className="stack">
          {d.errors.map((e) => {
            const probe = e.rootCause.includes("needs_probe")
              ? articleProbe(e.correction, vocabulary)
              : null;
            const retest = d.repairTargets[e.id];
            return (
              <article className="card" key={e.id}>
                <div className="card-header">
                  <h2>{e.skill.replaceAll("-", " ")}</h2>
                  <span className="badge amber">
                    {e.tag} · {e.count} occurrence{e.count > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid-two">
                  <div>
                    <span className="eyebrow">
                      <UiText>{"YOUR WORDING"}</UiText>
                    </span>
                    <p lang="de" style={{ marginTop: 8 }}>
                      {e.original}
                    </p>
                  </div>
                  <div>
                    <span className="eyebrow">
                      <UiText>{"CORRECTION"}</UiText>
                    </span>
                    <p lang="de" style={{ marginTop: 8, fontWeight: 600 }}>
                      {e.correction}
                    </p>
                  </div>
                </div>
                <p>{e.explanation}</p>
                <p className="badge neutral">
                  <UiText>{e.status}</UiText>
                </p>
                {e.resolutionEvidence.length > 0 && (
                  <p className="small">
                    {d.profile.language === "de"
                      ? "Neue Nachweise"
                      : "New evidence"}
                    : {e.resolutionEvidence.join(", ")}
                  </p>
                )}
                {probe && (
                  <ArticleProbe
                    patternId={e.id}
                    noun={probe.noun}
                    preposition={probe.preposition}
                  />
                )}
                {retest && e.status !== "resolved" && (
                  <Link className="button" href={`/learn/${retest.id}`}>
                    {d.profile.language === "de"
                      ? "Neuen Transfercheck starten"
                      : "Start a new transfer check"}
                  </Link>
                )}
                {e.rootCause === "needs_probe" && (
                  <p className="small muted">
                    The root cause needs a short check. Can you name the
                    dictionary article and the case required by this sentence?
                  </p>
                )}
                <Link
                  href={`/learn/${e.lessonId}`}
                  className="button secondary"
                >
                  {" "}
                  <UiText>{"Review and repair"}</UiText>{" "}
                  <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <section className="card empty">
          <CheckCircle2 size={32} />
          <h2>
            <UiText>{"No correction patterns yet."}</UiText>
          </h2>
          <p>
            As you practise, useful corrections will gather here with
            explanations and repair tasks.
          </p>
          <Link href="/practice" className="button">
            {" "}
            <UiText>{"Choose a practice"}</UiText>{" "}
          </Link>
        </section>
      )}
    </>
  );
}
