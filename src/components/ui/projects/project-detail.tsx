import { CONTEXT_LABELS } from '@/constants/project-context';
import type { ProjectSummary } from '@/db/queries';
import { Badge } from '../badge';
import { Button } from '../button';
import { ExternalLink } from '../external-link';
import { ProjectFacts } from './project-facts';

/**
 * Fiche longue d'un projet : la même sur la page `/projets/[slug]` et dans la
 * modale ouverte depuis l'accueil.
 */
export const ProjectDetail = ({ project }: { project: ProjectSummary }) => (
  <article data-slot="project-detail" className="flex flex-col gap-8">
    <header className="flex flex-wrap items-start justify-between gap-4">
      <h1 className="text-h2 font-semibold">{project.title}</h1>
      <Badge variant="dot">{CONTEXT_LABELS[project.context]}</Badge>
    </header>

    <ProjectFacts project={project} />

    {project.story && (
      <div className="flex max-w-[65ch] flex-col gap-4 text-body text-muted-foreground">
        {project.story.split('\n\n').map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    )}

    {project.media.length > 0 && (
      <ul className="flex flex-col gap-4">
        {project.media.map((capture) => (
          <li
            key={capture.position}
            className="aspect-video chamfer-lg dot-grid"
          >
            {/* Captures servies telles quelles (`images.unoptimized`). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={capture.src}
              alt={capture.alt}
              loading="lazy"
              className="size-full object-contain"
            />
          </li>
        ))}
      </ul>
    )}

    {project.links.length > 0 && (
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {project.links.map((link) => (
          <li key={link.label}>
            <Button variant="link" asChild>
              <ExternalLink href={link.href}>{link.label} ↗</ExternalLink>
            </Button>
          </li>
        ))}
      </ul>
    )}
  </article>
);
