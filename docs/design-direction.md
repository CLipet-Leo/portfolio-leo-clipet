# Direction de design — Portfolio personnel

**Note d'introduction.** Ce document est la direction historique « Instrument »
(palette #1C1B1A / #7CFFB2, deux voix, timeline). Il n'est plus la cible visuelle
du projet : les choix visuels sont aujourd'hui ceux du design system importé
« Schéma », fixé par [./design-system.md](./design-system.md). Les intentions de
parcours et les arbitrages ci-dessous sont conservés comme historique et ne
s'appliquent plus aux choix visuels.

Ce document fixe la direction retenue après la phase de réflexion. Il répond aux 8
questions de ma note, tranche les contradictions de la synthèse des références, et
décrit un système de design assez précis pour être implémenté sans arbitrage
ulérieur.

**Registre** : technique et précis.
**Densité** : moyenne — chaque bloc porte des faits, pas des effets.
**Formes** : carrées, arrondis pointus (4–8 px).
**Mouvement** : présent, jamais décoratif.
**Son** : bonus optionnel, coupé par défaut.

---

## 1. Réponses aux 8 questions

### 1. Thème sombre par défaut, couleur pour les détails visuels intéressants

**Oui.** Fond sombre constant sur toute la page, et un seul accent chromatique. La
couleur n'est pas la matière principale du site : c'est un **événement rare**, réservé
à trois cas seulement — ce qui est actif (période courante), ce qui est survolé, et le
curseur du visuel 3D.

C'est la réponse à la contradiction 1 de la synthèse : on prend le côté nocturne des
cinq références, et on conserve la couleur comme signal plutôt que comme matériau.

### 2. Libre, pas guidé

**Libre, mais guidé en apparence.** La page est une **timeline** : l'ordre de lecture
est porté par un axe vertical gradué. Chaque graduation est cliquable, et une
**mini-carte de l'axe** reste visible sur un bord pour sauter directement à une période.
Le scroll fait défiler les étapes, mais on saute n'importe où à tout moment.

Les parcours varient par profil (recruteur / développeur / curieux) grâce à un
**filtre par intérêt** : le visiteur choisit sa typologie et la timeline s'affiche
déjà filtrée. Le visiteur suit le fil, mais il peut le bifurquer.

### 3. Les infos que chaque projet doit porter

Tout est visible **sans clic**, en grille fixe. Rien ne doit réclamer une action pour
être lu. C'est la réponse au reproche « manque d'informations cruel » : l'UI ne sert
jamais à masquer du contenu.

- **Stack** — langages, frameworks, moteurs.
- **Contexte** — une phrase sur le cadre dans lequel le projet est né.
- **Scope** — deux blocs distincts :
  - _Projet personnel_ → l'objectif du projet.
  - _Projet professionnel_ → les besoins auxquels il répond.
- **Screenshots** — captures, en cartes.
- **Ressources externes** — repos GitHub, déploiement, liens du site.

Le vide sert à séparer les étapes, pas à masquer un manque de contenu.

### 4. Épuré mais bien construit

**Épuré, mais construit.** Épuré ne veut pas dire vide : chaque bloc porte des faits.
L'UI accompagne l'information, elle ne la concurrence pas — pas de forme qui attire
l'œil avant le contenu.

- Formes **carrées**, arrondis **pointus** (`rounded-sm` / `rounded-md`, jamais
  `rounded-xl` décoratif).
- Un motif de **coin chanfreiné** répété sur les cartes et les boutons, repris de
  HubTown : c'est la seule signature formelle de l'UI.
- **Typologie par intérêt** : les projets sont rangés par catégorie (3D temps réel,
  jeux, applications web, outils…). Le filtre par intérêt est la navigation principale.

### 5. Un seul visuel qui évolue au cours du temps

**Un seul acteur de particules traverse toute la page.** Il change de forme à chaque
période, piloté par le scroll : sa position dans la timeline dicte sa forme. Le
curseur perturbe localement les particules, qui reviennent ensuite à leur forme.

C'est la seule chose animée en permanence. Tout le reste est statique et réagit
uniquement à l'état actif.

### 6. Registre technique et précis

**Technique et précis.** Pas de registre organique ni ludique. Le registre retenu est
celui des références « instrument » (AnimeJS, HubTown, lhbzr).

### 7. Typographie : entre les deux

**Entre les deux**, mais penchée du côté discret. La typo sert d'explication et de
contexte : elle est une voix, pas un décor.

- Une **grotesque** pour le discours.
- Une **mono** pour tout ce qui est donnée : dates, stack, rôles, durées.
- Ratio d'environ **2.5:1** — le titre n'est pas un objet visuel, il est sous le visuel.
- Titres en casse phrase, mono en minuscules. La mono n'est jamais utilisée pour du
  texte suivi.

### 8. Le son

**Bonus optionnel, coupé par défaut.** Un ambiant sourd, désactivé au chargement, avec
un indicateur visible. Le son est une couche, pas une identité : il ne doit jamais
forcer l'attention.

---

## 2. La direction retenue : « Instrument »

_« Ton parcours se lit comme une mesure : précise, graduée, lisible. »_

Ton portfolio se lit comme une **timeline de ton parcours**. La page est structurée
comme une règle graduée : un axe vertical en années sert à la fois de contenu et de
navigation. Chaque graduation est cliquable, et une mini-carte de l'axe reste visible
sur un bord pour sauter directement à une période.

Un seul acteur de particules traverse toute la page et change de forme à chaque
période. Le changement est piloté par le scroll : la position dans la timeline dicte
la forme. Le curseur perturbe localement les particules, qui reviennent ensuite à leur
forme.

---

## 3. Système de design

### Palette

| Rôle              | Valeur    | Part  |
| ----------------- | --------- | ----- |
| Fond              | `#1C1B1A` | ~88 % |
| Surface           | `#262423` | —     |
| Surface haute     | `#302D2B` | —     |
| Texte os          | `#ECE8E1` | ~10 % |
| Texte secondaire  | `#8E8A84` | —     |
| Texte tertiaire   | `#5A5652` | —     |
| **Accent unique** | `#7CFFB2` | ≤ 2 % |

**Le vert phosphore est réservé à ce qui est actif** : période courante, élément
survolé, curseur du visuel. Il n'apparaît jamais ailleurs.

### Typographie

- Une **grotesque** (regular et semi-bold) pour le discours.
- Une **mono** pour tout ce qui est donnée : dates, stack, rôles, durées.
- Échelle modeste, ratio ~2.5:1. Titres en casse phrase. Mono en minuscules.
- La **mono n'est jamais utilisée pour du texte suivi**.

### Densité

Moyenne. Chaque étape de la timeline affiche **les faits sans clic** : rôle, durée,
stack, une phrase de résultat. C'est la réponse à la critique de lhbzr.

Le vide sert à séparer les étapes, pas à masquer un manque de contenu.

### Structure de la page

- **Ouverture** : nom, une ligne de positionnement, l'acteur 3D.
- **Timeline** : axe vertical gradué en années = contenu et navigation. Chaque
  graduation est cliquable ; une mini-carte de l'axe reste visible à un bord pour
  sauter directement à une période.
- **Fiche projet** : stack, contexte, scope (objectif personnel / besoins
  professionnels), captures, ressources externes.
- **Clôture** : contact.

### Mouvement / 3D

- **Un seul acteur de particules** traverse toute la page et **change de forme à
  chaque période** (un outil, puis un réseau, puis un objet lié au projet phare).
- Le changement est piloté par le scroll : la position dans la timeline dicte la forme.
- Le curseur perturbe localement les particules, qui reviennent à leur forme ensuite.
- Les transitions sont brèves, sans effet gratuit.

### Principes repris

| Principe                                        | Source                     |
| ----------------------------------------------- | -------------------------- |
| Un acteur, plusieurs états                      | AnimeJS                    |
| Deux voix typographiques aux rôles stricts      | AnimeJS, HubTown           |
| Accent rare réservé à l'élément actif           | AnimeJS                    |
| Indicateur de progression permanent             | AnimeJS, HubTown, Symphony |
| Métadonnées d'abord, en grille fixe             | lhbzr                      |
| UI aux bords, contenu au centre                 | HubTown, Symphony          |
| Interface neutre et couleur déléguée au contenu | Particle Love, lhbzr       |
| Changement de page soigné                       | AnimeJS, HubTown, Symphony |

---

## 4. Le parcours par profil

Le portfolio accueille trois types de visiteurs. Le parcours reste le même, mais le
**filtre par intérêt** change ce que la timeline montre.

| Profil      | Filtre par défaut | Ce qu'il voit d'abord                     |
| ----------- | ----------------- | ----------------------------------------- |
| Recruteur   | `Tous`            | Stack, durée, résultat par projet         |
| Développeur | `3D temps réel`   | Stack technique, détails d'implémentation |
| Curieux     | `Tous`            | Contexte, objectif, captures              |

Chaque projet porte ses **ressources externes** (repositoire, déploiement) visibles
sans clic — c'est la réponse au reproche « manque d'informations cruel ».

---

## 5. Ordre d'implémentation

1. **Tokens** — palette, typo, coins chanfreinés, dans [../src/app/global.css](../src/app/global.css) (source de vérité).
2. **Composants de la timeline** — axe gradué, graduation cliquable, mini-carte de
   l'axe, panneau de projet, liste de faits.
3. **Ouverture** — nom, ligne de positionnement, acteur 3D.
4. **Périodes** — chaque chapitre affiche les faits sans clic.
5. **Fiche projet** — stack, contexte, scope, captures, ressources externes.
6. **Clôture** — contact.
7. **Mini-carte de l'axe** — saut direct à une période.
8. **Son** — ambiant coupé par défaut, indicateur visible.

---

## 6. Risques

- **Trop froid, trop « dev »** — le principal. Le vert phosphore reste ≤ 2 % et ne
  sert que l'état actif ; si l'accent commence à occuper de la surface, on le retire.
- **Diaporama** — chaque période doit porter une interaction explicite et accessible
  (filtre par intérêt, saut à une période), jamais un simple « suivant ».
- **Minimalisme comme alibi** — chaque bloc porte des faits. Si une section ne peut
  pas porter de fait, elle ne sert pas.
- **Forme qui concurrence le fond** — l'UI reste neutre : coins pointus, sans
  ornement, sans effet qui attire l'œil avant le contenu.

---

## 7. Sources citées

`design/analysis/` : AnimeJS, HubTown, lhbzr, Particle Love, Symphony of vines,
Three.js Conf Paris.

**Direction A — « Instrument »** reprend : un acteur, plusieurs états (AnimeJS) · deux
voix typographiques aux rôles stricts (AnimeJS, HubTown) · accent rare réservé à
l'élément actif (AnimeJS) · indicateur de progression permanent (AnimeJS, HubTown,
Symphony) · métadonnées d'abord, en grille fixe (lhbzr) · UI aux bords, contenu au
centre (Symphony, HubTown) · interface neutre et couleur déléguée au contenu
(Particle Love, lhbzr) · changement de page soigné (AnimeJS, HubTown, Symphony).
