# Composants — primitives du portfolio « Schéma »

Description et implémentation de référence de chaque primitive. Elles suivent les conventions shadcn/ui (new-york, Tailwind CSS v4) : fichiers dans `components/ui/`, variantes `cva`, attribut `data-slot` sur chaque élément, composition Radix, `cn()` depuis `@/lib/utils`. Les tokens et utilitaires (`chamfer-button`, `chamfer-frame`, `skeleton-dots`, `dots-x`…) sont définis dans [../src/app/global.css](../src/app/global.css). Les décisions de fond sont dans `design-system.md`.

Dépendances : `pnpm exec shadcn add <composant>` installe ce qu'il faut (`radix-ui`, `class-variance-authority`…). Après chaque ajout, vérifier que `cn` est importé depuis `@/lib/utils` (le CLI peut le résoudre en paquet `cn`) et réappliquer la recette ci-dessous.

### Règles communes

- **Libellés en Doto** (`font-dot font-bold`, 14–17 px). Le contenu saisi, les descriptions et les données restent en Geist / Geist Mono.
- **Focus** : `focus-visible:ring-[3px] focus-visible:ring-ring/60` partout, sauf sur les boutons, chanfreinés, qui utilisent l'anneau chanfreiné de `chamfer-button`.
- **Chanfrein = angles vifs** : tous les boutons (sauf `link`) ont le double chanfrein de `chamfer-button`, réglé par `--button-fill`, `--button-border` et `--button-ring`. Les autres éléments gardent `rounded-sm` (4) ou `rounded-md` (6).
- **Tactile** : `pointer-coarse:h-11` (44 px) sur les éléments cliquables.
- **Couleur** : le bleu ne sert qu'à l'état actif, la sélection et le flux.

### Sommaire

1. [Button](#1-button)
2. [Badge](#2-badge)
3. [Label](#3-label)
4. [Input](#4-input)
5. [Textarea](#5-textarea)
6. [Checkbox](#6-checkbox)
7. [Switch](#7-switch)
8. [RadioGroup](#8-radiogroup)
9. [DotIcon](#9-doticon)
10. [Tabs](#10-tabs)
11. [ToggleGroup](#11-togglegroup)
12. [Tooltip](#12-tooltip)
13. [Kbd](#13-kbd)
14. [Separator](#14-separator)
15. [Card](#15-card)
16. [Skeleton](#16-skeleton)
17. [Spinner (braille)](#17-spinner-braille)
18. [DotMatrixLoader](#18-dotmatrixloader)
19. [Progress](#19-progress)
20. [Connector](#20-connector)
21. [ExternalLink](#21-externallink)
22. [Table](#22-table)
23. [Dialog](#23-dialog)
24. [Sheet](#24-sheet)

---

## 1. Button

Déclenche une action ou ouvre un lien (`asChild`). Une seule action `default` par vue.

| Variante      | Usage                 | Rendu                                             |
| ------------- | --------------------- | ------------------------------------------------- |
| `default`     | Action principale     | Fond primaire, texte blanc                        |
| `secondary`   | Action d'appoint      | Fond `secondary`, survol éclairci                 |
| `outline`     | Lien externe, dépôt   | Bord `border`, survol `accent`                    |
| `ghost`       | Barre d'outils, son   | Transparent, survol `accent`                      |
| `link`        | Dans le texte         | Mono `text-data`, `brand-400`, souligné au survol |
| `destructive` | Effacer un formulaire | Teinté rouge (jamais plein)                       |

Toutes les variantes sauf `link` partagent la même forme : **double chanfrein** et anneau de focus chanfreiné.

Tailles : `sm` (h-8), `default` (h-9), `lg` (h-10), `icon` (size-9) — toutes à 44 px au tactile.

```tsx
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 font-dot font-bold tracking-[0.02em] whitespace-nowrap transition-colors duration-[120ms] ease-system outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'chamfer-button text-primary-foreground [--button-fill:var(--primary)] hover:[--button-fill:color-mix(in_oklab,var(--primary)_90%,black)]',
        secondary:
          'chamfer-button text-secondary-foreground [--button-fill:var(--secondary)] hover:[--button-fill:color-mix(in_oklab,var(--secondary),var(--foreground)_4%)]',
        outline:
          'chamfer-button [--button-border:var(--border)] hover:text-accent-foreground hover:[--button-fill:var(--accent)]',
        ghost:
          'chamfer-button hover:text-accent-foreground hover:[--button-fill:var(--accent)]',
        link: 'rounded-sm text-brand-400 underline-offset-4 hover:text-brand-200 hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/60',
        destructive:
          'chamfer-button text-destructive [--button-border:color-mix(in_oklab,var(--destructive)_35%,transparent)] [--button-fill:color-mix(in_oklab,var(--destructive)_12%,transparent)] [--button-ring:color-mix(in_oklab,var(--destructive)_35%,transparent)] hover:[--button-border:color-mix(in_oklab,var(--destructive)_50%,transparent)] hover:[--button-fill:color-mix(in_oklab,var(--destructive)_20%,transparent)]',
      },
      size: {
        default: 'h-9 px-4 text-[16px] has-[>svg]:px-3 pointer-coarse:h-11',
        sm: 'h-8 gap-1.5 px-3 text-[15px] has-[>svg]:px-2.5 pointer-coarse:h-11',
        lg: 'h-10 px-6 text-[17px] has-[>svg]:px-4 pointer-coarse:h-11',
        icon: 'size-9 pointer-coarse:size-11',
      },
    },
    compoundVariants: [
      {
        variant: 'link',
        className:
          'h-auto px-0 font-mono text-data font-normal tracking-normal lowercase has-[>svg]:px-0',
      },
    ],
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

```tsx
// Usage
<Button>Voir le dépôt</Button>
<Button variant="outline" asChild>
  <ExternalLink href="https://github.com/[compte]/[dépôt]">
    Dépôt <ArrowUpRight />
  </ExternalLink>
</Button>
<Button size="icon" aria-label="Période suivante">
  <DotIcon name="lien" />
</Button>
```

---

## 2. Badge

Étiquette courte et non interactive : technologie, type de projet, statut.

| Variante        | Usage                                                               |
| --------------- | ------------------------------------------------------------------- |
| `default`       | État actif (rare)                                                   |
| `secondary`     | Technologie                                                         |
| `outline`       | Type de projet (personnel / professionnel)                          |
| `destructive`   | Erreur                                                              |
| `dot` _(ajout)_ | Statut ou catégorie, en mono minuscule, précédé d'un point primaire |

```tsx
// components/ui/badge.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex h-5.5 w-fit shrink-0 items-center gap-1.5 overflow-hidden rounded-sm border px-2 font-dot text-[14px] font-bold whitespace-nowrap transition-[color,background-color] focus-visible:ring-[3px] focus-visible:ring-ring/60 [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        outline:
          'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        destructive: 'border-destructive/35 bg-destructive/12 text-destructive',
        dot: "border-border font-mono text-label font-medium text-foreground lowercase before:size-1.5 before:rounded-full before:bg-primary before:content-['']",
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
```

```tsx
<Badge variant="secondary">Rust</Badge>
<Badge variant="dot">outils</Badge>
```

---

## 3. Label

Libellé de champ, toujours relié à son contrôle (`htmlFor`). En Doto 16 px.

```tsx
// components/ui/label.tsx
'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/lib/utils';

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex items-center gap-2 font-dot text-[16px] leading-none font-bold select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Label };
```

---

## 4. Input

Champ de saisie (formulaire de contact). Le texte saisi est en Geist, lisible ; le libellé au-dessus est en Doto. États : défaut, `focus-visible` (bord `ring` + anneau 3 px), `aria-invalid` (bord et anneau destructifs, message d'aide en dessous), `disabled` (opacité 50 %).

```tsx
// components/ui/input.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 font-sans text-small text-foreground transition-[color,box-shadow] outline-none selection:bg-brand-700 selection:text-brand-100 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 pointer-coarse:h-11',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/60',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
```

```tsx
<div className="grid gap-2">
  <Label htmlFor="email">E-mail</Label>
  <Input
    id="email"
    type="email"
    aria-invalid={!!error}
    aria-describedby="email-help"
  />
  <p
    id="email-help"
    className="font-mono text-label text-muted-foreground aria-invalid:text-destructive"
  >
    {error ?? 'Pour te répondre.'}
  </p>
</div>
```

---

## 5. Textarea

Message libre du formulaire de contact. Mêmes états que l'Input, hauteur minimale 64 px, grandit avec le contenu (`field-sizing-content`).

```tsx
// components/ui/textarea.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 font-sans text-small text-foreground transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/60',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
```

---

## 6. Checkbox

Choix multiple indépendant (ex. projets personnels / professionnels). Coché : fond primaire, coche blanche — seule icône au trait tolérée, car c'est une convention d'interface.

```tsx
// components/ui/checkbox.tsx
'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer size-4 shrink-0 rounded-sm border border-input transition-shadow outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className="size-3" strokeWidth={2.5} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
```

```tsx
<div className="flex items-center gap-2.5">
  <Checkbox id="perso" defaultChecked />
  <Label htmlFor="perso">Projets personnels</Label>
</div>
```

---

## 7. Switch

Réglage binaire à effet immédiat : son ambiant, réduction du mouvement. Le pouce est un point : `foreground` quand activé, `muted-foreground` sinon.

```tsx
// components/ui/switch.tsx
'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer inline-flex h-[18px] w-8 shrink-0 items-center rounded-full border border-transparent p-px transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-4 rounded-full transition-transform duration-[120ms] ease-system data-[state=checked]:translate-x-[14px] data-[state=checked]:bg-foreground data-[state=unchecked]:translate-x-0 data-[state=unchecked]:bg-muted-foreground"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
```

---

## 8. RadioGroup

Choix unique parmi peu d'options (variante de formulaire de la bascule de densité). L'indicateur est un point primaire de 8 px.

```tsx
// components/ui/radio-group.tsx
'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'aspect-square size-4 shrink-0 rounded-full border border-input transition-shadow outline-none focus-visible:ring-[3px] focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <span className="size-2 rounded-full bg-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
```

---

## 9. DotIcon

Primitive de signature : icône dessinée sur une grille de 5 × 5 points. Remplace les icônes au trait. Le jeu d'icônes se limite à celles qui servent : aujourd'hui les contextes du filtre (tous, pro, perso, école). Le point allumé prend `--dot-on` (par défaut `currentColor`), ce qui permet à un parent sélectionné de le passer en `brand-300`.

| Taille | Point / pas | Usage                               |
| ------ | ----------- | ----------------------------------- |
| `xs`   | 2 / 3 px    | Dans un bouton, une puce, un toggle |
| `md`   | 4 / 6 px    | Seule, en légende                   |

```tsx
// components/ui/dot-icon.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

const ICONS = {
  tous: ['#.#.#', '.....', '#.#.#', '.....', '#.#.#'],
  pro: ['.###.', '#####', '##.##', '#####', '#####'],
  perso: ['..#..', '..#..', '.....', '.###.', '#####'],
  ecole: ['..#..', '.###.', '#####', '.#.#.', '.###.'],
} as const;

type DotIconName = keyof typeof ICONS;

const SIZES = { xs: { dot: 2, gap: 1 }, md: { dot: 4, gap: 2 } } as const;

function DotIcon({
  name,
  size = 'xs',
  className,
  ...props
}: React.ComponentProps<'span'> & {
  name: DotIconName;
  size?: keyof typeof SIZES;
}) {
  const { dot, gap } = SIZES[size];
  const cells = ICONS[name].join('').split('');
  return (
    <span
      aria-hidden="true"
      data-slot="dot-icon"
      className={cn('grid shrink-0', className)}
      style={{ gridTemplateColumns: `repeat(5, ${dot}px)`, gap }}
      {...props}
    >
      {cells.map((c, i) => (
        <span
          key={i}
          className="block rounded-full"
          style={{
            width: dot,
            height: dot,
            background:
              c === '#' ? 'var(--dot-on, currentColor)' : 'transparent',
          }}
        />
      ))}
    </span>
  );
}

export { DotIcon, ICONS, type DotIconName };
```

---

## 10. Tabs

Bascule entre vues d'un même contexte : densité (Complet / Compact). Garde l'API shadcn ; la variante `line` remplace la pilule sur fond `muted` par un soulignement primaire de 2 px.

```tsx
// components/ui/tabs.tsx
'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-4', className)}
      {...props}
    />
  );
}

const tabsListVariants = cva('inline-flex w-fit items-center', {
  variants: {
    variant: {
      line: 'gap-6 border-b border-border',
      pill: 'h-9 gap-1 rounded-lg bg-muted p-[3px]',
    },
  },
  defaultVariants: { variant: 'line' },
});

function TabsList({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant ?? 'line'}
      className={cn('group/tabs', tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'inline-flex h-9 items-center justify-center gap-2 font-dot text-[16px] font-bold whitespace-nowrap text-muted-foreground transition-colors duration-[120ms] outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 pointer-coarse:h-11',
        'group-data-[variant=line]/tabs:-mb-px group-data-[variant=line]/tabs:border-b-2 group-data-[variant=line]/tabs:border-transparent group-data-[variant=line]/tabs:data-[state=active]:border-primary',
        'group-data-[variant=pill]/tabs:rounded-md group-data-[variant=pill]/tabs:px-3 group-data-[variant=pill]/tabs:data-[state=active]:bg-background',
        'data-[state=active]:text-foreground',
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
```

```tsx
<Tabs value={densite} onValueChange={setDensite}>
  <TabsList aria-label="Densité de la page">
    <TabsTrigger value="complet">Complet</TabsTrigger>
    <TabsTrigger value="compact">Compact</TabsTrigger>
  </TabsList>
</Tabs>
```

---

## 11. ToggleGroup

Filtre par contexte (tous, pro, perso, école) : la navigation principale de la timeline. Boutons accolés (variante `outline`), chacun avec une `DotIcon` et un compteur mono qui annonce ce qu'on va voir avant le clic. Sélection : fond `brand-700`, point allumé `brand-300`.

```tsx
// components/ui/toggle-group.tsx
'use client';

import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

import { cn } from '@/lib/utils';

function ToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn('flex w-fit flex-wrap items-center', className)}
      {...props}
    />
  );
}

function ToggleGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        '-ml-px inline-flex h-8 items-center gap-2 border border-border bg-transparent px-3 font-dot text-[15px] font-bold text-muted-foreground transition-colors duration-[120ms] outline-none first:ml-0 first:rounded-l-md last:rounded-r-md hover:bg-accent hover:text-foreground focus-visible:z-10 focus-visible:ring-[3px] focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 pointer-coarse:h-11',
        'data-[state=on]:bg-brand-700 data-[state=on]:text-foreground data-[state=on]:[--dot-on:var(--brand-300)]',
        className,
      )}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
```

```tsx
<ToggleGroup
  type="single"
  value={filter}
  onValueChange={(v) => v && setFilter(v)}
  aria-label="Filtre par intérêt"
>
  {CATEGORIES.map((c) => (
    <ToggleGroupItem key={c.id} value={c.id}>
      <DotIcon name={c.icon} />
      {c.label}
      <span className="font-mono text-label font-medium text-muted-foreground">
        {c.count}
      </span>
    </ToggleGroupItem>
  ))}
</ToggleGroup>
```

---

## 12. Tooltip

Aide courte au survol ou au focus (ex. « Aller à la période 02 » sur la mini-carte). Fond `popover` + bordure plutôt que primaire : le bleu reste réservé à l'état actif. Pas de flèche. Peut contenir un `Kbd`.

```tsx
// components/ui/tooltip.tsx
'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

function TooltipProvider({
  delayDuration = 150,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger(
  props: React.ComponentProps<typeof TooltipPrimitive.Trigger>,
) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'z-50 flex w-fit items-center gap-2.5 rounded-md border border-border bg-popover px-2.5 py-1.5 font-dot text-[14px] font-bold text-popover-foreground',
          'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          className,
        )}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
```

---

## 13. Kbd

Touche clavier, dans un tooltip ou une aide de navigation (`↑` `↓` pour changer de période, `f` pour filtrer).

```tsx
// components/ui/kbd.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'pointer-events-none inline-flex h-5 min-w-5 items-center justify-center rounded-sm border border-border bg-surface-2 px-1 font-mono text-[11px] text-muted-foreground select-none',
        className,
      )}
      {...props}
    />
  );
}

export { Kbd };
```

---

## 14. Separator

Sépare deux groupes. `default` : filet plein 1 px. `dotted` _(ajout)_ : ligne de points, cohérente avec les liaisons.

```tsx
// components/ui/separator.tsx
'use client';

import { Separator as SeparatorPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  variant?: 'default' | 'dotted';
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      data-variant={variant}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0',
        variant === 'default' &&
          'bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        variant === 'dotted' &&
          '[--dots-color:var(--border)] data-[orientation=horizontal]:dots-x data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:dots-y',
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
```

---

## 15. Card

Conteneur de la fiche projet. Cadre 1 px **double chanfrein** (`chamfer-lg`), angles vifs, sans fond ni ombre. Tout le contenu est visible sans clic. Slots shadcn conservés : `card`, `card-header`, `card-title`, `card-description`, `card-action`, `card-content`, `card-footer`.

Pour la période active, le cadre peut passer en primaire : `[--chamfer-border:var(--primary)]`.

```tsx
// components/ui/card.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'chamfer-frame flex flex-col gap-6 py-6 text-card-foreground [--chamfer:var(--chamfer-lg)]',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('text-h2 font-semibold', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-small text-muted-foreground', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex items-center justify-between gap-4 px-6 [.border-t]:pt-6',
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
```

```tsx
<Card>
  <CardHeader>
    <CardTitle>Gestionnaire SSH natif</CardTitle>
    <CardDescription>
      Application de bureau native pour ses connexions SSH.
    </CardDescription>
    <CardAction>
      <Badge variant="dot">outils</Badge>
    </CardAction>
  </CardHeader>
  <CardContent>
    <dl className="grid grid-cols-[88px_1fr] gap-x-4 gap-y-2">
      <dt className="font-mono text-label text-muted-foreground">stack</dt>
      <dd className="font-mono text-data">rust · iced 0.14 · ssh2 · sqlx</dd>
      <dt className="font-mono text-label text-muted-foreground">ia</dt>
      <dd className="font-mono text-data">[fait par l'ia · décidé par toi]</dd>
      <dt className="font-mono text-label text-muted-foreground">résultat</dt>
      <dd className="font-mono text-data">[une phrase]</dd>
    </dl>
  </CardContent>
  <CardFooter>
    <Button variant="link" asChild>
      <ExternalLink href="https://github.com/[compte]/[dépôt]">
        github.com/[compte]/[dépôt] ↗
      </ExternalLink>
    </Button>
    <Button variant="outline" size="sm">
      Architecture
    </Button>
  </CardFooter>
</Card>
```

---

## 16. Skeleton

Attente d'un contenu dont la **mise en page est connue**. Trame de points traversée par le shimmer bleu. Le squelette reprend la taille exacte du contenu final : placer la bande dans une ligne de la hauteur d'interligne du token (ex. `h-[26px]` pour `text-body`) pour que rien ne bouge à l'arrivée du texte.

```tsx
// components/ui/skeleton.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn('skeleton-dots', className)}
      {...props}
    />
  );
}

export { Skeleton };
```

```tsx
// Squelette d'une fiche : même structure que la Card finale
<div aria-busy={loading}>
  {loading ? (
    <Card aria-hidden="true" className="animate-build">
      <CardHeader>
        <div className="flex h-7 items-center">
          <Skeleton className="h-6 w-3/5" />
        </div>
        <div className="flex h-[22px] items-center">
          <Skeleton className="h-3 w-full" />
        </div>
      </CardHeader>
    </Card>
  ) : (
    <ProjectCard project={project} className="animate-build" />
  )}
</div>
```

---

## 17. Spinner (braille)

Attente qui **tient dans une ligne de texte** : bouton en cours, ligne de statut, appel externe. Caractères braille Unicode (`U+2800`, grille 2 × 4 points par caractère) recalculés à chaque image. L'animation écrit directement dans le DOM (pas de re-rendu React) et reste figée avec `prefers-reduced-motion`.

| Variante  | Usage             |
| --------- | ----------------- |
| `snake`   | Bouton en cours   |
| `scan`    | Statut de section |
| `wave`    | Appel externe     |
| `breathe` | Saut de période   |

```tsx
// components/ui/spinner.tsx
'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type Variant = 'snake' | 'scan' | 'wave' | 'breathe';

const BITS = [
  [0x01, 0x08],
  [0x02, 0x10],
  [0x04, 0x20],
  [0x40, 0x80],
]; // [rangée][colonne] → bit du motif braille

function frame(width: number, t: number, variant: Variant): string {
  const cols = width * 2;
  const lit = new Set<number>();
  const on = (x: number, y: number) => {
    if (x >= 0 && x < cols && y >= 0 && y < 4) lit.add(y * cols + x);
  };

  if (variant === 'scan') {
    const x = t % (cols + 2);
    for (let y = 0; y < 4; y++) {
      on(x, y);
      on(x - 1, y);
    }
  } else if (variant === 'snake') {
    const path: [number, number][] = [];
    for (let x = 0; x < cols; x++) path.push([x, 0]);
    for (let y = 1; y < 4; y++) path.push([cols - 1, y]);
    for (let x = cols - 2; x >= 0; x--) path.push([x, 3]);
    for (let y = 2; y > 0; y--) path.push([0, y]);
    for (let k = 0; k < 4; k++) {
      const [x, y] = path[(t - k + path.length * 10) % path.length];
      on(x, y);
    }
  } else if (variant === 'wave') {
    for (let x = 0; x < cols; x++)
      on(x, Math.round(1.5 + 1.5 * Math.sin(x / 1.2 + t / 2)));
  } else {
    const r = Math.round((cols / 2) * (0.5 + 0.5 * Math.sin(t / 4)));
    for (let x = 0; x < cols; x++)
      for (let y = 0; y < 4; y++)
        if (Math.abs(x - (cols - 1) / 2) <= r) on(x, y);
  }

  let out = '';
  for (let c = 0; c < width; c++) {
    let mask = 0;
    for (let y = 0; y < 4; y++)
      for (let dx = 0; dx < 2; dx++)
        if (lit.has(y * cols + c * 2 + dx)) mask |= BITS[y][dx];
    out += String.fromCharCode(0x2800 + mask);
  }
  return out;
}

function Spinner({
  variant = 'snake',
  width = 3,
  interval = 80,
  label = 'Chargement',
  className,
  ...props
}: React.ComponentProps<'span'> & {
  variant?: Variant;
  width?: number;
  interval?: number;
  label?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    let t = 0;
    const write = () => {
      if (ref.current) ref.current.textContent = frame(width, t++, variant);
    };
    write();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(write, interval);
    return () => window.clearInterval(id);
  }, [variant, width, interval]);

  return (
    <span
      role="status"
      data-slot="spinner"
      className={cn('inline-flex items-center', className)}
      {...props}
    >
      <span className="sr-only">{label}</span>
      <span
        ref={ref}
        aria-hidden="true"
        className="font-mono text-[1.25em] leading-none whitespace-pre text-current"
      />
    </span>
  );
}

export { Spinner };
```

```tsx
<p className="flex items-center gap-3 font-mono text-label text-muted-foreground">
  <Spinner variant="snake" className="text-foreground" label="Construction de la période 02" />
  construction de la période 02
</p>

<Button disabled>
  <Spinner variant="snake" label="Envoi en cours" /> Envoi
</Button>
```

---

## 18. DotMatrixLoader

Attente dont **la forme du résultat est inconnue** (initialisation de la matrice de points, appel externe). Grille 3 × 3 de points de 8 px, centrée dans l'espace réservé. Hors chargement, peut signaler un état « en direct » (variante `chase` en bleu), jamais décorer.

| Variante | Mouvement                                    |
| -------- | -------------------------------------------- |
| `chase`  | Un point fait le tour du carré, avec traînée |
| `ripple` | Une onde part du centre                      |

```tsx
// components/ui/dot-matrix-loader.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

const RING = [0, 1, 2, 5, 8, 7, 6, 3]; // ordre du tour, en index de grille

function DotMatrixLoader({
  variant = 'chase',
  tone = 'neutral',
  label = 'Chargement',
  className,
  ...props
}: React.ComponentProps<'div'> & {
  variant?: 'chase' | 'ripple';
  tone?: 'neutral' | 'primary';
  label?: string;
}) {
  return (
    <div
      role="status"
      data-slot="dot-matrix-loader"
      className={cn(
        'grid w-fit grid-cols-3 gap-1.5',
        tone === 'primary' &&
          '[--foreground:var(--brand-300)] [--surface-2:var(--brand-700)]',
        className,
      )}
      {...props}
    >
      <span className="sr-only">{label}</span>
      {Array.from({ length: 9 }, (_, i) => {
        let style: React.CSSProperties | undefined;
        if (variant === 'ripple') {
          const d = Math.abs((i % 3) - 1) + Math.abs(Math.floor(i / 3) - 1);
          style = { animationDelay: `${d * 0.18}s` };
        } else {
          const k = RING.indexOf(i);
          style = k < 0 ? undefined : { animationDelay: `${k * 0.15}s` };
        }
        const animated = variant === 'ripple' || RING.includes(i);
        return (
          <span
            key={i}
            aria-hidden="true"
            className={cn(
              'size-2 rounded-full bg-surface-2',
              animated &&
                (variant === 'ripple' ? 'animate-ripple' : 'animate-chase'),
            )}
            style={style}
          />
        );
      })}
    </div>
  );
}

export { DotMatrixLoader };
```

---

## 19. Progress

Avancement mesurable (lecture d'une section, téléversement). Rangée de points : les points atteints passent en primaire. Radix fournit `role="progressbar"` et les attributs `aria-value*`.

```tsx
// components/ui/progress.tsx
'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

function Progress({
  className,
  value = 0,
  dots = 20,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { dots?: number }) {
  const lit = Math.round(((value ?? 0) / 100) * dots);
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn('grid w-full gap-1', className)}
      style={{ gridTemplateColumns: `repeat(${dots}, minmax(0, 1fr))` }}
      {...props}
    >
      {Array.from({ length: dots }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn(
            'aspect-square rounded-full transition-colors duration-[240ms] ease-system',
            i < lit ? 'bg-primary' : 'bg-surface-2',
          )}
        />
      ))}
    </ProgressPrimitive.Root>
  );
}

export { Progress };
```

```tsx
<Progress value={60} aria-label="Lecture de la période" />
```

---

## 20. Connector

Primitive de signature : liaison en points entre deux nœuds d'un schéma d'architecture. Toujours orthogonale (le tracé `d` n'utilise que `H` et `V`). Les points avancent de la sortie vers l'entrée quand la liaison est en flux : le sens se lit sans flèche.

| État   | Rendu                                               |
| ------ | --------------------------------------------------- |
| `idle` | Points `faint`, pas de 6 px                         |
| `flow` | Points `primary` qui avancent (`animate-dots-flow`) |
| `weak` | Points `border`, pas de 10 px                       |

```tsx
// components/ui/connector.tsx
import * as React from 'react';

import { cn } from '@/lib/utils';

const STATES = {
  idle: { stroke: 'var(--faint)', dash: '0 6', animate: false },
  flow: { stroke: 'var(--primary)', dash: '0 6', animate: true },
  weak: { stroke: 'var(--border)', dash: '0 10', animate: false },
} as const;

function Connector({
  d,
  state = 'idle',
  className,
  ...props
}: React.ComponentProps<'path'> & { d: string; state?: keyof typeof STATES }) {
  const s = STATES[state];
  return (
    <path
      data-slot="connector"
      data-state={state}
      d={d}
      fill="none"
      stroke={s.stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeDasharray={s.dash}
      className={cn(s.animate && 'animate-dots-flow', className)}
      {...props}
    />
  );
}

export { Connector };
```

```tsx
// Dans un schéma : les nœuds sont des éléments HTML positionnés,
// les liaisons un calque SVG décoratif en dessous.
<div className="relative h-60">
  <svg className="absolute inset-0 size-full" aria-hidden="true">
    <Connector d="M150 120 H230" state="idle" />
    <Connector d="M380 120 H460" state={isActive ? 'flow' : 'idle'} />
  </svg>
  {/* nœuds : cadres chanfreinés (chamfer-frame), ports en points de 8 px */}
</div>
```

---

## 21. ExternalLink

Primitive **sans style** pour tout lien vers un autre site : nouvel onglet, `rel="noreferrer"`, mention « (nouvel onglet) » pour les lecteurs d'écran. Comme `next/link` pour les liens internes, elle porte le comportement et laisse l'apparence au composant qui l'enveloppe (`<Button asChild>`) ou à `className`. L'icône `↗` est ajoutée par l'appelant.

```tsx
// components/ui/external-link.tsx
import * as React from 'react';

/** Lien externe sans style : nouvel onglet, `rel` sûr, annonce lecteur d'écran. Se compose comme `next/link` (`<Button asChild>`). */
function ExternalLink({
  children,
  ...props
}: React.ComponentProps<'a'> & { href: string }) {
  return (
    <a data-slot="external-link" target="_blank" rel="noreferrer" {...props}>
      {children}
      <span className="sr-only">(nouvel onglet)</span>
    </a>
  );
}

export { ExternalLink };
```

```tsx
<Button variant="outline" asChild>
  <ExternalLink href="https://github.com/[compte]">
    Mon GitHub <ArrowUpRight data-icon="inline-end" />
  </ExternalLink>
</Button>
```

---

## 22. Table

Liste dense de `/projets`. Garde les slots shadcn (`table-container`, `table`, `table-header`, `table-body`, `table-row`, `table-head`, `table-cell`) ; `TableFooter` et `TableCaption` ne sont pas repris tant qu'ils ne servent pas. En-têtes de colonne et cellules en mono (données), filet 1 px entre les lignes, pas de survol coloré ni de fond. Le conteneur défile horizontalement sur petit écran. Implémentation : [../src/components/ui/table.tsx](../src/components/ui/table.tsx).

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">titre</TableHead>
      <TableHead scope="col">date</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      {/* En-tête de ligne : discours, pas donnée. */}
      <TableHead
        scope="row"
        className="py-3 font-sans text-base font-semibold text-foreground"
      >
        CoriumEngine
      </TableHead>
      <TableCell>2025</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## 23. Dialog

Fenêtre modale (Radix Dialog) : piège du focus, Échap, fond inerte, défilement de la page bloqué. Garde les slots shadcn `dialog`, `dialog-trigger`, `dialog-close`, `dialog-overlay`, `dialog-content`, `dialog-title` ; `DialogHeader`, `DialogFooter` et `DialogDescription` ne sont pas repris tant qu'ils ne servent pas. Le contenu est un cadre chanfreiné (`chamfer-frame`, `--chamfer-lg`) qui défile avec lui ; le fond est `bg-background/80` ; l'apparition est un fondu de 120 ms. Le bouton de fermeture (`showCloseButton`, actif par défaut) est un `Button` ghost « Fermer » avec la touche `échap`, pas une croix. Un `DialogTitle` est obligatoire, en `sr-only` si le contenu porte déjà son titre. Implémentation : [../src/components/ui/dialog.tsx](../src/components/ui/dialog.tsx).

`ui/modal.tsx` l'emploie pour la route interceptée `/projets/[slug]` : l'état ouvert suit l'URL, fermer revient en arrière dans l'historique.

```tsx
<Dialog open={isOpen} onOpenChange={(open) => !open && router.back()}>
  <DialogContent className="max-w-3xl" aria-describedby={undefined}>
    <DialogTitle className="sr-only">{label}</DialogTitle>
    {children}
  </DialogContent>
</Dialog>
```

---

## 24. Sheet

Panneau latéral droit du menu mobile, sur le même Radix Dialog. Slots shadcn `sheet`, `sheet-trigger`, `sheet-content`, `sheet-title` ; seul le côté droit est repris. Fond `bg-background`, filet gauche 1 px, glissement de 120 ms ; même fond d'écran et même bouton « Fermer » que le Dialog. Implémentation : [../src/components/ui/sheet.tsx](../src/components/ui/sheet.tsx).

```tsx
<Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" aria-label="Ouvrir le menu">
      <Menu className="size-6" />
    </Button>
  </SheetTrigger>
  <SheetContent aria-describedby={undefined}>
    <SheetTitle className="sr-only">Menu</SheetTitle>
    {/* liens */}
  </SheetContent>
</Sheet>
```
