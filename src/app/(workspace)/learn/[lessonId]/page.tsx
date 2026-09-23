import { requireUser } from "@/auth/server";
import { learnerLesson } from "@/learning/service";
import { vocabulary } from "@/content/catalog";
import LessonViewer from "@/components/lesson-viewer";
export default async function Learn({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const user = await requireUser();
  const { lessonId } = await params;
  const initial = await learnerLesson(user.id, lessonId);
  return (
    <LessonViewer
      initial={initial}
      words={vocabulary.filter((w) => initial.lesson.vocabulary.includes(w.id))}
    />
  );
}
