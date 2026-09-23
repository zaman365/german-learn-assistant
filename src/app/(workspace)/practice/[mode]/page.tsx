import { UiText } from "@/components/ui-language";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/auth/server";
import { dashboard, learnerLesson } from "@/learning/service";
import { vocabularyLessons } from "@/content/vocabulary-practice";
import { lessons } from "@/content/catalog";
import LessonViewer from "@/components/lesson-viewer";
export default async function FocusPractice({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  const user = await requireUser();
  const { mode } = await params;
  if (
    ![
      "review",
      "articles",
      "grammar",
      "writing",
      "speaking",
      "listening",
    ].includes(mode)
  )
    notFound();

  const d = await dashboard(user.id);
  const review =
    mode === "review"
      ? d.due.sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0]
      : undefined;
  if (mode === "review" && !review)
    return (
      <section className="card empty">
        <h1>
          <UiText>{"You’re up to date."}</UiText>
        </h1>
        <p>
          Your next reviews appear when they are due. You can keep learning at
          your own pace.
        </p>
        <Link href="/today" className="button">
          {" "}
          <UiText>{"Back to Today"}</UiText>{" "}
        </Link>
      </section>
    );
  const chosen =
    mode === "speaking"
      ? lessons.find((l) => l.exercises.some((e) => e.type === "speaking"))
      : mode === "listening"
        ? lessons.find(
            (l) =>
              d.catalog.some((c) => c.id === l.id && c.available) &&
              l.exercises.some((e) => e.type === "listening"),
          )
        : mode === "writing"
          ? lessons.find((l) => l.exercises.some((e) => e.type === "writing"))
          : review
            ? [...lessons, ...vocabularyLessons].find((l) =>
                l.exercises.some(
                  (e) =>
                    e.skill === review.targetId &&
                    (review.mode === "recognition"
                      ? e.type === "choice"
                      : e.type !== "choice"),
                ),
              )
            : lessons.find((l) =>
                l.skills.some((s) =>
                  (mode === "articles"
                    ? ["gender", "case", "noun-endings"]
                    : ["word-order", "prepositions", "adjective-endings"]
                  ).includes(s),
                ),
              );
  if (!chosen)
    return (
      <section className="card">
        <h2>
          {mode === "listening"
            ? "Listening recordings need to be prepared and reviewed."
            : "No matching practice is available."}
        </h2>
        <Link className="button" href="/today">
          {" "}
          <UiText>{"Back to Today"}</UiText>{" "}
        </Link>
      </section>
    );
  const initial = await learnerLesson(user.id, chosen.id);
  initial.lesson.exercises = initial.lesson.exercises.filter((e) =>
    mode === "speaking"
      ? e.type === "speaking"
      : mode === "listening"
        ? !!e.mediaId
        : mode === "writing"
          ? e.type === "writing"
          : review
            ? e.skill === review.targetId &&
              (review.mode === "recognition"
                ? e.type === "choice"
                : e.type !== "choice")
            : true,
  );
  if (initial.draft)
    initial.draft = {
      ...initial.draft,
      data: {
        response: "",
        exerciseId: initial.lesson.exercises[0].id,
        attemptKey: "",
        step: 0,
      },
    };
  return <LessonViewer initial={initial} onlyPractice reviewId={review?.id} />;
}
