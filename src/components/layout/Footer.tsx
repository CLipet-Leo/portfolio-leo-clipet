import { ArrowUp } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-card border-border relative mt-12 flex flex-wrap items-center justify-between border-t px-4 py-12 pt-8">
      {' '}
      <p className="text-muted-foreground text-sm">
        {' '}
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>
      <p className="text-muted-foreground text-sm">(っ▀¯▀)つ</p>
      <Link
        href="#home"
        className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full p-2 transition-colors"
      >
        <ArrowUp size={20} />
      </Link>
    </footer>
  );
};
