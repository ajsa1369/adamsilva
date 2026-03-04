import { SITE_URL, ORG_ID } from './organization'

export interface Testimonial {
  name: string
  company: string
  role: string
  text: string
  rating: number
  service: string
  date: string
}

export function buildReviewSchema(testimonial: Testimonial) {
  return {
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: testimonial.name,
      jobTitle: testimonial.role,
    },
    reviewBody: testimonial.text,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.rating,
      bestRating: 5,
      worstRating: 1,
    },
    datePublished: testimonial.date,
    publisher: {
      '@type': 'Organization',
      name: testimonial.company,
    },
    itemReviewed: { '@id': ORG_ID },
  }
}

export function buildAggregateRatingSchema(testimonials: Testimonial[]) {
  if (testimonials.length === 0) return null
  const avg = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  return {
    '@type': 'AggregateRating',
    ratingValue: avg.toFixed(1),
    bestRating: '5',
    worstRating: '1',
    ratingCount: testimonials.length,
    reviewCount: testimonials.length,
  }
}
