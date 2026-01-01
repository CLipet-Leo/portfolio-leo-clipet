import { Item, ItemContent, ItemMedia, ItemTitle } from './item';

export interface HomeItemProps {
  title: string;
  icon: React.ReactNode;
  href?: string;
}

export function HomeItem({ title, icon, href }: HomeItemProps) {
  return (
    <Item variant="outline" size="sm">
      <ItemMedia variant={'icon'}>{icon}</ItemMedia>
      <ItemContent>
        {href ? (
          <ItemTitle>
            <a className="hover:underline" href={href}>
              {title}
            </a>
          </ItemTitle>
        ) : (
          <ItemTitle>{title}</ItemTitle>
        )}
      </ItemContent>
      {/* {href && (
        <ItemActions>
          <ExternalLink className="text-muted-foreground size-4" />
        </ItemActions>
      )} */}
    </Item>
  );
}
