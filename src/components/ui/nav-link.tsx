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
      className="text-muted-foreground transition-colors duration-[120ms] ease-system hover:text-foreground"
    >
      {children && <span>{children}</span>}
    </Link>
  );
}
