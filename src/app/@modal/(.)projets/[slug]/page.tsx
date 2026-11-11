import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { ProjectDetail } from '@/components/ui/projects/project-detail';
import { getProject } from '@/db/queries';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export { generateStaticParams } from '@/app/projets/[slug]/page';

interface IProjectModalProps {
  params: Promise<{ slug: string }>;
}

const ProjectModal = async ({ params }: IProjectModalProps) => {
  const project = await getProject((await params).slug);
  if (!project) notFound();

  return (
    <Modal label={project.title}>
      <ProjectDetail project={project} />
      <p className="mt-8">
        <Button variant="link" asChild>
          {/* Lien natif : un rechargement complet contourne l'interception. */}
          <a href={`/projets/${project.slug}`}>ouvrir en pleine page →</a>
        </Button>
      </p>
    </Modal>
  );
};

/**
 * Route interceptée : depuis une autre page du site, la fiche s'ouvre
 * par-dessus et l'URL change ; en accès direct, `projets/[slug]/page.tsx`
 * rend la page complète.
 */
export default function ProjectModalPage({ params }: IProjectModalProps) {
  return (
    // Repli vide : un squelette monterait un premier `<dialog>`, refermé puis
    // rouvert à l'arrivée du contenu. La fiche est en cache, l'attente est courte.
    <Suspense fallback={null}>
      <ProjectModal params={params} />
    </Suspense>
  );
}
