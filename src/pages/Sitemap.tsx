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
                  <li><Link to="/services" className="text-blue-600 hover:text-blue-800">Services Overview</Link></li>
                  <li><Link to="/authority-hub" className="text-blue-600 hover:text-blue-800">Authority Hub</Link></li>
                  <li><Link to="/contact" className="text-blue-600 hover:text-blue-800">Contact</Link></li>
                </ul>
              </div>

              {/* Core Services */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Core Services</h2>
                <ul className="space-y-2">
                  <li><Link to="/services/ai-lead-generation" className="text-blue-600 hover:text-blue-800">AI Lead Generation</Link></li>
                  <li><Link to="/services/voice-agent-verification" className="text-blue-600 hover:text-blue-800">Voice Agent Verification</Link></li>
                  <li><Link to="/services/omnichannel-nurturing" className="text-blue-600 hover:text-blue-800">Omnichannel Nurturing</Link></li>
                  <li><Link to="/services/precision-lead-management" className="text-blue-600 hover:text-blue-800">Precision Lead Management</Link></li>
                </ul>
              </div>

              {/* Marketing Services */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Marketing Services</h2>
                <ul className="space-y-2">
                  <li><Link to="/services/seo-ppc-superpowers" className="text-blue-600 hover:text-blue-800">SEO & PPC Superpowers</Link></li>
                  <li><Link to="/services/content-media-creation" className="text-blue-600 hover:text-blue-800">Content & Media Creation</Link></li>
                  <li><Link to="/services/intelligent-campaigns" className="text-blue-600 hover:text-blue-800">Intelligent Campaigns</Link></li>
                  <li><Link to="/services/intent-graph-targeting" className="text-blue-600 hover:text-blue-800">Intent Graph Targeting</Link></li>
                </ul>
              </div>

              {/* Technology Solutions */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology Solutions</h2>
                <ul className="space-y-2">
                  <li><Link to="/services/ai-websites-landing-pages" className="text-blue-600 hover:text-blue-800">AI Websites & Landing Pages</Link></li>
                  <li><Link to="/services/analytics-reporting" className="text-blue-600 hover:text-blue-800">Real-time Analytics</Link></li>
                  <li><Link to="/services/security-compliance" className="text-blue-600 hover:text-blue-800">Security & Compliance</Link></li>
                  <li><Link to="/services/competitor-monitoring" className="text-blue-600 hover:text-blue-800">Competitor Monitoring</Link></li>
                </ul>
              </div>

              {/* Strategic Services */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Strategic Services</h2>
                <ul className="space-y-2">
                  <li><Link to="/services/omnichannel-communication" className="text-blue-600 hover:text-blue-800">Omnichannel Communication</Link></li>
                  <li><Link to="/services/outreach-partnerships" className="text-blue-600 hover:text-blue-800">Outreach & Partnerships</Link></li>
                </ul>
              </div>

              {/* Authority Hub Content */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Authority Hub</h2>
                <ul className="space-y-2">
                  <li><Link to="/authority-hub" className="text-blue-600 hover:text-blue-800">Authority Hub Main</Link></li>
                  <li><Link to="/authority-hub/guides" className="text-blue-600 hover:text-blue-800">Implementation Guides</Link></li>
                  <li><Link to="/authority-hub/ai-engine-optimization-mastery" className="text-blue-600 hover:text-blue-800">AI Engine Optimization Mastery</Link></li>
                  <li><Link to="/authority-hub/topical-authority-architecture" className="text-blue-600 hover:text-blue-800">Topical Authority Architecture</Link></li>
                  <li><Link to="/authority-hub/technical-framework-excellence" className="text-blue-600 hover:text-blue-800">Technical Framework Excellence</Link></li>
                  <li><Link to="/authority-hub/ai-powered-content-operations" className="text-blue-600 hover:text-blue-800">AI-Powered Content Operations</Link></li>
                  <li><Link to="/authority-hub/marketing-automation-intelligence" className="text-blue-600 hover:text-blue-800">Marketing Automation Intelligence</Link></li>
                  <li><Link to="/authority-hub/csr--trust-engineering" className="text-blue-600 hover:text-blue-800">CSR & Trust Engineering</Link></li>
                </ul>
              </div>

              {/* Content & Research */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Content & Research</h2>
                <ul className="space-y-2">
                  <li><Link to="/insights" className="text-blue-600 hover:text-blue-800">Strategic Insights</Link></li>
                  <li><Link to="/case-studies" className="text-blue-600 hover:text-blue-800">Case Studies</Link></li>
                  <li><Link to="/research" className="text-blue-600 hover:text-blue-800">Research Hub</Link></li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Featured Insights Articles</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/insights/the-ai-authority-imperative-why-traditional-seo-is-dead" className="text-blue-600 hover:text-blue-800">The AI Authority Imperative: Why Traditional SEO is Dead</Link></li>
                  <li><Link to="/insights/zero-click-searches-the-new-reality-of-information-discovery" className="text-blue-600 hover:text-blue-800">Zero-Click Searches: The New Reality of Information Discovery</Link></li>
                  <li><Link to="/insights/e-e-a-t-in-the-age-of-generative-ai-building-unshakeable-authority" className="text-blue-600 hover:text-blue-800">E-E-A-T in the Age of Generative AI</Link></li>
                  <li><Link to="/insights/the-integrated-service-ecosystem-how-ai-services-compound-authority" className="text-blue-600 hover:text-blue-800">The Integrated Service Ecosystem</Link></li>
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
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Sitemap Index</h3>
                  <p className="text-gray-600 mb-3">Complete index of all sitemap files</p>
                  <a 
                    href="https://www.adamsilvaconsulting.com/sitemap-index.xml" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    sitemap-index.xml
                  </a>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Main Pages</h3>
                  <p className="text-gray-600 mb-3">Core website pages and navigation</p>
                  <a 
                    href="https://www.adamsilvaconsulting.com/sitemap-main-pages.xml" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    sitemap-main-pages.xml
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

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">Technical Files & SEO Resources</h4>
                <div className="flex flex-wrap gap-6">
                  <div>
                    <span className="text-blue-900 font-medium">Robots Control:</span>
                    <a 
                      href="https://www.adamsilvaconsulting.com/robots.txt" 
                      className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      robots.txt
                    </a>
                  </div>
                </div>
                <p className="text-blue-700 text-sm mt-3">
                  All sitemaps are optimized for Search Engine Optimization (SEO), Answer Engine Optimization (AEO), 
                  and Generative Engine Optimization (GEO) to ensure maximum visibility across Google, Gemini, ChatGPT, Claude, and Grok.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};