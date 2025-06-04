import { Briefcase, Code, User } from 'lucide-react';
import Link from 'next/link';
import { PresentCard } from '../ui/PresentCard';

const presentCard = [
  {
    title: 'Web Development',
    icon: Code,
    description:
      'Creating responsive websites and web applications with modern frameworks.',
  },
  {
    title: 'UI/UX Design',
    icon: User,
    description:
      'Designing intuitive user interfaces and seamless user experiences.',
  },
  {
    title: 'Project Management',
    icon: Briefcase,
    description:
      'Leading projects from conception to completion with agile methodologies.',
  },
];

export const AboutSection = () => {
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
              With over 5 years of experience in web development, I specialize
              in creating responsive, accessible, and performant web
              applications using modern technologies.
            </p>

            <p className="text-muted-foreground">
              I'm passionate about creating elegant solutions to complex
              problems, and I'm constantly learning new technologies and
              techniques to stay at the forefront of the ever-evolving web
              landscape.
            </p>

            <div className="flex flex-row justify-center gap-4 pt-4">
              <Link href="#contact" className="custom-button">
                {' '}
                Me Contacter
              </Link>

              <Link href="#" className="outline-button">
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
