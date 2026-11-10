# Design system — Portfolio « Schéma »

Ce document fixe les décisions prises sur le canvas de design. Il fait référence pour toute implémentation. Les valeurs exactes des tokens vivent dans [../src/app/global.css](../src/app/global.css) (source de vérité) ; le détail des primitives et leur code dans [./composants.md](./composants.md).

---

## 1. Direction

**Schéma** — le parcours se lit comme un système : des nœuds, des liaisons, des états. Le portfolio montre comment les projets sont pensés (architecture, systèmes complexes, usage réfléchi des outils IA), pas seulement ce qu'ils sont.

Quatre principes, par ordre de priorité :

| # | Principe | Ce que ça veut dire |
|---|---|---|
| 01 | **Épuré** | Chaque bloc porte un fait. Le vide sépare les étapes, il ne masque jamais un manque de contenu. L'UI ne cache aucune information derrière un clic. |
| 02 | **Le point** | Le point est l'unité du système : titres matriciels, liaisons, icônes, visuel 3D, chargement. Inspiration « dot » assumée, sans reprise d'éléments de marque tiers. |
| 03 | **Une couleur** | Des gris légèrement bleutés et un seul bleu, `#0072EC`, décliné en teintes. Le bleu signale ce qui est actif ou en flux, rien d'autre. |
| 04 | **Mouvement utile** | Des points qui circulent de A vers B, des composants qui se construisent au chargement. Aucune animation décorative. |

Registre : technique et précis. Densité : moyenne. Thème : sombre uniquement (pas de thème clair prévu).

---

## 2. Couleur

### Répartition

Sur 100 points d'écran : **92 gris**, **8 bleus**, dont ~2 en primaire. Si le bleu commence à occuper de la surface, on le retire.

### Gris

| Token | Valeur | Rôle |
|---|---|---|
| `--background` | `#0a0d14` | Vide, fond de page |
| `--surface` / `--muted` | `#111620` | Surfaces discrètes, popover |
| `--surface-2` / `--secondary` / `--accent` | `#19202d` | Bouton secondaire, fond de survol |
| `--border` / `--input` | `#263044` | Bords, séparateurs |
| `--faint` | `#566179` | Points éteints, filets, désactivé — **jamais du texte lisible** (3.13:1) |
| `--muted-foreground` | `#8d98ad` | Texte secondaire (6.69:1) |
| `--foreground` | `#e4eaf4` | Texte principal (16.08:1) |

### Bleu — une teinte, huit rôles

| Token | Valeur | Rôle |
|---|---|---|
| `brand-100` | `#e0edff` | Texte sur fond primaire, très rare |
| `brand-200` | `#a8ccff` | Texte actif sur fond sélectionné |
| `brand-300` | `#6aabff` | Texte et chiffres actifs, anneau de focus (`--ring`) à 60 % |
| `brand-400` | `#3d8ef7` | Liens, libellés de relation (`ui → domain`) |
| `brand-500` | `#0072ec` | **Primaire** : état actif, sélection, liaison en flux |
| `brand-600` | `#0a4e9e` | Pic du shimmer de chargement |
| `brand-700` | `#0b2c57` | Fond d'un élément sélectionné, base du squelette |
| `brand-800` | `#081a33` | Zone de chargement |

### Contraste (sur `#0a0d14`, WCAG 2.2)

| Couple | Ratio | Usage permis |
|---|---|---|
| Texte | 16.08 | Tout |
| Secondaire | 6.69 | Tout texte |
| brand-300 | 8.22 | Texte actif |
| brand-400 | 5.93 | Liens |
| brand-500 | 4.27 | Traits, ports, texte ≥ 24 px uniquement |
| Blanc sur brand-500 | 4.55 | Libellé de bouton primaire |
| faint | 3.13 | Non-texte uniquement |

### Règles

- **Aucun dégradé décoratif.** Le seul dégradé autorisé est le shimmer de chargement, dans le bleu seul (`brand-700 → brand-600 → brand-700`).
- Jamais de dégradé entre deux couleurs, ni entre gris et bleu.
- **Exception unique :** `--destructive: #f2555a`, réservé aux erreurs de formulaire et aux actions destructrices, toujours accompagné d'un texte. Le blanc sur ce rouge échoue (3.37:1) : le bouton destructif est teinté, jamais plein.
- Les captures de projet sont la seule autre source de couleur admise : elles appartiennent au contenu, pas à l'interface.

---

## 3. Typographie

Trois voix aux rôles stricts.

| Voix | Police | Usage | Interdits |
|---|---|---|---|
| **Signal** | Doto 700 (`font-dot`) | Nom, titres de section, numéros de période, grands chiffres, **libellés de toutes les primitives** (boutons, badges, onglets, labels) | Jamais sous 14 px, jamais pour une phrase |
| **Discours** | Geist 400 / 600 (`font-sans`) | Contexte, objectif, décisions d'architecture, descriptions, contenu saisi dans les champs | — |
| **Donnée** | Geist Mono 400 / 500 (`font-mono`) | Dates, stack, rôles, durées, relations, messages d'aide | Jamais pour du texte suivi |

### Échelle

| Token | Taille / interligne | Police | Usage |
|---|---|---|---|
| `text-signal-xl` | 88 / 88 | Doto | Nom, ouverture uniquement |
| `text-signal` | 40 / 40 | Doto | Numéro de période, titre de section |
| `text-h2` | 28 / 34 | Geist 600 | Titre de projet |
| `text-h3` | 20 / 28 | Geist 600 | Intertitre de fiche |
| `text-body` | 16 / 26 | Geist 400 | Discours |
| `text-small` | 14 / 22 | Geist 400 | Légendes |
| `text-data` | 13 / 20 | Geist Mono | Données |
| `text-label` | 12 / 16 | Geist Mono 500 | Étiquettes |

- Titres en casse phrase. Doto et mono en minuscules.
- Ratio ~2.5:1 entre titre de période (40) et corps (16) : le titre signale, il ne domine pas.
- Le bleu n'apparaît dans le texte qu'en mono (relations, liens, état actif), jamais sur un titre.

---

## 4. Formes

### Coin chanfreiné — la signature

- Deux coins coupés à 45° : **haut-droit et bas-gauche**. Les deux autres angles sont **vifs**.
- `--chamfer: 8px` (boutons, filtres) · `--chamfer-lg: 12px` (cartes, panneaux).
- **Un élément chanfreiné n'a jamais d'arrondi.** Les autres éléments (outline, ghost, champs) gardent 4–6 px.
- Rayons : `sm` 4 · `md` 6 · `lg` 8 maximum. Jamais `rounded-xl`.
- `clip-path` coupe l'anneau de focus shadcn : sur un élément focusable, le chanfrein est dessiné par pseudo-éléments (`chamfer-button`, `chamfer-frame`).

### Nœuds et liaisons

- Nœud = cadre chanfreiné, libellé mono, sous-titre mono secondaire.
- Ports = points de 8 px sur l'axe : ○ entrée (contour), ● sortie (plein).
- Liaisons **toujours en points**, à angle droit, jamais de courbe libre :

| Type | Rendu |
|---|---|
| Repos | Points `faint`, pas de 6 px |
| Flux actif | Points `primary` qui avancent de la sortie vers l'entrée |
| Dépendance faible | Points `border`, pas de 10 px |

Le sens se lit au mouvement des points : pas de flèche.

### Système de points

- **Icônes** : grille de 5 × 5 points (point 4 px, pas 6 ; 2 px dans les puces). Allumé en texte ou `primary`, éteint invisible. Pas d'icône au trait.
- **Matrice** (visuel 3D) : afficheur de points, pas 12, point 8. Éteint `--dot-off`, allumé `--foreground`, curseur `primary`. La forme change à chaque période (outil → réseau → objet).
- **Trame** (`dot-grid`) : fonds de capture, zones vides, contour de chargement.
- **Progression** : rangée de points ; les points atteints passent en `primary`.

### Espacement

Base 4 : 4 · 8 · 16 · 24 · 48 · 96 (marge de page) · 128 (entre périodes).

---

## 5. Mouvement

| Durée | Usage |
|---|---|
| 120 ms | Survol, focus |
| 240 ms | Changement d'état, apparition d'un composant chargé |
| 600 ms | Changement de forme de la matrice |
| 900 ms / boucle | Points en flux |
| 1.6 s / boucle | Shimmer de chargement |

Easing unique : `cubic-bezier(0.2, 0, 0, 1)`.

- Seules la matrice et les liaisons de la **période active** bougent en permanence.
- `prefers-reduced-motion` : tout se fige sur l'état final.

---

## 6. Chargement

Un composant asynchrone apparaît d'abord comme son propre plan, à sa taille réelle, puis se construit en quatre temps :

1. **Contour** (0 ms) — le cadre apparaît, rempli d'une trame de points éteints.
2. **Structure** (+120 ms) — chaque ligne devient une bande de points à la hauteur exacte du token final, décalée de 40 ms par bloc.
3. **Contenu** (réponse) — le texte remplace les points en 240 ms, sans décalage de mise en page.
4. **Liaisons** (+240 ms) — l'élément central passe au primaire, les points se mettent à circuler.

### Quel indicateur ?

| Situation | Indicateur |
|---|---|
| La mise en page finale est connue | **Squelette** en points (`Skeleton`) |
| L'attente tient dans une ligne de texte | **Braille** (`Spinner`) |
| La forme du résultat est inconnue | **Matrice 3 × 3** (`DotMatrixLoader`) |
| Réponse attendue en moins de 200 ms | **Rien** |

- Un seul indicateur à la fois par zone.
- Pendant l'attente : jamais le primaire.
- `aria-busy="true"` sur le conteneur, squelette en `aria-hidden`, indicateurs en `role="status"` avec un libellé.
- Hors chargement, la matrice 3 × 3 peut signaler un état « en direct » (son actif), jamais décorer.

---

## 7. Intégration shadcn

- Les noms des tokens shadcn ne sont jamais renommés ; nos valeurs passent par eux, jamais en dur dans un composant.
- `accent` = fond de survol chez shadcn. La couleur de marque est `--primary`.
- Classe `.dark` posée sur `<html>` ; `:root` et `.dark` partagent les valeurs.
- Extensions : `--font-dot`, échelle `brand-100…800`, `--faint`, `--dot-off`, utilitaires `chamfer`, `chamfer-lg`, `chamfer-frame`, `chamfer-button`, `dot-grid`, `dots-x`, `dots-y`, `skeleton-dots`.
- Hauteurs shadcn conservées (bouton 36 px par défaut) ; `pointer-coarse:h-11` pour atteindre 44 px au tactile.

### Écarts assumés avec le style par défaut

| Composant | shadcn par défaut | Portfolio |
|---|---|---|
| Typographie | `font-sans` (Geist) | `font-dot` 700 sur tous les libellés |
| Card | `rounded-xl shadow-sm` | Angles vifs, double chanfrein, sans ombre |
| Button | ring en box-shadow | Anneau chanfreiné sur `default` |
| Tabs | Pilule sur `bg-muted` | `variant="line"` (soulignement primaire) |
| Tooltip | `bg-primary` | `bg-popover` + bordure |
| Skeleton | `bg-accent animate-pulse` | Trame de points + shimmer |
| Spinner | `Loader2` qui tourne | Braille |
| Progress | Barre pleine | Rangée de points |

---

## 8. Structure de la page

- **Ouverture** — nom en Doto (`signal-xl`), une ligne de positionnement, la matrice de points (forme de la période courante, curseur bleu). Profil et son aux bords de l'écran.
- **Timeline** — axe vertical en points = contenu et navigation. Une section par période : numéro Doto + titre + années. Mini-carte au bord gauche pour sauter directement à une période. Filtre par intérêt au-dessus (ToggleGroup). Seule la période active anime ses liaisons.
- **Fiche projet** (Card) — contexte, puis objectif (projet personnel) ou besoins (projet professionnel) ; rôle, durée, stack, part de l'IA, résultat — visibles sans clic ; schéma d'architecture en nœuds reliés ; captures 16:9 et liens externes.
- **Clôture** — contact : e-mail, GitHub, LinkedIn.

### Parcours par profil

| Profil | Filtre par défaut | Ce qu'il voit d'abord |
|---|---|---|
| Recruteur | Tous | Stack, durée, résultat |
| Développeur | 3D temps réel | Architecture, implémentation |
| Curieux | Tous | Contexte, objectif, captures |

### Usage de l'IA

Chaque fiche dit ce que l'IA a fait et ce qui a été décidé humainement (ligne « ia » de la liste de faits). C'est ce qui montre un usage réfléchi des outils.

### Son

Ambiant optionnel, **coupé par défaut**, indicateur visible (bouton ghost avec barres de points).

---

## 9. Accessibilité

- Contraste texte ≥ 4.5:1 (voir § 2) ; `faint` jamais sur du texte.
- Vrais éléments interactifs (`button`, `a`, `input` + `label`) ; icônes seules avec `aria-label`.
- Focus visible partout (anneau `--ring` à 60 %, chanfreiné sur les éléments chanfreinés).
- Cibles tactiles 44 px via `pointer-coarse:`.
- `prefers-reduced-motion` respecté (matrice, liaisons, shimmer, braille).
- Les états ne reposent jamais sur la couleur seule (texte, forme ou position les doublent).

---

## 10. Questions ouvertes

- Ordre et années des périodes.
- Liste définitive des projets et captures disponibles.
- Ligne de positionnement.
- Contenu de la ligne « ia » pour chaque projet.
