import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook for SEO utilities
 * Handles page view tracking, canonical URLs, etc.
 */
export function useSEO() {
  const location = useLocation();

  // Track page views (can integrate with analytics)
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Track page view in analytics if available
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-7NEYMM8B1R', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return {
    pathname: location.pathname,
    search: location.search,
    canonicalUrl: `https://www.adamsilvaconsulting.com${location.pathname}`
  };
}

/**
 * Hook for generating page-specific structured data
 */
export function useStructuredData() {
  const location = useLocation();

  const getPageType = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname.startsWith('/services')) return 'service';
    if (location.pathname.startsWith('/insights')) return 'article';
    if (location.pathname.startsWith('/about')) return 'about';
    if (location.pathname.startsWith('/contact')) return 'contact';
    return 'page';
  };

  return {
    pageType: getPageType(),
    pathname: location.pathname,
    url: `https://www.adamsilvaconsulting.com${location.pathname}`
  };
}