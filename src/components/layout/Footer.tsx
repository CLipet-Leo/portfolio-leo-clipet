import { ArrowUp } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-border bg-card border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">(っ▀¯▀)つ</p>
          <Link
            href="#home"
            className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full p-2 transition-colors"
            aria-label="Retour en haut"
          >
            <ArrowUp size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
};
