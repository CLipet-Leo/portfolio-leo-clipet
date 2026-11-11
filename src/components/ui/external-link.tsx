import * as React from 'react';

/** Lien externe sans style : nouvel onglet, `rel` sûr, annonce lecteur d'écran. Se compose comme `next/link` (`<Button asChild>`). */
function ExternalLink({
  children,
  ...props
}: React.ComponentProps<'a'> & { href: string }) {
  return (
    <a data-slot="external-link" target="_blank" rel="noreferrer" {...props}>
      {children}
      <span className="sr-only">(nouvel onglet)</span>
    </a>
  );
}

export { ExternalLink };
