import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
} from 'drizzle-orm/pg-core';

// Seule catégorie d'un projet (docs/design-system.md § 8).
export const projectContext = pgEnum('project_context', [
  'pro',
  'perso',
  'ecole',
]);

// Une compétence (architecture, UX…) se prouve par des projets ; une techno
// (C++, Next.js…) compose leur stack. Les deux se lient aux projets de la même
// façon, par `project_skills`.
export const skillKind = pgEnum('skill_kind', ['competence', 'techno']);

// Les identifiants sont des textes lisibles (`produit`, `typescript`) : une clé
// étrangère se saisit à la main dans la console de la base.
// Une période est une tranche du parcours, dans l'ordre chronologique.
export const periods = pgTable('periods', {
  id: text().primaryKey(),
  number: integer().notNull().unique(),
  title: text().notNull(),
  summary: text(),
  yearStart: integer('year_start'),
  /** Vide : la période est en cours. */
  yearEnd: integer('year_end'),
});

export const projects = pgTable('projects', {
  slug: text().primaryKey(),
  title: text().notNull(),
  periodId: text('period_id')
    .notNull()
    .references(() => periods.id, { onUpdate: 'cascade' }),
  context: projectContext().notNull(),
  featured: boolean().notNull().default(false),
  goal: text().notNull(),
  role: text(),
  year: integer(),
  duration: text(),
  ai: text(),
  result: text(),
  /** Récit de la page projet : un paragraphe par ligne vide. */
  story: text(),
  published: boolean().notNull().default(false),
});

export const skills = pgTable('skills', {
  id: text().primaryKey(),
  name: text().notNull().unique(),
  kind: skillKind().notNull().default('techno'),
  domain: text().notNull(),
  since: integer(),
  usage: text(),
  shape: text(),
});

const projectSlug = () =>
  text('project_slug')
    .notNull()
    .references(() => projects.slug, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

export const projectSkills = pgTable(
  'project_skills',
  {
    projectSlug: projectSlug(),
    skillId: text('skill_id')
      .notNull()
      .references(() => skills.id, { onUpdate: 'cascade' }),
  },
  (t) => [primaryKey({ columns: [t.projectSlug, t.skillId] })],
);

// Les captures restent dans `public/img` : la base ne stocke que leur chemin.
export const projectMedia = pgTable(
  'project_media',
  {
    projectSlug: projectSlug(),
    src: text().notNull(),
    alt: text().notNull(),
    position: integer().notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.projectSlug, t.position] })],
);

export const projectLinks = pgTable(
  'project_links',
  {
    projectSlug: projectSlug(),
    label: text().notNull(),
    href: text().notNull(),
  },
  (t) => [primaryKey({ columns: [t.projectSlug, t.label] })],
);

export const projectsRelations = relations(projects, ({ one, many }) => ({
  period: one(periods, {
    fields: [projects.periodId],
    references: [periods.id],
  }),
  skills: many(projectSkills),
  media: many(projectMedia),
  links: many(projectLinks),
}));

export const projectSkillsRelations = relations(projectSkills, ({ one }) => ({
  project: one(projects, {
    fields: [projectSkills.projectSlug],
    references: [projects.slug],
  }),
  skill: one(skills, {
    fields: [projectSkills.skillId],
    references: [skills.id],
  }),
}));

export const projectMediaRelations = relations(projectMedia, ({ one }) => ({
  project: one(projects, {
    fields: [projectMedia.projectSlug],
    references: [projects.slug],
  }),
}));

export const projectLinksRelations = relations(projectLinks, ({ one }) => ({
  project: one(projects, {
    fields: [projectLinks.projectSlug],
    references: [projects.slug],
  }),
}));

export type Period = typeof periods.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Skill = typeof skills.$inferSelect;
