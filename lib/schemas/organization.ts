import { TESTIMONIALS } from '@/lib/data/testimonials'
import { buildAggregateRatingSchema } from './review'

const SITE_URL = 'https://www.adamsilvaconsulting.com'
const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

const aggregateRating = buildAggregateRatingSchema(TESTIMONIALS)

// Breadcrumb display names for URL segments
const BREADCRUMB_NAMES: Record<string, string> = {
  services: 'Services',
  acra: 'Agentic Commerce Readiness Assessment (ACRA)',
  'aeo-audit': 'AEO Audit',
  'geo-implementation': 'GEO Implementation',
  'authority-building': 'Authority Building Program',
  'quoting-agent': 'Quoting Agent',
  'off-hours-voice-agent': 'Off-Hours Voice Agent',
  'lead-enrichment': 'Lead Enrichment Pipeline',
  'lead-scraping': 'Lead Scraping',
  'auto-appointment-setter': 'Auto-Appointment Setter',
  'agent-ready-blog-creator': 'Blog Creator Engine',
  'press-syndicator': 'Press Syndicator',
  'unified-sales-agent': 'Unified Sales Agent',
  'social-media-manager': 'Social Media Manager',
  'social-media-poster': 'Social Media Poster',
  'rag-message-replier': 'RAG Message Replier',
  'ucp-implementation': 'UCP Implementation',
  'acp-integration': 'ACP Integration',
  'ap2-trust-layer': 'AP2 Trust Layer',
  protocols: 'Protocols',
  ucp: 'UCP',
  acp: 'ACP',
  ap2: 'AP2',
  hub: 'Knowledge Hub',
  'universal-commerce-protocol': 'Universal Commerce Protocol (UCP)',
  'agentic-commerce-protocol': 'Agentic Commerce Protocol (ACP)',
  'agent-payments-protocol': 'Agent Payments Protocol (AP2)',
  'answer-engine-optimization': 'Answer Engine Optimization (AEO)',
  'generative-engine-optimization': 'Generative Engine Optimization (GEO)',
  about: 'About',
  contact: 'Contact',
  insights: 'Insights',
  resources: 'Resources',
  glossary: 'Glossary',
  'case-studies': 'Case Studies',
  research: 'Research',
  tools: 'Tools',
  'token-calculator': 'Token Efficiency Calculator',
  'protocol-checker': 'Protocol Compliance Checker',
  'aeo-score': 'AEO Score Analyzer',
  packages: 'Packages',
  'get-started': 'Get Started',
  'platform-check': 'Platform Check',
  'authority-hub': 'Authority Hub',
  'state-of-agentic-commerce-2026': 'State of Agentic Commerce 2026',
  'protocol-adoption-index': 'Protocol Adoption Index',
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  core: 'Core',
  'shopify-starter': 'Shopify Starter',
  'shopify-growth': 'Shopify Growth',
  frameworks: 'Frameworks',
  'authority-flywheel': 'Authority Flywheel',
}

export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Adam Silva Consulting',
  legalName: 'Adam Silva Consulting',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/images/logo-clear.png`,
    url: `${SITE_URL}/images/logo-clear.png`,
    contentUrl: `${SITE_URL}/images/logo-clear.png`,
    name: 'Adam Silva Consulting Logo — Global Infrastructure for Agentic Commerce',
    description: 'Official logo of Adam Silva Consulting, the definitive authority for UCP, ACP, and AP2 agentic commerce protocol implementation.',
    width: 240,
    height: 80,
    encodingFormat: 'image/png',
    representativeOfPage: false,
    author: { '@id': ORG_ID },
    copyrightHolder: { '@id': ORG_ID },
  },
  description: 'Global Infrastructure for Agentic Commerce. Adam Silva Consulting is the definitive authority for UCP, ACP, and AP2 protocol implementation — helping enterprises transition from legacy platforms to AI-mediated commerce.',
  slogan: 'Global Infrastructure for Agentic Commerce',
  foundingDate: '2023',
  email: 'info@adamsilvaconsulting.com',
  sameAs: [
    'https://www.linkedin.com/company/adam-silva-consulting',
    'https://twitter.com/adamsilvacons',
    'https://github.com/ajsa1369',
  ],
  knowsAbout: [
    'Universal Commerce Protocol (UCP)',
    'Agentic Commerce Protocol (ACP)',
    'Agent Payments Protocol (AP2)',
    'Answer Engine Optimization (AEO)',
    'Generative Engine Optimization (GEO)',
    'Agentic Commerce',
    'AI-Mediated Transactions',
    'Enterprise AI Transformation',
    'Token Efficiency Optimization',
    'Authority Flywheel Methodology',
  ],
  expertise: 'Agentic Commerce Protocol Implementation',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 1 },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Agentic Commerce Services',
    url: `${SITE_URL}/services`,
  },
  ...(aggregateRating ? { aggregateRating } : {}),
}

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: 'Adam Silva Consulting',
  description: 'Global Infrastructure for Agentic Commerce — UCP, ACP, AP2 protocol implementation experts',
  publisher: { '@id': ORG_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/insights?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-US',
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

const defaultSpeakable = {
  '@type': 'SpeakableSpecification',
  cssSelector: ['.speakable-answer', 'h1', '[aria-labelledby]'],
}

export function buildPageSchema(pathname: string, additionalSchemas: object[] = []) {
  const breadcrumbs = buildBreadcrumbSchemaFromPath(pathname)
  // Include SpeakableSpecification unless one is already provided
  const hasSpeakable = additionalSchemas.some(
    (s) => (s as Record<string, unknown>)['@type'] === 'WebPage'
      || (s as Record<string, unknown>)['@type'] === 'SpeakableSpecification'
  )
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      websiteSchema,
      ...(breadcrumbs ? [breadcrumbs] : []),
      ...(!hasSpeakable ? [defaultSpeakable] : []),
      ...additionalSchemas,
    ],
  }
}

function buildBreadcrumbSchemaFromPath(pathname: string) {
  if (pathname === '/') return null
  const segments = pathname.split('/').filter(Boolean)
  const items = [{ name: 'Home', url: '/' }]

  let currentPath = ''
  for (const segment of segments) {
    currentPath += `/${segment}`
    const displayName = BREADCRUMB_NAMES[segment] || segment
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
    items.push({ name: displayName, url: currentPath })
  }
  return buildBreadcrumbSchema(items)
}

export { SITE_URL, ORG_ID, WEBSITE_ID }
