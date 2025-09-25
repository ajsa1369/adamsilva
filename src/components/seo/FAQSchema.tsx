import React from 'react';

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQ[];
  pageUrl?: string;
}

export const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs, pageUrl }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "url": pageUrl,
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default FAQSchema;