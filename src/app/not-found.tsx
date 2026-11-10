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
        <p className="text-label text-muted-foreground font-mono">
          // erreur 404 — page introuvable
        </p>
        <h1 className="font-dot text-signal font-bold lowercase">
          Vous êtes tombé
          <br />
          dans le vide numérique.
        </h1>
        <p className="text-small text-muted-foreground max-w-xs">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Button variant="outline" asChild className="mt-1">
          <Link href="/">← Retour à l'accueil</Link>
        </Button>
      </div>
    </main>
  );
}
