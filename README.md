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
