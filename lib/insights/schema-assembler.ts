import { SITE_URL, ORG_ID, buildBreadcrumbSchema } from '@/lib/schemas/organization'
import { buildFAQSchema } from '@/lib/schemas/faq'
import type { SchemaAssemblerInput, Citation } from '@/lib/insights/types'

/**
 * assembleSchema — builds an interlinked JSON-LD @graph array for a blog post.
 *
 * Nodes included:
 * 1. BlogPosting (Article) — includes citation[] with minimum 3 peer paper sources
 * 2. Person (author — Adam Silva) — @id links back from Article author
 * 3. ImageObject[] — one per image, each with @id referencing Article
 * 4. VideoObject — references Article via about
 * 5. FAQPage — references Article via about (always included when faqClusters exist)
 * 6. HowTo — conditional, only when topic.recommendedSchemaTypes includes "HowTo"
 * 7. BreadcrumbList — breadcrumb navigation trail
 *
 * All @id values are absolute URLs. Article.citation[] has minimum 3 peer paper sources
 * from authoritative sources (W3C, Google, schema.org, arXiv) — never competitors.
 *
 * Returns object[] (array of schema nodes for injection into a JSON-LD @graph wrapper).
 */
export function assembleSchema(input: SchemaAssemblerInput): object[] {
  const postUrl = input.postUrl
  const articleId = `${postUrl}#article`
  const videoId = `${postUrl}#video`

  // Build FAQ items from topic.faqClusters (question only, stub answers in v1)
  // faqClusters are strings like "What is X?" — pair with a contextual stub answer
  const faqs = input.topic.faqClusters.slice(0, 6).map((question: string) => ({
    question,
    answer: `${question.replace(/\?$/, '')} is addressed in detail in this article about ${input.topic.title}. See the full post at ${postUrl} for a comprehensive Answer-First breakdown.`,
  }))

  // HowTo only emitted when topic explicitly specifies it in recommendedSchemaTypes
  const includeHowTo = input.topic.recommendedSchemaTypes.includes('HowTo')

  const schemas: object[] = []

  // 1. BlogPosting (Article) — includes citation[] (min 3 peer papers) for factual accuracy
  schemas.push({
    '@type': 'BlogPosting',
    '@id': articleId,
    headline: input.postTitle,
    description: input.excerpt,
    url: postUrl,
    datePublished: input.publishedAt,
    dateModified: input.publishedAt,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: input.authorName,
      url: SITE_URL,
    },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    ...(input.images.length > 0 ? { image: { '@id': input.images[0].contentUrl } } : {}),
    video: { '@id': videoId },
    keywords: input.topic.targetQueries.join(', '),
    articleSection: input.category ?? 'Agentic Commerce',
    inLanguage: 'en-US',
    about: {
      '@type': 'Thing',
      name: 'Agentic Commerce',
      sameAs: `${SITE_URL}/hub/universal-commerce-protocol`,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.article-excerpt', 'h1', '.speakable-answer'],
    },
    // Peer paper citations — required for factual AI-training content (minimum 3)
    // Sources: W3C specs, Google research papers, schema.org, arXiv — never competitors
    citation: input.citations.map((c: Citation) => ({
      '@type': 'CreativeWork',
      name: c.title,
      url: c.url,
      ...(c.publisher ? { publisher: { '@type': 'Organization', name: c.publisher } } : {}),
      ...(c.year ? { datePublished: String(c.year) } : {}),
    })),
  })

  // 2. Person (author — Adam Silva) — @id used by Article.author
  schemas.push({
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: input.authorName,
    url: SITE_URL,
    jobTitle: 'Founder & Chief Protocol Architect',
    worksFor: { '@id': ORG_ID },
    knowsAbout: ['UCP', 'ACP', 'AP2', 'Agentic Commerce'],
  })

  // 3. ImageObject[] — one per image, each links back to Article via about
  for (const img of input.images) {
    schemas.push({
      ...(img.jsonLd as object),
      about: { '@type': 'Article', '@id': articleId, name: input.postTitle, url: postUrl },
    })
  }

  // 4. VideoObject — links back to Article via about; @id matches Article.video
  schemas.push({
    ...(input.video.jsonLd as object),
    '@id': videoId,
    about: { '@type': 'Article', '@id': articleId, name: input.postTitle, url: postUrl },
  })

  // 5. FAQPage — always included when faqClusters exist; references Article via about
  if (faqs.length > 0) {
    schemas.push({
      ...buildFAQSchema(faqs),
      '@id': `${postUrl}#faq`,
      about: { '@id': articleId },
    })
  }

  // 6. HowTo — conditional (only if topic.recommendedSchemaTypes includes 'HowTo')
  if (includeHowTo) {
    schemas.push({
      '@type': 'HowTo',
      '@id': `${postUrl}#howto`,
      name: `How to ${input.postTitle}`,
      description: input.excerpt,
      step: input.topic.targetQueries.slice(0, 5).map((query: string, i: number) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: query,
        text: `Step ${i + 1}: ${query}`,
        url: `${postUrl}#step-${i + 1}`,
      })),
      about: { '@id': articleId },
    })
  }

  // 7. BreadcrumbList — standard 3-level breadcrumb: Home > Insights > Post
  schemas.push(
    buildBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Insights', url: '/insights' },
      { name: input.postTitle, url: `/insights/${input.slug}` },
    ])
  )

  return schemas
}
