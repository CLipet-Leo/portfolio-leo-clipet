CREATE TYPE "public"."project_context" AS ENUM('pro', 'perso', 'ecole');--> statement-breakpoint
CREATE TABLE "periods" (
	"id" text PRIMARY KEY NOT NULL,
	"number" integer NOT NULL,
	"title" text NOT NULL,
	"shape" text NOT NULL,
	CONSTRAINT "periods_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE "project_links" (
	"project_slug" text NOT NULL,
	"label" text NOT NULL,
	"href" text NOT NULL,
	CONSTRAINT "project_links_project_slug_label_pk" PRIMARY KEY("project_slug","label")
);
--> statement-breakpoint
CREATE TABLE "project_media" (
	"project_slug" text NOT NULL,
	"src" text NOT NULL,
	"alt" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "project_media_project_slug_position_pk" PRIMARY KEY("project_slug","position")
);
--> statement-breakpoint
CREATE TABLE "project_skills" (
	"project_slug" text NOT NULL,
	"skill_id" text NOT NULL,
	CONSTRAINT "project_skills_project_slug_skill_id_pk" PRIMARY KEY("project_slug","skill_id")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"slug" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"period_id" text NOT NULL,
	"context" "project_context" NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"goal" text NOT NULL,
	"role" text,
	"year" integer,
	"duration" text,
	"ai" text,
	"result" text,
	"published" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"domain" text NOT NULL,
	"since" integer,
	"usage" text,
	"shape" text,
	CONSTRAINT "skills_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "project_links" ADD CONSTRAINT "project_links_project_slug_projects_slug_fk" FOREIGN KEY ("project_slug") REFERENCES "public"."projects"("slug") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "project_media" ADD CONSTRAINT "project_media_project_slug_projects_slug_fk" FOREIGN KEY ("project_slug") REFERENCES "public"."projects"("slug") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_project_slug_projects_slug_fk" FOREIGN KEY ("project_slug") REFERENCES "public"."projects"("slug") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE no action ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_period_id_periods_id_fk" FOREIGN KEY ("period_id") REFERENCES "public"."periods"("id") ON DELETE no action ON UPDATE cascade;