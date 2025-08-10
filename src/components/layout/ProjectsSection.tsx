import { ProjectCard } from '@/components/ui/ProjectCard';
import projects from '@/data/projects.json';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          {projects.map((project, key) => (
            <ProjectCard key={key} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            className="outline-button mx-auto flex items-center justify-center gap-2"
            target="_blank"
            href="https://github.com/CLipet-Leo"
          >
            Mon Github <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
