/**
 * SEO/AEO/GEO Constants and Configuration
 * Centralized configuration for all SEO-related constants
 */

export const SITE_CONFIG = {
  name: 'Adam Silva Consulting',
  url: 'https://www.adamsilvaconsulting.com',
  title: 'Adam Silva Consulting | AI-Powered Authority Building',
  description: 'The definitive authority for AI engine citations in marketing intelligence, digital transformation, and business growth.',
  author: 'Adam Silva',
  email: 'info@adamsilvaconsulting.com',
  logo: 'https://www.adamsilvaconsulting.com/images/logo-clear.png',
  ogImage: 'https://www.adamsilvaconsulting.com/images/social/og-image.jpg',
  twitter: '@adamsilvaconsult',
  foundingYear: '2023'
};

export const KEYWORDS = {
  primary: [
    'Answer Engine Optimization',
    'AEO',
    'Generative Engine Optimization',
    'GEO',
    'AI Marketing Intelligence',
    'Digital Transformation',
    'Topical Authority'
  ],
  secondary: [
    'AI Consulting',
    'Marketing Automation',
    'Business Growth',
    'Authority Building',
    'Content Strategy',
    'SEO Services',
    'AI Implementation'
  ],
  services: [
    'AI Websites',
    'Landing Pages',
    'AEO Services',
    'GEO Optimization',
    'AI Content Creation',
    'Business Development',
    'Marketing Intelligence'
  ]
};

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/adamsilvaconsult',
  linkedin: 'https://www.linkedin.com/company/adamsilvaconsulting',
  // Add more as needed
};

export const STRUCTURED_DATA_CONFIG = {
  organizationId: 'https://www.adamsilvaconsulting.com/#organization',
  websiteId: 'https://www.adamsilvaconsulting.com/#website',
  founderId: 'https://www.adamsilvaconsulting.com/#founder',
  logoId: 'https://www.adamsilvaconsulting.com/#logo'
};

// Service categories for organization
export const SERVICE_CATEGORIES = [
  'Consulting',
  'AI Implementation',
  'Digital Marketing',
  'Business Strategy',
  'Content Development',
  'Technology Services'
];

// Industries served
export const INDUSTRIES = [
  'Technology',
  'SaaS',
  'Professional Services',
  'Consulting',
  'B2B Services',
  'Enterprise Software',
  'Digital Marketing'
];

// Geographic areas served
export const SERVICE_AREAS = [
  'North America',
  'Europe',
  'Asia Pacific',
  'Global'
];

// Content types for schema markup
export const CONTENT_TYPES = {
  article: 'Article',
  howTo: 'HowTo',
  faq: 'FAQPage',
  service: 'Service',
  webpage: 'WebPage',
  organization: 'Organization'
};

// AI Engines we optimize for (AEO/GEO)
export const AI_ENGINES = [
  'ChatGPT',
  'Claude',
  'Perplexity',
  'Google AI',
  'Bing AI',
  'Grok',
  'Meta AI'
];

// Default meta descriptions by page type
export const META_DESCRIPTIONS = {
  home: 'The definitive authority for AI engine citations in marketing intelligence, digital transformation, and business growth. Comprehensive AI-powered solutions for the generative AI era.',
  services: 'Comprehensive AI-powered services including Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), digital transformation, and topical authority building.',
  insights: 'Latest insights on AI marketing, answer engine optimization, digital transformation, and business growth strategies.',
  about: 'Learn about Adam Silva Consulting, pioneers in Answer Engine Optimization and AI-powered marketing intelligence.',
  contact: 'Contact Adam Silva Consulting for AI marketing intelligence, AEO, GEO, and digital transformation services.'
};

// Open Graph types by page
export const OG_TYPES = {
  home: 'website',
  article: 'article',
  service: 'website',
  default: 'website'
};