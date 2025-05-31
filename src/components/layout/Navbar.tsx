import { BookText, HomeIcon } from 'lucide-react';
import { NavLink } from '../ui/NavLink';

/**
 * NavBarCustom component
 * This component renders a custom navigation bar with links to home, projects, and a profile image.
 * It uses Lucide icons for visual representation and custom styles for layout.
 */
export const Navbar = () => {
  return (
    <nav>
      <div>
        <NavLink href="/" icon={HomeIcon}>
          Accueil
        </NavLink>
        <NavLink href="/projects" icon={BookText}>
          Projets
        </NavLink>
      </div>
    </nav>
  );
};
