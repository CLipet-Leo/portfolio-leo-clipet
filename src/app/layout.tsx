import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

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
    <html lang="fr">
      <body>
        <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
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
