'use client';

import { Separator as SeparatorPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  variant?: 'default' | 'dotted';
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      data-variant={variant}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0',
        variant === 'default' &&
          'bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        variant === 'dotted' &&
          '[--dots-color:var(--border)] data-[orientation=horizontal]:dots-x data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:dots-y',
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
