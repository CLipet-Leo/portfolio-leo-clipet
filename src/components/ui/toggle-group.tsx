'use client';

import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

function ToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn('flex w-fit flex-wrap items-center', className)}
      {...props}
    />
  );
}

function ToggleGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        '-ml-px inline-flex h-8 items-center gap-2 border border-border bg-transparent px-3 font-dot text-[15px] font-bold text-muted-foreground transition-colors duration-[120ms] outline-none first:ml-0 first:rounded-l-md last:rounded-r-md hover:bg-accent hover:text-foreground focus-visible:z-10 focus-visible:ring-[3px] focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 pointer-coarse:h-11',
        'data-[state=on]:bg-brand-700 data-[state=on]:text-foreground data-[state=on]:[--dot-on:var(--brand-300)]',
        className,
      )}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
