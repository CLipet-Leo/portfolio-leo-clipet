import {
  CONTEXT_FILTER_CLASS,
  CONTEXT_LABELS,
} from '@/constants/project-context';
import type { ProjectSummary } from '@/db/queries';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Badge } from '../badge';
import { Button } from '../button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../card';
import { ProjectFacts } from './project-facts';

/**
 * Fiche d'un projet mis en avant sur la timeline : les faits sans clic, le
 * schéma, les captures et le récit sur `/projets/[slug]`.
 */
export const ProjectCard = ({
  project,
  className,
}: {
  project: ProjectSummary;
  className?: string;
}) => (
  <Card
    data-context={project.context}
    className={cn(CONTEXT_FILTER_CLASS, className)}
  >
    <CardHeader>
      <CardTitle>
        <h4>{project.title}</h4>
      </CardTitle>
      <CardAction>
        <Badge variant="dot">{CONTEXT_LABELS[project.context]}</Badge>
      </CardAction>
    </CardHeader>
    <CardContent>
      <ProjectFacts project={project} />
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm" asChild>
        <Link href={`/projets/${project.slug}`}>
          Fiche complète
          <span className="sr-only"> de {project.title}</span>
        </Link>
      </Button>
    </CardFooter>
  </Card>
);
