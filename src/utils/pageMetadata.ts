/**
 * Page-specific Open Graph images for social sharing
 * Each page type gets a relevant, unique image
 */

export const OG_IMAGES = {
  // Homepage
  home: '/images/og/home-ai-authority-building.jpg',
  
  // Services
  aiMarketing: '/images/og/service-ai-marketing-intelligence.jpg',
  digitalTransformation: '/images/og/service-digital-transformation.jpg',
  businessGrowth: '/images/og/service-business-growth-strategy.jpg',
  authorityBuilding: '/images/og/service-authority-building.jpg',
  
  // Insights - Default per category
  insightsDefault: '/images/og/insights-strategic-intelligence.jpg',
  
  // Insights - Specific Articles
  aiAuthorityImperative: '/images/insights/ai_ready_business_strategy_steps_infographic.jpg',
  agenticCommerceProtocols: '/images/insights/ai_ready_business_strategy_steps_infographic.jpg',
  zeroClickSearches: '/images/og/article-zero-click-searches.jpg',
  integratedEcosystem: '/images/og/article-integrated-ecosystem.jpg',
  eeatEvolution: '/images/og/article-eeat-evolution.jpg',
  
  // Other Pages
  contact: '/images/og/contact-consultation-booking.jpg',
  authorityHub: '/images/og/authority-hub-resources.jpg',
  
  // Default fallback
  default: '/images/og/adam-silva-consulting-default.jpg'
} as const;

/**
 * Page-specific meta descriptions
 * Unique, compelling descriptions for each page
 */
export const META_DESCRIPTIONS = {
  home: "Transform your business into an AI-cited authority. Adam Silva Consulting specializes in Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) to help businesses become the definitive sources that AI engines cite.",
  
  // Services
  aiMarketing: "AI Marketing Intelligence services including Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and AI-powered marketing strategies. Become the authority AI engines cite for your industry.",
  
  digitalTransformation: "End-to-end digital transformation consulting for the AI era. We help businesses successfully navigate AI implementation, technology adoption, and strategic digital evolution with proven methodologies.",
  
  businessGrowth: "Data-driven business growth strategies leveraging AI and digital marketing. Accelerate revenue, expand markets, and achieve sustainable growth through strategic planning and performance analytics.",
  
  authorityBuilding: "Build unshakeable digital authority and become the definitive source AI engines cite. Comprehensive topical authority development, thought leadership positioning, and E-E-A-T optimization.",
  
  // Insights
  insightsIndex: "Strategic intelligence on AI marketing, Answer Engine Optimization, digital transformation, and authority building. Expert analysis and actionable frameworks for business leaders navigating the AI era.",
  
  aiAuthorityImperative: "Gartner's projection of 50% organic traffic decline marks the definitive end of click-based optimization. Comprehensive analysis of why the strategic objective has irrevocably shifted from ranking for keywords to being cited for authority.",
  
  agenticCommerceProtocols: "Complete technical guide to UCP, ACP, and AP2—the three foundational protocols powering AI-mediated commerce. Understanding these protocols is essential for businesses that want to remain visible and transactable in the agentic economy.",
  
  // Contact
  contact: "Schedule a strategic consultation to discuss AI authority building, Answer Engine Optimization, digital transformation, or business growth strategies. Transform your business into an AI-cited industry leader.",
  
  // Authority Hub
  authorityHub: "Comprehensive resources for building digital authority and AI optimization. Access strategic frameworks, implementation guides, and expert insights for Answer Engine Optimization (AEO) and authority building."
} as const;

/**
 * Helper function to get the absolute URL for an image
 */
export function getAbsoluteImageUrl(imagePath: string): string {
  const baseUrl = 'https://www.adamsilvaconsulting.com';
  return imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`;
}

/**
 * Helper function to get OG image for a page
 */
export function getOGImage(pageKey: keyof typeof OG_IMAGES): string {
  return getAbsoluteImageUrl(OG_IMAGES[pageKey] || OG_IMAGES.default);
}

/**
 * Helper function to get meta description for a page
 */
export function getMetaDescription(pageKey: keyof typeof META_DESCRIPTIONS): string {
  return META_DESCRIPTIONS[pageKey] || META_DESCRIPTIONS.home;
}
