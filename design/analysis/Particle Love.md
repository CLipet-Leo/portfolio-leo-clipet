# Analyse — Particle Love (particle-love.com)

Captures : `Preset choice.png`, `Choice 1.png`, `Choice 2.png`, `Transition.png`, `Particules interactive 1.png`, `Particules interactive 2.png`.

> Convention : **[O]** = observé sur la capture, **[D]** = déduit.

## Ce que j'aime (reformulé)

- Le **rendu des particules** : densité, traînées, couleurs.
- Une **navigation réduite à l'essentiel** pour passer d'une expérience à l'autre.
- Des **transitions entre écrans** qui ont une forme propre.
- Des expériences qu'on **manipule**, pas seulement qu'on regarde.

## Typographie

- **Style** [O] : deux familles très contrastées.
  - Une **sans géométrique type Futura** pour l'identité : « PARTICLE LOVE » en gras, « BY EDAN KWAN » en regular.
  - Une **serif didone en italique** (type Playfair Display Italic) pour tout ce qui s'adresse à l'utilisateur : « Please choose the quality of the experience: », « Low / Medium / High », « Go », « The Spirit », « Hyper Mix ».
  - Les captures d'expérience utilisent en plus une **sans neutre système** pour le panneau de réglages et le pied de page (« Press space key to toggle movement »).
- **Contraste de graisses** [O] : titre en bold, sous-titre en regular, serif italique en regular. Le contraste vient surtout du **changement de famille** (géométrique droite contre serif italique).
- **Échelle** [O] : titre d'environ 40 px de capitale, sous-titre d'environ 20 px, serif environ 20 à 22 px (sur 2000 px de large). Échelle **resserrée**, aucun élément géant.
- **Casse** [O] : **capitales** pour l'identité, casse phrase pour la serif.
- **Interlettrage** [O] : **extrêmement large** sur le titre, environ 0.5 em (« P A R T I C L E L O V E »). C'est la signature typographique du site.
- **Interlignage** [O] : la seule phrase sur deux lignes (`Preset choice.png`) a un interlignage d'environ 1.3.

## Palette

| Rôle                      | Valeur approx.                                                                       | Où                                      |
| ------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------- |
| Fond accueil              | noir bleuté `#070B12`                                                                | `Preset choice.png`, `Choice 1/2`       |
| Texte / boutons           | blanc `#FFFFFF`, texte des losanges en noir                                          | tous                                    |
| Surface de transition     | gris anthracite `#1F2121`                                                            | grand losange de `Transition.png`       |
| Particules « The Spirit » | bleu-vert pâle `#8FC7C9` et beige doré `#B8A47E`                                     | `Choice 1.png`                          |
| Particules « Hyper Mix »  | violet `#8A6BD8`, rouge rosé `#C4485A`, lavande                                      | `Choice 2.png`, `Transition.png`        |
| Expérience 1              | fond `#343434`, particules `#FFFFFF` (**valeurs lues dans le panneau**)              | `Particules interactive 1.png`          |
| Expérience 2              | fond `#1C2020`, `#E6005E` magenta, `#00B1D7` cyan (**valeurs lues dans le panneau**) | `Particules interactive 2.png`          |
| UI du panneau             | fond noir, curseurs bleus `#2FA1D6`                                                  | panneau droit des captures interactives |

- **Proportions** [O] : l'UI propre au site est **strictement noir et blanc**. Toute la couleur vient des particules, et **chaque expérience a sa propre palette**. L'accent est donc variable et jamais imposé par l'interface.

## Espacement et densité

- **Très aéré** [O] : axe central unique. Le titre est en haut au centre, le contrôle principal au centre de l'écran. Rien sur les côtés sur l'accueil.
- **Grille** [O] : composition **strictement symétrique** (`Preset choice.png`, trois losanges espacés régulièrement ; `Choice 1/2`, flèche gauche, losange et flèche droite).
- **Exception dense** [O] : le panneau de réglages ancré à droite (`Particules interactive 1/2`), environ 240 px de large sur 2000, liste serrée de lignes d'environ 27 px.

## Structure de page et navigation

- [O] **Étape 1**, choix de la qualité (`Preset choice.png`) : trois losanges blancs Low / Medium / High.
- [O] **Étape 2**, sélecteur d'expérience (`Choice 1/2`) : flèches précédent / suivant, losange « Go », nom de l'expérience en italique. Le fond de particules change selon l'expérience sélectionnée (« The Spirit » contre « Hyper Mix »).
- [O] **Étape 3**, expérience plein écran (`Particules interactive 1/2`) : titre conservé en haut, croix de fermeture en haut à gauche, panneau de réglages à droite (Simulator, Rendering, Post-Processing), aide clavier en bas à gauche, liens auteur en bas à droite.
- [O] Le **titre reste à la même place** sur toutes les captures : ancre visuelle fixe.
- [O] **Le losange est le motif de navigation** : boutons de qualité, bouton Go, forme de transition.

## Mouvement / 3D

- [O] **Particules avec traînées de mouvement** : allongées dans le sens radial, avec un effet de zoom vers le centre (`Choice 1/2`, `Transition.png`). Le panneau confirme « motionBlur » activé.
- [O] Effets listés et activables dans le panneau : **bloom**, **DOF** (profondeur de champ), **FXAA**, vignette, « curl size » (bruit de type curl), « emitter distance/speed », « attraction ».
- [O] Quantités affichées : **252k** puis **524k** particules.
- [O] Option « **follow mouse** » cochée (`Particules interactive 1.png`). [D] Les particules suivent le curseur.
- [O] Aide « Press space key to toggle movement » : contrôle clavier.
- [O] `Transition.png` : un **grand losange sombre** recouvre le centre, et le contenu précédent (Go, flèches, « Hyper Mix ») y est encore visible en transparence. [D] La transition fait grandir le losange jusqu'à couvrir l'écran, puis révèle l'expérience.
- [O] `Particules interactive 2.png` : les particules sont rendues comme des **sphères ombrées** (« particle size 32 »), et non plus comme des points. On dirait une matière solide.
- Durée, easing, réaction réelle à la souris : **non observable**.

## Ambiance en 3 mots

Contemplatif, expérimental, élégant.

## 2 principes transférables

1. **Une forme géométrique comme fil de navigation.** Un même motif sert à la fois de bouton, de cadre et de transition. L'utilisateur reconnaît partout « l'endroit où l'on clique », et le passage d'un écran à l'autre prolonge ce geste.
2. **Interface neutre, couleur déléguée au contenu.** L'UI reste en noir et blanc. Chaque expérience apporte sa propre palette, ce qui rend chaque « monde » identifiable sans ajouter de chrome.

**Bonus pertinent** [D] : le **choix de qualité en amont** (Low / Medium / High) répond honnêtement au coût GPU d'un site très 3D. Ton dépôt a déjà des presets de particules (`src/lib/three/particles/presets.ts`).

## Ce qui ne serait pas transférable à ton portfolio

- Le **panneau de réglages brut** (style dat.GUI par défaut) comme UI finale : il est cohérent pour un labo d'expérimentation, mais rompt la DA. [D] Il pourrait se justifier sur ta page `/lab`, pas sur l'accueil.
- Un site **sans contenu textuel** (ni projets, ni parcours, ni contact) : c'est une galerie de démos, pas un portfolio.
- Le couple **Futura capitales espacées + Playfair italique** : très marqué « élégance classique », il n'est pas forcément ta voix.
- L'**écran de choix de qualité comme porte d'entrée** obligatoire : c'est une friction de plus avant de voir ton travail. [D] Une détection automatique avec réglage optionnel serait moins intrusive.

## Écarts entre tes notes et les captures

- « La navigation dans le site » : sur les captures, elle se limite à **précédent / suivant / Go / fermer**. Il n'y a pas de menu, pas d'arborescence. Ce que tu aimes est sans doute sa **simplicité**, pas sa richesse.
- « Les transitions de pages » : une seule capture intermédiaire (`Transition.png`, le losange qui grandit). Le reste du mouvement est **non observable**.
- « Expériences interactives » : l'interactivité **visible** est surtout le **panneau de paramètres**. L'interaction directe à la souris est **déduite** de l'option « follow mouse ».
- « Les effets de particules » : **confirmé**, et le panneau donne même les ingrédients exacts (motion blur, bloom, DOF, curl noise, centaines de milliers de particules).
- Tes notes ne mentionnent ni le **motif du losange** ni le **contraste typographique sans / serif italique**. Ce sont pourtant les deux éléments qui font l'identité de l'interface.
