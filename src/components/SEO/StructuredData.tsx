import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  data: any | any[];
}

/**
 * Component for adding structured data (JSON-LD) to pages
 * Critical for SEO, AEO, and GEO optimization
 */
export default function StructuredData({ data }: StructuredDataProps) {
  // Handle both single objects and arrays of structured data
  const schemas = Array.isArray(data) ? data : [data];
  
  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}