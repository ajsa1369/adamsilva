import React from 'react';

interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: {
    name: string;
    url?: string;
  };
  publisher?: {
    name: string;
    url: string;
    logo?: string;
  };
  keywords?: string[];
  wordCount?: number;
  articleSection?: string;
}

export const ArticleSchema: React.FC<ArticleSchemaProps> = ({
  headline,
  description,
  url,
  datePublished,
  dateModified = datePublished,
  image = "https://www.adamsilvaconsulting.com/images/social/og-image.jpg",
  author = {
    name: "Adam Silva",
    url: "https://www.adamsilvaconsulting.com/about"
  },
  publisher = {
    name: "Adam Silva Consulting",
    url: "https://www.adamsilvaconsulting.com",
    logo: "https://www.adamsilvaconsulting.com/images/logo-clear.png"
  },
  keywords = [],
  wordCount,
  articleSection = "Marketing Intelligence"
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "url": `https://www.adamsilvaconsulting.com${url}`,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "image": {
      "@type": "ImageObject",
      "url": image,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "@id": "https://www.adamsilvaconsulting.com/#person",
      "name": author.name,
      "url": author.url
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://www.adamsilvaconsulting.com/#organization",
      "name": publisher.name,
      "url": publisher.url,
      "logo": {
        "@type": "ImageObject",
        "url": publisher.logo,
        "width": 200,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.adamsilvaconsulting.com${url}`
    },
    "articleSection": articleSection,
    "inLanguage": "en-US",
    ...(keywords.length > 0 && { "keywords": keywords.join(", ") }),
    ...(wordCount && { "wordCount": wordCount })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ArticleSchema;