'use client';

import { IProject } from '@/types/types';
import { motion, useReducedMotion } from 'motion/react';
import { Badge } from '../badge';

interface IProjectCardProps {
  project: IProject;
  index?: number;
  alt?: boolean;
}

export const ProjectCard = ({
  project,
  index = 0,
  alt = false,
}: IProjectCardProps) => {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 6 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.24, delay: index * 0.04, ease: [0.2, 0, 0, 1] }}
      className={`flex flex-col items-center gap-10 lg:gap-16 ${
        alt ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
    >
      <div className="flex w-full flex-col justify-center lg:w-2/5">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag, i) => (
            <Badge key={i} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="mb-3 text-h2 font-semibold text-foreground">
          {project.title}
        </h3>

        <p className="max-w-sm text-small text-muted-foreground">
          {project.description}
        </p>
      </div>

      <div className="aspect-video w-full chamfer-lg dot-grid lg:w-3/5">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>
    </motion.article>
  );
};
