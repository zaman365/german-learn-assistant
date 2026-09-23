import type { Lesson } from "@/content/types";
import type { attempts, evaluations } from "@/db/schema";
type Evidence = {
  attempt: typeof attempts.$inferSelect;
  evaluation: typeof evaluations.$inferSelect | null;
};
export const checkpointComponents = [
  {
    stage: "bridge",
    label: "Mixed grammar",
    lessonId: "B2-12-L02",
    kind: "objective",
    minimum: 16,
  },
  {
    stage: "bridge",
    label: "Customer email",
    lessonId: "B2-12-L02",
    kind: "productive",
    minimum: 1,
  },
  {
    stage: "bridge",
    label: "Reading",
    lessonId: "B2-12-L03",
    kind: "objective",
    minimum: 7,
  },
  {
    stage: "bridge",
    label: "Listening",
    lessonId: "B2-12-L04",
    kind: "objective",
    minimum: 7,
  },
  {
    stage: "bridge",
    label: "Speaking with follow-ups",
    lessonId: "B2-12-L05",
    kind: "productive",
    minimum: 1,
  },
  {
    stage: "c1",
    label: "Written position and revision",
    lessonId: "C1-18-L02",
    kind: "productive",
    minimum: 1,
  },
  {
    stage: "c1",
    label: "Reading",
    lessonId: "C1-18-L03",
    kind: "objective",
    minimum: 6,
  },
  {
    stage: "c1",
    label: "Listening",
    lessonId: "C1-18-L04",
    kind: "objective",
    minimum: 6,
  },
  {
    stage: "c1",
    label: "Speaking with follow-ups",
    lessonId: "C1-18-L05",
    kind: "productive",
    minimum: 1,
  },
] as const;
export function checkpointProfile(history: Evidence[], lessons: Lesson[]) {
  return checkpointComponents.map((component) => {
    const lesson = lessons.find((l) => l.id === component.lessonId)!;
    const exercises = lesson.exercises.filter((e) =>
      component.kind === "objective"
        ? !!e.accepted?.length
        : !!e.rubric?.length,
    );
    // The first attempt is the assessment. Later feedback revisions can assess
    // that response, but practising the same item cannot replace unseen evidence.
    const evidence = exercises.map((e) =>
      history.find(
        (h) =>
          h.attempt.lessonId === lesson.id &&
          h.attempt.contentVersion === lesson.version &&
          h.attempt.exerciseId === e.id,
      ),
    );
    const assessed = evidence.filter(
      (h) =>
        h &&
        !h.attempt.assisted &&
        h.evaluation?.status === "completed" &&
        h.evaluation.data.correct !== null,
    );
    const correct = assessed.filter(
      (h) => h!.evaluation!.data.correct === true,
    ).length;
    return {
      ...component,
      total: exercises.length,
      assessed: assessed.length,
      correct,
      evidenceIds: assessed.map((h) => h!.attempt.id),
      state:
        assessed.length < exercises.length
          ? "Not assessed"
          : correct >= component.minimum
            ? "Target met"
            : "Needs repair",
    };
  });
}
