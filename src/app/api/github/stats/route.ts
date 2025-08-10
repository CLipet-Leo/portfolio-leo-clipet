/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

const GH_USER = 'CLipet-Leo';

async function fetchJson<T>(url: string, token?: string) {
  const res = await fetch(url, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        }
      : {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub API error ${res.status} for ${url}`);
  return (await res.json()) as T;
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;

    const user = await fetchJson<any>(
      `https://api.github.com/users/${GH_USER}`,
      token,
    );

    const repos = await fetchJson<any[]>(
      `https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`,
      token,
    );

    let totalStars = 0;
    for (const repo of repos) {
      totalStars += repo.stargazers_count;
    }

    // Récup commits via endpoint contributors (compte contributions user sur la branche par défaut)
    async function sumCommits() {
      const own = repos.filter((r) => !r.fork);
      const MAX_CONCURRENCY = 5;
      let idx = 0;
      let total = 0;

      async function worker() {
        while (idx < own.length) {
          const current = own[idx++];
          try {
            const contributors = await fetchJson<any[]>(
              `${current.url}/contributors?per_page=100&anon=1`,
              token,
            );
            const me = contributors.find(
              (c) => c.login?.toLowerCase() === GH_USER.toLowerCase(),
            );
            if (me?.contributions) total += me.contributions;
          } catch {
            // ignore repo errors
          }
        }
      }

      await Promise.all(
        Array.from({ length: Math.min(MAX_CONCURRENCY, own.length) }, () =>
          worker(),
        ),
      );
      return total;
    }

    const totalCommits = await sumCommits();

    // Langages
    const languageBytes: Record<string, number> = {};
    const languageFetchTargets = repos.slice(0, 30);
    await Promise.all(
      languageFetchTargets.map(async (repo) => {
        try {
          const langs = await fetchJson<Record<string, number>>(
            repo.languages_url,
            token,
          );
          for (const [lang, bytes] of Object.entries(langs)) {
            languageBytes[lang] = (languageBytes[lang] || 0) + bytes;
          }
        } catch {
          /* ignore */
        }
      }),
    );

    const totalBytes = Object.values(languageBytes).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(languageBytes)
      .map(([lang, bytes]) => ({
        lang,
        percent: totalBytes ? +(bytes / totalBytes * 100).toFixed(1) : 0,
      }))
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 6);

    return NextResponse.json(
      {
        user: {
          login: user.login,
          avatar_url: user.avatar_url,
          public_repos: user.public_repos,
          followers: user.followers,
          following: user.following,
        },
        totals: {
          stars: totalStars,
          commits: totalCommits,
          repos: repos.length,
        },
        topLanguages,
        fetchedAt: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control':
            'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? 'Erreur interne' },
      { status: 500 },
    );
  }
}
