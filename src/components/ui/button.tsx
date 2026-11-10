import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-dot font-bold tracking-[0.02em] outline-none transition-[color,background-color,border-color] duration-[120ms] ease-system disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'chamfer-button text-primary-foreground hover:[--chamfer-fill:color-mix(in_oklab,var(--primary)_90%,black)]',
        secondary:
          'rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline:
          'rounded-md border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
        ghost: 'rounded-md hover:bg-accent hover:text-accent-foreground',
        link: 'text-brand-400 underline-offset-4 hover:text-brand-200 hover:underline',
        destructive:
          'rounded-md border border-destructive/35 bg-destructive/12 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/35',
      },
      size: {
        default: 'h-9 px-4 text-[16px] has-[>svg]:px-3 pointer-coarse:h-11',
        sm: 'h-8 gap-1.5 px-3 text-[15px] pointer-coarse:h-11',
        lg: 'h-10 px-6 text-[17px] pointer-coarse:h-11',
        icon: 'size-9 pointer-coarse:size-11',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
