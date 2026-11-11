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
- `src/db/` contient le schéma Drizzle (`schema.ts`), la connexion Neon
  (`index.ts`), les lectures en cache (`queries.ts`) et le contenu initial
  (`seed.ts`). Projets, compétences et périodes vivent en base (PostgreSQL chez
  Neon), plus dans des JSON ; les types sont tirés du schéma
  (`$inferSelect`), pas écrits à la main. Les migrations sont dans `drizzle/`.
- Lecture côté serveur seulement, par des fonctions `'use cache'` étiquetées
  `contenu` (`cacheComponents: true`) ; `POST /api/revalidate`, protégée par
  `REVALIDATE_SECRET`, rafraîchit ce cache. Le build a besoin de `DATABASE_URL`.
- `src/app/global.css` contient les jetons CSS et la configuration Tailwind.
  `components.json` documente shadcn/ui : alias `@/components/ui`, style `new-york`,
  icônes Lucide.
- L'alias TypeScript `@/*` cible `src/*` (voir `tsconfig.json`).

- `src/constants/` contient ce qui ne vit pas en base : `site-meta.ts` (nom,
  textes et faits de l'ouverture, liens de contact) et
  `project-context.ts` (libellés et filtre par contexte).

Note : Les fichiers de polices sont chargés via `next/font/local` dans `layout.tsx`. La direction visuelle est fixée dans `docs/design-system.md`. Les primitives de `src/components/ui/` suivent les recettes de `docs/composants.md` ; seules celles qui servent sont ajoutées (`Connector`, `Tabs`, `Spinner`, entre autres, ne le sont pas encore).

## État actuel et direction cible

La page d'accueil assemble quatre sections dans `src/app/page.tsx` : ouverture
(identité, faits, les quatre compétences), timeline chronologique (une section
par période, mini-carte, filtre par contexte, fiches des projets mis en avant,
une ligne par autre projet), compétences puis technos en liste, et clôture
(contact, formulaire branché sur `POST /api/contact`, statut en ligne). Le
contenu initial de la base suit `docs/presentation.md`. Les sections utilisent des
exports nommés et sont rendues côté serveur ; seuls le filtre, la mini-carte, la
modale, le formulaire et le bouton de copie sont des composants client.

- `/projets` liste tous les projets publiés ; `/projets/[slug]` est une page
  statique par projet (`generateStaticParams`), avec `loading.tsx`.
- `src/app/@modal/(.)projets/[slug]` intercepte cette route : depuis une autre
  page du site, la fiche s'ouvre dans le `Dialog` shadcn (`ui/modal.tsx`, sur `ui/dialog.tsx`) et
  l'URL change ; en accès direct, la page complète est rendue.
- `error.tsx`, `global-error.tsx` et `not-found.tsx` sont dans `src/app/`.
- Aucune 3D sur l'accueil pour l'instant : `hero-scene` est supprimée, la
  matrice de points n'est pas livrée. `three/not-found-scene.tsx` reste jusqu'à
  ce que la matrice la remplace.
- Un fait de projet absent de la base (rôle, année, durée, ia, résultat) n'a pas
  de ligne dans la fiche : ne rien inventer pour la remplir.

La direction historique « Instrument » (palette #1C1B1A / #7CFFB2, deux voix,
timeline) est remplacée pour les choix visuels par « Schéma » : fond sombre
#0A0D14, texte #E4EAF4, bleu réservé à l'état actif, coins chanfreinés.
`docs/design-system.md` conserve l'historique « Instrument » ;
`docs/design-system.md` fixe la direction visuelle courante,
`src/app/global.css` les valeurs et `docs/composants.md` les recettes.
La matrice de points, le graphe des compétences, la bascule de densité, les
transitions de route et les raccourcis clavier ne sont pas encore livrés. Ne pas
décrire les composants cibles comme existants tant qu'ils ne le sont pas.

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
  Ancres de l'accueil : `#accueil`, `#parcours`, `#periode-<id>`, `#competences`,
  `#contact`.
- Un lien `next/link` vers `/projets/[slug]` ouvre la modale ; pour forcer la
  page complète, utiliser un `<a href>` natif.
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
- `corepack pnpm build` — build Next.js puis sitemap (`next-sitemap`) ; lit la
  base, donc demande `DATABASE_URL`.
- `corepack pnpm db:generate` — migration SQL depuis `src/db/schema.ts`.
- `corepack pnpm db:migrate` — applique les migrations de `drizzle/`.
- `corepack pnpm db:seed` — insère le contenu initial sans écraser l'existant.
  Avec `--reset`, vide d'abord périodes, projets et compétences : destructif.

Le script `test` ne couvre que `scripts/` : l'application n'a pas de suite de
tests. Ne pas en annoncer une sans l'avoir ajoutée ; lancer les vérifications
ciblées appropriées au changement.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
