import NotFoundScene from '@/components/three/not-found-scene';
import { Button } from '@/components/ui/button';
import { getProjects } from '@/db/queries';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function NotFoundPage() {
  const projects = await getProjects();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-4 pt-20 pb-12">
      <div className="h-56 w-full max-w-lg">
        <NotFoundScene />
      </div>
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="font-mono text-label text-muted-foreground">
          {'// erreur 404'}
        </p>
        <h1 className="font-dot text-signal font-bold lowercase">
          page introuvable
        </h1>
        <p className="max-w-xs text-small text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Button asChild className="mt-1">
          <Link href="/">
            <ArrowLeft data-icon="inline-start" />
            Retour à l'accueil
          </Link>
        </Button>
      </div>
      <nav aria-label="Projets existants">
        <ul className="flex max-w-lg flex-wrap justify-center gap-x-6 gap-y-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <Button variant="link" asChild>
                <Link href={`/projets/${project.slug}`}>{project.title}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
