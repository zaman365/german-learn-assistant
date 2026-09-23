import { describe, expect, it } from "vitest";
import {
  repairState,
  articleProbe,
  type RepairCheck,
} from "@/learning/repairs";
import { mastery } from "@/learning/policies";
import { skillEvidence } from "@/learning/evidence";
import { lessons, vocabulary } from "@/content/catalog";
import { createPlan } from "@/planning/planner";
import { checkpointProfile } from "@/learning/checkpoints";
const pattern = {
  skill: "case",
  tag: "CASE",
  rootCause: "task_target",
  updatedAt: new Date("2026-09-01T12:00:00Z"),
};
const check = (
  id: string,
  date: string,
  extra: Partial<RepairCheck> = {},
): RepairCheck => ({
  id,
  date,
  family: id,
  correct: true,
  transfer: true,
  assisted: false,
  modality: "production",
  createdAt: new Date(date + "T12:00:00Z"),
  skill: "case",
  tag: "CASE",
  ...extra,
});
describe("evidence-backed repair", () => {
  it("requires new independent checks from separate families and local days", () => {
    const a = check("a", "2026-09-02"),
      b = check("b", "2026-09-03");
    expect(repairState(pattern, [a, b])).toEqual({
      status: "resolved",
      resolutionEvidence: ["a", "b"],
    });
    for (const invalid of [
      { assisted: true },
      { modality: "recognition" },
      { transfer: false },
      { family: "a" },
      { date: a.date },
      { tag: "GEN" },
      { skill: "writing" },
      { createdAt: pattern.updatedAt },
    ]) {
      expect(repairState(pattern, [a, { ...b, ...invalid }]).status).not.toBe(
        "resolved",
      );
    }
    expect(repairState(pattern, [a, a]).status).not.toBe("resolved");
  });
  it("does not resolve an ambiguous cause or hide a new failure behind old successes", () => {
    const evidence = [check("a", "2026-09-02"), check("b", "2026-09-03")];
    expect(
      repairState({ ...pattern, rootCause: "needs_probe" }, evidence).status,
    ).toBe("needs_probe");
    expect(
      repairState(pattern, [
        ...evidence,
        check("c", "2026-09-04", { correct: false }),
      ]).status,
    ).toBe("open");
  });
  it("only constructs probes from unambiguous known lexical senses and government", () => {
    expect(articleProbe("mit dem Vertrag", vocabulary)).toMatchObject({
      article: "der",
      grammaticalCase: "dative",
    });
    expect(articleProbe("in dem Vertrag", vocabulary)).toBeNull();
    expect(articleProbe("mit dem Unbekanntwort", vocabulary)).toBeNull();
    expect(articleProbe("mit der Leiter", vocabulary)).toBeNull();
    expect(
      articleProbe(
        "Wir sprechen mit dem Vertrag und mit der Firma.",
        vocabulary,
      ),
    ).toBeNull();
  });
  it("keeps checkpoint modalities and assisted repeats separate", () => {
    const lesson = lessons.find((l) => l.id === "B2-12-L02")!;
    const rows = lesson.exercises
      .filter((e) => e.accepted?.length)
      .map((e, i) => ({
        attempt: {
          id: String(i),
          lessonId: lesson.id,
          contentVersion: lesson.version,
          exerciseId: e.id,
          assisted: false,
        },
        evaluation: { status: "completed", data: { correct: i < 16 } },
      })) as Parameters<typeof checkpointProfile>[0];
    let profile = checkpointProfile(rows, lessons);
    expect(profile[0]).toMatchObject({
      state: "Target met",
      correct: 16,
      total: 20,
    });
    expect(profile.slice(1).every((c) => c.state === "Not assessed")).toBe(
      true,
    );
    rows[0].attempt.assisted = true;
    rows.push({
      ...rows[0],
      attempt: { ...rows[0].attempt, id: "repeat", assisted: false },
    });
    profile = checkpointProfile(rows, lessons);
    expect(profile[0]).toMatchObject({ state: "Not assessed", assessed: 19 });
  });
  it("requires fresh demonstration and a fresh delayed check after recurring failures", () => {
    const evidence = [
      check("a", "2026-09-01"),
      check("b", "2026-09-02"),
      check("c", "2026-09-09"),
      check("d", "2026-09-10", { correct: false }),
      check("e", "2026-09-11", { correct: false }),
    ];
    evidence.push(check("f", "2026-09-12"));
    expect(mastery(evidence).state).toBe("practising");
    evidence.push(check("g", "2026-09-13"));
    expect(mastery(evidence)).toMatchObject({
      state: "independently_demonstrated",
      demonstratedAt: "2026-09-13",
    });
    evidence.push(check("h", "2026-09-20"));
    expect(mastery(evidence).state).toBe("retained");
  });
  it("does not turn writing in a multi-skill lesson into evidence for every teaching tag", () => {
    const lesson = lessons.find(
      (l) =>
        l.skills.length > 1 &&
        l.exercises.some((e) => e.type === "writing" && e.rubric?.length),
    )!;
    const exercise = lesson.exercises.find(
      (e) => e.type === "writing" && e.rubric?.length,
    )!;
    const row = {
      attempt: {
        id: "a",
        lessonId: lesson.id,
        contentVersion: lesson.version,
        exerciseId: exercise.id,
        skill: exercise.skill,
        transfer: true,
        assisted: false,
        family: exercise.family,
        localDate: "2026-09-23",
        modality: "production",
      },
      evaluation: { status: "completed", data: { correct: true } },
    } as Parameters<typeof skillEvidence>[0][number];
    expect(skillEvidence([row], exercise.skill, [lesson])).toHaveLength(1);
    expect(
      skillEvidence([row], lesson.skills.find((s) => s !== exercise.skill)!, [
        lesson,
      ]),
    ).toEqual([]);
  });
  it("does not schedule the same lesson as resume, weekly balance and new work", () => {
    const lesson = {
      id: "a",
      version: 2,
      title: "A",
      skills: ["reading"],
      minutes: 20,
    };
    const plan = createPlan({
      minutes: 60,
      diagnosticDone: true,
      dueCount: 100,
      repairs: [],
      resumeLesson: lesson,
      nextLesson: lesson,
      neglected: {
        skill: "reading",
        href: "/learn/a",
        title: "Read",
        version: 2,
      },
    });
    expect(plan.filter((t) => t.href === "/learn/a")).toHaveLength(1);
    expect(
      plan.find((t) => t.kind === "review")!.estimatedMinutes,
    ).toBeLessThanOrEqual(15);
  });
});
