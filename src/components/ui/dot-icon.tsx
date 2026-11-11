import * as React from 'react';

import { cn } from '@/lib/utils';

const ICONS = {
  tous: ['#.#.#', '.....', '#.#.#', '.....', '#.#.#'],
  pro: ['.###.', '#####', '##.##', '#####', '#####'],
  perso: ['..#..', '..#..', '.....', '.###.', '#####'],
  ecole: ['..#..', '.###.', '#####', '.#.#.', '.###.'],
} as const;

type DotIconName = keyof typeof ICONS;

const SIZES = { xs: { dot: 2, gap: 1 }, md: { dot: 4, gap: 2 } } as const;

function DotIcon({
  name,
  size = 'xs',
  className,
  ...props
}: React.ComponentProps<'span'> & {
  name: DotIconName;
  size?: keyof typeof SIZES;
}) {
  const { dot, gap } = SIZES[size];
  const cells = ICONS[name].join('').split('');
  return (
    <span
      aria-hidden="true"
      data-slot="dot-icon"
      className={cn('grid shrink-0', className)}
      style={{ gridTemplateColumns: `repeat(5, ${dot}px)`, gap }}
      {...props}
    >
      {cells.map((c, i) => (
        <span
          key={i}
          className="block rounded-full"
          style={{
            width: dot,
            height: dot,
            background:
              c === '#' ? 'var(--dot-on, currentColor)' : 'transparent',
          }}
        />
      ))}
    </span>
  );
}

export { DotIcon, ICONS, type DotIconName };
