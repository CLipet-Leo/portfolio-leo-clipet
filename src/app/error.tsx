'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="font-mono text-label text-muted-foreground">
        {'// erreur — chargement interrompu'}
      </p>
      <h1 className="font-dot text-signal font-bold lowercase">signal perdu</h1>
      <p className="max-w-sm text-small text-muted-foreground">
        Cette page n'a pas pu être chargée. Le problème est peut-être passager :
        réessayez, ou revenez à l'accueil.
      </p>
      <div className="mt-1 flex flex-wrap items-center justify-center gap-4">
        <Button onClick={() => retry()}>Réessayer</Button>
        <Button variant="link" asChild>
          <Link href="/">retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
}
