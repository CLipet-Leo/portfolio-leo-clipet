'use client';

import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { NavLink } from '../ui/nav-link';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';

const navItems = [
  { name: 'Parcours', href: '/#parcours' },
  { name: 'Compétences', href: '/#competences' },
  { name: 'Projets', href: '/projets' },
  { name: 'Contact', href: '/#contact' },
];

/**
 * NavBarCustom component
 * This component renders a custom navigation bar with links to home, projects, and a profile image.
 * It uses Lucide icons for visual representation and custom styles for layout.
 */
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 z-50 w-full transition-[background-color,padding] duration-[120ms] ease-system',
        isScrolled ? 'bg-background/80 py-3 backdrop-blur-md' : 'py-5',
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link
          className="flex items-center font-dot text-xl font-bold text-foreground lowercase"
          href="/"
        >
          Leo's Portfolio
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item, key) => (
            <NavLink key={key} href={item.href}>
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile navigation */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent aria-describedby={undefined}>
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="mt-4 flex flex-col gap-6 text-xl">
              {navItems.map((item, key) => (
                <NavLink
                  key={key}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
