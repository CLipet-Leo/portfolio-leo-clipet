# Analyse — lhbzr (lhbzr.com)

Captures : `Main page.png`, `Project list page.png`, `Project page - Adventure time.png`, `About me page.png`.

> Convention : **[O]** = observé sur la capture, **[D]** = déduit.

## Ce que j'aime (reformulé)

- Un **rendu moderne et net**, des animations sobres.
- Un **carrousel de projets** simple dans son principe mais avec des idées de mise en scène.
- Une **page projet bien hiérarchisée** : les informations clés en haut, les visuels en dessous.
- Une **page About courte mais précise**.

Ce que tu aimes moins : une UX peu poussée et un **manque d'information** qui fait passer le minimalisme pour de la pauvreté.

## Typographie

- **Style** [O] : **une seule famille**, une sans-serif **techno, carrée et légèrement étendue** (O et C aux angles arrondis, cf. « About Me », « Adventure Time »). Le logo est un **monogramme vertical** « LHBZR » à traits fins et lettres liées (`Main page.png`).
- **Contraste de graisses** [O] : **quasi nul**. Tout est en light ou thin, y compris les titres. La hiérarchie passe par la taille et la couleur, jamais par la graisse.
- **Échelle** [O] :
  - Titre d'environ 36 px contre environ 18 px pour le texte courant (`About me page.png`), **soit un ratio d'environ 2:1**.
  - Labels d'environ 13 px en gris (« Company », « Role », « Client » dans `Project page`).
  - L'échelle reste modeste. Le seul grand élément est le monogramme.
- **Casse** [O] : casse titre ou casse phrase partout (« About Me », « Adventure Time », « Get In Touch »). **Aucune capitale intégrale**.
- **Interlignage** [O] : très ouvert sur le texte About, environ 1.9 (`About me page.png`). Le texte respire beaucoup, presque trop pour un paragraphe.

## Palette

| Rôle             | Valeur approx.             | Où                                                                                                            |
| ---------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Fond             | noir pur `#000000`         | partout                                                                                                       |
| Texte / traits   | blanc `#FFFFFF`            | titres, lignes du motif central, croix de fermeture                                                           |
| Texte secondaire | gris `#8C8C8C`             | labels de méta, liens soulignés « Twitter GitHub… »                                                           |
| Trame            | gris très sombre `#1A1A1A` | grille de points en fond (`Main page`, `Project page`, `Project list`)                                        |
| Couleur          | **aucune propre au site**  | la couleur ne vient que des visuels de projets (`Project list page.png`, violet et magenta du jeu « Trolli ») |

- **Proportions** [O] : environ 90 % noir, 10 % blanc et gris. 0 % d'accent : le site est **strictement achromatique** et laisse la couleur aux projets.

## Espacement et densité

- **Très aéré** [O] : un seul élément focal par écran (motif central, carte projet, bloc About). Énormément de vide.
- **Grille** [O] :
  - Page projet : 3 colonnes égales pour les métadonnées (Company / Role / Client), alignées à environ 280 px du bord gauche, sur 2000 (`Project page`).
  - About : colonne centrée étroite, environ 500 px sur 2000.
  - Accueil : composition **symétrique**, avec About à gauche et Work à droite à mi-hauteur.
- **Trame de points** [O] : une grille de points régulière couvre le fond. Elle s'estompe par zones (`Project page`, plus dense en haut à droite).

## Structure de page et navigation

- [O] **Accueil** : motif central, monogramme, deux entrées latérales (« About » à gauche, « Work » à droite) encadrées de traits obliques, et une ligne en bas (« > Peggy Gou - Han Jan »).
- [D] Cette ligne du bas ressemble à un lecteur audio (titre d'un morceau avec un chevron « play »).
- [O] **Liste des projets** : carrousel horizontal. La carte centrale est grande, les cartes voisines sont coupées par les bords. Le titre du projet est centré sous la carte (« Trolli »), une croix de fermeture en haut au centre.
- [O] **Page projet** : croix en haut, titre, rangée de métadonnées en 3 colonnes, puis un visuel qui commence en bas de l'écran (carte « Loading » en style pixel).
- [O] **About** : croix en haut, titre centré, trois paragraphes (positionnement, expérience, clients), puis une ligne « Get In Touch » avec 4 liens.
- [D] Navigation **modale** : chaque page est une couche qu'on ferme (croix) pour revenir à l'accueil. Pas de menu global visible.

## Mouvement / 3D

- [O] `Main page.png` : un **anneau de lignes blanches croisées** (motif en fil tendu, façon spirographe) autour d'un disque noir.
- [O] `Project list page.png` : les cartes sont **déformées en trapèze**. Celle de gauche penche vers l'intérieur, la centrale est légèrement inclinée. [D] C'est une déformation de type perspective/courbure appliquée en WebGL pendant le défilement du carrousel.
- [O] `About me page.png` : un **terrain ondulé fait de points** (nuage de particules) en bas de page.
- [O] Un **petit point blanc** apparaît à un endroit différent sur chaque capture : environ (795, 285), (1000, 357), (592, 468). [D] C'est le curseur personnalisé.
- Animation du motif, comportement du carrousel au drag ou au scroll, transitions entre pages : **non observable**.

## Ambiance en 3 mots

Minimal, nocturne, technique.

## 2 principes transférables

1. **Le site s'efface, les projets colorent.** Une interface strictement neutre (noir, blanc, gris) fait de chaque visuel de projet la seule source de couleur. Le contraste met le travail en avant.
2. **Les métadonnées d'abord, en grille fixe.** Chaque fiche projet commence par une rangée de faits (rôle, contexte, client) toujours au même endroit et dans le même ordre. Le lecteur les retrouve sans chercher.

## Ce qui ne serait pas transférable à ton portfolio

- La **liste de clients prestigieux** (Airbnb, Apple, Nike…) : la page About tient sur sa crédibilité de parcours. [D] Avec moins de références, la même brièveté paraîtrait vide.
- Le **niveau d'information minimal**, que tu critiques toi-même : pas de description, pas de stack, pas de résultats sur la page projet visible.
- La **navigation 100 % modale** sans menu : elle fonctionne pour un site à trois pages, mais limite la découverte (ton point « UX peu poussée »).
- Le **lecteur audio** : il porte une identité personnelle qui n'est pas la tienne.
- L'interlignage extrême du texte About : il nuit à la lecture d'un paragraphe.

## Écarts entre tes notes et les captures

- « Animations simples » : **non observable** sur captures. Le motif de l'accueil et la déformation du carrousel suggèrent au contraire un travail WebGL plutôt sophistiqué, simple en apparence seulement [D].
- « Infos en haut, images en bas » : **confirmé** pour les infos (`Project page`). Les images ne sont qu'**amorcées** (carte « Loading » coupée en bas), on ne voit pas leur mise en page.
- « Carrousel avec de bonnes idées » : la **déformation en trapèze** est visible. Les autres idées éventuelles (interaction, transition) ne le sont pas.
- « About avec peu d'infos mais précises » : **confirmé**. Trois paragraphes : rôle et techno, années d'expérience et médiums, clients.
- Tes notes ne mentionnent ni la **trame de points**, ni le **curseur custom**, ni l'**absence totale de couleur propre au site**. C'est pourtant ce qui crée l'impression de « propre » que tu relèves.
