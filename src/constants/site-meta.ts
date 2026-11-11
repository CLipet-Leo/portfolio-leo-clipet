/**
 * Textes et liens du site qui ne vivent pas en base : la base porte les
 * périodes, projets et compétences (src/db/schema.ts).
 */
export const SITE_META = {
  name: 'Léo Clipet',
  positioning:
    "Développeur d'applications web et de 3D interactive. En alternance chez Albedya, je participe à la création d'un logiciel en ligne qui aide les architectes à concevoir des bâtiments adaptés à leur climat ; à côté, je développe mon propre moteur de jeu et je dirige la partie technique d'un jeu vidéo fait en équipe.",
  origin:
    "Passionné de jeux vidéo et d'informatique depuis l'enfance, j'ai commencé à coder au lycée pour écrire mes propres programmes. Mes études m'ont amené à Lyon, une ville jeune et vivante, riche en jeu vidéo comme en entrepreneuriat.",
  /**
   * Faits de l'ouverture, en mono : minuscules, sauf les noms propres et les
   * sigles. Les projets personnels viennent de la base.
   */
  facts: [
    {
      label: "aujourd'hui",
      value: 'alternance chez Albedya depuis octobre 2025',
    },
    {
      label: 'formation',
      value:
        'bachelor Gaming Campus Lyon · master FEDE niveau 7, chef de projet informatique, IA et big data (en cours)',
    },
    {
      label: 'langues',
      value:
        'français natif · anglais B2 certifié (TOEIC 855/990, avril 2025) · japonais, bases (hiragana, katakana)',
    },
    { label: 'ville', value: 'Lyon' },
  ],
  albedya: 'https://www.albedya.fr/',
  email: 'leoclipet26@gmail.com',
  github: 'https://github.com/CLipet-Leo',
  linkedin: 'https://linkedin.com/in/léo-clipet-b885842a3',
} as const;
