import Link from 'next/link';
import styles from './NavBarCustom.module.scss';

export default function NavBarCustom() {
  return (
    <nav className={styles.navBar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.link}>
          Accueil
        </Link>
        <Link href="/projects" className={styles.link}>
          Projets
        </Link>
      </div>
    </nav>
  );
}
