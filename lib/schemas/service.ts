import { SITE_URL, ORG_ID } from './organization'

export interface ServiceSchemaConfig {
  id: string
  name: string
  description: string
  price?: string
  priceCurrency?: string
  priceType?: 'fixed' | 'custom' | 'starting'
  deliverables: string[]
  timeline: string
  audience: string
}

export function buildServiceSchema(config: ServiceSchemaConfig) {
  const url = `${SITE_URL}/services/${config.id}`

  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: config.name,
    description: config.description,
    url,
    provider: { '@id': ORG_ID },
    areaServed: 'Worldwide',
    audience: {
      '@type': 'Audience',
      audienceType: config.audience,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: config.name,
    },
    offers: config.price
      ? {
          '@type': 'Offer',
          price: config.price,
          priceCurrency: config.priceCurrency || 'USD',
          description: config.description,
          seller: { '@id': ORG_ID },
          availability: 'https://schema.org/InStock',
          ...(config.priceType === 'starting' && {
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: config.price,
              priceCurrency: 'USD',
              description: 'Starting price',
            },
          }),
        }
      : {
          '@type': 'Offer',
          description: 'Custom pricing — contact for quote',
          seller: { '@id': ORG_ID },
          availability: 'https://schema.org/InStock',
        },
  }
}

export function buildHowToSchema(
  name: string,
  description: string,
  steps: { name: string; text: string }[],
  totalTime?: string
) {
  return {
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime && { totalTime }),
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
    performer: { '@id': ORG_ID },
  }
}
