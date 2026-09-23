import { z } from "zod";
const date = z.iso.datetime({ offset: true }),
  id = z.string().min(1).max(150);
export const profileSchema = z.object({
  name: z.string().min(1).max(80),
  minutes: z.number().int().min(10).max(180),
  days: z.number().int().min(1).max(7),
  timezone: z
    .string()
    .max(80)
    .refine((v) => {
      try {
        new Intl.DateTimeFormat("en", { timeZone: v });
        return true;
      } catch {
        return false;
      }
    }),
  language: z.enum(["en", "de"]),
  currentLevel: z.string().max(150),
  difficulties: z.array(z.string().max(80)).max(15),
  examDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable(),
  firstLanguages: z.string().max(150),
  bskStatus: z.string().max(200),
  onboardingComplete: z.boolean(),
  recordingRetentionDays: z.number().int().min(1).max(365),
});
export const attemptSchema = z.object({
  id,
  userId: id,
  lessonId: id,
  contentVersion: z.number().int().positive(),
  exerciseId: id,
  response: z.string().max(12000),
  skill: id,
  family: id,
  modality: z.string().max(50),
  assisted: z.boolean(),
  transfer: z.boolean(),
  localDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timezone: z.string().max(80),
  idempotencyKey: id,
  createdAt: date,
});
export const evaluationSchema = z.object({
  id,
  attemptId: id,
  userId: id,
  status: z.string().max(60),
  source: z.string().max(60),
  data: z.object({
    correct: z.boolean().nullable(),
    score: z.number().min(0).max(1).nullable(),
    explanation: z.string().max(12000),
    correction: z.string().max(12000).optional(),
    criteria: z
      .array(
        z.object({
          criterion: z.string(),
          result: z.string(),
          evidence: z.string(),
        }),
      )
      .max(40)
      .optional(),
    limitations: z.array(z.string()).optional(),
  }),
  rubricVersion: id,
  model: z.string().max(150).nullable(),
  supersedesId: id.nullable(),
  createdAt: date,
});
export const bundleSchema = z.object({
  schemaVersion: z.literal("german-learning-export-v1"),
  exportedAt: date,
  ownerId: id,
  profile: profileSchema,
  policies: z.object({
    mastery: z.string(),
    review: z.string(),
    planner: z.string(),
  }),
  content: z
    .array(
      z.object({
        id,
        version: z.number().int().positive(),
        hash: z.string().regex(/^[a-f0-9]{64}$/),
      }),
    )
    .max(5000),
  attempts: z.array(attemptSchema).max(50000),
  evaluations: z.array(evaluationSchema).max(100000),
  archives: z.record(z.string(), z.unknown()),
  signature: z
    .string()
    .regex(/^[a-f0-9]{64}$/)
    .optional(),
});
export type ExportBundle = z.infer<typeof bundleSchema>;
export const draftArchiveSchema = z.object({
  id,
  userId: id,
  contextId: id,
  data: z.object({
    response: z.string().max(12000),
    exerciseId: id,
    attemptKey: id,
    step: z.number().int().nonnegative().optional(),
  }),
  sequence: z.number().int().nonnegative(),
  assisted: z.boolean(),
  updatedAt: date,
});
export const exposureArchiveSchema = z.object({
  id,
  userId: id,
  exerciseId: id,
  contentVersion: z.number().int().positive(),
  attemptKey: id,
  kind: z.string().max(60),
  createdAt: date,
});
export const examArchiveSchema = z.object({
  id,
  userId: id,
  mockId: id,
  definitionVersion: id,
  mode: z.string().max(40),
  block: z.number().int().min(0).max(3),
  state: z.string().max(40),
  startedAt: date,
  deadline: date,
  answers: z
    .record(z.string().max(80), z.string().max(12000))
    .refine((a) => Object.keys(a).length <= 100),
  sequence: z.number().int().nonnegative(),
  flags: z.array(z.string().max(100)).max(100),
  results: z.unknown(),
  updatedAt: date,
});
