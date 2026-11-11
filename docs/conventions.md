# Conventions

Conventions de commit, de branche et de nommage du projet. Ce qui est vérifié
automatiquement l'est par `corepack pnpm check` et par la CI ; le reste relève de
la relecture.

## Commits

```text
<type>(<portée>)?!?: <Sujet>

<corps facultatif>
```

Format [Conventional Commits](https://www.conventionalcommits.org/fr/), sans
emoji : le type vient en premier.

| Type       | Usage                                                         |
| ---------- | ------------------------------------------------------------- |
| `feat`     | Nouvelle fonctionnalité visible                               |
| `fix`      | Correction de bug                                             |
| `docs`     | Documentation seule                                           |
| `style`    | Apparence, design system, formatage (sans changer la logique) |
| `refactor` | Restructuration sans changement de comportement               |
| `perf`     | Amélioration des performances                                 |
| `test`     | Ajout ou correction de tests                                  |
| `build`    | Dépendances, configuration de build                           |
| `ci`       | Workflows GitHub Actions, Dependabot                          |
| `chore`    | Maintenance hors `src/` (scripts, fichiers divers)            |
| `revert`   | Annulation d'un commit                                        |

- **Type** en minuscules, parmi la liste ci-dessus.
- **Sujet** en anglais, à l'impératif, majuscule initiale, sans point final :
  `feat: Add timeline section`, pas `feat: added timeline.`
- **Titre complet** de 72 caractères au plus.
- **Portée** facultative, en kebab-case, pour cibler une zone :
  `fix(navbar): Close menu on route change`.
- **`!`** après le type ou la portée signale un changement cassant :
  `refactor!: Rename project data keys`.
- **Corps** facultatif, séparé par une ligne vide : le pourquoi, pas le quoi.
- Un commit = un changement cohérent ; ne pas mélanger formatage et logique.

Vérification : le hook `commit-msg` (dans `.githooks/`, activé par
`corepack pnpm install`) refuse un titre non conforme ; la CI vérifie tous les
commits d'une PR. Les commits `Merge …`, `fixup! …` et `squash! …` sont ignorés.

## Branches

`main` est la branche déployée. Les autres branches suivent
`<type>/<description-en-kebab-case>`, avec les types des commits :
`feat/timeline`, `fix/navbar-mobile`, `docs/conventions`.

## Fichiers et dossiers

Tous les fichiers et dossiers de `src/` et `scripts/` sont en kebab-case :
`hero-section.tsx`, `nav-link.tsx`, `site-meta.ts`, `components/three/`. Seul le
nom avant le premier point compte (`types.d.ts`, `check-commit.test.ts`). Le nom
du fichier reprend celui de son export principal : `hero-section.tsx` exporte
`HeroSection`.

Les segments de route Next.js (`(groupe)`, `[param]`, `[...slug]`, `_privé`,
`@slot`, `(.)intercepté`) suivent le kebab-case une fois leurs symboles retirés. Vérification :
`corepack pnpm check-config`.

Composants rangés par rôle : `layout/` (structure de page), `sections/` (blocs de
la page d'accueil, suffixe `-section`), `three/` (scènes R3F, suffixe `-scene`),
`ui/` (primitives et composants réutilisables).

## Identifiants

Vérifiés par ESLint (`@typescript-eslint/naming-convention`) :

| Élément                          | Convention               | Exemple                        |
| -------------------------------- | ------------------------ | ------------------------------ |
| Variables, fonctions, paramètres | camelCase                | `projectCount`, `formatDate()` |
| Composants React                 | PascalCase               | `ProjectCard`, `Comp`          |
| Constantes de module             | UPPER_SNAKE_CASE         | `CANVAS_STYLE`, `MAX_LENGTH`   |
| Interfaces                       | `I` + PascalCase         | `IProjectCardProps`            |
| Enums                            | `E` + PascalCase         | `EStatus`                      |
| Classes, types                   | PascalCase               | `ContactError`, `CheckType`    |
| Paramètres génériques            | `T`, ou `T` + PascalCase | `T`, `TItem`                   |
| Membres d'enum                   | PascalCase               | `EStatus.NotFound`             |
| Hooks                            | `use` + PascalCase       | `useReducedMotion`             |
| Inutilisé volontairement         | préfixe `_`              | `_event`                       |

L'UPPER_SNAKE_CASE n'est accepté qu'au niveau du module : une constante locale à
une fonction est en camelCase ou remontée au niveau du module.

Non vérifié automatiquement, à respecter en relecture :

- Booléens préfixés par `is`, `has`, `can` ou `should` : `isOpen`, `hasError`.
- Gestionnaires d'évènements : `handleX` dans le composant, `onX` pour la prop.
- Code, identifiants et clés de données en anglais ; textes affichés, commentaires
  et documentation en français.
- Exports nommés pour les composants ; `export default` réservé à ce que Next.js
  impose (`page`, `layout`, fichiers de config).
