import NotFoundScene from '@/components/three/NotFoundScene';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      <div className="h-56 w-full max-w-lg">
        <NotFoundScene />
      </div>
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-primary font-mono text-xs tracking-[0.12em] uppercase opacity-85">
          // erreur 404 — page introuvable
        </p>
        <h1 className="text-[clamp(28px,4vw,44px)] leading-[1.07] font-bold tracking-[-0.03em]">
          Vous êtes tombé
          <br />
          dans le <span className="text-primary">vide numérique.</span>
        </h1>
        <p className="text-muted-foreground max-w-xs text-sm leading-[1.7]">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Button variant="outline" asChild className="mt-1">
          <Link href="/">← Retour à l'accueil</Link>
        </Button>
      </div>
    </main>
  );
}
