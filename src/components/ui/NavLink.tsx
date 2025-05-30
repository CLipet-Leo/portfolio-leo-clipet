import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import styles from './NavLink.module.scss';

export function NavLink({
  href,
  children,
  icon: Icon,
}: {
  href: string;
  children?: React.ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <Link href={href} className={styles.navLink}>
      {Icon && <Icon className={styles.navIcon} />}
      {children && <span className={styles.navText}>{children}</span>}
    </Link>
  );
}
