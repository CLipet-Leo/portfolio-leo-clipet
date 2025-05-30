import NavbarCustom from '@/components/layout/NavBarCustom';
import { ReactNode } from 'react';
import '../styles/globals.css';
import styles from './layout.module.scss';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={styles.body}>
        <NavbarCustom />
        <main className={styles.mainContent}>{children}</main>
      </body>
    </html>
  );
}
