import React from 'react';

interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

/**
 * ReviewsSection Component
 * Displays reviews with structured data for rich search results
 * Shows star ratings in Google search results
 */
export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  aggregateRating
}) => {
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Adam Silva Consulting',
    aggregateRating: aggregateRating && {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      datePublished: review.datePublished,
      reviewBody: review.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1
      }
    }))
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      {/* Visual Display */}
      <section className="reviews-section">
        <div className="container">
          <h2>Client Reviews</h2>
          
          {aggregateRating && (
            <div className="aggregate-rating">
              <div className="stars">
                {'★'.repeat(Math.floor(aggregateRating.ratingValue))}
                {'☆'.repeat(5 - Math.floor(aggregateRating.ratingValue))}
              </div>
              <p>
                {aggregateRating.ratingValue} out of 5 stars 
                ({aggregateRating.reviewCount} reviews)
              </p>
            </div>
          )}

          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <h3>{review.author}</h3>
                  <div className="stars">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="review-date">
                  {new Date(review.datePublished).toLocaleDateString()}
                </p>
                <p className="review-body">{review.reviewBody}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Example usage data
export const sampleReviews: Review[] = [
  {
    author: 'John Smith',
    rating: 5,
    reviewBody: 'Outstanding AI marketing strategy work. Our traffic increased 75% in 3 months.',
    datePublished: '2025-09-15'
  },
  {
    author: 'Sarah Johnson',
    rating: 5,
    reviewBody: 'Expert in Answer Engine Optimization. We now appear in ChatGPT and Claude regularly.',
    datePublished: '2025-09-20'
  },
  {
    author: 'Michael Chen',
    rating: 5,
    reviewBody: 'Transformed our digital presence. The AEO implementation was game-changing.',
    datePublished: '2025-10-01'
  }
];

export const sampleAggregateRating = {
  ratingValue: 5.0,
  reviewCount: 12
};
