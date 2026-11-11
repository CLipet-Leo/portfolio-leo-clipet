import NotFoundScene from '@/components/three/not-found-scene';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-4 text-foreground">
      <div className="h-56 w-full max-w-lg">
        <NotFoundScene />
      </div>
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="font-mono text-label text-muted-foreground">
          {'// erreur 404 — page introuvable'}
        </p>
        <h1 className="font-dot text-signal font-bold lowercase">
          Vous êtes tombé
          <br />
          dans le vide numérique.
        </h1>
        <p className="max-w-xs text-small text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Button asChild className="mt-1">
          <Link href="/">
            <ArrowLeft data-icon="inline-start" />
            Retour à l'accueil
          </Link>
        </Button>
      </div>
    </main>
  );
}
