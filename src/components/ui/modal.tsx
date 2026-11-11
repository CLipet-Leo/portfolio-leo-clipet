'use client';

import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { Dialog, DialogContent, DialogTitle } from './dialog';

/**
 * Panneau d'une route interceptée, sur le Dialog shadcn. Fermer revient en
 * arrière dans l'historique, puisque l'ouverture a changé l'URL.
 */
function Modal({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  // L'état ouvert suit la route : après un retour arrière, la route quittée
  // peut rester montée, et un Dialog resté ouvert garderait la page inerte.
  const isOpen = usePathname().startsWith('/projets/');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="max-w-3xl" aria-describedby={undefined}>
        <DialogTitle className="sr-only">{label}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export { Modal };
