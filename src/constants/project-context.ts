import type { Project } from '@/db/schema';

export type ProjectContext = Project['context'];

/** Seule catégorie d'un projet (docs/design-system.md § 8). */
export const CONTEXT_LABELS: Record<ProjectContext, string> = {
  pro: 'pro',
  perso: 'perso',
  ecole: 'école',
};

/**
 * À poser, avec `data-context`, sur un élément placé dans un `ContextFilter` :
 * il disparaît quand le filtre choisit un autre contexte. CSS seul, pour que
 * les fiches restent rendues côté serveur.
 */
export const CONTEXT_FILTER_CLASS =
  'group-data-[filter=pro]/filter:not-data-[context=pro]:hidden group-data-[filter=perso]/filter:not-data-[context=perso]:hidden group-data-[filter=ecole]/filter:not-data-[context=ecole]:hidden';
