import { SITE_URL } from './organization'

export function buildAggregateOfferSchema(offers: {
  name: string
  description: string
  price: number | null
  slug: string
}[]) {
  const priced = offers.filter((o) => o.price !== null) as { name: string; description: string; price: number; slug: string }[]
  if (priced.length === 0) return null

  return {
    '@type': 'AggregateOffer',
    lowPrice: Math.min(...priced.map((o) => o.price)),
    highPrice: Math.max(...priced.map((o) => o.price)),
    priceCurrency: 'USD',
    offerCount: offers.length,
    offers: offers.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      description: o.description,
      price: o.price ?? undefined,
      priceCurrency: 'USD',
      url: `${SITE_URL}/packages/${o.slug}`,
      availability: 'https://schema.org/InStock',
    })),
  }
}
