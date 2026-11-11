'use client';

import { Button } from '@/components/ui/button';
import './global.css';

/**
 * Erreur dans le root layout : cette page le remplace, elle fournit donc son
 * `<html>` et ses styles. Les polices du layout ne sont pas chargées ici ; les
 * jetons retombent sur les polices système.
 */
export default function GlobalError({ retry }: { retry: () => void }) {
  return (
    <html lang="fr" className="dark">
      <body>
        <title>Erreur — Léo Clipet</title>
        <main className="flex min-h-dvh flex-col items-center justify-center gap-3 dot-grid px-4 text-center">
          <p className="font-mono text-label text-muted-foreground">
            {'// erreur — site indisponible'}
          </p>
          <h1 className="font-dot text-signal font-bold lowercase">
            signal perdu
          </h1>
          <p className="max-w-sm text-small text-muted-foreground">
            Le site n'a pas pu s'afficher. Réessayez dans un instant.
          </p>
          <Button className="mt-1" onClick={() => retry()}>
            Réessayer
          </Button>
        </main>
      </body>
    </html>
  );
}
