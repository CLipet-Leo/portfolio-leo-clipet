'use client';

import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NavLink } from '../ui/NavLink';

const navItems = [
  { name: 'Accueil', href: '#home' },
  { name: 'À propos', href: '#about' },
  { name: 'Compétences', href: '#skills' },
  { name: 'Projets', href: '#projects' },
  { name: 'Contact', href: '#contact' },
  // Add more items as needed
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        'fixed z-40 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/80 py-3 shadow-xs backdrop-blur-md'
          : 'py-5',
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          className="text-primary flex items-center text-xl font-bold"
          href="#home"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">Leo CLIPET </span>
            Portfolio
          </span>
        </Link>

        {/* Desktop navigation */}

        <div className="hidden space-x-8 md:flex">
          {navItems.map((item, key) => (
            <NavLink key={key} href={item.href}>
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile navigation */}

        <button
          className="text-foreground/80 z-50 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={cn(
            'bg-background/95 backdroup-blur-md fixed inset-0 z-40 flex flex-col items-center justify-center',
            'transition-all duration-300 md:hidden',
            isMenuOpen
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0',
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
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
        </div>
      </div>
    </nav>
  );
};
