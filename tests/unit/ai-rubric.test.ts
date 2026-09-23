import { describe, it, expect } from "vitest";
import { assessRubric, rubricOutput, type RubricOutput } from "@/ai/contracts";
const answer =
  "Ich empfehle einen begrenzten Test. Die Ursache ist noch ungeklärt.";
const result: RubricOutput = {
  status: "assessed",
  summary: "A clear, qualified recommendation.",
  criteria: [
    {
      index: 0,
      rating: 2,
      evidence: "Ich empfehle einen begrenzten Test.",
      explanation: "Makes a proportionate recommendation.",
    },
    {
      index: 1,
      rating: 2,
      evidence: "Die Ursache ist noch ungeklärt.",
      explanation: "Preserves uncertainty.",
    },
  ],
  corrections: [],
  nextTask: "Apply the same reasoning to a new source.",
  limitations: [],
};
describe("validated coaching", () => {
  it("requires every criterion and verbatim response evidence", () => {
    expect(
      assessRubric(result, ["Recommendation", "Uncertainty"], answer).correct,
    ).toBe(true);
    expect(
      assessRubric(
        { ...result, criteria: result.criteria.slice(0, 1) },
        ["Recommendation", "Uncertainty"],
        answer,
      ).correct,
    ).toBeNull();
    expect(
      assessRubric(
        {
          ...result,
          criteria: [
            { ...result.criteria[0], evidence: "An invented quote" },
            result.criteria[1],
          ],
        },
        ["Recommendation", "Uncertainty"],
        answer,
      ).correct,
    ).toBeNull();
  });
  it("rejects duplicate indexes, impossible ratings and malformed provider data", () => {
    expect(
      assessRubric(
        { ...result, criteria: [result.criteria[0], result.criteria[0]] },
        ["a", "b"],
        answer,
      ).correct,
    ).toBeNull();
    expect(
      rubricOutput.safeParse({
        ...result,
        criteria: [{ ...result.criteria[0], rating: 9 }],
      }).success,
    ).toBe(false);
    expect(rubricOutput.safeParse({ correct: true }).success).toBe(false);
  });
  it("keeps inconclusive output unscored and a partly-met criterion non-passing", () => {
    expect(
      assessRubric({ ...result, status: "inconclusive" }, ["a", "b"], answer),
    ).toMatchObject({ correct: null, score: null });
    expect(
      assessRubric(
        {
          ...result,
          criteria: [{ ...result.criteria[0], rating: 1 }, result.criteria[1]],
        },
        ["a", "b"],
        answer,
      ).correct,
    ).toBe(false);
  });
  it("does not accept an invented correction span", () => {
    expect(
      assessRubric(
        {
          ...result,
          corrections: [
            {
              original: "not present",
              corrected: "present",
              explanation: "Test",
              tag: "LEX",
              kind: "error",
              cause: "confirmed",
            },
          ],
        },
        ["a", "b"],
        answer,
      ).correct,
    ).toBeNull();
  });
});
