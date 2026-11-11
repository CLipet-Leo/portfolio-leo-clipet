import { cacheLife, cacheTag } from 'next/cache';
import { db } from './index.ts';
import type { Skill } from './schema.ts';

/** Étiquette de cache de tout le contenu lu en base (voir `api/revalidate`). */
export const CONTENT_TAG = 'contenu';

/** Périodes dans l'ordre de la timeline. */
export async function getPeriods() {
  'use cache';
  cacheTag(CONTENT_TAG);
  cacheLife('hours');

  return db.query.periods.findMany({
    orderBy: (p, { asc }) => asc(p.number),
  });
}

/**
 * Projets publiés, mis en avant d'abord puis de la période la plus récente à la
 * plus ancienne, avec leurs compétences, captures et liens. Toutes les pages
 * partent de cette seule lecture : la liste est courte.
 */
export async function getProjects() {
  'use cache';
  cacheTag(CONTENT_TAG);
  cacheLife('hours');

  const rows = await db.query.projects.findMany({
    where: (p, { eq }) => eq(p.published, true),
    orderBy: (p, { asc, desc, sql }) => [
      desc(p.featured),
      sql`${p.year} desc nulls last`,
      asc(p.title),
    ],
    with: {
      period: true,
      skills: { with: { skill: true } },
      media: { orderBy: (m, { asc }) => asc(m.position) },
      links: { orderBy: (l, { asc }) => asc(l.label) },
    },
  });

  // La période passe avant l'année, souvent pas encore saisie. Tri stable :
  // l'ordre SQL (année, titre) départage les projets d'une même période.
  return rows.sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      b.period.number - a.period.number,
  );
}

export type ProjectSummary = Awaited<ReturnType<typeof getProjects>>[number];

/** Un projet publié, ou `undefined` si le slug est inconnu ou non publié. */
export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug);
}

export interface ISkillProof {
  skill: Skill;
  projects: { slug: string; title: string }[];
}

/**
 * Compétences et technos avec les projets publiés qui les prouvent, triées par
 * nom. Celles qui n'ont aucun projet publié n'y figurent pas.
 */
export async function getSkillProofs() {
  const proofs = new Map<string, ISkillProof>();
  for (const project of await getProjects()) {
    for (const { skill } of project.skills) {
      const proof = proofs.get(skill.id) ?? { skill, projects: [] };
      proof.projects.push({ slug: project.slug, title: project.title });
      proofs.set(skill.id, proof);
    }
  }
  return [...proofs.values()].sort((a, b) =>
    a.skill.name.localeCompare(b.skill.name, 'fr'),
  );
}
