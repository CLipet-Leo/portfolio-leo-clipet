import { ProjectCard } from '@/components/ui/projects/ProjectCard';
import projects from '@/data/projects.json';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export const ProjectsSection = () => {
  return (
    <section id="projects" className="relative px-4 py-24">
      <div className="mx-auto w-full max-w-6xl md:container 2xl:max-w-7xl">
        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Projets en <span className="text-primary">Vedette</span>
        </h2>

        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center">
          Voici quelques-uns de mes récents projets. Beaucoup sont des projets
          d'écoles faits entre 1 à 4 semaines. J'essaie toujours d'apporter une
          attention particulière à mes projets ^^
        </p>

        <div className="flex flex-col gap-20 md:gap-28">
          {projects.map((project, key) => (
            <ProjectCard
              key={key}
              project={project}
              index={key}
              alt={key % 2 !== 0}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="ghost" asChild>
            <Link target="_blank" href="https://github.com/CLipet-Leo">
              Mon Github
              <ExternalLinkIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
