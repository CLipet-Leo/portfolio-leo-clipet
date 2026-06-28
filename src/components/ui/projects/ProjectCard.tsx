'use client';

import { useTilt } from '@/hooks/useTilt';
import { Project } from '@/types/types';
import { motion, useReducedMotion, useTransform } from 'motion/react';
import { Badge } from '../badge';

interface ProjectCardProps {
  project: Project;
  index?: number;
  alt?: boolean;
}

// Resting tilt: each card faces slightly toward the page center
// alt=false (mockup right): rotateY(-8) → left edge closer to viewer
// alt=true  (mockup left):  rotateY(+8) → right edge closer to viewer
const RESTING_Y = 8;

export const ProjectCard = ({
  project,
  index = 0,
  alt = false,
}: ProjectCardProps) => {
  const reduced = useReducedMotion();
  // rotateX/rotateY from useTilt are intentionally unused here —
  // we only need the cursor-position tracker for the light reflex.
  const { ref, lightX, lightY, onMouseMove, onMouseLeave } = useTilt();

  const lightGradient = useTransform(
    [lightX, lightY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
  );

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`flex flex-col items-center gap-10 lg:gap-16 ${
        alt ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
    >
      {/* Text column */}
      <div className="flex w-full flex-col justify-center lg:w-2/5">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag, i) => (
            <Badge key={i}>{tag}</Badge>
          ))}
        </div>

        <h3 className="mb-3 text-2xl leading-tight font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
          {project.title}
        </h3>

        <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
          {project.description}
        </p>
      </div>

      {/* Mockup column */}
      <div className="group w-full lg:w-3/5" style={{ perspective: '1100px' }}>
        <motion.div
          ref={ref}
          onMouseMove={reduced ? undefined : onMouseMove}
          onMouseLeave={reduced ? undefined : onMouseLeave}
          variants={{
            rest: {
              scale: 1,
              z: 0,
              boxShadow: '0px 20px 50px 0px rgba(0,0,0,0.45)',
            },
            hover: {
              scale: 1.03,
              z: 40,
              boxShadow: '0px 50px 120px 4px rgba(0,0,0,0.70)',
            },
          }}
          initial="rest"
          whileHover={reduced ? undefined : 'hover'}
          style={{
            rotateY: reduced ? 0 : alt ? RESTING_Y : -RESTING_Y,
            transformStyle: 'preserve-3d',
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="will-change-transform"
        >
          {/* Laptop outer frame */}
          <div className="overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-900">
            {/* Top bezel with camera dot */}
            <div className="flex h-6 items-center justify-center bg-zinc-900">
              <div className="h-1.25 w-1.25 rounded-full bg-zinc-600/60" />
            </div>

            {/* Screen */}
            <div className="relative mx-1 aspect-16/10 overflow-hidden rounded-[3px] bg-zinc-950">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Subtle gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/50 via-transparent to-transparent" />

              {/* Light reflex following cursor */}
              {!reduced && (
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: lightGradient }}
                />
              )}
            </div>

            {/* Bottom chin */}
            <div className="flex h-3 items-center justify-center rounded-b-2xl bg-zinc-800/60">
              <div className="h-0.5 w-10 rounded-full bg-zinc-700/50" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};
