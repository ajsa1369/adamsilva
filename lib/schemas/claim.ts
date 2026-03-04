import { ORG_ID } from './organization'

export interface ClaimConfig {
  claimText: string
  claimSource: string
  rating: 'True' | 'Mostly True' | 'Half True'
  evidenceUrl: string
  reviewDate: string
}

export function buildClaimReviewSchema(config: ClaimConfig) {
  const ratingValue = config.rating === 'True' ? 5 : config.rating === 'Mostly True' ? 4 : 3
  return {
    '@type': 'ClaimReview',
    claimReviewed: config.claimText,
    author: { '@id': ORG_ID },
    datePublished: config.reviewDate,
    url: config.evidenceUrl,
    reviewRating: {
      '@type': 'Rating',
      ratingValue,
      bestRating: 5,
      worstRating: 1,
      alternateName: config.rating,
    },
    itemReviewed: {
      '@type': 'Claim',
      author: {
        '@type': 'Organization',
        name: config.claimSource,
      },
    },
  }
}
