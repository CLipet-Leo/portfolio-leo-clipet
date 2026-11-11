# Analyse — Anime.js (animejs.com)

Captures : `Main section.png`, `transition main - toolbox section.png`, `Toolbox section.png`, `API demo section.png`, `Bundle size example section.png`.

> Convention : **[O]** = observé sur la capture, **[D]** = déduit (interprétation, non vérifiable sur une image fixe).

## Ce que j'aime (reformulé)

- Un **objet 3D unique sert de fil conducteur** à toute la page : il change d'état (cadran, cylindre, vue éclatée) au lieu d'être remplacé par d'autres visuels.
- Le **scroll pilote la mise en scène** de cet objet.
- Le mouvement est **fluide**, sans à-coups.
- Le message est **lisible dès la première visite** : une phrase par section, un visuel, rien de plus.

## Typographie

- **Style** [O] : deux familles.
  - Une **grotesque géométrique**, un peu large, aux terminaisons arrondies, pour les titres et le texte courant (`Main section.png` « All-in-one animation engine. », `Toolbox section.png` « The complete animator's toolbox »).
  - Une **monospace** pour l'UI : nav (`DOCS`, `EASINGS`, `LEARN`), boutons (`LEARN MORE`), listes (`PER PROPERTY PARAMETERS` dans `API demo section.png`), étiquettes techniques (`waapi`, `timeline`… dans `Toolbox section.png`, `0.52 KB` dans `Bundle size example section.png`) et code.
- **Contraste de graisses** [O] : titres en gras (bold/extra-bold), sous-titres en regular/medium. La mono reste en regular ou medium, jamais en gras.
- **Échelle** [O] : sur la capture (2000 px de large), le titre hero mesure environ 60 px de hauteur de capitale contre environ 20 px pour le sous-titre, **soit un ratio d'environ 3:1**. Les titres de section (`Toolbox section.png`, `Bundle size example section.png`) sont environ 2× plus petits que le hero, soit un ratio d'environ 2:1 avec le texte. La mono UI est petite (environ 12 px).
- **Casse** [O] : titres en casse phrase (« All-in-one animation engine. » avec point final). Mono en **MAJUSCULES** pour la nav, les boutons et les listes de features. Mono en **minuscules** pour les étiquettes techniques et le code.
- **Interlignage** [O] : très serré sur les titres, presque 1:1 (`Main section.png`, les trois lignes se touchent presque). Normal (environ 1.3) sur les sous-titres.

## Palette

| Rôle                     | Valeur approx.                                         | Où                                                                                            |
| ------------------------ | ------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Fond sombre              | `#252423` (anthracite légèrement chaud)                | `Main section.png`, `API demo section.png`                                                    |
| Fond clair               | `#DAD6D2` (gris chaud, papier)                         | `Toolbox section.png`, `Bundle size example section.png`                                      |
| Texte sur sombre         | blanc cassé `#EDEAE6`                                  | hero                                                                                          |
| Texte sur clair / traits | `#2E2B29`, traits gris moyen `#8A8582`                 | sections claires                                                                              |
| Accent principal         | rouge corail `#FF4B4B`                                 | carré `API demo`, titre « Intuitive API », bouton SPONSOR, curseur de la barre de progression |
| Accent secondaire        | pêche `#FFC5A8`                                        | liseré lumineux du cylindre (`transition…png`), arcs dans le cadran                           |
| Spectre                  | vert, jaune, orange, rouge, cyan, bleu, violet saturés | anneau du cadran (`Main section.png`), légende et barre « Bundle size »                       |

- **Proportions** [O] : environ 85 % fond, 10 % texte et traits, moins de 5 % d'accent. Le rouge est rare et toujours sur l'élément qui bouge ou qui compte. Le spectre est confiné à des éléments circulaires ou à des données.
- **Alternance** [O] : sections sombres et claires en alternance (sombre → clair → sombre → clair dans l'ordre des captures).

## Espacement et densité

- **Aéré** [O] : chaque section tient sur un écran, avec un seul bloc de texte et un seul visuel.
- **Grille** [O] : colonne de texte à gauche, alignée à environ 330 px sur 2000 (environ 16 %). Bord droit des éléments UI à environ 1670 px, donc conteneur centré d'environ 1340 px sur 2000. L'objet 3D est centré dans la page, pas dans une colonne.
- **Ancrage** [O] : un widget fixe en bas à droite (barre graduée avec curseur rouge), présent sur `Toolbox`, `API demo`, `Bundle size` et `transition`.
- **Marges** [O] : le texte occupe moins d'un tiers de la largeur. Le reste est réservé à la 3D.

## Structure de page et navigation

- [O] Header minimal : logo à gauche, liens mono avec icône à droite, CTA rouge « SPONSOR ».
- [O] Hero : titre, phrase, deux actions (commande `npm i animejs` copiable, bouton « LEARN MORE ↓ »).
- [O] Suite en sections plein écran : Toolbox → API → Bundle size, chacune avec titre, phrase et éventuellement une liste mono ou un widget de données.
- [D] La barre graduée en bas à droite indique la progression dans la page : son curseur rouge avance d'une capture à l'autre (environ 1365 → 1380 → 1410 → 1595).
- [D] Le header ne semble pas fixe : il est absent de toutes les captures sauf le hero.

## Mouvement / 3D

- [O] **Un même objet** traverse les sections. Le cadran du hero (`Main section.png`) est la face avant d'un cylindre mécanique (`transition main - toolbox section.png` : on retrouve l'anneau multicolore et la trame rouge au bout du cylindre).
- [O] **Changement de rendu selon la section** : ombrage plat avec liseré pêche sur fond sombre (`transition`), puis **dessin au trait** façon plan technique sur fond clair (`Toolbox`, `Bundle size`).
- [O] **Vue éclatée** : les pièces sont séparées le long d'un axe diagonal (`Toolbox`) ou dispersées autour du centre (`Bundle size`). Chaque pièce est reliée à une étiquette par une ligne de rappel.
- [O] Dans `API demo section.png`, un carré rouge tourné (environ 5°) au centre du cadran illustre le snippet `rotate: 90, ease: 'inOutExpo'`.
- [D] Toutes ces transitions semblent pilotées par le scroll, comme le disent tes notes. Le carré tourne probablement en boucle (`loop: true` dans le snippet).
- Fluidité, easing, vitesse : **non observable** sur des images fixes.

## Ambiance en 3 mots

Technique, précise, ludique.

## 2 principes transférables

1. **Un seul acteur, plusieurs états.** Un même élément visuel persiste pendant tout le parcours et se transforme pour illustrer chaque idée. On ne remplace pas le visuel, on change son état ou son mode de rendu.
2. **Deux voix typographiques aux rôles stricts.** Une famille expressive porte le discours, une famille utilitaire (mono) porte l'interface et les données. On ne les mélange jamais au sein d'un même rôle.

## Ce qui ne serait pas transférable à ton portfolio

- Le **discours produit** : commande npm, poids du bundle, snippet d'API. C'est de la doc de librairie, pas une présentation de personne ou de projets.
- La **métaphore de la machine** : le cylindre mécanique représente une librairie modulaire. Un portfolio n'a pas de « pièces » à éclater de façon aussi littérale.
- Le **modèle 3D sur mesure très détaillé** : il demande un vrai travail de modélisation. [D] Ton dépôt repose plutôt sur de la géométrie procédurale et des particules (`src/lib/three/particles/`).
- L'anneau arc-en-ciel comme signature : c'est l'identité d'Anime.js.

## Écarts entre tes notes et les captures

- « Objets 3D qui s'animent au scroll » : le changement d'état entre les captures est **visible**, mais l'animation au scroll elle-même n'est **pas observable** sur des images fixes.
- « Un seul objet tout au long » : **confirmé en partie**. Le cylindre se retrouve dans `transition`, `Toolbox` et `Bundle size`. Dans `API demo`, le cadran revient mais **le carré rouge est un élément à part**.
- « Animations smooth » : **non vérifiable** sur captures.
- Tes notes ne mentionnent pas **l'alternance fond sombre / fond clair** ni le **passage au dessin au trait**. Ce sont pourtant les deux choix visuels les plus marquants sur les captures.
- Le bandeau « Insérer appuyée » (`transition…png`) est une notification Windows, **pas un élément du site**.
