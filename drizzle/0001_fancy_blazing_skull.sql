ALTER TABLE "error_patterns" ADD COLUMN "resolution_evidence" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "error_patterns" ADD COLUMN "probe" jsonb;