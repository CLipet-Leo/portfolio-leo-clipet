import Image from 'next/image';

type StatsPayload = {
  user: {
    login: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
  };
  totals: { stars: number; commits: number; repos: number };
  topLanguages: { lang: string; percent: number }[];
  fetchedAt: string;
};

async function getStats(): Promise<StatsPayload | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/api/github/stats`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export const GithubStatsSection = async () => {
  const data = await getStats();
  if (!data) {
    return (
      <section className="relative px-4 py-16">
        <div className="text-muted-foreground container mx-auto max-w-5xl text-center text-sm">
          Impossible de charger les statistiques GitHub pour le moment.
        </div>
      </section>
    );
  }

  const { user, totals, topLanguages } = data;

  return (
    <section id="github-stats" className="relative px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
          Statistiques <span className="text-primary">GitHub</span>
        </h2>

        <div className="mb-10 flex flex-col items-center gap-4">
          <Image
            src={user.avatar_url}
            alt={user.login}
            width={96}
            height={96}
            className="rounded-full border"
          />
          <span className="text-lg font-semibold">@{user.login}</span>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="bg-primary-foreground/60 rounded-md px-4 py-2">
              Repos: {totals.repos}
            </span>
            <span className="bg-primary-foreground/60 rounded-md px-4 py-2">
              Stars: {totals.stars}
            </span>
            <span className="bg-primary-foreground/60 rounded-md px-4 py-2">
              Commits: {totals.commits}
            </span>
            <span className="bg-primary-foreground/60 rounded-md px-4 py-2">
              Followers: {user.followers}
            </span>
          </div>
        </div>

        <div className="bg-primary-foreground mx-auto max-w-xl space-y-4 rounded-lg border p-6">
          {topLanguages.map((l) => {
            const pct = Math.min(Math.max(l.percent, 0), 100);
            const rest = 100 - pct;
            return (
              <div key={l.lang}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{l.lang}</span>
                  <span className="text-muted-foreground">{pct}%</span>
                </div>
                <div className="flex h-2 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-primary"
                    style={{ width: `${pct}%` }}
                    aria-hidden
                  />
                  <div
                    className="bg-emerald-500/50"
                    style={{ width: `${rest}%` }}
                    aria-hidden
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-muted-foreground mt-10 text-center text-xs">
          Actualisé: {new Date(data.fetchedAt).toLocaleString('fr-FR')}
        </p>
      </div>
    </section>
  );
};
