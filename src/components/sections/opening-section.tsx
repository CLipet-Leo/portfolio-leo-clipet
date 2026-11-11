import { Button } from '@/components/ui/button';
import { ExternalLink } from '@/components/ui/external-link';
import { SITE_META } from '@/constants/site-meta';
import { getProjects, getSkillProofs } from '@/db/queries';
import Link from 'next/link';

const DT_CLASS = 'pt-0.5 font-mono text-label text-muted-foreground';
// Pas de `lowercase` : les noms propres (Lyon, Albedya) gardent leur majuscule.
const DD_CLASS = 'font-mono text-data [&_a]:text-brand-400';

/** Remplace « Albedya » par un lien vers le site de l'entreprise. */
const withAlbedyaLink = (text: string) =>
  text.split('Albedya').flatMap((part, index) =>
    index === 0
      ? [part]
      : [
          <ExternalLink
            key={index}
            href={SITE_META.albedya}
            className="rounded-sm underline underline-offset-4 outline-none hover:text-brand-200 focus-visible:ring-[3px] focus-visible:ring-ring/60"
          >
            Albedya
          </ExternalLink>,
          part,
        ],
  );

/**
 * Ouverture : qui est cette personne ? Le nom, ce qu'elle fait et d'où elle
 * vient, sa situation en faits, ses compétences, puis l'entrée dans le parcours.
 */
export const OpeningSection = async () => {
  const [projects, proofs] = await Promise.all([
    getProjects(),
    getSkillProofs(),
  ]);
  const sideProjects = projects.filter(
    (p) => p.featured && p.context === 'perso',
  );
  const competences = proofs.filter(({ skill }) => skill.kind === 'competence');

  return (
    <section
      id="accueil"
      className="flex min-h-dvh w-full flex-col justify-center dot-grid px-4 pt-20 pb-12"
    >
      <div className="container mx-auto max-w-5xl">
        <h1 className="font-dot text-signal font-bold lowercase md:text-signal-xl">
          {SITE_META.name}
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12">
          <div className="flex max-w-[60ch] flex-col gap-4 text-body">
            <p>{withAlbedyaLink(SITE_META.positioning)}</p>
            <p className="text-muted-foreground">{SITE_META.origin}</p>
          </div>

          <dl className="grid grid-cols-[auto_1fr] content-start gap-x-4 gap-y-3">
            {SITE_META.facts.map((fact) => (
              // `contents` : chaque paire reste sur la grille du `dl`.
              <div key={fact.label} className="contents">
                <dt className={DT_CLASS}>{fact.label}</dt>
                <dd className={DD_CLASS}>{withAlbedyaLink(fact.value)}</dd>
              </div>
            ))}
            {sideProjects.length > 0 && (
              <div className="contents">
                <dt className={DT_CLASS}>projets à côté</dt>
                <dd className="flex flex-col items-start">
                  {sideProjects.map((project) => (
                    <Button
                      key={project.slug}
                      variant="link"
                      className="pointer-coarse:py-3"
                      asChild
                    >
                      <Link href={`/projets/${project.slug}`}>
                        {project.title}
                      </Link>
                    </Button>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {competences.length > 0 && (
          <ul
            aria-label="Compétences"
            className="mt-10 grid gap-x-8 gap-y-6 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {competences.map(({ skill }) => (
              <li key={skill.id}>
                <p className="text-h3 font-semibold">{skill.name}</p>
                {skill.usage && (
                  <p className="mt-1 text-small text-muted-foreground">
                    {skill.usage}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="#parcours">Parcours</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#contact">Contact</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
