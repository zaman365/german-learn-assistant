export type PlanTask = {
  activityId: string;
  contentVersion: number;
  kind: "review" | "repair" | "lesson" | "diagnostic" | "reflection";
  title: string;
  reasonCode: string;
  reasonText: string;
  estimatedMinutes: number;
  targetSkills: string[];
  completionCriterion: string;
  href: string;
  assignedAt?: string;
  completedAt?: string;
  evidenceIds?: string[];
};
export type PlanInput = {
  minutes: number;
  diagnosticDone: boolean;
  dueCount: number;
  dueTargets?: string[];
  repairs: { lessonId: string; title: string; skills: string[] }[];
  nextLesson: {
    id: string;
    version: number;
    title: string;
    minutes: number;
    skills: string[];
  } | null;
  resumeLesson?: {
    id: string;
    version: number;
    title: string;
    skills: string[];
  };
  neglected?: { skill: string; href: string; title: string };
};
export function createPlan(input: PlanInput): PlanTask[] {
  const tasks: PlanTask[] = [];
  let remaining = input.minutes;
  const add = (task: PlanTask) => {
    if (task.estimatedMinutes > 0 && task.estimatedMinutes <= remaining) {
      tasks.push(task);
      remaining -= task.estimatedMinutes;
    }
  };
  if (input.resumeLesson) {
    const l = input.resumeLesson;
    add({
      activityId: l.id,
      contentVersion: l.version,
      kind: "lesson",
      title: `Continue: ${l.title}`,
      reasonCode: "resume",
      reasonText: "Finish the useful work you already started.",
      estimatedMinutes: Math.min(15, remaining - 3),
      targetSkills: l.skills,
      completionCriterion:
        "Complete the next lesson segment and save an attempt.",
      href: `/learn/${l.id}`,
    });
  }
  if (input.dueCount > 0) {
    const minutes = Math.min(
      Math.floor(input.minutes * 0.25),
      input.dueCount * 2,
      remaining - 3,
    );
    if (minutes >= 2)
      add({
        activityId: "due-reviews",
        contentVersion: 1,
        kind: "review",
        title: "Retrieve what you learned",
        reasonCode: "review_due",
        reasonText: `${input.dueCount} targets are due. This session uses a manageable review block.`,
        estimatedMinutes: minutes,
        targetSkills: input.dueTargets || [],
        completionCriterion: "Attempt the selected due items without a hint.",
        href: "/practice/review",
      });
  }
  if (!input.diagnosticDone && !input.resumeLesson)
    add({
      activityId: "D1",
      contentVersion: 1,
      kind: "diagnostic",
      title: "Find your starting point",
      reasonCode: "evidence_gap",
      reasonText: "A short diagnostic helps choose useful bridge work.",
      estimatedMinutes: Math.min(17, remaining - 3),
      targetSkills: ["grammar"],
      completionCriterion: "Save the next diagnostic segment.",
      href: "/diagnostic",
    });
  else if (input.repairs.length && remaining >= 10) {
    const repair = [...input.repairs].sort((a, b) =>
      a.lessonId.localeCompare(b.lessonId),
    )[0];
    add({
      activityId: `repair-${repair.lessonId}`,
      contentVersion: 1,
      kind: "repair",
      title: repair.title,
      reasonCode: "recurring_error",
      reasonText:
        "Recent errors show this foundation needs another independent attempt.",
      estimatedMinutes: Math.min(12, remaining - 3),
      targetSkills: repair.skills,
      completionCriterion: "Repair the target and attempt a new check.",
      href: `/learn/${repair.lessonId}`,
    });
  }
  if (input.neglected && input.diagnosticDone && remaining >= 13) {
    const n = input.neglected;
    add({
      activityId: "weekly-" + n.skill,
      contentVersion: 1,
      kind: "lesson",
      title: n.title,
      reasonCode: "weekly_evidence_gap",
      reasonText:
        "This skill has no independent assessed evidence in the past seven days. Give it a short, focused session.",
      estimatedMinutes: Math.min(12, remaining - 3),
      targetSkills: [n.skill],
      completionCriterion:
        "Save an unaided response in this skill and review its feedback.",
      href: n.href,
    });
  }
  if (
    input.nextLesson &&
    !tasks.some((t) => t.activityId === input.nextLesson?.id) &&
    remaining >= 13 &&
    input.diagnosticDone
  ) {
    const l = input.nextLesson;
    const minutes = Math.min(l.minutes, remaining - 3);
    add({
      activityId: l.id,
      contentVersion: l.version,
      kind: "lesson",
      title: l.title,
      reasonCode: "next_prerequisite_ready",
      reasonText:
        minutes < l.minutes
          ? "Work through one useful segment; your place is saved."
          : "This is the next available lesson in your route.",
      estimatedMinutes: minutes,
      targetSkills: l.skills,
      completionCriterion:
        "Study the explanation and complete the next practice block.",
      href: `/learn/${l.id}`,
    });
  }
  if (remaining >= 3)
    add({
      activityId: "reflection",
      contentVersion: 1,
      kind: "reflection",
      title: "Review your next step",
      reasonCode: "session_close",
      reasonText: "Look at the evidence gained and the next review dates.",
      estimatedMinutes: 3,
      targetSkills: [],
      completionCriterion: "Review your saved progress and next actions.",
      href: "/progress",
    });
  return tasks;
}
