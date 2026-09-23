import { z } from "zod";

export const stageSchema = z.enum(["bridge", "c1", "exam", "c2", "article", "pronunciation"]);
export const exerciseSchema = z.object({
  id: z.string(), type: z.enum(["choice", "short", "writing", "speaking", "listening", "ordering", "matching", "transformation"]),
  prompt: z.string().min(10), stimulus: z.string().optional(), options: z.array(z.string()).optional(),
  accepted: z.array(z.string()).optional(), explanation: z.string().min(10), hint: z.string().min(5),
  skill: z.string(), family: z.string(), errorTag: z.string().optional(),
  normalize: z.object({ caseSensitive: z.boolean(), punctuation: z.boolean() }).default({ caseSensitive: true, punctuation: true }),
  transfer: z.boolean().default(false), exit: z.boolean().default(false),
  rubric: z.array(z.string()).optional(), mediaId: z.string().optional(),
});
export type Exercise = z.infer<typeof exerciseSchema>;
export type PublicExercise = Omit<Exercise, "accepted" | "explanation" | "hint">;

export const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("text"), title: z.string().optional(), body: z.string() }),
  z.object({ type: z.literal("example"), german: z.string(), english: z.string(), note: z.string().optional() }),
  z.object({ type: z.literal("table"), title: z.string(), headers: z.array(z.string()), rows: z.array(z.array(z.string())) }),
  z.object({ type: z.literal("diagram"), title: z.string(), steps: z.array(z.object({ label: z.string(), detail: z.string() })) }),
  z.object({ type: z.literal("reading"), title: z.string(), body: z.string() }),
  z.object({ type: z.literal("audio"), title: z.string(), mediaId: z.string() }),
]);
export const lessonSchema = z.object({
  id: z.string(), version: z.number().int().positive(), moduleId: z.string(), stage: stageSchema,
  title: z.string(), subtitle: z.string(), minutes: z.number().int().positive(),
  objectives: z.array(z.string()).min(1), prerequisites: z.array(z.string()), skills: z.array(z.string()).min(1),
  references: z.array(z.string()), vocabulary: z.array(z.string()), blocks: z.array(blockSchema).min(3),
  exercises: z.array(exerciseSchema).min(3), reflection: z.string(),
  quality: z.object({ method: z.literal("ai-authored-and-reviewed"), reviewedAt: z.string(), unresolved: z.array(z.string()) }),
  status: z.enum(["draft", "published", "awaiting_audio"]),
});
export type Lesson = z.infer<typeof lessonSchema>;
export type PublicLesson = Omit<Lesson, "exercises"> & { exercises: PublicExercise[] };
export const lexicalSchema = z.object({
  id: z.string(), word: z.string(), type: z.enum(["noun", "verb", "adjective", "expression"]),
  article: z.enum(["der", "die", "das"]).optional(), plural: z.string().optional(),
  meaning: z.string(), stress: z.string(), phrase: z.string(), example: z.string(),
  translation: z.string(), register: z.string(), forms: z.string().optional(),
});
export type LexicalEntry = z.infer<typeof lexicalSchema>;
export type Module = { id: string; stage: z.infer<typeof stageSchema>; title: string; outcome: string; order: number };
export function publicExercise(exercise: Exercise): PublicExercise {
  const { accepted: _accepted, explanation: _explanation, hint: _hint, ...safe } = exercise;
  return safe;
}
export function publicLesson(lesson: Lesson): PublicLesson { return { ...lesson, exercises: lesson.exercises.map(publicExercise) }; }
