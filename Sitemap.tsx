import React from 'react';
import { Link } from 'react-router-dom';
import { SEOManager } from '../components/structured-data/SEOManager';

export const Sitemap: React.FC = () => {
  return (
    <>
      <SEOManager 
        title="Sitemap | Adam Silva Consulting"
        description="Complete overview of all pages and sections on the Adam Silva Consulting website. Designed for easy navigation and comprehensive access to our AI authority resources."
        canonical="https://www.adamsilvaconsulting.com/sitemap"
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Sitemap</h1>
            <p className="text-lg text-gray-600 mb-8">
              Complete overview of all pages and sections on the Adam Silva Consulting website. 
              Designed for easy navigation and comprehensive access to our AI authority resources.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Main Pages */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Main Pages</h2>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
                  <li><Link to="/about" className="text-blue-600 hover:text-blue-800">About</Link></li>
                  <li><Link to="/contact" className="text-blue-600 hover:text-blue-800">Contact</Link></li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Services</h2>
                <ul className="space-y-2">
                  <li><Link to="/services" className="text-blue-600 hover:text-blue-800">Services Overview</Link></li>
                  <li><Link to="/services/technical-seo-architecture" className="text-blue-600 hover:text-blue-800">Technical SEO Architecture</Link></li>
                  <li><Link to="/services/ai-content-creation" className="text-blue-600 hover:text-blue-800">AI Content Creation</Link></li>
                  <li><Link to="/services/topical-authority-strategy" className="text-blue-600 hover:text-blue-800">Topical Authority Strategy</Link></li>
                  <li><Link to="/services/answer-engine-optimization" className="text-blue-600 hover:text-blue-800">Answer Engine Optimization</Link></li>
                  <li><Link to="/services/generative-engine-optimization" className="text-blue-600 hover:text-blue-800">Generative Engine Optimization</Link></li>
                  <li><Link to="/services/ai-marketing-automation" className="text-blue-600 hover:text-blue-800">AI Marketing Automation</Link></li>
                  <li><Link to="/services/real-time-analytics" className="text-blue-600 hover:text-blue-800">Real-time Analytics</Link></li>
                </ul>
              </div>

              {/* Authority & Content */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Authority & Content</h2>
                <ul className="space-y-2">
                  <li><Link to="/authority-hub" className="text-blue-600 hover:text-blue-800">Authority Hub</Link></li>
                  <li><Link to="/insights" className="text-blue-600 hover:text-blue-800">Industry Insights</Link></li>
                  <li><Link to="/case-studies" className="text-blue-600 hover:text-blue-800">Case Studies</Link></li>
                  <li><Link to="/research" className="text-blue-600 hover:text-blue-800">Research Hub</Link></li>
                </ul>
              </div>

              {/* AI Solutions */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">AI Solutions</h2>
                <ul className="space-y-2">
                  <li><Link to="/csr-initiatives" className="text-blue-600 hover:text-blue-800">AI Customer Service Representatives</Link></li>
                </ul>
              </div>

              {/* Legal & Policies */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Legal & Policies</h2>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-blue-600 hover:text-blue-800">Terms of Service</Link></li>
                  <li><Link to="/sitemap" className="text-blue-600 hover:text-blue-800">Sitemap</Link></li>
                </ul>
              </div>
            </div>

            {/* XML Sitemaps Section */}
            <div className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">XML Sitemaps</h2>
              <p className="text-gray-600 mb-6">
                For search engines and AI crawlers, we maintain strategic XML sitemaps organized by content category:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Main Sitemap</h3>
                  <p className="text-gray-600 mb-3">Primary site structure and sitemap index</p>
                  <a 
                    href="https://www.adamsilvaconsulting.com/sitemap.xml" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    sitemap.xml
                  </a>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Services</h3>
                  <p className="text-gray-600 mb-3">All service pages and offerings</p>
                  <a 
                    href="https://www.adamsilvaconsulting.com/sitemap-services.xml" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    sitemap-services.xml
                  </a>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Content</h3>
                  <p className="text-gray-600 mb-3">Insights, articles & research content</p>
                  <a 
                    href="https://www.adamsilvaconsulting.com/sitemap-content.xml" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    sitemap-content.xml
                  </a>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Authority</h3>
                  <p className="text-gray-600 mb-3">Case studies & authority pages</p>
                  <a 
                    href="https://www.adamsilvaconsulting.com/sitemap-authority.xml" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    sitemap-authority.xml
                  </a>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Images</h3>
                  <p className="text-gray-600 mb-3">All site images and visual content</p>
                  <a 
                    href="https://www.adamsilvaconsulting.com/sitemap-images.xml" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    sitemap-images.xml
                  </a>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">News</h3>
                  <p className="text-gray-600 mb-3">Latest news and announcements</p>
                  <a 
                    href="https://www.adamsilvaconsulting.com/sitemap-news.xml" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    sitemap-news.xml
                  </a>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Additional Technical Files</h4>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://www.adamsilvaconsulting.com/robots.txt" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    robots.txt
                  </a>
                  <span className="text-gray-400">|</span>
                  <a 
                    href="https://www.adamsilvaconsulting.com/sitemap-index.xml" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    sitemap-index.xml
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};