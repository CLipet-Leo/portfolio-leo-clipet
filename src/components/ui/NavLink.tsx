import Link from 'next/link';

export function NavLink({
  href,
  onClick = () => {},
  children,
}: {
  href: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-foreground/80 hover:text-primary transition-colors duration-300"
    >
      {children && <span>{children}</span>}
    </Link>
  );
}
