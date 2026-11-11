import type { ProjectSummary } from '@/db/queries';
import type { Skill } from '@/db/schema';
import { cn } from '@/lib/utils';

/** « 2024 · 10 mois » : année de début et durée approximative, sans mois. */
export function formatProjectDate(project: ProjectSummary) {
  return [project.year, project.duration].filter(Boolean).join(' · ');
}

const skillNames = (project: ProjectSummary, kind: Skill['kind']) =>
  project.skills
    .filter(({ skill }) => skill.kind === kind)
    .map(({ skill }) => skill.name)
    .join(' · ');

/** Stack en mono : « next.js · typescript ». */
export const formatProjectStack = (project: ProjectSummary) =>
  skillNames(project, 'techno');

/**
 * Faits d'un projet, tous visibles sans clic. Un fait pas encore saisi en base
 * n'a pas de ligne : rien n'est inventé pour remplir.
 */
export function ProjectFacts({
  project,
  className,
}: {
  project: ProjectSummary;
  className?: string;
}) {
  // Discours (phrases) en Geist, données en mono.
  const facts = [
    {
      label: project.context === 'pro' ? 'besoins' : 'objectif',
      value: project.goal,
    },
    { label: 'rôle', value: project.role, isData: true },
    { label: 'date', value: formatProjectDate(project), isData: true },
    { label: 'stack', value: formatProjectStack(project), isData: true },
    {
      label: 'compétences',
      value: skillNames(project, 'competence'),
      isData: true,
    },
    { label: 'ia', value: project.ai },
    { label: 'résultat', value: project.result },
  ].filter((fact) => fact.value);

  return (
    <dl
      data-slot="project-facts"
      className={cn('grid grid-cols-[88px_1fr] gap-x-4 gap-y-2', className)}
    >
      {facts.map((fact) => (
        // `contents` : chaque paire reste sur la grille du `dl`.
        <div key={fact.label} className="contents">
          <dt className="pt-0.5 font-mono text-label text-muted-foreground">
            {fact.label}
          </dt>
          <dd
            className={
              fact.isData ? 'font-mono text-data lowercase' : 'text-small'
            }
          >
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
