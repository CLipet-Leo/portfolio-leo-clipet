import { Footer } from '@/components/layout/FooterCustom';
import { Navbar } from '@/components/layout/Navbar';
import { ReactNode } from 'react';
import '../styles/globals.css';
import styles from './layout.module.scss';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={styles.body}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
