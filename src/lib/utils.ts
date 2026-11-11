import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Tailles `--text-*` de global.css : sans elles, tailwind-merge prend
// `text-data` pour une couleur et le supprime face à `text-foreground`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'signal-xl',
        'signal',
        'h2',
        'h3',
        'body',
        'small',
        'data',
        'label',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
