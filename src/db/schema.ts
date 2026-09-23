import { pgTable, text, timestamp, boolean, integer, jsonb, uniqueIndex, index, primaryKey } from "drizzle-orm/pg-core";

export const user = pgTable("auth_user", {
  id: text("id").primaryKey(), name: text("name").notNull(), email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false), image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
export const session = pgTable("auth_session", {
  id: text("id").primaryKey(), expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(), createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(), ipAddress: text("ip_address"), userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
}, (t) => [index("session_owner_idx").on(t.userId)]);
export const account = pgTable("auth_account", {
  id: text("id").primaryKey(), accountId: text("account_id").notNull(), providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"), refreshToken: text("refresh_token"), idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }), refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
  scope: text("scope"), password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index("account_owner_idx").on(t.userId), uniqueIndex("account_provider_idx").on(t.providerId, t.accountId)]);
export const verification = pgTable("auth_verification", {
  id: text("id").primaryKey(), identifier: text("identifier").notNull(), value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(), createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
export type Profile = {
  name: string; minutes: number; days: number; timezone: string; language: "en" | "de";
  currentLevel: string; difficulties: string[]; examDate: string | null; firstLanguages: string;
  bskStatus: string; onboardingComplete: boolean; recordingRetentionDays: number;
};
export const profiles = pgTable("learner_profiles", {
  userId: text("user_id").primaryKey().references(() => user.id, { onDelete: "cascade" }),
  data: jsonb("data").$type<Profile>().notNull(), updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
export const contentVersions = pgTable("content_versions", {
  id: text("id").notNull(), version: integer("version").notNull(), type: text("type").notNull(),
  hash: text("hash").notNull(), payload: jsonb("payload").notNull(), published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [primaryKey({ columns: [t.id, t.version] })]);
export const learningSessions = pgTable("learning_sessions", {
  id: text("id").primaryKey(), userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  localDate: text("local_date").notNull(), timezone: text("timezone").notNull(), minutes: integer("minutes").notNull(),
  tasks: jsonb("tasks").notNull(), policy: text("policy").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(), endedAt: timestamp("ended_at", { withTimezone: true }),
}, (t) => [index("session_day_idx").on(t.userId, t.localDate)]);
export const attempts = pgTable("attempts", {
  id: text("id").primaryKey(), userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  lessonId: text("lesson_id").notNull(), contentVersion: integer("content_version").notNull(), exerciseId: text("exercise_id").notNull(),
  response: text("response").notNull(), skill: text("skill").notNull(), family: text("family").notNull(),
  modality: text("modality").notNull(), assisted: boolean("assisted").notNull(), transfer: boolean("transfer").notNull(),
  localDate: text("local_date").notNull(), timezone: text("timezone").notNull(), idempotencyKey: text("idempotency_key").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [uniqueIndex("attempt_idempotency_idx").on(t.userId, t.idempotencyKey), index("attempt_owner_skill_idx").on(t.userId, t.skill)]);
export type EvaluationData = { correct: boolean | null; score: number | null; explanation: string; correction?: string; criteria?: { criterion: string; result: string; evidence: string }[]; limitations?: string[]; };
export const evaluations = pgTable("evaluations", {
  id: text("id").primaryKey(), attemptId: text("attempt_id").notNull().references(() => attempts.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  status: text("status").notNull(), source: text("source").notNull(), data: jsonb("data").$type<EvaluationData>().notNull(),
  rubricVersion: text("rubric_version").notNull(), model: text("model"), supersedesId: text("supersedes_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index("evaluation_attempt_idx").on(t.userId, t.attemptId)]);
export const drafts = pgTable("drafts", {
  id: text("id").primaryKey(), userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  contextId: text("context_id").notNull(), data: jsonb("data").$type<{ response: string; exerciseId: string; attemptKey: string; step?: number }>().notNull(),
  sequence: integer("sequence").notNull().default(0), assisted: boolean("assisted").notNull().default(false),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [uniqueIndex("draft_context_idx").on(t.userId, t.contextId)]);
export const exposures = pgTable("solution_exposures", {
  id: text("id").primaryKey(), userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  exerciseId: text("exercise_id").notNull(), contentVersion: integer("content_version").notNull(), attemptKey: text("attempt_key").notNull(),
  kind: text("kind").notNull(), createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [uniqueIndex("exposure_key_idx").on(t.userId, t.exerciseId, t.contentVersion, t.attemptKey, t.kind)]);
export const lessonProgress = pgTable("lesson_progress", {
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }), lessonId: text("lesson_id").notNull(),
  version: integer("version").notNull(), state: text("state").notNull(), position: integer("position").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [primaryKey({ columns: [t.userId, t.lessonId] })]);
export const reviews = pgTable("reviews", {
  id: text("id").primaryKey(), userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  targetId: text("target_id").notNull(), mode: text("mode").notNull(), step: integer("step").notNull().default(0),
  dueDate: text("due_date").notNull(), timezone: text("timezone").notNull(), lastDate: text("last_date"),
  policy: text("policy").notNull().default("review-v1"),
}, (t) => [uniqueIndex("review_target_idx").on(t.userId, t.targetId, t.mode), index("review_due_idx").on(t.userId, t.dueDate)]);
export const errorPatterns = pgTable("error_patterns", {
  id: text("id").primaryKey(), userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  skill: text("skill").notNull(), tag: text("tag").notNull(), rootCause: text("root_cause").notNull(),
  original: text("original").notNull(), correction: text("correction").notNull(), explanation: text("explanation").notNull(),
  exerciseId: text("exercise_id").notNull(), lessonId: text("lesson_id").notNull(), attemptId: text("attempt_id").references(() => attempts.id),
  count: integer("count").notNull().default(1), status: text("status").notNull().default("open"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [uniqueIndex("error_pattern_idx").on(t.userId, t.skill, t.tag), index("error_owner_idx").on(t.userId)]);
export const placement = pgTable("placement", {
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }), moduleId: text("module_id").notNull(),
  route: text("route").notNull(), rationale: text("rationale").notNull(), evidence: jsonb("evidence").$type<string[]>().notNull(),
  waivedObjectives: jsonb("waived_objectives").$type<string[]>().notNull(), policy: text("policy").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [primaryKey({ columns: [t.userId, t.moduleId] })]);
export const jobs = pgTable("ai_jobs", {
  id: text("id").primaryKey(), userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  operation: text("operation").notNull(), status: text("status").notNull(), input: jsonb("input").notNull(), output: jsonb("output"),
  model: text("model"), error: text("error"), attempts: integer("attempts").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index("job_owner_idx").on(t.userId)]);
export const media = pgTable("media", {
  id: text("id").primaryKey(), userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  key: text("key").notNull(), mime: text("mime").notNull(), bytes: integer("bytes").notNull(), checksum: text("checksum").notNull(),
  kind: text("kind").notNull(), state: text("state").notNull(), metadata: jsonb("metadata").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(), deletedAt: timestamp("deleted_at", { withTimezone: true }),
});
export const examAttempts = pgTable("exam_attempts", {
  id: text("id").primaryKey(), userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  mockId: text("mock_id").notNull(), definitionVersion: text("definition_version").notNull(), mode: text("mode").notNull(),
  block: integer("block").notNull().default(0), state: text("state").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(), deadline: timestamp("deadline", { withTimezone: true }).notNull(),
  answers: jsonb("answers").$type<Record<string, string>>().notNull(), sequence: integer("sequence").notNull().default(0),
  flags: jsonb("flags").$type<string[]>().notNull(), results: jsonb("results"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [index("exam_owner_idx").on(t.userId)]);
export const importRecords = pgTable("import_records", {
  id: text("id").primaryKey(), userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  hash: text("hash").notNull(), schemaVersion: text("schema_version").notNull(), report: jsonb("report").notNull(), legacyData: jsonb("legacy_data"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [uniqueIndex("import_hash_idx").on(t.userId, t.hash)]);
export const usageLimits = pgTable("usage_limits", {
  key: text("key").primaryKey(), count: integer("count").notNull(), expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});
