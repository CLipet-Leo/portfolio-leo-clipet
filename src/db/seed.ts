/**
 * Contenu initial de la base, tiré de `docs/presentation.md`.
 * Lancer avec `corepack pnpm db:seed`. Le script n'écrase rien : une ligne déjà
 * présente (donc peut-être modifiée dans la console) est laissée telle quelle.
 *
 * `corepack pnpm db:seed --reset` vide d'abord périodes, projets et compétences,
 * puis réinsère ce fichier : tout ce qui a été saisi dans la console est perdu.
 */
import { eq, isNull } from 'drizzle-orm';
import { db } from './index.ts';
import {
  periods,
  projectMedia,
  projects,
  projectSkills,
  skills,
} from './schema.ts';

// Périodes chronologiques, une par étape du parcours (docs/design-system.md § 8).
const PERIODS: (typeof periods.$inferInsert)[] = [
  {
    id: 'bases',
    number: 1,
    title: 'bases',
    yearStart: 2022,
    yearEnd: 2023,
    summary:
      'Première année : web, algorithmique et principes de base du code. Les premiers programmes en C, les premières bases de données, et un premier stage qui se termine par un site mis en production.',
  },
  {
    id: 'bas-niveau',
    number: 2,
    title: 'bas niveau',
    yearStart: 2023,
    yearEnd: 2024,
    summary:
      "Deuxième année : programmes natifs Windows en C et C++, mathématiques en Python, premiers prototypes de jeux, méthode agile et gestion de projet. Un moteur de jeu écrit de zéro en équipe, puis un premier stage chez Albedya : la conception du moteur 3D urbain de l'outil.",
  },
  {
    id: 'jeu',
    number: 3,
    title: 'jeu',
    yearStart: 2024,
    yearEnd: 2025,
    summary:
      "Troisième année : C# en console et en application Windows, premiers jeux sur Unity et Unreal Engine 5. Le bachelor se termine sur la première version de Cryptique, alors un jeu mobile ; le deuxième stage chez Albedya ajoute l'import de maquettes BIM au moteur 3D.",
  },
  {
    id: 'produit',
    number: 4,
    title: 'produit',
    yearStart: 2025,
    summary:
      "Quatrième et cinquième années : alternance chez Albedya et master de chef de projet informatique, IA et big data. À l'école, un jeu Unreal Engine 5 produit de A à Z, avec ses documents de conception et la gestion d'entreprise qui va avec. Un mémoire sur les enjeux climatiques du bâtiment et ce que les nouvelles technologies apportent à la conception et à la rénovation ; une thèse en cours de rédaction.",
  },
];

// Les quatre compétences de l'ouverture : `usage` porte leur phrase.
// Pour les technos, `since` et `usage` restent vides : à saisir, ils ne se
// devinent pas.
const SKILLS: (typeof skills.$inferInsert)[] = [
  {
    id: 'architecture',
    name: 'Architecture',
    kind: 'competence',
    domain: 'Pratique',
    usage:
      "Organiser la structure d'un projet pour qu'il reste clair à mesure qu'il grandit.",
  },
  {
    id: 'ux',
    name: 'UX',
    kind: 'competence',
    domain: 'Pratique',
    usage:
      "Rendre un outil agréable à utiliser, pour ses clients comme pour les développeurs qui s'en servent.",
  },
  {
    id: 'devops',
    name: 'DevOps',
    kind: 'competence',
    domain: 'Pratique',
    usage:
      'Mettre un projet en route de A à Z, puis optimiser et automatiser les tâches répétitives.',
  },
  {
    id: 'full-stack',
    name: 'Full-stack',
    kind: 'competence',
    domain: 'Pratique',
    usage:
      "Réaliser un projet de bout en bout en méthode agile, de la logique métier à l'interface.",
  },
  { id: 'html-css', name: 'HTML/CSS', domain: 'Web et données' },
  { id: 'react', name: 'React', domain: 'Web et données' },
  { id: 'tailwind-css', name: 'Tailwind CSS', domain: 'Web et données' },
  { id: 'nextjs', name: 'Next.js', domain: 'Web et données' },
  { id: 'nodejs', name: 'Node.js', domain: 'Web et données' },
  { id: 'mongodb', name: 'MongoDB', domain: 'Web et données' },
  { id: 'postgresql', name: 'PostgreSQL', domain: 'Web et données' },
  { id: 'sql', name: 'SQL', domain: 'Web et données' },
  { id: 'php', name: 'PHP', domain: 'Web et données' },
  { id: 'javascript', name: 'JavaScript', domain: 'Web et données' },
  { id: 'typescript', name: 'TypeScript', domain: 'Web et données' },
  { id: 'python', name: 'Python', domain: 'Web et données' },
  { id: 'c', name: 'C', domain: 'Systèmes' },
  { id: 'cpp', name: 'C++', domain: 'Systèmes' },
  { id: 'sfml', name: 'SFML', domain: 'Systèmes' },
  { id: 'sdl', name: 'SDL 2', domain: 'Systèmes' },
  { id: 'csharp', name: 'C#', domain: 'Jeu vidéo' },
  { id: 'unity', name: 'Unity', domain: 'Jeu vidéo' },
  { id: 'unreal', name: 'Unreal Engine 5', domain: 'Jeu vidéo' },
  { id: 'blueprints', name: 'Blueprints', domain: 'Jeu vidéo' },
  { id: 'threejs', name: 'Three.js', domain: '3D temps réel' },
  { id: 'directx-12', name: 'DirectX 12', domain: '3D temps réel' },
  { id: 'vulkan', name: 'Vulkan', domain: '3D temps réel' },
  { id: 'dear-imgui', name: 'Dear ImGui', domain: '3D temps réel' },
  { id: 'energyplus', name: 'EnergyPlus', domain: 'Bâtiment' },
  { id: 'ifc', name: 'IFC (BIM)', domain: 'Bâtiment' },
  { id: 'docker', name: 'Docker', domain: 'Infra et outillage' },
  { id: 'ci-cd', name: 'CI/CD', domain: 'Infra et outillage' },
  { id: 'linux', name: 'Linux', domain: 'Infra et outillage' },
  { id: 'forgejo', name: 'Forgejo', domain: 'Infra et outillage' },
  { id: 'git-github', name: 'Git/GitHub', domain: 'Infra et outillage' },
];

interface ISeedProject {
  project: typeof projects.$inferInsert;
  /** Technos de la stack et compétences que le projet prouve. */
  skillIds: string[];
  image?: string;
}

// `year`, `ai` et `result` restent vides (docs/design-system.md § 10) : à
// saisir ici avant le seed, ou ensuite dans la console.
// `featured` décide seul des fiches de la timeline : aucune liste fixe.
const PROJECTS: ISeedProject[] = [
  // 04 · produit
  // Albedya : faits publics seulement, sans détail technique interne
  // (docs/design-system.md § 8).
  {
    project: {
      slug: 'albedya',
      title: 'Albedya',
      periodId: 'produit',
      context: 'pro',
      featured: true,
      goal: "SaaS d'étude bioclimatique pour les architectes et les bureaux d'études, en phase amont de projet. L'étude va du site à la pièce : étude de site, étude urbaine en 3D interactive, étude d'une pièce.",
      role: 'développeur, en stage (2e et 3e année) puis en alternance',
      story: [
        "Premier stage : conception du premier moteur 3D urbain de l'outil, qui génère la scène à partir de données externes.",
        "Deuxième stage : import de maquettes BIM (IFC), calculs améliorés, moteur optimisé, et refonte de l'interface du module 3D pour l'aligner sur le reste de l'application.",
        "Autour de la 3D : authentification, entreprises et projets d'étude, schémas de base de données et migrations ; intégration du moteur de calcul EnergyPlus pour la simulation thermique dynamique d'une pièce ; maintenance de l'outil en production selon les retours des clients.",
        "Depuis juillet 2026 : refonte de l'outil pour résorber la dette technique de trois ans de développement. Terrain généré à partir de données Lidar, bâti plus dense, expérience d'utilisation retravaillée, sécurité des données renforcée, intégration et déploiement automatisés.",
      ].join('\n\n'),
      published: true,
    },
    skillIds: [
      'architecture',
      'ux',
      'devops',
      'full-stack',
      'nextjs',
      'typescript',
      'postgresql',
      'threejs',
      'energyplus',
      'ifc',
      'docker',
      'ci-cd',
    ],
    image: '/img/albedya.png',
  },
  {
    project: {
      slug: 'coriumengine',
      title: 'CoriumEngine',
      periodId: 'produit',
      context: 'perso',
      featured: true,
      goal: 'Moteur de jeu écrit en C++ pour Windows, découpé en trois projets compilés : application, éditeur et bibliothèque dynamique.',
      story: [
        'Rendu : une couche RHI maison, inspirée de nvrhi, avec deux backends : DirectX 12 et Vulkan 1.3.',
        'Éditeur : une interface Dear ImGui avec un thème sur mesure.',
        'Cœur : un Entity Component System et une bibliothèque mathématique écrits pour le moteur.',
      ].join('\n\n'),
      published: true,
    },
    skillIds: [
      'architecture',
      'ux',
      'cpp',
      'directx-12',
      'vulkan',
      'dear-imgui',
    ],
  },
  {
    project: {
      slug: 'cryptique',
      title: 'Cryptique',
      periodId: 'produit',
      context: 'perso',
      featured: true,
      goal: "Jeu de puzzle, d'enquête et d'exploration sur Unity. Né comme jeu mobile en projet de fin de bachelor, il est repris de zéro par une équipe de cinq développeurs et trois artistes.",
      role: 'lead tech : structure du projet, architecture technique, qualité du code, lien entre développeurs et artistes',
      published: true,
    },
    skillIds: ['architecture', 'unity', 'csharp'],
    image: '/img/cryptique_illustration_1.png',
  },
  // Serveur Oracle : l'architecture seulement, jamais d'adresse, de compte, de
  // port ni de chemin (docs/design-system.md § 8).
  {
    project: {
      slug: 'serveur-oracle',
      title: 'Serveur Oracle',
      periodId: 'produit',
      context: 'perso',
      featured: true,
      goal: 'Instance Oracle Cloud auto-hébergée (200 Go de stockage, 24 Go de mémoire) : une forge Git Forgejo pour le code de mes projets personnels et un serveur Minecraft privé.',
      story:
        'Maintenance courante : mises à jour, compatibilité des logiciels, administration du système Oracle Linux.',
      published: true,
    },
    skillIds: ['devops', 'linux', 'forgejo', 'git-github'],
  },
  {
    project: {
      slug: 'portfolio-perso',
      title: 'Portfolio personnel',
      periodId: 'produit',
      context: 'perso',
      goal: 'Ce site : Next.js, TypeScript et Tailwind CSS, contenu lu en base.',
      published: true,
    },
    skillIds: ['nextjs', 'typescript', 'tailwind-css'],
    image: '/img/portfolio_perso.png',
  },

  // 03 · jeu
  {
    project: {
      slug: 'rocket-bowling',
      title: 'Rocket Bowling',
      periodId: 'jeu',
      context: 'ecole',
      goal: "Jeu Unreal Engine 5 pour découvrir le moteur physique Chaos : une boule de bowling propulsée au bazooka pour renverser des quilles, dans l'esprit d'Angry Birds. Modules de base en C++, gameplay en Blueprints.",
      published: true,
    },
    skillIds: ['unreal', 'cpp', 'blueprints'],
  },
  {
    project: {
      slug: 'unreal-blueprints',
      title: 'Unreal Blueprint Puzzle',
      periodId: 'jeu',
      context: 'ecole',
      goal: "Initiation à Unreal Engine 5 en Blueprints : un jeu de puzzle simple, avec un penchant pour la plateforme. Découverte du framework de gameplay d'Unreal : interfaces, Actors, ActorComponents, Pawn.",
      published: true,
    },
    skillIds: ['unreal', 'blueprints'],
    image: '/img/unreal_blueprint_1.png',
  },
  {
    project: {
      slug: 'steganography-cpp',
      title: 'Steganography C++',
      periodId: 'jeu',
      context: 'ecole',
      goal: 'Projet de stéganographie en C++ : cacher des messages dans des images.',
      published: true,
    },
    skillIds: ['cpp'],
    image: '/img/steganography_cpp.png',
  },
  {
    project: {
      slug: 'rendering-gdi-sfml',
      title: 'Rendering GDI SFML',
      periodId: 'jeu',
      context: 'ecole',
      goal: 'Projet de rendu graphique en C++ pour comparer les performances des bibliothèques GDI et SFML.',
      published: true,
    },
    skillIds: ['cpp', 'sfml'],
    image: '/img/windows_gdi_sfml.png',
  },

  // 02 · bas niveau
  {
    project: {
      slug: 'moteur-directx-12',
      title: 'Moteur de jeu DirectX 12',
      periodId: 'bas-niveau',
      context: 'ecole',
      goal: 'Moteur de jeu sur mesure écrit en C++ sur DirectX 12, en équipe.',
      duration: '3 semaines',
      published: true,
    },
    skillIds: ['cpp', 'directx-12'],
  },
  {
    project: {
      slug: '2048',
      title: '2048',
      periodId: 'bas-niveau',
      context: 'ecole',
      goal: "Initiation au C++ et aux bibliothèques graphiques SFML et SDL 2 : boucle d'exécution, optimisation en temps réel, allocation mémoire, événements du système.",
      published: true,
    },
    skillIds: ['cpp', 'sfml', 'sdl'],
  },
  {
    project: {
      slug: 'bigsword-rpg',
      title: 'BigSword RPG',
      periodId: 'bas-niveau',
      context: 'ecole',
      goal: "Petit jeu de rôle en terminal, écrit en C#, inspiré de l'exploration de Final Fantasy et des combats de Pokémon.",
      published: true,
    },
    skillIds: ['csharp'],
    image: '/img/bigsword_rpg.png',
  },
  {
    project: {
      slug: 'unity-shader-vfx',
      title: 'Unity Shader',
      periodId: 'bas-niveau',
      context: 'ecole',
      goal: "Initiation au pipeline de rendu URP d'Unity : Shader Graph, séquences d'animation, light probes, post-processing.",
      published: true,
    },
    skillIds: ['unity'],
    image: '/img/unity_shader_vfx.png',
  },

  // 01 · bases
  {
    project: {
      slug: 'site-garage-moto',
      title: 'Site de garage moto',
      periodId: 'bases',
      context: 'pro',
      goal: "Site vitrine d'un garage moto spécialisé BMW : présentation de l'entreprise, page d'occasions adossée à une petite base de données, mise en production chez Hostinger.",
      role: 'stagiaire, premier site livré',
      published: true,
    },
    skillIds: ['full-stack'],
  },
  {
    project: {
      slug: 'demineur',
      title: 'Démineur',
      periodId: 'bases',
      context: 'ecole',
      goal: "Démineur en C, pour travailler l'algorithmie et les bases du bas niveau : fonctions récursives, tableaux, tables de correspondance.",
      published: true,
    },
    skillIds: ['c'],
  },
  {
    project: {
      slug: 'sites-web',
      title: "Sites web d'initiation",
      periodId: 'bases',
      context: 'ecole',
      goal: 'Plusieurs petits sites pour apprendre HTML 5, CSS et JavaScript.',
      published: true,
    },
    skillIds: ['html-css', 'javascript'],
  },
  {
    project: {
      slug: 'bases-de-donnees',
      title: 'Bases de données',
      periodId: 'bases',
      context: 'ecole',
      goal: 'Apprentissage du SQL et du NoSQL (MongoDB), de PHP, des requêtes HTTP et du CRUD.',
      published: true,
    },
    skillIds: ['sql', 'mongodb', 'php'],
  },
];

const isReset = process.argv.includes('--reset');

const inserts = [
  db.insert(periods).values(PERIODS).onConflictDoNothing(),
  db.insert(skills).values(SKILLS).onConflictDoNothing(),
  db
    .insert(projects)
    .values(PROJECTS.map((p) => p.project))
    .onConflictDoNothing(),
  db
    .insert(projectSkills)
    .values(
      PROJECTS.flatMap((p) =>
        p.skillIds.map((skillId) => ({
          projectSlug: p.project.slug,
          skillId,
        })),
      ),
    )
    .onConflictDoNothing(),
  db
    .insert(projectMedia)
    .values(
      PROJECTS.flatMap((p) =>
        p.image
          ? { projectSlug: p.project.slug, src: p.image, alt: p.project.title }
          : [],
      ),
    )
    .onConflictDoNothing(),
] as const;

// Un seul lot = une seule transaction : une clé étrangère invalide annule tout,
// y compris les suppressions de `--reset`.
await db.batch(
  isReset
    ? [
        // Les projets d'abord : leurs liaisons, captures et liens partent en
        // cascade, ce qui libère les compétences et les périodes.
        db.delete(projects),
        db.delete(skills),
        db.delete(periods),
        ...inserts,
      ]
    : inserts,
);

// Une compétence sans projet n'a aucune preuve : la signaler.
const orphans = await db
  .select({ name: skills.name })
  .from(skills)
  .leftJoin(projectSkills, eq(projectSkills.skillId, skills.id))
  .where(isNull(projectSkills.skillId));

console.info(
  `Seed terminé${isReset ? ' (contenu précédent supprimé)' : ''} : ${PROJECTS.length} projets, ${SKILLS.length} compétences.`,
);
if (orphans.length > 0) {
  console.warn(
    `Compétences sans projet : ${orphans.map((s) => s.name).join(', ')}`,
  );
}

// Le site garde le contenu en cache une heure (src/db/queries.ts) : sans ce
// rafraîchissement, un serveur de développement déjà lancé affiche l'ancien.
const isRefreshed = await fetch(
  `http://localhost:${process.env.PORT ?? 3000}/api/revalidate`,
  {
    method: 'POST',
    headers: { authorization: `Bearer ${process.env.REVALIDATE_SECRET}` },
  },
).then(
  (response) => response.ok,
  () => false,
);
console.info(
  isRefreshed
    ? 'Cache du serveur local rafraîchi.'
    : "Serveur local non joint : son cache n'a pas été rafraîchi (voir « Base de données » dans le README).",
);
