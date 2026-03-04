import { SITE_URL, ORG_ID } from './organization'
import { adamSilvaSchema } from './person'

export function buildNewsArticleSchema(config: {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  image?: string
  keywords?: string[]
}) {
  return {
    '@type': 'NewsArticle',
    headline: config.headline,
    description: config.description,
    url: config.url,
    datePublished: config.datePublished,
    dateModified: config.dateModified,
    image: config.image || `${SITE_URL}/images/adam-silva-consulting-agentic-commerce-hero.png`,
    author: { '@id': adamSilvaSchema['@id'] },
    publisher: { '@id': ORG_ID },
    isAccessibleForFree: true,
    mainEntityOfPage: config.url,
    ...(config.keywords ? { keywords: config.keywords.join(', ') } : {}),
  }
}
