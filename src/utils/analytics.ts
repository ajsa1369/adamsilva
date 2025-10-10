/**
 * Analytics Tracking Utilities
 * Centralized analytics functions for SEO/AEO/GEO tracking
 */

/**
 * Track custom events in Google Analytics
 */
export const trackEvent = (
  eventName: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

/**
 * Track page views
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('config', 'G-7NEYMM8B1R', {
      page_path: url,
      page_title: title
    });
  }
};

/**
 * Track conversions
 */
export const trackConversion = (conversionName: string, value?: number) => {
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'conversion', {
      send_to: 'G-7NEYMM8B1R/' + conversionName,
      value: value
    });
  }
};

/**
 * Track AI engine referrals (AEO tracking)
 */
export const trackAIReferral = (engine: string) => {
  trackEvent('ai_engine_referral', 'AEO', engine, 1);
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submit', 'Contact', formName, 1);
};

/**
 * Track CTA clicks
 */
export const trackCTAClick = (ctaName: string) => {
  trackEvent('cta_click', 'Engagement', ctaName, 1);
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, label: string) => {
  trackEvent('click', 'Outbound Link', label, undefined);
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', 'Engagement', `${percentage}%`, percentage);
};

/**
 * Track file downloads
 */
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('download', 'Downloads', `${fileName} (${fileType})`, 1);
};

/**
 * Track video plays
 */
export const trackVideo = (videoName: string, action: 'play' | 'pause' | 'complete') => {
  trackEvent(`video_${action}`, 'Video', videoName, 1);
};

/**
 * Track search queries (internal site search)
 */
export const trackSearch = (query: string, results: number) => {
  trackEvent('search', 'Site Search', query, results);
};

/**
 * Detect and track AI engine referrals automatically
 */
export const detectAIReferral = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  const referrer = document.referrer.toLowerCase();
  
  const aiEngines = [
    { name: 'ChatGPT', domains: ['chat.openai.com', 'chatgpt.com'] },
    { name: 'Claude', domains: ['claude.ai'] },
    { name: 'Perplexity', domains: ['perplexity.ai', 'www.perplexity.ai'] },
    { name: 'Google AI', domains: ['gemini.google.com', 'bard.google.com'] },
    { name: 'Bing AI', domains: ['bing.com/chat', 'copilot.microsoft.com'] },
    { name: 'Grok', domains: ['x.com/i/grok'] },
    { name: 'You.com', domains: ['you.com'] }
  ];
  
  const aiEngine = aiEngines.find(engine => 
    engine.domains.some(domain => referrer.includes(domain))
  );
  
  if (aiEngine) {
    trackAIReferral(aiEngine.name);
  }
};