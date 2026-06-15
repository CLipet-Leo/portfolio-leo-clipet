'use client';

import { Badge } from '../ui/badge';
import { HeroScene } from './HeroScene';

export const HeroSection = () => {
  return (
    <section id="home" className="w-full pt-20">
      <div className="container mx-auto max-w-5xl">
        <div className="grid min-h-115 grid-cols-1 items-center gap-0 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-primary font-mono text-xs tracking-[0.12em] uppercase opacity-85">
              // développeur full-stack & systèmes
            </p>
            <h1 className="text-[clamp(32px,4.5vw,52px)] leading-[1.07] font-bold tracking-[-0.03em]">
              Je construis des
              <br />
              expériences qui
              <br />
              <span className="text-primary">ont du relief.</span>
            </h1>
            <p className="text-muted-foreground max-w-85 text-sm leading-[1.7] font-normal">
              Du bas niveau au web, des interfaces soignées,
              <br /> une architecture qui tient sur la durée.
            </p>
            <div className="mt-1 flex flex-wrap gap-1.75">
              <Badge>Rust</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Three.js / R3F</Badge>
              <Badge variant="secondary">C / C++</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">PostgreSQL</Badge>
            </div>
          </div>
          <div className="relative h-full w-full">
            <HeroScene />
          </div>
        </div>
      </div>
    </section>
  );
};
