import { z } from "zod";
export const correctionSchema = z.object({
  original: z.string().max(1000),
  corrected: z.string().max(1000),
  explanation: z.string().max(1600),
  tag: z.enum([
    "GEN",
    "CASE",
    "NOUN",
    "ADJ",
    "VPOS",
    "VFORM",
    "PREP",
    "CONN",
    "LEX",
    "REG",
    "ORTH",
    "TASK",
  ]),
  kind: z.enum(["error", "C1-Variante"]),
  cause: z.enum(["confirmed", "needs_probe"]),
});
export const rubricOutput = z.object({
  status: z.enum(["assessed", "inconclusive"]),
  summary: z.string().max(4000),
  criteria: z
    .array(
      z.object({
        index: z.number().int().min(0).max(30),
        rating: z.number().int().min(0).max(3),
        evidence: z.string().max(1000),
        explanation: z.string().max(2000),
      }),
    )
    .max(31),
  corrections: z.array(correctionSchema).max(40),
  nextTask: z.string().max(2000),
  limitations: z.array(z.string().max(1000)).max(12),
});
export type RubricOutput = z.infer<typeof rubricOutput>;
export const tutorOutput = z.object({
  answer: z.string().max(9000),
  followUp: z.string().max(1000),
  referenceIds: z.array(z.string()).max(8),
});
export const soundOutput = z.object({
  status: z.enum(["assessed", "inconclusive"]),
  summary: z.string().max(4000),
  criteria: z
    .array(
      z.object({
        index: z.number().int().min(0).max(30),
        rating: z.number().int().min(0).max(3),
        startSeconds: z.number().min(0),
        endSeconds: z.number().min(0),
        explanation: z.string().max(2000),
      }),
    )
    .max(31),
  observations: z
    .array(
      z.object({
        dimension: z.enum([
          "intelligibility",
          "rhythm",
          "word-stress",
          "fluency",
          "sound-contrast",
        ]),
        startSeconds: z.number().min(0),
        endSeconds: z.number().min(0),
        observation: z.string().max(1500),
        practice: z.string().max(1500),
      }),
    )
    .max(12),
  limitations: z.array(z.string().max(1000)).max(12),
});
export function assessRubric(
  output: RubricOutput,
  criteria: string[],
  response: string,
) {
  const indexes = new Set(output.criteria.map((c) => c.index));
  const covered =
    criteria.length > 0 &&
    indexes.size === criteria.length &&
    output.criteria.length === criteria.length &&
    criteria.every((_, i) => indexes.has(i));
  const supported =
    output.criteria.every(
      (c) => c.evidence.length > 0 && response.includes(c.evidence),
    ) &&
    output.corrections.every(
      (c) => c.original.length > 0 && response.includes(c.original),
    );
  if (output.status !== "assessed" || !covered || !supported)
    return {
      correct: null,
      score: null,
      explanation: output.summary,
      limitations: [
        ...output.limitations,
        ...(!covered
          ? ["The rubric did not cover every required criterion."]
          : []),
        ...(!supported
          ? ["Some evidence could not be located in the submitted response."]
          : []),
      ],
    };
  return {
    correct: output.criteria.every((c) => c.rating >= 2),
    score:
      output.criteria.reduce((n, c) => n + c.rating, 0) / (criteria.length * 3),
    explanation: output.summary,
    criteria: output.criteria.map((c) => ({
      criterion: criteria[c.index],
      result: ["not met", "partly met", "met", "strongly met"][c.rating],
      evidence: c.evidence,
      explanation: c.explanation,
    })),
    limitations: output.limitations,
  };
}
