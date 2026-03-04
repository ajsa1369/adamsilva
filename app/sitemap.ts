import type { MetadataRoute } from 'next'
import { SERVICES } from '@/lib/data/services'
import { PACKAGES } from '@/lib/data/packages'
import { FALLBACK_POSTS } from '@/lib/strapi/queries'

const SITE = 'https://www.adamsilvaconsulting.com'
const now = new Date().toISOString()

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    // Core pages
    { url: SITE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE}/insights`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/resources`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/case-studies`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/glossary`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/sitemap`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },

    // Marketing pages
    { url: `${SITE}/get-started`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/packages`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/platform-check`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // Protocols
    { url: `${SITE}/protocols`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/protocols/ucp`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/protocols/acp`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/protocols/ap2`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },

    // Hub pages (topical authority)
    { url: `${SITE}/hub/universal-commerce-protocol`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/hub/agentic-commerce-protocol`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/hub/agent-payments-protocol`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/hub/answer-engine-optimization`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE}/hub/generative-engine-optimization`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },

    // Research
    { url: `${SITE}/research/state-of-agentic-commerce-2026`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/research/protocol-adoption-index`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Authority hub
    { url: `${SITE}/authority-hub`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },

    // Tools
    { url: `${SITE}/tools/token-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/tools/protocol-checker`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/tools/aeo-score`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  // Dynamic service pages (all 18)
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE}/services/${s.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: s.featured ? 0.9 : 0.85,
  }))

  // Package tier pages
  const packagePages: MetadataRoute.Sitemap = PACKAGES.map((p) => ({
    url: `${SITE}/packages/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Insight/blog pages
  const insightPages: MetadataRoute.Sitemap = FALLBACK_POSTS.map((post) => ({
    url: `${SITE}/insights/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.85 : 0.75,
  }))

  return [...staticPages, ...servicePages, ...packagePages, ...insightPages]
}
