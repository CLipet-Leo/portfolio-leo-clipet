import { Button } from '@/components/ui/button';
import { ProjectDetail } from '@/components/ui/projects/project-detail';
import { getProject, getProjects } from '@/db/queries';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface IProjectPageProps {
  params: Promise<{ slug: string }>;
}

/** Une page statique par projet publié ; un slug ajouté ensuite est rendu à la demande. */
export async function generateStaticParams() {
  return (await getProjects()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: IProjectPageProps): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} — Léo Clipet`,
    description: project.goal,
  };
}

export default async function ProjectPage({ params }: IProjectPageProps) {
  const project = await getProject((await params).slug);
  if (!project) notFound();

  return (
    <div className="container mx-auto max-w-3xl px-4 pt-28 pb-24">
      <ProjectDetail project={project} />
      <p className="mt-12">
        <Button variant="link" asChild>
          <Link href="/projets">← tous les projets</Link>
        </Button>
      </p>
    </div>
  );
}
