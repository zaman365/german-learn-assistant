CREATE TABLE "auth_account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp with time zone,
	"refresh_token_expires_at" timestamp with time zone,
	"scope" text,
	"password" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attempts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"lesson_id" text NOT NULL,
	"content_version" integer NOT NULL,
	"exercise_id" text NOT NULL,
	"response" text NOT NULL,
	"skill" text NOT NULL,
	"family" text NOT NULL,
	"modality" text NOT NULL,
	"assisted" boolean NOT NULL,
	"transfer" boolean NOT NULL,
	"local_date" text NOT NULL,
	"timezone" text NOT NULL,
	"idempotency_key" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_versions" (
	"id" text NOT NULL,
	"version" integer NOT NULL,
	"type" text NOT NULL,
	"hash" text NOT NULL,
	"payload" jsonb NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "content_versions_id_version_pk" PRIMARY KEY("id","version")
);
--> statement-breakpoint
CREATE TABLE "drafts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"context_id" text NOT NULL,
	"data" jsonb NOT NULL,
	"sequence" integer DEFAULT 0 NOT NULL,
	"assisted" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "error_patterns" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"skill" text NOT NULL,
	"tag" text NOT NULL,
	"root_cause" text NOT NULL,
	"original" text NOT NULL,
	"correction" text NOT NULL,
	"explanation" text NOT NULL,
	"exercise_id" text NOT NULL,
	"lesson_id" text NOT NULL,
	"attempt_id" text,
	"count" integer DEFAULT 1 NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "evaluations" (
	"id" text PRIMARY KEY NOT NULL,
	"attempt_id" text NOT NULL,
	"user_id" text NOT NULL,
	"status" text NOT NULL,
	"source" text NOT NULL,
	"data" jsonb NOT NULL,
	"rubric_version" text NOT NULL,
	"model" text,
	"supersedes_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exam_attempts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"mock_id" text NOT NULL,
	"definition_version" text NOT NULL,
	"mode" text NOT NULL,
	"block" integer DEFAULT 0 NOT NULL,
	"state" text NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"deadline" timestamp with time zone NOT NULL,
	"answers" jsonb NOT NULL,
	"sequence" integer DEFAULT 0 NOT NULL,
	"flags" jsonb NOT NULL,
	"results" jsonb,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "solution_exposures" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"exercise_id" text NOT NULL,
	"content_version" integer NOT NULL,
	"attempt_key" text NOT NULL,
	"kind" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "import_records" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"hash" text NOT NULL,
	"schema_version" text NOT NULL,
	"report" jsonb NOT NULL,
	"legacy_data" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_jobs" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"operation" text NOT NULL,
	"status" text NOT NULL,
	"input" jsonb NOT NULL,
	"output" jsonb,
	"model" text,
	"error" text,
	"attempts" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "learning_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"local_date" text NOT NULL,
	"timezone" text NOT NULL,
	"minutes" integer NOT NULL,
	"tasks" jsonb NOT NULL,
	"policy" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ended_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "lesson_progress" (
	"user_id" text NOT NULL,
	"lesson_id" text NOT NULL,
	"version" integer NOT NULL,
	"state" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "lesson_progress_user_id_lesson_id_pk" PRIMARY KEY("user_id","lesson_id")
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"key" text NOT NULL,
	"mime" text NOT NULL,
	"bytes" integer NOT NULL,
	"checksum" text NOT NULL,
	"kind" text NOT NULL,
	"state" text NOT NULL,
	"metadata" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "placement" (
	"user_id" text NOT NULL,
	"module_id" text NOT NULL,
	"route" text NOT NULL,
	"rationale" text NOT NULL,
	"evidence" jsonb NOT NULL,
	"waived_objectives" jsonb NOT NULL,
	"policy" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "placement_user_id_module_id_pk" PRIMARY KEY("user_id","module_id")
);
--> statement-breakpoint
CREATE TABLE "learner_profiles" (
	"user_id" text PRIMARY KEY NOT NULL,
	"data" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"target_id" text NOT NULL,
	"mode" text NOT NULL,
	"step" integer DEFAULT 0 NOT NULL,
	"due_date" text NOT NULL,
	"timezone" text NOT NULL,
	"last_date" text,
	"policy" text DEFAULT 'review-v1' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth_session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "auth_session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "usage_limits" (
	"key" text PRIMARY KEY NOT NULL,
	"count" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "auth_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "auth_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "auth_account" ADD CONSTRAINT "auth_account_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drafts" ADD CONSTRAINT "drafts_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "error_patterns" ADD CONSTRAINT "error_patterns_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "error_patterns" ADD CONSTRAINT "error_patterns_attempt_id_attempts_id_fk" FOREIGN KEY ("attempt_id") REFERENCES "public"."attempts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_attempt_id_attempts_id_fk" FOREIGN KEY ("attempt_id") REFERENCES "public"."attempts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exam_attempts" ADD CONSTRAINT "exam_attempts_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "solution_exposures" ADD CONSTRAINT "solution_exposures_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "import_records" ADD CONSTRAINT "import_records_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_jobs" ADD CONSTRAINT "ai_jobs_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_sessions" ADD CONSTRAINT "learning_sessions_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placement" ADD CONSTRAINT "placement_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learner_profiles" ADD CONSTRAINT "learner_profiles_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth_session" ADD CONSTRAINT "auth_session_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_owner_idx" ON "auth_account" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "account_provider_idx" ON "auth_account" USING btree ("provider_id","account_id");--> statement-breakpoint
CREATE UNIQUE INDEX "attempt_idempotency_idx" ON "attempts" USING btree ("user_id","idempotency_key");--> statement-breakpoint
CREATE INDEX "attempt_owner_skill_idx" ON "attempts" USING btree ("user_id","skill");--> statement-breakpoint
CREATE UNIQUE INDEX "draft_context_idx" ON "drafts" USING btree ("user_id","context_id");--> statement-breakpoint
CREATE UNIQUE INDEX "error_pattern_idx" ON "error_patterns" USING btree ("user_id","skill","tag");--> statement-breakpoint
CREATE INDEX "error_owner_idx" ON "error_patterns" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "evaluation_attempt_idx" ON "evaluations" USING btree ("user_id","attempt_id");--> statement-breakpoint
CREATE INDEX "exam_owner_idx" ON "exam_attempts" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "exposure_key_idx" ON "solution_exposures" USING btree ("user_id","exercise_id","content_version","attempt_key","kind");--> statement-breakpoint
CREATE UNIQUE INDEX "import_hash_idx" ON "import_records" USING btree ("user_id","hash");--> statement-breakpoint
CREATE INDEX "job_owner_idx" ON "ai_jobs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_day_idx" ON "learning_sessions" USING btree ("user_id","local_date");--> statement-breakpoint
CREATE UNIQUE INDEX "review_target_idx" ON "reviews" USING btree ("user_id","target_id","mode");--> statement-breakpoint
CREATE INDEX "review_due_idx" ON "reviews" USING btree ("user_id","due_date");--> statement-breakpoint
CREATE INDEX "session_owner_idx" ON "auth_session" USING btree ("user_id");