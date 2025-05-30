import { BookText, HomeIcon } from 'lucide-react';
import { NavLink } from '../ui/NavLink';
import styles from './NavBarCustom.module.scss';

export default function NavBarCustom() {
  return (
    <nav className={styles.navBar}>
      <div className={styles.navContainer}>
        <NavLink href="/" icon={HomeIcon}>
          Accueil
        </NavLink>
        <NavLink href="/projects" icon={BookText}>
          Projets
        </NavLink>
      </div>
    </nav>
  );
}
