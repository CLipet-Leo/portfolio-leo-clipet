import { Project } from '@/types/types';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      // key={key}
      className="group bg-card card-hover overflow-hidden rounded-lg shadow-xs"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.slug}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag, key) => (
            <span
              key={key}
              className="bg-secondary text-secondary-foreground rounded-full border px-2 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mb-1 text-xl font-semibold"> {project.title}</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <Link
              href="#"
              target="_blank"
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              <ExternalLink size={20} />
            </Link>
            <Link
              href={project.githubUrl}
              target="_blank"
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              <Github size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
