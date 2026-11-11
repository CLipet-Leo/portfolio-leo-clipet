# Consignes du projet

Ce fichier rassemble les consignes utiles aux tâches de code. La direction produit
et ses arbitrages détaillés sont dans [docs/design-system.md](./docs/design-system
les références qui les ont motivés sont dans [design/synthese.md](./design/synthese.md)
et [design/analysis/](./design/analysis/). Ne pas recopier ces documents ici :
maintenir leurs choix cohérents et mettre à jour ce fichier si les conventions ou
l'état du code changent.

## Contexte et architecture

Portfolio personnel construit avec Next.js 16 (App Router), React 19, TypeScript,
Tailwind CSS 4 et Three.js via React Three Fiber.

- `src/app/` contient les routes et API Next.js ; `src/components/` regroupe
  `layout/`, `sections/`, `three/` et `ui/`.
- `src/data/` contient `projects.json` et `skills.json` ; leurs clés et les types
  correspondants dans `src/types/types.d.ts` sont actuellement en anglais.
- `src/app/global.css` contient les jetons CSS et la configuration Tailwind.
  `components.json` documente shadcn/ui : alias `@/components/ui`, style `new-york`,
  icônes Lucide.
- L'alias TypeScript `@/*` cible `src/*` (voir `tsconfig.json`).

Note : Les fichiers de polices sont chargés via `next/font/local` dans `layout.tsx`. La direction visuelle est fixée dans `docs/design-system.md`. (Note : les primitives `button`, `badge`, `card` et `separator` suivent les recettes de `docs/composants.md` ; les sections et les scènes Three.js utilisent la palette et la typographie « Schéma », mais leurs textes, la matrice de points et la timeline ne sont pas encore livrés.)

## État actuel et direction cible

La page d'accueil actuelle assemble le hero, la présentation et les projets dans
`src/app/page.tsx`. Les sections réutilisables utilisent des exports nommés. Le
hero s'appuie sur `src/components/three/hero-scene.tsx` ; les projets sont rendus par
des cartes HTML, pas dans un `Canvas`. Les pages d'erreur et API sont dans
`src/app/`.

La direction historique « Instrument » (palette #1C1B1A / #7CFFB2, deux voix,
timeline) est remplacée pour les choix visuels par « Schéma » : fond sombre
#0A0D14, texte #E4EAF4, bleu réservé à l'état actif, coins chanfreinés.
`docs/design-system.md` conserve l'historique « Instrument » ;
`docs/design-system.md` fixe la direction visuelle courante,
`src/app/global.css` les valeurs et `docs/composants.md` les recettes.
La timeline n'est pas encore livrée : la page d'accueil assemble encore hero,
présentation et projets. Ne pas décrire les couleurs, la typographie ou les
composants cibles comme existants tant qu'ils ne le sont pas.

Les éléments de conception qui ne sont pas explicitement tranchés dans le document
de direction doivent être clarifiés et consignés avant de coder le comportement
concerné. Périodes, dates, contexte des projets (pro, perso, école), projets mis en
avant et densité (pas de profil visiteur) sont tranchés au § 8 de
`docs/design-system.md` ; les points restants sont au § 10.

Ne pas bloquer les tâches sans rapport avec ces choix. Pour les animations et
visuels, prendre en compte la réduction des animations, le clavier et un contenu de
repli si WebGL est indisponible.

## Conventions de mise en œuvre

Commits, branches, nommage des fichiers et des identifiants : voir
[docs/conventions.md](./docs/conventions.md). Le titre de chaque commit est
vérifié par le hook `commit-msg` et par la CI.

- Préserver la distinction entre faits visibles sans action et navigation :
  les faits d'un projet ne doivent pas être cachés derrière un clic.
- Garder l'interface sobre et l'accent réservé aux états actifs ; suivre les valeurs
  exactes de la cible dans `docs/design-system.md`, pas dans une copie divergente.
- Respecter les rôles typographiques de la direction : grotesque pour le discours,
  mono pour les données, jamais pour du texte suivi.
- Le son, s'il est implémenté, reste désactivé par défaut ; pas d'autoplay.
- Vérifier l'existence des destinations avant d'ajouter ou de modifier des liens.
  La navigation et certains boutons référencent actuellement des ancres ou routes
  qui ne sont pas définies dans l'accueil ou l'App Router.
- Utiliser `useFrame` et les primitives R3F pour la scène ; éviter les mises à jour
  React à chaque frame et respecter la propriété/libération des ressources Three.js.

## Commandes

Le projet utilise pnpm via Corepack, avec la version indiquée dans `package.json`.

- `corepack pnpm install --frozen-lockfile` — installation des dépendances.
- `corepack pnpm dev` — serveur de développement.
- `corepack pnpm check` — toutes les vérifications ci-dessous sauf le build ;
  c'est ce que lance la CI (`.github/workflows/ci.yml`) avant `build`.
- `corepack pnpm check-config` — configuration et nommage des fichiers de `src/`.
- `corepack pnpm test` — tests des scripts (`node --test`).
- `corepack pnpm typecheck` — types générés par `next typegen` puis `tsc`.
- `corepack pnpm lint` / `lint:fix` — ESLint (config Next.js officielle).
- `corepack pnpm format` / `format:check` — Prettier (tri des classes Tailwind).
- `corepack pnpm build` — build Next.js puis sitemap (`next-sitemap`).

Le script `test` ne couvre que `scripts/` : l'application n'a pas de suite de
tests. Ne pas en annoncer une sans l'avoir ajoutée ; lancer les vérifications
ciblées appropriées au changement.
