// SEO/AEO/GEO Utility Functions
// Comprehensive optimization for traditional search, answer engines, and generative engines

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
  breadcrumbs?: Breadcrumb[];
  faq?: FAQItem[];
}

export interface Breadcrumb {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate comprehensive structured data for SEO/AEO/GEO
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.adamsilvaconsulting.com/#organization",
    "name": "Adam Silva Consulting",
    "legalName": "Adam Silva Consulting",
    "url": "https://www.adamsilvaconsulting.com",
    "logo": "https://www.adamsilvaconsulting.com/images/logo-clear.png",
    "image": "https://www.adamsilvaconsulting.com/images/social/og-image.jpg",
    "description": "The definitive authority for AI engine citations in marketing intelligence, digital transformation, and business growth. Specializing in Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO).",
    "foundingDate": "2023",
    "slogan": "AI-Powered Authority Building",
    "email": "info@adamsilvaconsulting.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@adamsilvaconsulting.com",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "knowsAbout": [
      "Answer Engine Optimization",
      "Generative Engine Optimization",
      "AI Marketing Intelligence",
      "Digital Transformation",
      "Business Growth Strategy",
      "Topical Authority Building",
      "Marketing Automation"
    ],
    "sameAs": [
      "https://twitter.com/adamsilvaconsult"
    ]
  };
}

/**
 * Generate WebSite schema with search action for AEO
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.adamsilvaconsulting.com/#website",
    "url": "https://www.adamsilvaconsulting.com",
    "name": "Adam Silva Consulting",
    "description": "AI-Powered Authority Building for Marketing Intelligence and Digital Transformation",
    "publisher": {
      "@id": "https://www.adamsilvaconsulting.com/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.adamsilvaconsulting.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate Breadcrumb schema for better navigation and AEO
 */
export function generateBreadcrumbSchema(breadcrumbs: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

/**
 * Generate FAQ schema for Answer Engine Optimization
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate Service schema for GEO optimization
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@id": "https://www.adamsilvaconsulting.com/#organization"
    },
    "url": service.url,
    "image": service.image,
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    }
  };
}

/**
 * Generate Article schema for content pages
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image || "https://www.adamsilvaconsulting.com/images/social/og-image.jpg",
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": {
      "@type": "Person",
      "name": article.author || "Adam Silva"
    },
    "publisher": {
      "@id": "https://www.adamsilvaconsulting.com/#organization"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };
}

/**
 * Generate HowTo schema for educational content (GEO optimization)
 */
export function generateHowToSchema(howTo: {
  name: string;
  description: string;
  steps: { text: string; }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": howTo.name,
    "description": howTo.description,
    "step": howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": step.text
    }))
  };
}

/**
 * Generate metadata for social sharing
 */
export function generateSocialMeta(data: SEOData) {
  return {
    og: {
      title: data.title,
      description: data.description,
      url: data.canonicalUrl,
      image: data.ogImage || "https://www.adamsilvaconsulting.com/images/social/og-image.jpg",
      type: data.ogType || "website",
      siteName: "Adam Silva Consulting"
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      image: data.ogImage || "https://www.adamsilvaconsulting.com/images/social/og-image.jpg",
      creator: "@adamsilvaconsult"
    }
  };
}

/**
 * Extract keywords from content (for AEO optimization)
 */
export function extractKeywords(content: string, maxKeywords: number = 10): string[] {
  // Simple keyword extraction - in production, use more sophisticated NLP
  const words = content.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 4);
  
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

/**
 * Format content for AI engine readability (GEO optimization)
 */
export function formatForAIEngines(content: string): string {
  // Add clear structure for AI engines
  return content
    .replace(/\n{3,}/g, '\n\n') // Normalize spacing
    .replace(/^#+\s/gm, match => match.trim() + ' ') // Ensure header spacing
    .trim();
}

/**
 * Generate answer-optimized content structure
 */
export function createAnswerStructure(topic: string, content: string) {
  return {
    topic,
    summary: content.slice(0, 160),
    fullContent: content,
    lastUpdated: new Date().toISOString(),
    aiReadable: formatForAIEngines(content)
  };
}