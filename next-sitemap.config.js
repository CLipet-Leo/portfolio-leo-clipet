/**
 * Configuration next-sitemap
 * @type {import('next-sitemap').IConfig}
 */
export default {
  siteUrl: 'https://clipet-leo.dev',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './public',
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
