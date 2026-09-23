import type { Exercise } from "@/content/types";
import type { EvaluationData } from "@/db/schema";
export function normalizeAnswer(
  value: string,
  options: Exercise["normalize"],
): string {
  let answer = value.normalize("NFC").trim().replace(/\s+/g, " ");
  if (!options.caseSensitive) answer = answer.toLocaleLowerCase("de-DE");
  if (!options.punctuation) answer = answer.replace(/[.,!?;:]+$/u, "").trim();
  return answer;
}
export function grade(exercise: Exercise, response: string): EvaluationData {
  if (!exercise.accepted?.length)
    return {
      correct: null,
      score: null,
      explanation:
        "Your response is saved and awaits rubric-based feedback. No score has been assigned.",
    };
  const correct = exercise.accepted.some(
    (a) =>
      normalizeAnswer(a, exercise.normalize) ===
      normalizeAnswer(response, exercise.normalize),
  );
  return {
    correct,
    score: correct ? 1 : 0,
    explanation: exercise.explanation,
    correction: correct ? undefined : exercise.accepted[0],
  };
}
