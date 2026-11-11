import { ContextFilter } from '@/components/ui/context-filter';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  formatProjectDate,
  formatProjectStack,
} from '@/components/ui/projects/project-facts';
import {
  CONTEXT_FILTER_CLASS,
  CONTEXT_LABELS,
} from '@/constants/project-context';
import { getProjects } from '@/db/queries';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projets — Léo Clipet',
  description: 'Tous les projets, filtrables par contexte.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto max-w-5xl px-4 pt-28 pb-24">
      <h1 className="font-dot text-signal font-bold lowercase">projets</h1>

      <ContextFilter contexts={projects.map((p) => p.context)} className="mt-8">
        <Table className="mt-8">
          <TableHeader>
            <TableRow>
              <TableHead scope="col">titre</TableHead>
              <TableHead scope="col">date</TableHead>
              <TableHead scope="col">contexte</TableHead>
              <TableHead scope="col">stack</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.slug}
                data-context={project.context}
                className={CONTEXT_FILTER_CLASS}
              >
                <TableHead
                  scope="row"
                  className="py-3 font-sans text-base font-semibold text-foreground"
                >
                  <Link
                    href={`/projets/${project.slug}`}
                    className="rounded-sm underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/60"
                  >
                    {project.title}
                  </Link>
                </TableHead>
                <TableCell>{formatProjectDate(project)}</TableCell>
                <TableCell>{CONTEXT_LABELS[project.context]}</TableCell>
                <TableCell>{formatProjectStack(project)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ContextFilter>
    </div>
  );
}
