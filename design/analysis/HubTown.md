# Analyse — Hubtown (hubtown.co.in)

Captures : `Future section.png`, `Innovation section.png`, `Excellence section.png`, `Legacy  section.png` (accueil), `Capture d'écran 2026-10-02 230038.png` (liste des projets, notée **[Liste]**), `Capture d'écran 2026-10-02 225954.png` (fiche projet, notée **[Fiche]**).

> Convention : **[O]** = observé sur la capture, **[D]** = déduit.

## Ce que j'aime (reformulé)

- Une **finition d'animation haut de gamme**, au registre corporate plutôt que démonstratif.
- La page d'accueil est un **récit en chapitres** qui avance au scroll.
- Des **shaders lumineux de science-fiction** : lueurs, traînées de lumière, particules.
- Un **ton futuriste dont le décor change** à chaque chapitre.

## Typographie

- **Style** [O] :
  - Une **grotesque néo-industrielle** pour les titres, **en capitales avec un interlettrage large** (« WE BUILD THE FUTURE OF REAL ESTATE », `Future section.png`).
  - La même famille, **plus serrée et en gras**, pour les très grands titres de fiche (« AKRUTI ORCHID PARK », [Fiche]).
  - Une **monospace** pour les micro-labels HUD : « CLICK TO ENABLE AUDIO », « SEC/001 », « LOC 19.100 N. 72.885 E », « STATUS [FINISHED] » ([Fiche], colonne gauche).
  - Un **logo dessiné sur une grille pixel/géométrique** (« HUBTOWN »).
- **Contraste de graisses** [O] : titres en semi-bold ou bold, texte courant en **light**, gris, assez peu lisible sur fond animé (`Innovation section.png`). Fort contraste entre les deux.
- **Échelle** [O] :
  - Accueil : titre d'environ 35 px de capitale et texte d'environ 16 px sur la capture, **soit un ratio d'environ 2:1** (titres modérés).
  - Fiche projet : titre d'environ 90 px, **soit un ratio d'environ 6:1**. C'est là que l'échelle devient spectaculaire.
- **Casse** [O] : capitales pour les titres, la nav, les boutons et les labels. Casse phrase uniquement pour les paragraphes et les noms de projets dans la liste ([Liste] « Akruti Arcade - Sold Out »).
- **Interlignage** [O] : serré sur les titres (environ 1.05 à 1.1), généreux sur les paragraphes centrés (environ 1.7, `Future section.png`).
- **Interlettrage** [O] : très ouvert sur la nav, les boutons et l'index de chapitres (environ 0.2 em). C'est une signature du site.

## Palette

| Rôle                             | Valeur approx.                               | Où                                                              |
| -------------------------------- | -------------------------------------------- | --------------------------------------------------------------- |
| Fond                             | bleu nuit presque noir `#050A1A` → `#0B1430` | partout                                                         |
| Lumière principale               | bleu électrique `#1E7BFF`                    | traînées, lueurs (`Excellence`, `Innovation`)                   |
| Lumière haute                    | cyan `#38C2FF`                               | cubes, nœuds de la carte (`Future`, `Legacy`)                   |
| Texte principal / surface claire | bleu lavande pâle `#D6DEFF`                  | titres, bouton MENU, panneau [Liste], bandeau « About » [Fiche] |
| Texte secondaire                 | gris bleuté `#8A93B0`                        | paragraphes, chapitres inactifs                                 |
| Texte sur surface claire         | quasi noir `#0A0F1F`                         | [Liste] « PROJECT LISTING »                                     |

- **Proportions** [O] : environ 75 % sombre, 20 % lumière bleue (dans la 3D), 5 % texte et UI pâle. **Monochrome strict** : aucune couleur chaude sur aucune capture. Le rare chromatisme visible est une frange RGB en bord droit de `Excellence section.png`. [D] Probablement une aberration chromatique.
- [O] Les photos sont **virées en bichromie bleue** pour rester dans la palette ([Fiche], photo de l'immeuble).

## Espacement et densité

- **Aéré au centre, dense en périphérie** [O] : le contenu narratif tient en un bloc centré (titre, paragraphe, CTA) au tiers inférieur de l'écran. Les bords portent l'UI : logo, nav, index de chapitres, barre basse.
- **Cadre** [O] : toute l'interface est inscrite dans un **cadre fin aux coins chanfreinés**, à environ 40 px des bords de la capture, avec une barre basse divisée en cellules (« SOUND OFF », « SCROLL TO EXPLORE », « CHAT WITH US »).
- **Coins coupés** [O] : les boutons (MENU, CLOSE, CTA « EXPLORE OUR PROJECTS ») ont un coin coupé à 45°. Ce motif revient partout.
- **Grille** [O] : symétrie centrale sur l'accueil. Sur [Fiche], deux colonnes séparées par une ligne verticale, avec une croix « + » à l'intersection, façon plan.

## Structure de page et navigation

- [O] **Accueil en 6 chapitres** listés à gauche : FUTURE, INNOVATION, COLLABORATION, EXCELLENCE, PURPOSE, LEGACY. Le chapitre actif est en blanc avec un carré, les autres sont atténués. Chaque chapitre suit le même gabarit : scène 3D plein cadre, titre, paragraphe, CTA.
- [O] Nav haute : ABOUT, PROJECTS, CAREERS, CONTACT, NEWS, puis LOGIN et MENU (bouton clair).
- [O] **Projets = carte** ([Liste]) : fond cartographique sombre avec marqueurs carrés lumineux, boussole en bas à droite, « OPEN PROJECT LIST » et « FILTERS [00] » en bas. La liste s'ouvre en **panneau clair à gauche**, avec filtres par lieu.
- [O] **Fiche projet** ([Fiche]) : panneau large à droite, titre géant sur photo, puis tags (« COMPLETED PROJECT », « SOLD OUT »), puis bandeau clair ABOUT avec liens rapides et description. Les métadonnées du projet restent visibles en surimpression atténuée à gauche (code « HUB-AOP », coordonnées, année).
- [O] Barre basse persistante : son, scroll, contact.

## Mouvement / 3D

- [O] **Une scène différente par chapitre** :
  - `Future` : cube lumineux au-dessus d'une eau réfléchissante, entre deux montagnes, avec des particules.
  - `Excellence` : plusieurs cubes sur des dunes, avec des traînées lumineuses qui serpentent au sol.
  - `Innovation` : relief abstrait vu de dessus, traversé d'un flux lumineux.
  - `Legacy` : réseau cartographique de nœuds lumineux dans une vallée.
- [O] Esthétique de rendu : **bloom/lueur forte**, brouillard bleu, particules ponctuelles, reflets sur l'eau. Les cubes ont une **texture de panneaux et circuits** en surface.
- [O] Invitation « CLICK TO ENABLE AUDIO » et bascule « SOUND OFF ». **Le site est sonorisé.**
- [D] Le motif récurrent (cube lumineux, traînées) relie les scènes entre elles. Le passage d'une scène à l'autre se fait au scroll (tes notes et l'indicateur « SCROLL TO EXPLORE »).
- Nature et qualité des transitions, vitesse, easing : **non observable**.

## Ambiance en 3 mots

Nocturne, cinématographique, institutionnelle.

## 2 principes transférables

1. **Un gabarit narratif constant, un décor qui change.** Chaque chapitre garde la même mise en page (titre, phrase, action) et seul l'environnement visuel évolue. Le changement est d'autant plus lisible que la structure reste fixe.
2. **L'interface comme instrument.** Un cadre périphérique, des micro-labels techniques et un index de progression transforment la page en tableau de bord. Le contenu se loge au centre, l'UI vit aux bords.

## Ce qui ne serait pas transférable à ton portfolio

- Le **ton corporate et les slogans** (« We build the future of real estate ») : un portfolio parle à la première personne, avec des preuves concrètes.
- **Six environnements 3D distincts, éclairés et texturés** : c'est un coût de production d'agence.
- La **carte géographique** comme navigation projets : elle a du sens pour de l'immobilier, pas pour des projets logiciels.
- Les éléments métier : LOGIN, « Chat with us » WhatsApp, « SOLD OUT ».
- [D] Le texte gris light sur fond animé est peu lisible (`Innovation section.png`). C'est à éviter plutôt qu'à copier.

## Écarts entre tes notes et les captures

- « Un ton très futuriste **qui change** » : sur les captures, **la palette ne change pas** (bleu monochrome partout). Ce qui change, c'est **le décor** (eau, dunes, relief, réseau). Le changement est spatial, pas chromatique.
- « Shaders sci-fi » : lueurs, particules et traînées sont **visibles**. Qu'il s'agisse de shaders custom est **déduit**, pas observable.
- « Animations quali, style pro » et « expérience au scroll » : **non vérifiables** sur des images fixes. Seuls l'index de chapitres et « SCROLL TO EXPLORE » confirment une progression au scroll.
- Tes notes ne parlent pas de **l'UI HUD** (cadre chanfreiné, coins coupés, micro-labels mono), ni de la **carte projets**, ni du **son**. Ce sont pourtant trois éléments très présents sur les captures.
- Les chapitres COLLABORATION et PURPOSE ne sont pas capturés, donc **non analysés**.
