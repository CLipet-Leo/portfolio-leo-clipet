'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { HeroScene } from '../three/HeroScene';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const },
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
              className="text-primary font-mono text-xs tracking-[0.12em] uppercase opacity-85"
              variants={itemVariants}
            >
              // développeur full-stack & systèmes
            </motion.p>
            <motion.h1
              className="text-[clamp(32px,4.5vw,52px)] leading-[1.07] font-bold tracking-[-0.03em]"
              variants={itemVariants}
            >
              Je construis des
              <br />
              expériences qui
              <br />
              <span className="text-primary">ont du relief.</span>
            </motion.h1>
            <motion.p
              className="text-muted-foreground max-w-[340px] text-sm leading-[1.7] font-normal"
              variants={itemVariants}
            >
              Du bas niveau au web, des interfaces soignées,
              <br /> une architecture qui tient sur la durée.
            </motion.p>
            <motion.div
              className="mt-1 flex flex-wrap gap-2"
              variants={itemVariants}
            >
              <Badge>TypeScript</Badge>
              <Badge>Next.js</Badge>
              <Badge>Three.js / R3F</Badge>
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
              <Button variant="outline" asChild>
                <Link href="#contact">Me contacter</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-full min-h-[320px] w-full md:min-h-0"
            initial={shouldReduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
          >
            <HeroScene />
            <div className="pointer-events-none absolute right-0 bottom-6 flex items-center gap-1.5">
              <span className="bg-primary/30 h-[5px] w-[5px] rounded-full" />
              <span className="text-muted-foreground/40 font-mono text-[10px] tracking-[0.06em]">
                three.js · r3f
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
