import React from 'react';

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  provider?: {
    name: string;
    url: string;
  };
  offers?: {
    name: string;
    description: string;
    category?: string;
  }[];
  areaServed?: string;
}

export const ServiceSchema: React.FC<ServiceSchemaProps> = ({
  name,
  description,
  url,
  image = "https://www.adamsilvaconsulting.com/images/social/og-image.jpg",
  provider = {
    name: "Adam Silva Consulting",
    url: "https://www.adamsilvaconsulting.com"
  },
  offers = [],
  areaServed = "Worldwide"
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": `https://www.adamsilvaconsulting.com${url}`,
    "image": image,
    "provider": {
      "@type": "Organization",
      "@id": "https://www.adamsilvaconsulting.com/#organization",
      "name": provider.name,
      "url": provider.url
    },
    "areaServed": {
      "@type": "Place",
      "name": areaServed
    },
    "serviceType": "Digital Marketing Consulting",
    "category": "AI-Powered Marketing Intelligence",
    "hasOfferCatalog": offers.length > 0 ? {
      "@type": "OfferCatalog",
      "name": `${name} Offerings`,
      "itemListElement": offers.map((offer, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": offer.name,
          "description": offer.description,
          "category": offer.category || "Marketing Service"
        }
      }))
    } : undefined
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ServiceSchema;