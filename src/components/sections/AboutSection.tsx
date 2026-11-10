'use client';

import { motion, useReducedMotion, type MotionProps } from 'motion/react';

const specialties = [
  {
    label: 'Applications et Outils',
    description:
      "Création de divers types d'applications et d'outils, allant des applications web aux applications de bureau.",
  },
  {
    label: '3D en Temps Réel',
    description:
      'Gestion de géométries complexes et de mathématiques vectorielles pour des applications 3D en temps réel.',
  },
  {
    label: 'Gestion de Projet',
    description:
      'Gestion de projets de la conception à la réalisation avec des méthodologies agiles.',
  },
];

const EASE: [number, number, number, number] = [0.2, 0, 0, 1];

export const AboutSection = () => {
  const reduce = useReducedMotion();

  const reveal = (delay = 0): MotionProps =>
    reduce
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 6 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.24, delay, ease: EASE },
        };

  return (
    <section id="about" className="w-full px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <div className="max-w-[65ch]">
          <motion.h2
            className="font-dot text-signal mb-10 font-bold lowercase"
            {...reveal(0)}
          >
            Qui Suis-je
          </motion.h2>

          <motion.h3 className="text-h3 mb-4 font-semibold" {...reveal(0.05)}>
            Développeur Logiciel Passionné
          </motion.h3>

          <motion.p
            className="text-muted-foreground mb-5 leading-relaxed"
            {...reveal(0.1)}
          >
            J'ai suivi un cursus de 3 ans en développement web, applications et
            moteurs de jeux, où j'ai acquis des compétences solides en
            programmation et gestion de projets, notamment grâce aux langages de
            bas niveau (C / C++).
          </motion.p>

          <motion.p
            className="text-muted-foreground mb-12 leading-relaxed"
            {...reveal(0.15)}
          >
            J'aime découvrir et créer des solutions efficaces à des problèmes
            complexes. Je suis spécialisé dans la céation d'algorithmes,
            l'utilisation de différentes librairies et frameworks, ainsi que la
            gestion de 3D en temps réel.
          </motion.p>

          <div>
            {specialties.map((spec, i) => (
              <motion.div
                key={spec.label}
                className="border-border border-t py-6"
                {...reveal(0.2 + i * 0.04)}
              >
                <p className="text-label text-muted-foreground mb-2 font-mono lowercase">
                  {spec.label}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {spec.description}
                </p>
              </motion.div>
            ))}
            <div className="border-border border-t" />
          </div>
        </div>
      </div>
    </section>
  );
};
