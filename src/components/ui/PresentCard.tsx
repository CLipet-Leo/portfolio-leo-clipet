import type { LucideIcon } from 'lucide-react';

interface PresentCardProps {
  title: string;
  icon: LucideIcon;
  children?: React.ReactNode;
}

export const PresentCard = ({
  title,
  icon: Icon,
  children,
}: PresentCardProps) => {
  return (
    <div className="bg-card gradient-border card-hover rounded-lg p-6">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 rounded-full p-2">
          <Icon className="text-primary h-6 w-6" />
        </div>
        <div className="text-left">
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-muted-foreground">{children}</p>
        </div>
      </div>
    </div>
  );
};
