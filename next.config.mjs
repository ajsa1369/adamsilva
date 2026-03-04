/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.adamsilvaconsulting.com',
        pathname: '/uploads/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      {
        source: '/.well-known/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Content-Type', value: 'application/json' },
        ],
      },
    ]
  },

  // Redirects for old Vite routes + old service slugs from previous site
  async redirects() {
    return [
      // Old service slugs (indexed by Google) → new equivalents
      { source: '/services/ai-lead-generation', destination: '/services/lead-scraping', permanent: true },
      { source: '/services/voice-agent-verification', destination: '/services/off-hours-voice-agent', permanent: true },
      { source: '/services/omnichannel-nurturing', destination: '/services/auto-appointment-setter', permanent: true },
      { source: '/services/precision-lead-management', destination: '/services/lead-enrichment', permanent: true },
      { source: '/services/seo-ppc-superpowers', destination: '/services/aeo-audit', permanent: true },
      { source: '/services/content-media-creation', destination: '/services/agent-ready-blog-creator', permanent: true },
      { source: '/services/intelligent-campaigns', destination: '/services/geo-implementation', permanent: true },
      { source: '/services/intent-graph-targeting', destination: '/services/lead-scraping', permanent: true },
      { source: '/services/ai-websites-landing-pages', destination: '/services/ai-readiness-check', permanent: true },
      { source: '/services/real-time-analytics', destination: '/services/ai-readiness-check', permanent: true },
      { source: '/services/security-compliance', destination: '/services/ap2-trust-layer', permanent: true },
      { source: '/services/competitor-monitoring', destination: '/services/aeo-audit', permanent: true },
      { source: '/services/omnichannel-communication', destination: '/services/off-hours-voice-agent', permanent: true },
      { source: '/services/outreach-partnerships', destination: '/services/lead-scraping', permanent: true },
      // Old insight slugs that overlap with renamed articles
      { source: '/insights/the-ai-authority-imperative-gartner-50-percent-traffic-decline-prediction', destination: '/insights/gartner-50-percent-traffic-decline', permanent: true },
      { source: '/insights/aeo-vs-geo-understanding-the-new-search-landscape', destination: '/insights/aeo-vs-geo-difference', permanent: true },
    ]
  },
}

export default nextConfig
