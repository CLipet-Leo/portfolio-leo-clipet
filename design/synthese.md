# Synthèse des références

Sources : les 6 fiches de `design/analysis/`.

**Pondération** : un point appuyé par tes notes (`Reference.md`) pèse plus qu'un point seulement observé sur les captures. Chaque constante indique les deux décomptes : « **notes** » pour les références où tu l'as écrit toi-même, « **vu** » pour celles où je l'ai seulement observé.

---

## 1. Les constantes de ton goût

Seuil retenu : au moins 3 références sur 6. Classées par poids.

### Fortement appuyées par tes notes

1. **Une 3D qui change sans rompre la DA.** Un seul acteur qui change d'état, ou une scène qui évolue de chapitre en chapitre tout en gardant la même matière, la même palette et le même rendu.
   - Notes : AnimeJS (« un seul objet »), Symphony (« 3D évolutive qui respecte la DA »), HubTown (« ton futuriste qui change »).
   - Vu : Particle Love (une palette par expérience, même rendu).
   - → **4/6.**
2. **Le passage d'un état à l'autre est un moment soigné.** Transitions de page ou animation au scroll.
   - Notes : AnimeJS (scroll, « smooth »), HubTown (scroll, « quali »), Particle Love (transitions), Symphony (transitions), Three.js (« changement de page smooth »).
   - → **5/6**, c'est ta constante la plus citée. ⚠ Aucune n'est vérifiable sur captures : c'est ton souvenir de l'expérience.
3. **On agit sur la scène, on ne fait pas que la regarder.**
   - Notes : Particle Love (« expériences interactives »), Three.js (« le curseur interagit »), Symphony (manque reproché).
   - → **3/6**, dont une par la négative, ce qui la renforce.
4. **Une UI dessinée pour la DA, pas une UI générique posée dessus.**
   - Notes : Symphony (« UI travaillée »), Three.js (« UI custom qui suit la DA »), lhbzr (« aspect propre »).
   - Vu : HubTown (cadre HUD).
   - → **4/6.**
5. **Comprendre vite.** Peu d'éléments par écran, un message clair.
   - Notes : AnimeJS (« simple et concis »), lhbzr (« simple »).
   - Vu : Particle Love (navigation réduite à prev / next / go).
   - → **3/6.**

### Récurrentes sur les captures, absentes de tes notes

Tu ne les nommes pas, mais elles reviennent : ce sont probablement elles qui produisent l'effet que tu décris.

6. **Fond sombre dominant**, autour de 85 % de l'écran.
   - Vu : HubTown, lhbzr, Particle Love, Symphony, AnimeJS en partie. Seul Three.js fait exception.
   - → **5/6.**
7. **Palette restreinte : neutres et un seul accent**, ou la couleur laissée au contenu.
   - Vu : AnimeJS (rouge rare), HubTown (bleu monochrome), lhbzr (achromatique), Particle Love (UI noir et blanc), Symphony (cuivre rare).
   - → **5/6.**
8. **Deux voix typographiques aux rôles stricts**, l'une expressive et l'autre utilitaire.
   - Vu : AnimeJS (sans + mono), HubTown (grotesque + mono), Particle Love (géométrique + serif italique), Symphony (serif de texte + display), Three.js (display + condensée).
   - → **5/6.**
9. **L'UI tient les bords, le contenu occupe le centre.** Repères fixes aux coins (navigation, son, progression) et scène libre au milieu.
   - Vu : HubTown, Symphony, Three.js, Particle Love, lhbzr.
   - → **5/6.**
10. **Particules et lumière** comme matière principale de la 3D : points, traînées, filaments, lueurs.
    - Notes : Particle Love.
    - Vu : HubTown, Symphony, lhbzr (terrain de points).
    - → **4/6.**
11. **Un indicateur de progression ou de chapitre** toujours visible.
    - Vu : AnimeJS (barre graduée), HubTown (index des chapitres), Symphony (numéro de chapitre).
    - → **3/6.**
12. **Le son** comme couche de l'expérience.
    - Notes : Symphony.
    - Vu : HubTown, lhbzr.
    - → **3/6**, mais une seule fois cité par toi : poids faible.

---

## 2. Contradictions à trancher

Je ne les résous pas. Chacune est une question pour toi.

1. **Sombre ou coloré ?** Cinq références sont nocturnes et presque monochromes. Pourtant, la seule DA que tu qualifies de « très colorée et unique » (Three.js) est l'inverse. → _Veux-tu que la couleur soit un événement rare dans un monde sombre, ou le matériau principal du site ?_
2. **Guidé ou libre ?** Tu aimes les récits qui avancent au scroll (AnimeJS, HubTown) et les chapitres mis en scène (Symphony), mais tu reproches à Symphony d'être un diaporama. → _Le visiteur doit-il suivre ton fil, ou pouvoir sauter où il veut à tout moment ? Si les deux, lequel est le mode par défaut ?_
3. **Épuré ou informatif ?** Tu aimes la page About courte de lhbzr et dénonces en même temps son « manque d'informations cruel ». → _Quelle est la quantité minimale d'information qu'un visiteur doit trouver sur un projet sans cliquer ?_
4. **Jusqu'où styliser l'UI ?** L'UI dessinée de Symphony et celle de Three.js te plaisent, mais tu trouves la seconde « un peu trop stylisée ». → _Où passe la limite pour toi : la forme des composants, la typo, ou le fait qu'ils attirent l'œil avant le contenu ?_
5. **Un acteur unique ou une scène par chapitre ?** AnimeJS garde un seul objet qui se transforme, HubTown et Symphony changent de décor à chaque chapitre. → _Ta timeline doit-elle être portée par un seul personnage visuel qui évolue avec toi, ou par un monde différent par période ?_
6. **Quel registre ?** Technique et précis (AnimeJS, HubTown, lhbzr), organique et poétique (Symphony, Particle Love), ou ludique (Three.js). → _Quel adjectif veux-tu qu'un recruteur retienne en sortant ?_
7. **Quelle échelle typographique ?** Discrète (lhbzr, Particle Love, ratio d'environ 2:1) ou spectaculaire (Three.js environ 10:1, titres de Symphony environ 5:1). → _La typo doit-elle être une voix calme sous la 3D, ou un élément visuel à part entière ?_
8. **Le son : oui ou non ?** Tu valorises l'expérience musicale de Symphony, mais un portfolio se visite souvent vite et en silence. → _Le son est-il un bonus optionnel, ou une partie de l'identité que tu veux défendre ?_

---

## 3. Ce que tu sembles rejeter

D'après tes trois « je n'aime pas » :

| Source   | Ta note                                                                              | Rejet sous-jacent                                                                           |
| -------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Symphony | « pas assez interactif, comme une diapositive »                                      | **La passivité.** Un parcours où le visiteur n'a que « suivant » comme action.              |
| Three.js | « design UI un peu trop stylisé »                                                    | **Une forme qui concurrence le fond.** Une UI qui se fait remarquer avant le contenu.       |
| lhbzr    | « UX pas très poussée », « manque d'informations cruel », « simpliste… un peu trop » | **Le minimalisme comme alibi.** Une sobriété qui cache l'absence de contenu ou de parcours. |

**Point commun** [déduit] : tu rejettes les sites où **l'effet remplace l'expérience**, que ce soit par excès (UI trop marquée) ou par défaut (trop peu d'action, trop peu d'information). La forme doit servir quelque chose que le visiteur fait ou apprend.

---

## 4. Trois directions artistiques

Les trois répondent à la même commande : **une page d'accueil structurée comme une timeline de ton parcours.** Chacune tranche différemment les questions de la section 2.

Elles reprennent des **principes**, pas des mises en page. Les sources sont citées à la fin de chaque direction.

---

### Direction A — « Instrument »

_Ton parcours se lit comme une mesure : précise, graduée, lisible._

**Tranche** : sombre avec un seul accent · acteur unique · registre technique · échelle typographique discrète.

- **Palette**
  - Fond graphite chaud `#1C1B1A`, surfaces `#262423`.
  - Texte os `#ECE8E1`, texte secondaire `#8E8A84`.
  - **Un seul accent**, vert phosphore `#7CFFB2`. Il est réservé à ce qui est actif : période courante, élément survolé, curseur.
  - Proportions : environ 88 % de neutres, 10 % de texte, 2 % d'accent au maximum.
- **Typographie**
  - Une grotesque sobre (regular et semi-bold) pour le discours.
  - Une mono pour tout ce qui est donnée : dates, stack, rôles, durées.
  - Échelle modeste, environ 2.5:1. Titres en casse phrase. Mono en minuscules.
  - La mono n'est jamais utilisée pour du texte suivi.
- **Densité**
  - Moyenne. Chaque étape de la timeline affiche **les faits sans clic** : rôle, durée, stack, une phrase de résultat. C'est la réponse à ta critique de lhbzr.
  - Le vide sert à séparer les étapes, pas à masquer un manque de contenu.
- **Page d'accueil en timeline**
  - Un axe vertical gradué en années sert à la fois de **contenu et de navigation**. Chaque graduation est cliquable, et une mini-carte de l'axe reste visible à un bord pour sauter directement à une période.
  - Le scroll fait défiler les étapes. L'ordre de lecture est guidé, mais on peut sauter n'importe où à tout moment.
  - Ouverture : nom, une ligne de positionnement, l'acteur 3D. Clôture : contact.
- **Mouvement / 3D**
  - **Un seul acteur de particules** traverse toute la page et **change de forme à chaque période** (ex. : un outil, puis un réseau, puis un objet lié au projet phare).
  - Le changement est piloté par le scroll : la position dans la timeline dicte la forme.
  - Le curseur perturbe localement les particules, qui reviennent à leur forme ensuite.
  - Les transitions sont brèves, sans effet gratuit.
- **Ambiance** : précise, sobre, vivante.
- **Principes repris** : un acteur, plusieurs états (AnimeJS) · deux voix typographiques aux rôles stricts (AnimeJS, HubTown) · accent rare réservé à l'élément actif (AnimeJS) · indicateur de progression permanent (AnimeJS, HubTown, Symphony) · métadonnées d'abord, en grille fixe (lhbzr).

---

### Direction B — « Matière »

_Ton parcours se traverse comme une suite de saisons : chaque période a sa lumière._

**Tranche** : sombre avec une couleur qui change · une scène par chapitre · registre organique · échelle contrastée.

- **Palette**
  - Base commune : noir d'encre `#0E0F12`, texte ivoire `#EFEAE2`, gris fumée `#6F6C69`.
  - **Chaque période reçoit une seule teinte de lumière**, qui colore uniquement la 3D (ex. : bleu glacier `#9CC8E8`, ambre `#E8B26A`, rouille `#C4674A`, vert lichen `#9DB87A`). L'UI reste ivoire.
  - Proportions : environ 80 % d'ombre, 15 % de lumière colorée, 5 % de texte.
- **Typographie**
  - Une serif de texte contemporaine pour la narration : une phrase par période, en grand, lue comme un sous-titre.
  - Une petite sans neutre en capitales espacées pour l'UI et les dates.
  - Échelle contrastée : années en très grand (environ 6:1) au moment du changement de période, le reste reste calme.
- **Densité**
  - Très aérée pendant la traversée.
  - Chaque période a un **volet de détail** qu'on ouvre à la demande : projets, rôle, stack. Le récit reste léger, l'information reste accessible.
- **Page d'accueil en timeline**
  - Les périodes sont des **chapitres plein écran** enchaînés au scroll.
  - Un sommaire des périodes, toujours visible sur un bord, permet le saut direct. Le nom et la teinte de chaque période y figurent, si bien que le sommaire est aussi une légende des couleurs.
  - Chaque chapitre contient **une interaction propre et explicite** (attirer, disperser, faire pousser…) annoncée en une ligne. C'est la réponse à ton reproche « diaporama ».
- **Mouvement / 3D**
  - Une scène de particules différente par période, mais **un même traitement** partout : grain, légère profondeur de champ, palette ombre et une seule teinte. C'est ce traitement qui fait l'unité.
  - Transition entre périodes : la matière de la période précédente **se dissout et se recompose** en celle de la suivante, sans coupure.
  - Son ambiant optionnel, coupé par défaut.
- **Ambiance** : contemplative, sensible, cohérente.
- **Principes repris** : couche de matière commune pour unifier des scènes hétérogènes (Symphony) · gabarit constant et décor qui change (HubTown) · UI aux bords et contenu au centre (Symphony, HubTown) · interface neutre et couleur déléguée au contenu (Particle Love, lhbzr) · interaction explicite à chaque étape (en réponse à Symphony).

---

### Direction C — « Signal »

_Ton parcours s'affiche comme une suite d'affiches : chaque période a sa couleur et son caractère._

**Tranche** : couleur comme matériau · acteur unique · registre ludique mais tenu · typographie comme élément visuel.

- **Palette**
  - **Un fond plein par période**, choisi dans une gamme de couleurs moyennes et désaturées, jamais criardes (ex. : sauge `#A9C2A0`, terracotta `#D98E6A`, bleu ardoise `#7F95C9`, sable `#E3CF9C`).
  - Une **encre unique** pour tout le texte et l'UI : `#1A1A22`, avec un blanc cassé `#F6F3EE` pour les cartes de contenu.
  - L'acteur 3D est d'une matière neutre (nacre ou chrome mat) qui reflète la couleur de la période.
  - Proportions : environ 65 % de fond coloré, 20 % d'encre, 15 % de 3D.
- **Typographie**
  - Une display large et grasse, **réservée aux années et aux titres de période**. Jamais dans le menu ni dans les boutons : c'est la limite fixée pour rester en deçà du « trop stylisé ».
  - Une sans géométrique regular et medium pour tout le reste.
  - Échelle forte sur les années (environ 8:1), sobre partout ailleurs. Les très grands titres ne débordent pas du cadre : ils restent lisibles en entier.
- **Densité**
  - Moyenne à dense : chaque période montre l'année, le titre, une carte de faits et un visuel de projet.
  - Les cartes de contenu sont en blanc cassé, posées au-dessus du fond, pour garder une lecture confortable sur la couleur.
- **Page d'accueil en timeline**
  - Les périodes se succèdent au scroll, et **le fond change de couleur à chaque passage**. La couleur sert de repère : on sait dans quelle période on est sans lire.
  - Mise en couches : l'année en très grand en arrière-plan, l'acteur 3D au plan intermédiaire, la carte de faits au premier plan.
  - Un index compact des périodes (pastilles de couleur et années) permet le saut direct.
- **Mouvement / 3D**
  - **Un acteur unique**, une forme organique de type blob, présent tout du long. Il **change de comportement selon la période** (calme, nerveux, fragmenté…), pas seulement de forme.
  - Il suit et réagit au curseur : il s'étire, se rétracte, se fait repousser.
  - Transition de période : le fond se fond vers la couleur suivante pendant que l'acteur passe devant l'année.
- **Ambiance** : franche, chaleureuse, affirmée.
- **Principes repris** : une couleur par page comme repère (Three.js) · texte, 3D et UI en couches de profondeur (Three.js) · un acteur, plusieurs états (AnimeJS) · objets qui réagissent au curseur (Three.js, Particle Love) · UI dessinée mais bridée (en réponse à Three.js).

---

### Lecture croisée

|                  | A — Instrument               | B — Matière                            | C — Signal                      |
| ---------------- | ---------------------------- | -------------------------------------- | ------------------------------- |
| Fond             | sombre neutre                | sombre et lumière par période          | couleur pleine par période      |
| Acteur 3D        | un seul, change de forme     | une scène par période                  | un seul, change de comportement |
| Typo dominante   | grotesque + mono             | serif de texte + petite sans           | display grasse + sans           |
| Parcours         | scroll guidé + axe cliquable | chapitres + sommaire                   | scroll + index de couleurs      |
| Interaction      | perturbation au curseur      | une interaction explicite par chapitre | l'acteur réagit au curseur      |
| Risque principal | trop froid, trop « dev »     | trop lent, trop contemplatif           | glisser vers le trop stylisé    |
