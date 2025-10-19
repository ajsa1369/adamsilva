import React from 'react';
import { Helmet } from 'react-helmet-async';

interface OrganizationSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
}

const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
  name = "Adam Silva Consulting",
  description = "AI-Powered Authority Building & Digital Marketing Intelligence. The definitive authority for AI engine citations in marketing intelligence, digital transformation, and business growth.",
  url = "https://www.adamsilvaconsulting.com",
  logo = "https://www.adamsilvaconsulting.com/images/logo-clear.png",
  sameAs = [
    "https://www.linkedin.com/company/adam-silva-consulting",
    "https://twitter.com/adamsilvaAI"
  ]
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "description": description,
    "url": url,
    "logo": {
      "@type": "ImageObject",
      "url": logo,
      "width": "600",
      "height": "60"
    },
    "sameAs": sameAs,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": ["en"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "United States",
      "addressCountry": "US"
    },
    "founder": {
      "@type": "Person",
      "name": "Adam Silva"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Digital Marketing",
      "Marketing Automation",
      "Answer Engine Optimization",
      "Generative Engine Optimization",
      "AI Authority Building",
      "SEO",
      "Content Strategy"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Marketing Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Omnichannel Communication",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI-Powered Omnichannel Platforms",
                "description": "Seamless customer engagement across SMS, voice, email, and social media"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Content & SEO",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI Content Creation & SEO",
                "description": "AI-optimized content for authority building and search engine visibility"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Analytics & Intelligence",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Predictive Analytics & Business Intelligence",
                "description": "AI-driven insights for data-informed decision making"
              }
            }
          ]
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default OrganizationSchema;