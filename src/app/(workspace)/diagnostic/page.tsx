import { requireUser } from "@/auth/server";
import { learnerLesson } from "@/learning/service";
import LessonViewer from "@/components/lesson-viewer";
import Link from "next/link";
import { diagnostics } from "@/content/catalog";
import { AppError } from "@/learning/service";
export default async function Diagnostic({
  searchParams,
}: {
  searchParams: Promise<{ round?: string }>;
}) {
  const user = await requireUser(),
    { round } = await searchParams,
    id = diagnostics.some((d) => d.id === round) ? round! : "D1";
  let initial;
  try {
    initial = await learnerLesson(user.id, id);
  } catch (e) {
    if (!(e instanceof AppError)) throw e;
    return (
      <section className="card">
        <h1>{id} · Audio evidence comes next</h1>
        <p>{e.message}</p>
        <Link href="/diagnostic" className="button">
          Continue with an available round
        </Link>
      </section>
    );
  }
  return (
    <>
      <nav className="tabs" aria-label="Diagnostic rounds">
        {diagnostics.map((d) => (
          <Link
            href={"/diagnostic?round=" + d.id}
            className={id === d.id ? "selected" : ""}
            style={{ padding: "12px 14px" }}
            key={d.id}
          >
            {d.id} · {d.title}
          </Link>
        ))}
      </nav>
      <p className="small muted">
        Start learning after D1. The other rounds can be completed in separate
        sessions; missing evidence stays unassessed.
      </p>
      <LessonViewer key={id} initial={initial} />
    </>
  );
}
