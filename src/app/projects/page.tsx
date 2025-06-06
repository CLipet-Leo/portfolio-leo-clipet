import { ProjectCard } from '@/components/ui/ProjectCard';
import projects from '@/data/projects.json';

export default function ProjectsPage() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold">Mes Projets</h1>
      <div className="m-5 grid gap-4 sm:col-1 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
