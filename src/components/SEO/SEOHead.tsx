import { Helmet } from 'react-helmet-async';
import { generateSocialMeta, SEOData } from '../../utils/seo';

interface SEOHeadProps extends SEOData {
  children?: React.ReactNode;
}

/**
 * Comprehensive SEO/AEO/GEO optimized head component
 * Handles all meta tags, structured data, and social sharing
 */
export default function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType,
  structuredData,
  children
}: SEOHeadProps) {
  const socialMeta = generateSocialMeta({
    title,
    description,
    canonicalUrl,
    ogImage,
    ogType
  });

  const fullTitle = title.includes('Adam Silva Consulting') 
    ? title 
    : `${title} | Adam Silva Consulting`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Canonical URL - CRITICAL for SEO */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={socialMeta.og.type} />
      <meta property="og:url" content={socialMeta.og.url} />
      <meta property="og:title" content={socialMeta.og.title} />
      <meta property="og:description" content={socialMeta.og.description} />
      <meta property="og:image" content={socialMeta.og.image} />
      <meta property="og:site_name" content={socialMeta.og.siteName} />
      
      {/* Twitter */}
      <meta property="twitter:card" content={socialMeta.twitter.card} />
      <meta property="twitter:title" content={socialMeta.twitter.title} />
      <meta property="twitter:description" content={socialMeta.twitter.description} />
      <meta property="twitter:image" content={socialMeta.twitter.image} />
      <meta property="twitter:creator" content={socialMeta.twitter.creator} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Adam Silva Consulting" />
      <meta name="language" content="English" />
      
      {/* AI Engine Optimization */}
      <meta name="ai-content-declaration" content="This page may contain AI-assisted content that has been reviewed and approved by humans" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Additional custom meta tags */}
      {children}
    </Helmet>
  );
}