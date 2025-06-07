'use client';

import { Briefcase, Code, Move3D } from 'lucide-react';
import Link from 'next/link';
import { PresentCard } from '../ui/PresentCard';

const presentCard = [
  {
    title: 'Applications et Outils',
    icon: Code,
    description:
      "Création de divers types d'applications et d'outils, allant des applications web aux applications de bureau.",
  },
  {
    title: '3D en Temps Réel',
    icon: Move3D,
    description:
      'Gestion de géométries complexes et de mathématiques vectorielles pour des applications 3D en temps réel.',
  },
  {
    title: 'Gestion de Projet',
    icon: Briefcase,
    description:
      'Gestion de projets de la conception à la réalisation avec des méthodologies agiles.',
  },
];

export const AboutSection = () => {
  const handleDownloadCV = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  return (
    <section id="about" className="relative px-4 py-24">
      {' '}
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Qui <span className="text-primary"> Suis-je</span>
        </h2>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Développeur Logiciel Passionné
            </h3>

            <p className="text-muted-foreground">
              J'ai suivi un cursus de 3 ans en développement web, applications
              et moteurs de jeux, où j'ai acquis des compétences solides en
              programmation et gestion de projets, notamment grâce aux langages
              de bas niveau (C / C++).
            </p>

            <p className="text-muted-foreground">
              J'aime découvrir et créer des solutions efficaces à des problèmes
              complexes. Je suis spécialisé dans la céation d'algorithmes,
              l'utilisation de différentes librairies et frameworks, ainsi que
              la gestion de 3D en temps réel.
            </p>

            <div className="flex flex-row justify-center gap-4 pt-4">
              <Link href="#contact" className="custom-button">
                {' '}
                Me Contacter
              </Link>

              <Link
                href="#"
                className="outline-button pointer-events-none opacity-50"
                onClick={handleDownloadCV}
              >
                Télécharger CV
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {presentCard.map((card, key) => (
              <PresentCard key={key} title={card.title} icon={card.icon}>
                {card.description}
              </PresentCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
