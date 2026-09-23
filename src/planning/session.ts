import type { PlanTask } from "./planner";
type AttemptEvidence = {
  id: string;
  lessonId: string;
  skill: string;
  createdAt: Date;
  assisted: boolean;
  assessed: boolean;
};
// A completed session segment means work was saved, not that a skill was mastered.
export function reconcileSession(
  tasks: PlanTask[],
  evidence: AttemptEvidence[],
  assignedAt: Date,
  now: Date,
): PlanTask[] {
  return tasks.map((task) => {
    if (task.completedAt) return task;
    const start = new Date(task.assignedAt || assignedAt.toISOString());
    const candidates = evidence.filter(
      (attempt) => attempt.createdAt >= start && attempt.createdAt <= now,
    );
    const lessonId = task.href.startsWith("/learn/")
      ? task.href.slice(7).split("?")[0]
      : null;
    let relevant: AttemptEvidence[] = [];
    let needed = 1;
    if (task.kind === "review") {
      relevant = candidates.filter(
        (attempt) =>
          !attempt.assisted &&
          attempt.assessed &&
          task.targetSkills.includes(attempt.skill),
      );
      needed = Math.max(1, Math.ceil(task.estimatedMinutes / 2));
    } else if (task.kind === "diagnostic") {
      relevant = candidates.filter((attempt) =>
        /^D[1-5]$/.test(attempt.lessonId),
      );
    } else if (lessonId) {
      relevant = candidates.filter((attempt) => attempt.lessonId === lessonId);
      if (task.reasonCode === "weekly_evidence_gap")
        relevant = relevant.filter(
          (attempt) =>
            !attempt.assisted &&
            attempt.assessed &&
            task.targetSkills.includes(attempt.skill),
        );
    }
    return {
      ...task,
      assignedAt: start.toISOString(),
      ...(relevant.length >= needed
        ? {
            completedAt: now.toISOString(),
            evidenceIds: relevant.slice(0, needed).map((attempt) => attempt.id),
          }
        : {}),
    };
  });
}
