import { ProjectCard } from '@/components/projects/ProjectCard';
import projects from '@/data/projects.json';

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="section-title">Mes Projets</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
