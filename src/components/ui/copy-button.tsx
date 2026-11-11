'use client';

import * as React from 'react';
import { Button } from './button';

/** Copie `value` dans le presse-papiers et le confirme en toutes lettres 2 s. */
function CopyButton({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
    if (!isCopied) return;
    const id = window.setTimeout(() => setIsCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [isCopied]);

  return (
    <Button
      variant="link"
      data-slot="copy-button"
      onClick={() =>
        navigator.clipboard.writeText(value).then(
          () => setIsCopied(true),
          () => {},
        )
      }
    >
      <span role="status">{isCopied ? 'copié' : children}</span>
    </Button>
  );
}

export { CopyButton };
