'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

interface IMiniMapItem {
  /** Identifiant de la section cible (`<section id>`). */
  id: string;
  number: string;
  title: string;
  years?: string;
}

/**
 * Index de la timeline : un lien par période, celle qui est à l'écran est
 * marquée (`aria-current`, point plein). Colonne à gauche sur grand écran,
 * barre de points sous la navigation sinon.
 */
function MiniMap({
  items,
  className,
}: {
  items: IMiniMapItem[];
  className?: string;
}) {
  const [active, setActive] = React.useState<string>();

  React.useEffect(() => {
    // Bande étroite au tiers haut de l'écran : une seule période la traverse.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    for (const { id } of items) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav data-slot="mini-map" aria-label="Périodes" className={className}>
      <ol className="flex gap-1 xl:flex-col">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                className="group flex items-center gap-2 rounded-sm px-2 py-1.5 font-mono text-label text-muted-foreground lowercase transition-colors duration-[120ms] ease-system outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/60 aria-[current]:text-foreground pointer-coarse:py-3.5"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-2 shrink-0 rounded-full border border-faint',
                    isActive && 'border-primary bg-primary',
                  )}
                />
                {item.number}
                <span className="max-xl:sr-only">
                  {item.title}
                  {item.years && ` · ${item.years}`}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { MiniMap, type IMiniMapItem };
