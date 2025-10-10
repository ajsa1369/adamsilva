import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import StructuredData from './StructuredData';
import { generateBreadcrumbSchema, Breadcrumb } from '../../utils/seo';

interface BreadcrumbsNavProps {
  breadcrumbs: Breadcrumb[];
  className?: string;
}

/**
 * SEO-optimized breadcrumb navigation
 * Includes visual breadcrumbs AND structured data for search engines
 */
export default function BreadcrumbsNav({ breadcrumbs, className = '' }: BreadcrumbsNavProps) {
  const schema = generateBreadcrumbSchema(breadcrumbs);
  
  return (
    <>
      <StructuredData data={schema} />
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center space-x-2 text-sm text-gray-400 ${className}`}
      >
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.url} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-white font-medium" aria-current="page">
                {crumb.name}
              </span>
            ) : (
              <Link 
                to={crumb.url.replace('https://www.adamsilvaconsulting.com', '')} 
                className="hover:text-blue-400 transition-colors"
              >
                {crumb.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}