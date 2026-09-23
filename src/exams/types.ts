import { z } from "zod";
export const examTaskSchema = z.object({
  id: z.string(),
  block: z.number().int().min(0).max(3),
  section: z.string(),
  kind: z.enum(["choice", "writing", "speaking"]),
  skill: z.enum(["reading", "listening", "writing", "speaking"]),
  title: z.string(),
  stimulus: z.string().optional(),
  prompt: z.string(),
  options: z.array(z.string()).optional(),
  answer: z.string().optional(),
  rationale: z.string(),
  halfPoints: z.number().int().nonnegative(),
  rubric: z.array(z.string()).optional(),
  audioId: z.string().optional(),
});
export const mockSchema = z.object({
  id: z.string(),
  version: z.literal(1),
  title: z.string(),
  description: z.string(),
  reserved: z.boolean(),
  quality: z.literal("authored-awaiting-independent-review"),
  tasks: z.array(examTaskSchema),
  audio: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      offset: z.number().int(),
      script: z.string(),
    }),
  ),
});
export type ExamTask = z.infer<typeof examTaskSchema>;
export type Mock = z.infer<typeof mockSchema>;
export function publicTask(task: ExamTask) {
  const { answer: _answer, rationale: _rationale, ...safe } = task;
  return safe;
}
