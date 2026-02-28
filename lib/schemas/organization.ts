const SITE_URL = 'https://www.adamsilvaconsulting.com'
const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

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
  ],
  expertise: 'Agentic Commerce Protocol Implementation',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Agentic Commerce Services',
    url: `${SITE_URL}/services`,
  },
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

export function buildPageSchema(pathname: string, additionalSchemas: object[] = []) {
  const breadcrumbs = buildBreadcrumbSchemaFromPath(pathname)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      websiteSchema,
      ...(breadcrumbs ? [breadcrumbs] : []),
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
    items.push({
      name: segment
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      url: currentPath,
    })
  }
  return buildBreadcrumbSchema(items)
}

export { SITE_URL, ORG_ID, WEBSITE_ID }
