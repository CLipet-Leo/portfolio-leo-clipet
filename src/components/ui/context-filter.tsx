'use client';

import {
  CONTEXT_LABELS,
  type ProjectContext,
} from '@/constants/project-context';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { DotIcon } from './dot-icon';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

type Filter = 'tous' | ProjectContext;

const FILTERS: Filter[] = ['tous', 'pro', 'perso', 'ecole'];

/**
 * Filtre par contexte. Les enfants restent rendus côté serveur : ceux qui
 * portent `data-context` et `CONTEXT_FILTER_CLASS` sont masqués en CSS.
 */
function ContextFilter({
  contexts,
  className,
  children,
}: {
  /** Contexte de chaque projet filtrable, pour les compteurs. */
  contexts: ProjectContext[];
  className?: string;
  children: React.ReactNode;
}) {
  const [filter, setFilter] = React.useState<Filter>('tous');

  return (
    <div
      data-slot="context-filter"
      data-filter={filter}
      className={cn('group/filter', className)}
    >
      <ToggleGroup
        type="single"
        value={filter}
        onValueChange={(value) => value && setFilter(value as Filter)}
        aria-label="Filtrer les projets par contexte"
      >
        {FILTERS.map((id) => (
          <ToggleGroupItem key={id} value={id}>
            <DotIcon name={id} />
            {id === 'tous' ? 'tous' : CONTEXT_LABELS[id]}
            <span className="font-mono text-label font-medium text-muted-foreground">
              {id === 'tous'
                ? contexts.length
                : contexts.filter((c) => c === id).length}
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {children}
    </div>
  );
}

export { ContextFilter };
