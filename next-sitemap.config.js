/**
 * Configuration next-sitemap
 * @type {import('next-sitemap').IConfig}
 */
export default {
  siteUrl: 'https://clipet-leo.dev',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './public',
  // `/lab` est un outil de travail interne : la balise `noindex` de la page ne
  // suffit pas si on l'annonce nous-mêmes dans le sitemap.
  exclude: ['/api/*', '/lab'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/lab'],
      },
    ],
  },
};
