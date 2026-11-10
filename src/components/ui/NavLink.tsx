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
      className="text-muted-foreground hover:text-foreground ease-system transition-colors duration-[120ms]"
    >
      {children && <span>{children}</span>}
    </Link>
  );
}
