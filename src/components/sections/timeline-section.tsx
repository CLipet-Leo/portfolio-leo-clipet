import { Button } from '@/components/ui/button';
import { ContextFilter } from '@/components/ui/context-filter';
import { MiniMap } from '@/components/ui/mini-map';
import { ProjectCard } from '@/components/ui/projects/project-card';
import { formatProjectStack } from '@/components/ui/projects/project-facts';
import {
  CONTEXT_FILTER_CLASS,
  CONTEXT_LABELS,
} from '@/constants/project-context';
import { getPeriods, getProjects } from '@/db/queries';
import type { Period } from '@/db/schema';
import Link from 'next/link';

const periodAnchor = (period: Period) => `periode-${period.id}`;
const periodNumber = (period: Period) => String(period.number).padStart(2, '0');

/** « 2022 – 2023 », ou « 2025 – aujourd'hui » pour la période en cours. */
const periodYears = (period: Period) =>
  period.yearStart
    ? `${period.yearStart} – ${period.yearEnd ?? "aujourd'hui"}`
    : undefined;

/**
 * Timeline chronologique : une section par période. Ses projets mis en avant
 * ont une fiche ; les autres, qui ont construit les mêmes compétences, une
 * ligne.
 */
export const TimelineSection = async () => {
  const [periods, projects] = await Promise.all([getPeriods(), getProjects()]);
  const featured = projects.filter((p) => p.featured);
  const entries = periods.map((period) => ({
    period,
    years: periodYears(period),
    cards: featured.filter((p) => p.periodId === period.id),
    others: projects.filter((p) => !p.featured && p.periodId === period.id),
  }));

  return (
    <section id="parcours" className="w-full scroll-mt-16 px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-dot text-signal font-bold lowercase">parcours</h2>

        <ContextFilter
          contexts={projects.map((p) => p.context)}
          className="mt-8"
        >
          <div className="mt-8 xl:grid xl:grid-cols-[176px_1fr] xl:gap-8">
            <MiniMap
              items={entries.map(({ period, years }) => ({
                id: periodAnchor(period),
                number: periodNumber(period),
                title: period.title,
                years,
              }))}
              className="sticky top-14 z-10 -mx-4 self-start bg-background/90 px-2 py-1 backdrop-blur-sm xl:top-28 xl:mx-0 xl:bg-transparent xl:p-0 xl:backdrop-blur-none"
            />

            <div className="mt-8 flex flex-col gap-32 xl:mt-0">
              {entries.map(({ period, years, cards, others }) => (
                <section
                  key={period.id}
                  id={periodAnchor(period)}
                  aria-labelledby={`${periodAnchor(period)}-titre`}
                  className="relative scroll-mt-28 pl-8"
                >
                  {/* Axe de la timeline et port de la période, en points. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 bottom-0 left-0 dots-y"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-4 -left-[3px] size-2 rounded-full bg-foreground"
                  />

                  <h3
                    id={`${periodAnchor(period)}-titre`}
                    className="flex items-baseline gap-4 font-dot text-signal font-bold lowercase"
                  >
                    <span className="text-muted-foreground">
                      {periodNumber(period)}
                    </span>
                    {period.title}
                  </h3>
                  {years && (
                    <p className="mt-2 font-mono text-data text-muted-foreground">
                      {years}
                    </p>
                  )}
                  {period.summary && (
                    <p className="mt-4 max-w-[65ch] text-body text-muted-foreground">
                      {period.summary}
                    </p>
                  )}

                  {cards.length > 0 && (
                    <div className="mt-8 flex flex-col gap-6">
                      {cards.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                      ))}
                    </div>
                  )}

                  {others.length > 0 && (
                    <ul className="mt-8 border-b border-border">
                      {others.map((project) => (
                        <li
                          key={project.slug}
                          data-context={project.context}
                          className={`grid gap-x-8 gap-y-1 border-t border-border py-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] ${CONTEXT_FILTER_CLASS}`}
                        >
                          <Button
                            variant="link"
                            className="justify-self-start pointer-coarse:py-3"
                            asChild
                          >
                            <Link href={`/projets/${project.slug}`}>
                              {project.title}
                            </Link>
                          </Button>
                          <p className="font-mono text-data text-muted-foreground lowercase">
                            {[
                              CONTEXT_LABELS[project.context],
                              formatProjectStack(project),
                            ]
                              .filter(Boolean)
                              .join(' · ')}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </ContextFilter>

        <p className="mt-16 xl:pl-[208px]">
          <Button variant="link" asChild>
            <Link href="/projets">tous les projets ({projects.length}) →</Link>
          </Button>
        </p>
      </div>
    </section>
  );
};
