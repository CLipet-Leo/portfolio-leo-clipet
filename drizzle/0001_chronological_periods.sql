CREATE TYPE "public"."skill_kind" AS ENUM('competence', 'techno');--> statement-breakpoint
ALTER TABLE "periods" ADD COLUMN "summary" text;--> statement-breakpoint
ALTER TABLE "periods" ADD COLUMN "year_start" integer;--> statement-breakpoint
ALTER TABLE "periods" ADD COLUMN "year_end" integer;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "story" text;--> statement-breakpoint
ALTER TABLE "skills" ADD COLUMN "kind" "skill_kind" DEFAULT 'techno' NOT NULL;