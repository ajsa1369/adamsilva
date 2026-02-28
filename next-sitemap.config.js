/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://www.adamsilvaconsulting.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
    ],
    additionalSitemaps: [
      'https://www.adamsilvaconsulting.com/sitemap.xml',
    ],
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/about'),
    await config.transform(config, '/services'),
    await config.transform(config, '/protocols'),
    await config.transform(config, '/insights'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/case-studies'),
    await config.transform(config, '/resources'),
    await config.transform(config, '/glossary'),
    await config.transform(config, '/sitemap'),
  ],
}

module.exports = config
