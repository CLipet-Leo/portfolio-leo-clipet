import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export const HomeSection = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-4"
    >
      <div className="z-10 container mx-auto max-w-4xl text-center">
        <div className="space-y-6">
          <h1 className="md:text:6xl text-4xl font-bold tracking-tight">
            <span className="animate-fade-in opacity-0">Moi c'est</span>
            <span className="text-primary animate-fade-in-delay-1 opacity-0">
              {' '}
              Leo
            </span>
            <span className="text-gradient animate-fade-in-delay-2 opacity-0">
              {' '}
              CLIPET
            </span>
          </h1>
          <p className="text-muted-foreground max-2-2xl animate-fade-in-delay-3 mx-auto text-lg opacity-0 md:text-xl">
            Je suis développeur spécialisé en jeu vidéo et passionné par l'IA.
          </p>

          <div className="animate-fade-in-delay-4 pt-4 opacity-0">
            <Link href="#projects" className="custom-button">
              Voir mes projets
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform animate-bounce flex-col items-center">
        <span className="text-muted-foreground mb-2 text-sm"> Scroll </span>
        <ArrowDown className="text-primary h-5 w-5" />
      </div>
    </section>
  );
};
