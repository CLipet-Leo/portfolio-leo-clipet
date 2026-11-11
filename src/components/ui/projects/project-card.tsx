'use client';

import type { ProjectSummary } from '@/db/queries';
import { motion, useReducedMotion } from 'motion/react';
import { Badge } from '../badge';

interface IProjectCardProps {
  project: ProjectSummary;
  index?: number;
  alt?: boolean;
}

export const ProjectCard = ({
  project,
  index = 0,
  alt = false,
}: IProjectCardProps) => {
  const reduced = useReducedMotion();
  const capture = project.media.at(0);

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
          {project.skills.slice(0, 4).map(({ skill }) => (
            <Badge key={skill.id} variant="secondary">
              {skill.name}
            </Badge>
          ))}
        </div>

        <h3 className="mb-3 text-h2 font-semibold text-foreground">
          {project.title}
        </h3>

        <p className="max-w-sm text-small text-muted-foreground">
          {project.goal}
        </p>
      </div>

      <div className="aspect-video w-full chamfer-lg dot-grid lg:w-3/5">
        {capture && (
          <img
            src={capture.src}
            alt={capture.alt}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </motion.article>
  );
};
