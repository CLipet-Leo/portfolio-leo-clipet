# Plan de migration — composants vers « Schéma »

Suivi de la mise à niveau des composants existants vers [design-system.md](./design-system.md). Les recettes de code sont dans [composants.md](./composants.md), les tokens dans [../src/app/global.css](../src/app/global.css).

Légende : ✅ fait · ⬜ à faire · ⏸ reporté volontairement

---

## Décisions prises

| # | Sujet | Décision |
|---|---|---|
| 1 | Liens vers des destinations inexistantes (`#skills`, `#github-stats`, `#contact`, `/contact`) | Supprimés. Les sections seront retravaillées dans un second temps. |
| 2 | Mockup de portable dans `ProjectCard` (tilt, reflet, ombre, dégradé) | Supprimé au profit d'une capture 16:9 chanfreinée. Le style global des composants non primitifs sera repris dans un second temps. |
| 3 | Textes des sections (« Qui Suis-je », « Projets en Vedette »…) | Inchangés pour l'instant, réécrits avec la timeline. |

---

## Phase 0 — Nettoyage ✅

- ✅ Dépendances installées (`corepack pnpm install --frozen-lockfile`).
- ✅ Code mort supprimé : `homeItem`, `item`, `avatar`, `PresentCard`, `SkillsCard`, `shadcn-io/rotating-text`, `hooks/useTilt`, `src/styles/globals.css` (ancienne palette).
- ✅ Dépendance `@radix-ui/react-avatar` retirée.
- ✅ Classe parasite `variable` retirée de `<html>` dans `layout.tsx`.
- ✅ `suppressHydrationWarning` sur `<body>` (attribut injecté par une extension navigateur).

## Phase 1 — Primitives shadcn ✅

Recettes de `composants.md` recopiées telles quelles.

| Fichier | Recette | Notes |
|---|---|---|
| ✅ `ui/button.tsx` | § 1 | `default` chanfreiné, libellés Doto, `destructive` teinté. Tailles `icon-sm` / `icon-lg` retirées (inutilisées). |
| ✅ `ui/badge.tsx` | § 2 | `default` = fond primaire plein (rare). Variante `dot` ajoutée. |
| ✅ `ui/card.tsx` | § 15 | `chamfer-frame`, sans ombre ni arrondi. Pas encore utilisée. |
| ✅ `ui/separator.tsx` | § 14 | Variante `dotted` ajoutée. |

## Phase 2 — Appelants

### Fait (conséquences des primitives et des décisions 1–2)

- ✅ Badges de techno en `variant="secondary"` (hero, fiches projet).
- ✅ Liens morts retirés : Navbar (Compétences, Statistiques, Contact), bouton « Me contacter » du hero et de la présentation.
- ✅ Lien GitHub des projets : `variant="outline"` + `rel="noreferrer"`.
- ✅ `ProjectCard` : capture 16:9 `chamfer-lg dot-grid`, couleurs en tokens (`text-foreground`, `text-muted-foreground`), titre `text-h2`, animation d'apparition 240 ms / easing système.

### Reprise du style des sections ✅

- ✅ **HeroSection** : titre en `font-dot text-signal` minuscule, sans bleu ; sur-titre et légende en `font-mono text-label text-muted-foreground` ; pastille `bg-faint` ; apparitions 240 ms, easing système, décalage 6 px.
  - Écart : `text-signal-xl` est réservé au nom (« Nom, ouverture uniquement »). La phrase actuelle sur trois lignes ne tient pas en 88 px dans une demi-colonne. Elle passera en `signal-xl` quand le texte sera réécrit autour du nom.
- ✅ **AboutSection** : titre `font-dot text-signal` sans span bleu, filets `border-border`, libellés `font-mono text-label` en minuscules, animations 240 ms et easing système.
- ✅ **ProjectsSection** : même traitement du titre.
- ✅ **Navbar / NavLink** : logo `font-dot text-foreground` minuscule, `shadow-sm` retiré, liens `text-muted-foreground` → `hover:text-foreground`, 120 ms et easing système.
- ✅ **Footer** : `<Button variant="ghost" size="icon">`, `bg-background`.
- ✅ **not-found.tsx** : même traitement du titre que le hero.
- ⏸ Réécriture des textes (décision 3), avec la timeline.

## Phase 3 — Scènes Three.js

- ✅ `HeroScene.tsx`, `NotFoundScene.tsx` : `#aff33e` → `#0072ec`, `#3b82f6` → `#e4eaf4`, `#1e293b` → `#263044`, et le solide intérieur `#020617` → `#0a0d14` (fond).
- ⏸ Remplacement par la matrice de points : fonctionnalité de la cible, hors migration.

## Hors périmètre

Tabs, ToggleGroup, Skeleton, Spinner, DotIcon, Connector, Progress, Label, Input… : ajoutés depuis `composants.md` quand la timeline ou le filtre en auront besoin.

Restent inutilisés et à trancher plus tard : le type `Skill` et `src/data/skills.json`.

---

## Vérification à chaque étape

- `corepack pnpm lint`
- `corepack pnpm build` (le `postbuild` régénère `public/sitemap.xml`)
- Contrôle visuel en dev : anneau de focus chanfreiné au clavier sur `Button default`, `prefers-reduced-motion`, cibles 44 px au tactile.

## Avertissements connus

- `THREE.Clock: This module has been deprecated` : émis par `@react-three/fiber` 9.8.2 en interne, pas par notre code. À revoir à la prochaine mise à jour de R3F.
