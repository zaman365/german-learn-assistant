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
          <span className="eyebrow">YOUR CORRECTION NOTEBOOK</span>
          <h1 style={{ marginTop: 12 }}>Make the next attempt stronger.</h1>
          <p className="muted">
            Understand the reason, repair the pattern, then try it in a new
            context.
          </p>
        </div>
      </div>
      {d.errors.length ? (
        <div className="stack">
          {d.errors.map((e) => (
            <article className="card" key={e.id}>
              <div className="card-header">
                <h2>{e.skill.replaceAll("-", " ")}</h2>
                <span className="badge amber">
                  {e.tag} · {e.count} occurrence{e.count > 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid-two">
                <div>
                  <span className="eyebrow">YOUR WORDING</span>
                  <p lang="de" style={{ marginTop: 8 }}>
                    {e.original}
                  </p>
                </div>
                <div>
                  <span className="eyebrow">CORRECTION</span>
                  <p lang="de" style={{ marginTop: 8, fontWeight: 600 }}>
                    {e.correction}
                  </p>
                </div>
              </div>
              <p>{e.explanation}</p>
              {e.rootCause === "needs_probe" && (
                <p className="small muted">
                  The root cause needs a short check. Can you name the
                  dictionary article and the case required by this sentence?
                </p>
              )}
              <Link href={`/learn/${e.lessonId}`} className="button secondary">
                Review and repair
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <section className="card empty">
          <CheckCircle2 size={32} />
          <h2>No correction patterns yet.</h2>
          <p>
            As you practise, useful corrections will gather here with
            explanations and repair tasks.
          </p>
          <Link href="/practice" className="button">
            Choose a practice
          </Link>
        </section>
      )}
    </>
  );
}
