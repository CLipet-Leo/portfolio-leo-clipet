import { getSkillProofs, type ISkillProof } from '@/db/queries';
import Link from 'next/link';

/** Une ligne : la compétence ou la techno, puis les projets qui la prouvent. */
const SkillRow = ({ skill, projects }: ISkillProof) => {
  const isCompetence = skill.kind === 'competence';
  const count = `${projects.length} projet${projects.length > 1 ? 's' : ''}`;

  return (
    <li className="grid gap-x-8 gap-y-1 border-t border-border py-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div>
        <p className={isCompetence ? 'text-h3 font-semibold' : 'font-semibold'}>
          {skill.name}
        </p>
        {/* La phrase d'une compétence est du discours, pas une donnée. */}
        {isCompetence && skill.usage && (
          <p className="mt-1 text-small text-muted-foreground">{skill.usage}</p>
        )}
        <p className="font-mono text-label text-muted-foreground">
          {[
            skill.since && `depuis ${skill.since}`,
            !isCompetence && skill.usage,
            count,
          ]
            .filter(Boolean)
            .join(' · ')}
        </p>
      </div>
      <ul className="flex flex-wrap content-start gap-x-4">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projets/${project.slug}`}
              className="rounded-sm font-mono text-data text-brand-400 lowercase underline-offset-4 outline-none hover:text-brand-200 hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/60 pointer-coarse:py-3"
            >
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

/**
 * Compétences, puis technos par domaine. Chacune s'affiche avec ses preuves :
 * depuis quand, à quelle fréquence, dans quels projets. Celles qui n'ont aucun
 * projet publié n'apparaissent pas.
 */
export const SkillsSection = async () => {
  const proofs = await getSkillProofs();
  const competences = proofs.filter(({ skill }) => skill.kind === 'competence');
  const domains = Map.groupBy(
    proofs
      .filter(({ skill }) => skill.kind === 'techno')
      // Tri stable : l'ordre par nom est conservé dans chaque domaine.
      .sort((a, b) => a.skill.domain.localeCompare(b.skill.domain, 'fr')),
    ({ skill }) => skill.domain,
  );

  return (
    <section id="competences" className="w-full scroll-mt-16 px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-dot text-signal font-bold lowercase">
          compétences
        </h2>
        <p className="mt-4 max-w-[65ch] text-body text-muted-foreground">
          Pas de niveau chiffré : chaque compétence renvoie aux projets où elle
          a servi, chaque techno aussi.
        </p>

        {competences.length > 0 && (
          <ul className="mt-12 border-b border-border">
            {competences.map((proof) => (
              <SkillRow key={proof.skill.id} {...proof} />
            ))}
          </ul>
        )}

        <div className="mt-12 flex flex-col gap-12">
          {[...domains].map(([domain, skills]) => (
            <section key={domain} aria-label={domain}>
              <h3 className="text-h3 font-semibold">{domain}</h3>
              <ul className="mt-4 border-b border-border">
                {skills.map((proof) => (
                  <SkillRow key={proof.skill.id} {...proof} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};
