# Analyse — Three.js Conf Paris (threejs.paris)

Captures : `Main page.png`, `Custom side navbar.png`, `Schedule page.png`, `FAQ page.png`.

> Convention : **[O]** = observé sur la capture, **[D]** = déduit.

## Ce que j'aime (reformulé)

- Une **direction artistique très colorée et singulière**.
- Les **objets 3D réagissent au curseur**, ce qui donne l'impression d'un site vivant.
- Des **changements de page fluides et mis en scène**.
- Une **UI sur mesure** qui prolonge la DA au lieu de la contredire.
- Un **carrousel 3D en tourbillon** qui donne un aperçu interactif du programme.

Ce que tu aimes moins : une UI **un peu trop stylisée**.

## Typographie

- **Style** [O] : trois familles.
  - Une **display sans ultra-noire et large**, aux formes rondes et un peu molles, avec des détails excentriques (K à bras courbe, G à éperon, Q à queue large). Elle sert aux titres géants (« THREE.JS CONF », « SCHEDULE », « FAQ »), au menu (`Custom side navbar.png`), aux noms d'intervenants (« KIM BOUTIN ») et aux titres de rubrique de la FAQ.
  - Une **grotesque condensée en gras** (type Bebas/Anton) pour la ligne d'info (« THE FIRST THREE.JS EVENT · PARIS 10 & 11 SEP 2026 · TICKETS ON SALE ») et la pastille (« DEEP DIVE IN THREE.JS! »).
  - Une **sans géométrique semi-bold** pour le texte courant (questions de la FAQ).
- **Contraste de graisses** [O] : maximal sur les titres (black), semi-bold ou bold ailleurs. **Pas de regular ni de light visible** : tout est lourd.
- **Échelle** [O] : **démesurée**.
  - Les titres de page occupent toute la largeur et **débordent du cadre** (« THREE.JS CONF » coupé en haut et à droite, « SCHEDULE » d'environ 240 px de haut sur 964, « FAQ » coupé par la carte).
  - Ligne d'info d'environ 45 px, texte de la FAQ d'environ 22 px. Ratio titre / texte d'environ **10:1**.
  - Dans le menu, **chaque entrée a une taille différente** (HOME et SPONSORS plus grands, LINE UP et MERCH plus petits).
- **Casse** [O] : **capitales** partout sauf le texte courant de la FAQ (casse phrase).
- **Interlignage** [O] : nul, voire négatif, sur les titres géants (« THREE » et « CONF » se touchent). Normal sur la FAQ.

## Palette

| Rôle                               | Valeur approx.                                              | Où                                        |
| ---------------------------------- | ----------------------------------------------------------- | ----------------------------------------- |
| Fond accueil / FAQ                 | violet pervenche `#8F8CE8` (léger dégradé)                  | `Main page`, `FAQ page`                   |
| Fond Schedule                      | jaune moutarde `#EBC461`                                    | `Schedule page`                           |
| Titres sur violet                  | crème `#F0E8DE`                                             | « THREE.JS CONF »                         |
| Texte, panneau menu, boutons ronds | indigo nuit `#221D3D`                                       | menu, « SCHEDULE », « FAQ », hamburger    |
| Carte de contenu                   | crème `#EFE7DD`, champs blancs                              | carte FAQ                                 |
| CTA                                | vert menthe `#6CC4A0`                                       | « BUY TICKET » (`Custom side navbar.png`) |
| Personnages 3D                     | magenta, rose, orange, or, vert, violet saturés et texturés | sphères des quatre captures               |

- **Proportions** [O] : environ 60 % de fond coloré, 25 % de typo géante (crème ou indigo), 15 % de personnages multicolores. **La couleur de fond change selon la page** (violet, puis jaune). L'indigo sert de « noir » et assure le contraste partout.

## Espacement et densité

- **Dense et saturé** [O] : la typographie remplit le cadre bord à bord. Les personnages se superposent au texte.
- **Superposition en couches** [O] : de l'arrière vers l'avant, titre géant, puis objets 3D, puis UI (pastille, carte FAQ). La carte FAQ **masque le bas du titre** « FAQ » et les sphères débordent derrière la carte.
- **Grille** [O] : pas de colonne de texte classique. Seul le contenu fonctionnel (carte FAQ) est centré, sur environ 1200 px de 2000, avec des marges intérieures d'environ 45 px.
- **Coins** [O] : hamburger rond en bas à gauche, pastille ronde avec un visage en haut à droite, « Sponsored by » en bas à droite. Tous constants d'une page à l'autre.

## Structure de page et navigation

- [O] **Menu latéral custom** (`Custom side navbar.png`) : grand panneau indigo aux coins arrondis, ancré à gauche et ouvert depuis le hamburger. Il contient HOME, LINE UP, WORKSHOP, SCHEDULE, SPONSORS, FAQ, MERCH, TICKET, puis en bas la croix de fermeture, « BUY TICKET » et les icônes X et Instagram.
- [O] **Accueil** : titre-logo géant, pastille de message, ligne d'info, personnages 3D.
- [O] **Schedule** : sélecteur de jour en pilule (THU 10 SEPT / FRI 11 SEPT), carrousel de cartes vidéo avec flèches gauche / droite, heure au-dessus (« 10:35 »), nom et rôle de l'intervenant en dessous.
- [O] **FAQ** : carte crème avec rubriques (« L'ESSENTIEL », « PROGRAMME ET INTERVENANTS ») et accordéons blancs à flèche. Contenu en français.
- [O] Le message de la pastille change entre deux captures (« DEEP DIVE IN THREE.JS! » puis « PARIS AFTERPARTY! »), comme le sponsor en bas à droite (makemepulse, hervé, intangible). [D] Ces deux éléments tournent automatiquement.

## Mouvement / 3D

- [O] **Personnages 3D** : sphères texturées (matière poilue, marbrée ou nacrée) avec des **visages de dessin animé** (yeux, bouches, lunettes de soleil). Ils sont empilés à droite sur l'accueil et regroupés sur les bords de la FAQ.
- [O] La **pastille** est rendue comme un objet en verre épais (bord translucide et réfractant).
- [O] **Carrousel Schedule** : la carte centrale est de face, les cartes latérales sont inclinées en perspective et plus petites, comme disposées sur un arc. Des éléments flous à l'arrière-plan (« LUNCH ») suggèrent d'autres items plus loin dans la profondeur.
- [D] La carte centrale noire est une vidéo pas encore chargée au moment de la capture.
- [D] Le menu à tailles variables est peut-être animé (vague, survol).
- Réaction des objets au curseur, transitions de page, rotation du carrousel : **non observable** sur captures.

## Ambiance en 3 mots

Ludique, pop, exubérante.

## 2 principes transférables

1. **Une couleur par page comme repère.** Chaque section a sa propre couleur de fond tandis que la typo, l'UI et les personnages restent les mêmes. On sait où l'on est avant d'avoir lu quoi que ce soit.
2. **Texte, 3D et interface en couches de profondeur.** Le titre est un plan de fond, les objets 3D passent devant, l'interface flotte au-dessus. La 3D s'intègre à la mise en page au lieu de vivre dans une boîte.

## Ce qui ne serait pas transférable à ton portfolio

- Les **mascottes à visage de cartoon** : c'est l'identité d'un événement communautaire festif, trop marquée pour te représenter.
- L'**exubérance typographique totale** (titres qui débordent, tout en black, menu à tailles irrégulières) : tu la juges toi-même trop stylisée. [D] Elle concurrencerait les visuels de tes projets.
- Les **contenus d'événement** : billetterie, merch, sponsors tournants, FAQ logistique.
- La **palette pastel-pop multicolore** comme base : elle est forte, mais appartient à cette marque.

## Écarts entre tes notes et les captures

- « Le curseur interagit avec les objets » : **non observable** sur captures. On ne voit que les objets eux-mêmes.
- « Changement de page smooth et stylisé » : **non observable**. On constate seulement que chaque page change de couleur de fond.
- « Carrousel en tourbillon 3D » : on voit des cartes **en perspective sur un arc**. L'effet de « tourbillon » (spirale, rotation) n'est **pas visible** sur une image fixe.
- « UI custom qui suit la DA » : **confirmé** (menu, pilule de jour, boutons ronds, carte FAQ, pastille en verre).
- « UI un peu trop stylisée » : **cohérent avec les captures**. Le menu à tailles variables et la typo qui déborde sont les éléments les plus clivants.
- Tes notes ne mentionnent pas le **changement de couleur de fond par page** ni la **superposition texte / 3D / UI**. Ce sont pourtant les deux mécaniques de mise en page les plus marquantes.
