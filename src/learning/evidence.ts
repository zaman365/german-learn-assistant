import type { attempts, evaluations } from "@/db/schema";
import type { Lesson } from "@/content/types";
type Row = {
  attempt: typeof attempts.$inferSelect;
  evaluation: typeof evaluations.$inferSelect | null;
};
export function latestEvaluations<T extends Row>(rows: T[]): T[] {
  const superseded = new Set(
    rows.map((r) => r.evaluation?.supersedesId).filter(Boolean),
  );
  const selected = new Map<string, T>();
  for (const row of rows) {
    if (row.evaluation && superseded.has(row.evaluation.id)) continue;
    const previous = selected.get(row.attempt.id);
    if (
      !previous ||
      new Date(row.evaluation?.createdAt || 0) >=
        new Date(previous.evaluation?.createdAt || 0)
    )
      selected.set(row.attempt.id, row);
  }
  return [...selected.values()].sort(
    (a, b) =>
      new Date(a.attempt.createdAt).getTime() -
      new Date(b.attempt.createdAt).getTime(),
  );
}
export function skillEvidence(rows: Row[], skill: string, lessons: Lesson[]) {
  return rows.flatMap((row) => {
    const a = row.attempt,
      e = row.evaluation;
    if (!e || e.status !== "completed" || e.data.correct === null) return [];
    const lesson = lessons.find(
        (l) => l.id === a.lessonId && l.version === a.contentVersion,
      ),
      exercise = lesson?.exercises.find((x) => x.id === a.exerciseId);
    const rubricTransfer = !!exercise?.rubric?.length && a.transfer;
    // A lesson's teaching tags are not assessment claims. A writing task in a
    // listening lesson, for example, cannot establish listening competence.
    const relevant = a.skill === skill;
    if (!relevant) return [];
    // A single gap is useful practice, not sufficient evidence for a broad objective.
    return [
      {
        id: a.id,
        family: a.family,
        date: a.localDate,
        correct: e.data.correct,
        assisted: a.assisted,
        transfer: rubricTransfer,
        modality: a.modality,
      },
    ];
  });
}
