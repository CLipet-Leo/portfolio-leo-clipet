import { ArrowUp } from 'lucide-react';
import { cacheLife } from 'next/cache';
import { Button } from '../ui/button';

export const Footer = async () => {
  // L'année courante est une valeur instable : elle est mise en cache.
  'use cache';
  cacheLife('days');

  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">(っ▀¯▀)つ</p>
          <Button variant="ghost" size="icon" asChild>
            {/* `#top` : haut du document, sur toutes les pages. */}
            <a href="#top" aria-label="Retour en haut">
              <ArrowUp />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
};
