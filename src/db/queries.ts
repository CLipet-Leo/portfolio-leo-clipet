import { cacheLife, cacheTag } from 'next/cache';
import { db } from './index.ts';

/** Étiquette de cache de tout le contenu lu en base (voir `api/revalidate`). */
export const CONTENT_TAG = 'contenu';

/** Projets publiés, mis en avant d'abord, avec leurs compétences et captures. */
export async function getProjects() {
  'use cache';
  cacheTag(CONTENT_TAG);
  cacheLife('hours');

  return db.query.projects.findMany({
    where: (p, { eq }) => eq(p.published, true),
    orderBy: (p, { asc, desc, sql }) => [
      desc(p.featured),
      sql`${p.year} desc nulls last`,
      asc(p.title),
    ],
    with: {
      skills: { with: { skill: true } },
      media: { orderBy: (m, { asc }) => asc(m.position) },
    },
  });
}

export type ProjectSummary = Awaited<ReturnType<typeof getProjects>>[number];
