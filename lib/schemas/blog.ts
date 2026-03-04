import { SITE_URL, ORG_ID } from './organization'
import { adamSilvaSchema } from './person'
import { buildImageObjectSchema } from './image'
import { buildFAQSchema, type FAQItem } from './faq'
import { buildBreadcrumbSchema } from './organization'

export interface BlogPostSchemaConfig {
  title: string
  slug: string
  excerpt: string
  content?: string
  coverImage: string
  publishedAt: string
  updatedAt?: string
  readTime?: number
  keywords?: string[]
  category?: string
  faqs?: FAQItem[]
  videoUrl?: string
  videoDuration?: number
  videoTranscript?: string
  videoEmbedUrl?: string
  wordCount?: number
}

export function buildBlogPostSchema(config: BlogPostSchemaConfig) {
  const url = `${SITE_URL}/insights/${config.slug}`
  const schemas: object[] = []

  // BlogPosting
  schemas.push({
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: config.title,
    description: config.excerpt,
    image: buildImageObjectSchema({
      filename: config.coverImage,
      name: `${config.title} — Cover Image`,
      description: config.excerpt,
      width: 1200,
      height: 630,
    }),
    datePublished: config.publishedAt,
    dateModified: config.updatedAt || config.publishedAt,
    author: adamSilvaSchema,
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: config.keywords?.join(', ') || 'UCP, ACP, AP2, agentic commerce, Adam Silva Consulting',
    articleSection: config.category || 'Agentic Commerce',
    wordCount: config.wordCount || 2000,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SITE_URL}/insights#blog`,
      name: 'Adam Silva Consulting Insights',
      description: 'Expert analysis on agentic commerce, UCP, ACP, AP2, and AI-mediated transactions.',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.article-excerpt', 'h1', '.speakable-answer'],
    },
    about: {
      '@type': 'Thing',
      name: 'Agentic Commerce',
      sameAs: `${SITE_URL}/hub/universal-commerce-protocol`,
    },
  })

  // VideoObject (if video available)
  if (config.videoUrl) {
    schemas.push({
      '@type': 'VideoObject',
      name: `Video Summary: ${config.title}`,
      description: config.excerpt,
      thumbnailUrl: config.coverImage.startsWith('http')
        ? config.coverImage
        : `${SITE_URL}/images/${config.coverImage}`,
      contentUrl: config.videoUrl,
      ...(config.videoEmbedUrl && { embedUrl: config.videoEmbedUrl }),
      uploadDate: config.publishedAt,
      ...(config.videoDuration && { duration: `PT${config.videoDuration}S` }),
      ...(config.videoTranscript && { transcript: config.videoTranscript }),
      regionsAllowed: 'US,CA,GB,AU,DE,FR,JP',
      publisher: { '@id': ORG_ID },
      author: adamSilvaSchema,
      inLanguage: 'en-US',
    })
  }

  // FAQPage
  if (config.faqs && config.faqs.length > 0) {
    schemas.push(buildFAQSchema(config.faqs))
  }

  // BreadcrumbList
  schemas.push(
    buildBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Insights', url: '/insights' },
      { name: config.title, url: `/insights/${config.slug}` },
    ])
  )

  return schemas
}
