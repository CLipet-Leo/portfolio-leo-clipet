# Portfolio

## Développement

Prérequis : Node.js et Corepack, qui utilise la version de pnpm indiquée dans
`package.json`.

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

Avant de pousser, `corepack pnpm check` lance les vérifications de la CI
(conventions, types, lint, formatage) ; `corepack pnpm format` corrige le
formatage et `corepack pnpm lint:fix` ce qu'ESLint sait corriger.

Conventions de commit et de nommage : [docs/conventions.md](docs/conventions.md).

## Base de données

Projets, compétences et périodes sont dans une base PostgreSQL chez
[Neon](https://neon.com), lue avec Drizzle (`src/db/`). Variables attendues, dans
`.env.local` en développement et dans les réglages Vercel en production :

| Variable            | Rôle                                                      |
| ------------------- | --------------------------------------------------------- |
| `DATABASE_URL`      | Chaîne de connexion Neon ; posée par l'intégration Vercel |
| `REVALIDATE_SECRET` | Secret de `POST /api/revalidate` (`openssl rand -hex 32`) |

Le build lit la base : `DATABASE_URL` doit aussi exister dans les secrets GitHub
Actions (et Dependabot) du dépôt.

```sh
corepack pnpm db:migrate   # crée ou met à jour les tables
corepack pnpm db:seed      # contenu initial, sans écraser l'existant
corepack pnpm db:generate  # après une modification de src/db/schema.ts
```

Le contenu se modifie dans l'éditeur de tables de la console Neon. Il apparaît en
ligne à l'expiration du cache (une heure), ou tout de suite avec :

```sh
curl -X POST -H "Authorization: Bearer $REVALIDATE_SECRET" https://clipet-leo.dev/api/revalidate
```
