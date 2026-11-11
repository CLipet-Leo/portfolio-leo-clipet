import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import './global.css';

const geistSans = localFont({
  src: [
    {
      path: '../../public/fonts/Geist/Geist-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist/Geist-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
});

const geistMono = localFont({
  src: [
    {
      path: '../../public/fonts/GeistMono/GeistMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GeistMono/GeistMono-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
});

const doto = localFont({
  src: [
    {
      path: '../../public/fonts/Doto/Doto-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-doto',
});

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio de Léo Clipet',
  description: 'Développeur spécialisé jeu vidéo et applications',
  keywords: [
    'portfolio',
    'développeur jeu vidéo',
    'développeur applications',
    'développeur 3D',
    '3D',
    'Next.js',
    'React',
    'Three.js',
    'TypeScript',
    'C++',
    'Unity',
    'Unreal Engine',
  ],
  authors: [{ name: 'Léo Clipet', url: 'https://github.com/CLipet-Leo' }],
  openGraph: {
    title: 'Portfolio de Léo Clipet',
    description:
      'Développeur jeu vidéo et applications, spécialisé en 3D temps réel',
    url: 'https://clipet-leo.dev',
    type: 'website',
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  /** Slot `@modal` : fiche projet ouverte par-dessus la page (route interceptée). */
  modal: ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${doto.variable}`}
      >
        <a
          href="#contenu"
          className="sr-only z-100 bg-background px-4 py-2 font-mono text-data text-foreground focus-visible:not-sr-only focus-visible:fixed focus-visible:top-2 focus-visible:left-2"
        >
          aller au contenu
        </a>
        <div className="min-h-screen overflow-x-clip bg-background text-foreground">
          <Navbar />
          <main id="contenu">{children}</main>
          <Footer />
        </div>
        {modal}
      </body>
    </html>
  );
}
