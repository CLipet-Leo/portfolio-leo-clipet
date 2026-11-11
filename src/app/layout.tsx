import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${doto.variable}`}
      >
        <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
        {/* Toasts global */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
