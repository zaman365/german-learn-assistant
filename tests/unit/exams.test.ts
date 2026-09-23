import { describe, it, expect } from "vitest";
import { mocks } from "../../content/exams";
import {
  writingHalfPoints,
  speakingHalfPoints,
  readiness,
} from "@/exams/definition";
import { publicTask } from "@/exams/types";
import { objectiveResult } from "@/exams/service";
describe("paper-reference exam invariants", () => {
  it("authors three distinct complete task maps with all integrated score destinations", () => {
    expect(mocks).toHaveLength(3);
    const texts = new Set<string>();
    for (const mock of mocks) {
      expect(mock.tasks).toHaveLength(60);
      expect(
        mock.tasks.filter((t) => t.answer && t.skill === "reading"),
      ).toHaveLength(20);
      expect(
        mock.tasks.filter((t) => t.answer && t.skill === "listening"),
      ).toHaveLength(20);
      expect(
        mock.tasks.filter((t) => t.answer && t.skill === "writing"),
      ).toHaveLength(12);
      expect(mock.tasks.filter((t) => t.kind === "writing")).toHaveLength(3);
      expect(mock.tasks.filter((t) => t.kind === "speaking")).toHaveLength(5);
      expect(mock.audio).toHaveLength(14);
      for (const task of mock.tasks) {
        if (task.answer) expect(task.options).toContain(task.answer);
        expect(publicTask(task)).not.toHaveProperty("answer");
        expect(publicTask(task)).not.toHaveProperty("rationale");
      }
      const first = mock.tasks[0].stimulus!;
      expect(texts.has(first)).toBe(false);
      texts.add(first);
    }
    expect(mocks[2].reserved).toBe(true);
  });
  it("rates shared writing criteria once and computes exact half-points", () => {
    expect(
      writingHalfPoints(
        {
          email: "B",
          statement: "B",
          organization: "middle_c1",
          accuracy: "middle_c1",
          range: "middle_c1",
          note: {
            names: true,
            contact: true,
            information: true,
            action: true,
          },
        },
        12,
      ) / 2,
    ).toBe(48.5);
    expect(
      writingHalfPoints(
        {
          email: "A",
          statement: "A",
          organization: "upper_c1",
          accuracy: "upper_c1",
          range: "upper_c1",
          note: {
            names: true,
            contact: true,
            information: true,
            action: true,
          },
        },
        12,
      ) / 2,
    ).toBe(60);
    expect(
      speakingHalfPoints({
        topic: "B",
        followup: "B",
        mediation: "B",
        conversation: "B",
        problem: "B",
        pronunciation: "middle_c1",
        accuracy: "middle_c1",
        range: "middle_c1",
      }) / 2,
    ).toBe(44.5);
  });
  it("does not invent partial credit within the four-point information aspect", () => {
    const base = {
      email: "D",
      statement: "D",
      organization: "below_b2",
      accuracy: "below_b2",
      range: "below_b2",
      note: { names: false, contact: false, information: false, action: false },
    } as const;
    expect(writingHalfPoints(base, 0)).toBe(0);
    expect(
      writingHalfPoints(
        { ...base, note: { ...base.note, information: true } },
        0,
      ),
    ).toBe(8);
  });
  it("does not manufacture writing, speaking, or readiness from objective answers", () => {
    const mock = mocks[0],
      answers = Object.fromEntries(
        mock.tasks.filter((t) => t.answer).map((t) => [t.id, t.answer!]),
      );
    expect(objectiveResult(mock, answers)).toMatchObject({
      reading: 60,
      listening: 60,
      languageElements: 6,
      writing: null,
      speaking: null,
      total: null,
    });
    expect(
      readiness([
        {
          mockId: "1",
          complete: true,
          unseen: true,
          valid: true,
          skills: [50, 50, 50, 50],
        },
        {
          mockId: "1",
          complete: true,
          unseen: true,
          valid: true,
          skills: [50, 50, 50, 50],
        },
      ]).projectTargetMet,
    ).toBe(false);
    expect(
      readiness([
        {
          mockId: "1",
          complete: true,
          unseen: true,
          valid: true,
          skills: [50, 50, 50, 50],
        },
        {
          mockId: "2",
          complete: true,
          unseen: true,
          valid: true,
          skills: [50, 50, 50, 50],
        },
      ]),
    ).toMatchObject({
      projectTargetMet: true,
      overall: "incomplete",
      officialVerdict: "unresolved",
    });
  });
});
