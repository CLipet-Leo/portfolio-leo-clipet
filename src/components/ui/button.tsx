import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 font-dot font-bold tracking-[0.02em] whitespace-nowrap transition-colors duration-[120ms] ease-system outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'chamfer-button text-primary-foreground [--button-fill:var(--primary)] hover:[--button-fill:color-mix(in_oklab,var(--primary)_90%,black)]',
        secondary:
          'chamfer-button text-secondary-foreground [--button-fill:var(--secondary)] hover:[--button-fill:color-mix(in_oklab,var(--secondary),var(--foreground)_4%)]',
        outline:
          'chamfer-button [--button-border:var(--border)] hover:text-accent-foreground hover:[--button-fill:var(--accent)]',
        ghost:
          'chamfer-button hover:text-accent-foreground hover:[--button-fill:var(--accent)]',
        link: 'rounded-sm text-brand-400 underline-offset-4 hover:text-brand-200 hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/60',
        destructive:
          'chamfer-button text-destructive [--button-border:color-mix(in_oklab,var(--destructive)_35%,transparent)] [--button-fill:color-mix(in_oklab,var(--destructive)_12%,transparent)] [--button-ring:color-mix(in_oklab,var(--destructive)_35%,transparent)] hover:[--button-border:color-mix(in_oklab,var(--destructive)_50%,transparent)] hover:[--button-fill:color-mix(in_oklab,var(--destructive)_20%,transparent)]',
      },
      size: {
        default: 'h-9 px-4 text-[16px] has-[>svg]:px-3 pointer-coarse:h-11',
        sm: 'h-8 gap-1.5 px-3 text-[15px] has-[>svg]:px-2.5 pointer-coarse:h-11',
        lg: 'h-10 px-6 text-[17px] has-[>svg]:px-4 pointer-coarse:h-11',
        icon: 'size-9 pointer-coarse:size-11',
      },
    },
    compoundVariants: [
      {
        variant: 'link',
        className:
          'h-auto px-0 font-mono text-data font-normal tracking-normal lowercase has-[>svg]:px-0',
      },
    ],
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
