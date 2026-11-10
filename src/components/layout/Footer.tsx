import { ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export const Footer = () => {
  return (
    <footer className="border-border bg-background border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">(っ▀¯▀)つ</p>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#home" aria-label="Retour en haut">
              <ArrowUp />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};
