import { ProjectCard } from '@/components/ui/projects/project-card';
import projects from '@/data/projects.json';
import { Button } from '@/components/ui/button';
import { ExternalLink } from '@/components/ui/external-link';
import { ArrowUpRight } from 'lucide-react';

export const ProjectsSection = () => {
  return (
    <section id="projects" className="relative px-4 py-24">
      <div className="mx-auto w-full max-w-6xl md:container 2xl:max-w-7xl">
        <h2 className="mb-4 text-center font-dot text-signal font-bold lowercase">
          Projets en Vedette
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
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
          <Button variant="outline" asChild>
            <ExternalLink href="https://github.com/CLipet-Leo">
              Mon GitHub
              <ArrowUpRight data-icon="inline-end" />
            </ExternalLink>
          </Button>
        </div>
      </div>
    </section>
  );
};
