import { describe, it, expect } from "vitest";
import {
  localDate,
  addDays,
  mastery,
  scheduleReview,
  placementRoute,
  type Evidence,
} from "@/learning/policies";
import { grade } from "@/assessment/grade";
import { exerciseSchema, publicLesson } from "@/content/types";
import { lessons } from "@/content/catalog";
import { createPlan } from "@/planning/planner";
const evidence = (
  id: string,
  date: string,
  family = id,
  extra: Partial<Evidence> = {},
): Evidence => ({
  id,
  date,
  family,
  correct: true,
  assisted: false,
  transfer: true,
  modality: "production",
  ...extra,
});
describe("evidence boundaries", () => {
  it("does not mistake repetition, hints, recognition or same-day checks for mastery", () => {
    for (const entries of [
      [evidence("a", "2026-01-01"), evidence("b", "2026-01-01")],
      [evidence("a", "2026-01-01", "x"), evidence("b", "2026-01-02", "x")],
      [
        evidence("a", "2026-01-01"),
        evidence("b", "2026-01-02", "b", { assisted: true }),
      ],
      [
        evidence("a", "2026-01-01"),
        evidence("b", "2026-01-02", "b", { modality: "recognition" }),
      ],
    ])
      expect(mastery(entries).state).toBe("practising");
  });
  it("requires delayed transfer and demotes recurring independent failures", () => {
    const history = [evidence("a", "2026-01-01"), evidence("b", "2026-01-02")];
    expect(mastery(history).state).toBe("independently_demonstrated");
    expect(mastery([...history, evidence("c", "2026-01-08")]).state).toBe(
      "independently_demonstrated",
    );
    history.push(evidence("c", "2026-01-09"));
    expect(mastery(history).state).toBe("retained");
    history.push(
      evidence("d", "2026-01-10", "d", { correct: false }),
      evidence("e", "2026-01-11", "e", { correct: false }),
    );
    expect(mastery(history)).toMatchObject({
      state: "practising",
      needsRepair: true,
    });
  });
  it("keeps missing evidence distinct from a measured error", () => {
    expect(mastery([]).state).toBe("not_assessed");
    expect(mastery([], true).state).toBe("introduced");
  });
  it("does not waive a module on recognition alone", () =>
    expect(
      placementRoute(
        ["a", "b"].map((id) => ({
          id,
          correct: true,
          productive: false,
          assisted: false,
        })),
      ).route,
    ).toBe("repair"));
});
describe("calendar reviews", () => {
  it("handles Berlin midnight and daylight-saving days", () => {
    expect(localDate(new Date("2026-03-28T23:30:00Z"), "Europe/Berlin")).toBe(
      "2026-03-29",
    );
    expect(addDays("2026-03-28", 1)).toBe("2026-03-29");
    expect(addDays("2026-10-24", 1)).toBe("2026-10-25");
  });
  it("starts tomorrow; same-day practice cannot skip an interval", () => {
    const first = scheduleReview(
      undefined,
      { correct: true, assisted: false },
      "2026-01-01",
    );
    expect(first.dueDate).toBe("2026-01-02");
    expect(
      scheduleReview(first, { correct: true, assisted: false }, "2026-01-01"),
    ).toEqual(first);
    expect(
      scheduleReview(first, { correct: true, assisted: false }, "2026-01-02"),
    ).toMatchObject({ step: 1, dueDate: "2026-01-05" });
  });
  it("resets a failure and gives no interval credit for a hint", () => {
    const current = { step: 3, dueDate: "2026-01-09", lastDate: "2025-12-26" };
    expect(
      scheduleReview(
        current,
        { correct: false, assisted: false },
        "2026-01-09",
      ),
    ).toMatchObject({ step: 0, dueDate: "2026-01-10" });
    expect(
      scheduleReview(current, { correct: true, assisted: true }, "2026-01-09")
        .step,
    ).toBe(3);
  });
});
describe("grading and planning", () => {
  it("never folds umlauts or capitalisation silently", () => {
    const ex = exerciseSchema.parse({
      id: "x",
      type: "short",
      prompt: "Complete this German noun.",
      accepted: ["Maße"],
      explanation: "The measurements use ß.",
      hint: "Check the vowel.",
      skill: "spelling",
      family: "x",
    });
    expect(grade(ex, "Masse").correct).toBe(false);
    expect(grade(ex, "maße").correct).toBe(false);
    expect(grade(ex, "Maße").correct).toBe(true);
  });
  it("keeps a productive response unscored without an evaluator", () => {
    const ex = lessons
      .flatMap((l) => l.exercises)
      .find((e) => e.type === "writing")!;
    expect(grade(ex, "Das ist meine Antwort.")).toMatchObject({
      correct: null,
      score: null,
    });
  });
  it("does not leak answer keys into learner content", () => {
    for (const lesson of lessons)
      for (const exercise of publicLesson(lesson).exercises) {
        expect(exercise).not.toHaveProperty("accepted");
        expect(exercise).not.toHaveProperty("hint");
        expect(exercise).not.toHaveProperty("explanation");
      }
  });
  it("keeps every plan within its budget", () => {
    for (const minutes of [10, 20, 30, 60, 90]) {
      const plan = createPlan({
        minutes,
        diagnosticDone: true,
        dueCount: 100,
        repairs: [],
        nextLesson: {
          id: "a",
          version: 1,
          title: "A lesson",
          minutes: 25,
          skills: ["grammar"],
        },
        resumeLesson: undefined,
      });
      expect(
        plan.reduce((n, t) => n + t.estimatedMinutes, 0),
      ).toBeLessThanOrEqual(minutes);
      expect(plan.every((t) => t.estimatedMinutes > 0)).toBe(true);
    }
  });
});
