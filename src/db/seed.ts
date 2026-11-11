/**
 * Contenu initial de la base, repris de `projects.json` et `skills.json`.
 * Lancer avec `corepack pnpm db:seed`. Le script n'écrase rien : une ligne déjà
 * présente (donc peut-être modifiée dans la console) est laissée telle quelle.
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

// Ordre et noms fixés dans docs/design-system.md § 8.
const PERIODS: (typeof periods.$inferInsert)[] = [
  { id: 'outil', number: 1, title: 'outil', shape: 'outil' },
  { id: 'jeu', number: 2, title: 'jeu', shape: 'jeu' },
  { id: 'reseau', number: 3, title: 'réseau', shape: 'reseau' },
  { id: 'objet', number: 4, title: 'objet', shape: 'objet' },
];

// `since` et `usage` restent vides : à saisir, ils ne se devinent pas.
const SKILLS: (typeof skills.$inferInsert)[] = [
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
  { id: 'csharp', name: 'C#', domain: 'Jeu vidéo' },
  { id: 'unity', name: 'Unity', domain: 'Jeu vidéo' },
  { id: 'unreal', name: 'Unreal', domain: 'Jeu vidéo' },
  { id: 'blueprints', name: 'Blueprints', domain: 'Jeu vidéo' },
  { id: 'threejs', name: 'Three.js', domain: '3D temps réel' },
  { id: 'docker', name: 'Docker', domain: 'Infra et outillage' },
  { id: 'git-github', name: 'Git/GitHub', domain: 'Infra et outillage' },
  { id: 'vs-code', name: 'VS Code', domain: 'Infra et outillage' },
];

interface ISeedProject {
  project: typeof projects.$inferInsert;
  /** Tags techniques d'origine ; les thèmes (« Puzzles ») sont abandonnés. */
  skillIds: string[];
  image: string;
}

// `year` et `duration` restent vides (docs/design-system.md § 10) : à saisir
// ici avant le premier seed, ou ensuite dans la console.
const PROJECTS: ISeedProject[] = [
  {
    project: {
      slug: 'albedya',
      title: 'Albedya',
      periodId: 'objet',
      context: 'pro',
      featured: true,
      goal: "Une application web d'étude climatique urbaine avec un moteur 3D custom fait sur avec ThreeJS.",
      published: true,
    },
    skillIds: ['nextjs', 'typescript', 'postgresql', 'docker', 'threejs'],
    image: '/img/albedya.png',
  },
  {
    project: {
      slug: 'portfolio-perso',
      title: 'Portfolio Personnel',
      periodId: 'objet',
      context: 'perso',
      goal: 'Mon portfolio personnel développé avec Next.js, TypeScript et Tailwind CSS',
      published: true,
    },
    skillIds: ['nextjs', 'typescript', 'tailwind-css'],
    image: '/img/portfolio_perso.png',
  },
  {
    project: {
      slug: 'cryptique-unity',
      title: 'Cryptique',
      periodId: 'jeu',
      context: 'ecole',
      featured: true,
      goal: "Jeux d'énigmes et éducatif sur les cryptiques pour mobile sur Unity",
      published: true,
    },
    skillIds: ['unity', 'csharp'],
    image: '/img/cryptique_illustration_1.png',
  },
  {
    project: {
      slug: 'unreal-blueprints',
      title: 'Unreal Blueprints',
      periodId: 'jeu',
      context: 'ecole',
      goal: "Un court jeux d'énigmes sur Unreal Engine 5",
      published: true,
    },
    skillIds: ['unreal', 'blueprints'],
    image: '/img/unreal_blueprint_1.png',
  },
];

// Un seul lot = une seule transaction : une clé étrangère invalide annule tout.
await db.batch([
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
      PROJECTS.map((p) => ({
        projectSlug: p.project.slug,
        src: p.image,
        alt: p.project.title,
      })),
    )
    .onConflictDoNothing(),
]);

// Une compétence sans projet n'a aucune preuve : la signaler.
const orphans = await db
  .select({ name: skills.name })
  .from(skills)
  .leftJoin(projectSkills, eq(projectSkills.skillId, skills.id))
  .where(isNull(projectSkills.skillId));

console.info(
  `Seed terminé : ${PROJECTS.length} projets, ${SKILLS.length} compétences.`,
);
if (orphans.length > 0) {
  console.warn(
    `Compétences sans projet : ${orphans.map((s) => s.name).join(', ')}`,
  );
}
