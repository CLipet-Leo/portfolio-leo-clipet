'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { HeroScene } from '../three/HeroScene';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: [0.2, 0, 0, 1] as const },
  },
};

export const HeroSection = () => {
  const shouldReduce = useReducedMotion();

  return (
    <section id="home" className="w-full pt-20">
      <div className="container mx-auto max-w-5xl">
        <div className="grid min-h-[calc(100dvh-5rem)] grid-cols-1 items-center gap-0 pb-8 md:grid-cols-2 md:gap-8">
          <motion.div
            className="flex flex-col gap-4"
            variants={containerVariants}
            initial={shouldReduce ? false : 'hidden'}
            animate="visible"
          >
            <motion.p
              className="text-label text-muted-foreground font-mono"
              variants={itemVariants}
            >
              // développeur full-stack & systèmes
            </motion.p>
            <motion.h1
              className="font-dot text-signal font-bold lowercase"
              variants={itemVariants}
            >
              Je construis des
              <br />
              expériences qui
              <br />
              ont du relief.
            </motion.h1>
            <motion.p
              className="text-small text-muted-foreground max-w-[340px]"
              variants={itemVariants}
            >
              Du bas niveau au web, des interfaces soignées,
              <br /> une architecture qui tient sur la durée.
            </motion.p>
            <motion.div
              className="mt-1 flex flex-wrap gap-2"
              variants={itemVariants}
            >
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">Three.js / R3F</Badge>
              <Badge variant="secondary">PostgreSQL</Badge>
              <Badge variant="secondary">C / C++</Badge>
              <Badge variant="secondary">Rust</Badge>
            </motion.div>
            <motion.div
              className="mt-2 flex flex-wrap gap-3"
              variants={itemVariants}
            >
              <Button asChild>
                <Link href="#projects">Voir mes projets</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-full min-h-[320px] w-full md:min-h-0"
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
          >
            <HeroScene />
            <div className="pointer-events-none absolute right-0 bottom-6 flex items-center gap-1.5">
              <span className="bg-faint size-1.5 rounded-full" />
              <span className="text-label text-muted-foreground font-mono">
                three.js · r3f
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
