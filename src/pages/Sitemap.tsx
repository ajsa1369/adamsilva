import React from 'react';
import { Link } from 'react-router-dom';
import { SEOManager } from '../components/structured-data/SEOManager';

export const Sitemap: React.FC = () => {
  return (
    <>
      <SEOManager 
        title="Sitemap - Adam Silva Consulting"
        description="Complete overview of all pages and sections on the Adam Silva Consulting website. Designed for easy navigation and comprehensive access to our AI authority resources."
        canonicalUrl="https://www.adamsilvaconsulting.com/sitemap"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Sitemap</h1>
            <p className="text-xl text-gray-600 mb-12">
              Complete overview of all pages and sections on the Adam Silva Consulting website.
              Designed for easy navigation and comprehensive access to our AI authority resources.
            </p>

            {/* Main Pages */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Main Pages</h2>
              <ul className="space-y-2">
                <li><Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
                <li><Link to="/about" className="text-blue-600 hover:text-blue-800">About</Link></li>
                <li><Link to="/services" className="text-blue-600 hover:text-blue-800">Services Overview</Link></li>
                <li><Link to="/authority-hub" className="text-blue-600 hover:text-blue-800">Authority Hub</Link></li>
                <li><Link to="/contact" className="text-blue-600 hover:text-blue-800">Contact</Link></li>
              </ul>
            </div>

            {/* Core Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Services</h2>
              <ul className="space-y-2">
                <li><Link to="/services/ai-lead-generation" className="text-blue-600 hover:text-blue-800">AI Lead Generation</Link></li>
                <li><Link to="/services/voice-agent-verification" className="text-blue-600 hover:text-blue-800">Voice Agent Verification</Link></li>
                <li><Link to="/services/omnichannel-nurturing" className="text-blue-600 hover:text-blue-800">Omnichannel Nurturing</Link></li>
                <li><Link to="/services/precision-lead-management" className="text-blue-600 hover:text-blue-800">Precision Lead Management</Link></li>
              </ul>
            </div>

            {/* Marketing Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Marketing Services</h2>
              <ul className="space-y-2">
                <li><Link to="/services/seo-ppc-superpowers" className="text-blue-600 hover:text-blue-800">SEO & PPC Superpowers</Link></li>
                <li><Link to="/services/content-media-creation" className="text-blue-600 hover:text-blue-800">Content & Media Creation</Link></li>
                <li><Link to="/services/intelligent-campaigns" className="text-blue-600 hover:text-blue-800">Intelligent Campaigns</Link></li>
                <li><Link to="/services/intent-graph-targeting" className="text-blue-600 hover:text-blue-800">Intent Graph Targeting</Link></li>
              </ul>
            </div>

            {/* Technology Solutions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology Solutions</h2>
              <ul className="space-y-2">
                <li><Link to="/services/ai-websites-landing-pages" className="text-blue-600 hover:text-blue-800">AI Websites & Landing Pages</Link></li>
                <li><Link to="/services/analytics-reporting" className="text-blue-600 hover:text-blue-800">Real-time Analytics</Link></li>
                <li><Link to="/services/security-compliance" className="text-blue-600 hover:text-blue-800">Security & Compliance</Link></li>
                <li><Link to="/services/competitor-monitoring" className="text-blue-600 hover:text-blue-800">Competitor Monitoring</Link></li>
              </ul>
            </div>

            {/* Strategic Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Strategic Services</h2>
              <ul className="space-y-2">
                <li><Link to="/services/omnichannel-communication" className="text-blue-600 hover:text-blue-800">Omnichannel Communication</Link></li>
                <li><Link to="/services/outreach-partnerships" className="text-blue-600 hover:text-blue-800">Outreach & Partnerships</Link></li>
              </ul>
            </div>

            {/* Authority Hub Content */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Authority Hub</h2>
              <ul className="space-y-2">
                <li><Link to="/authority-hub" className="text-blue-600 hover:text-blue-800">Authority Hub Main</Link></li>
                <li><Link to="/guides" className="text-blue-600 hover:text-blue-800">Implementation Guides</Link></li>
                <li><Link to="/guides/ai-engine-optimization-mastery" className="text-blue-600 hover:text-blue-800">AI Engine Optimization Mastery</Link></li>
                <li><Link to="/guides/topical-authority-architecture" className="text-blue-600 hover:text-blue-800">Topical Authority Architecture</Link></li>
                <li><Link to="/guides/technical-framework-excellence" className="text-blue-600 hover:text-blue-800">Technical Framework Excellence</Link></li>
                <li><Link to="/guides/ai-powered-content-operations" className="text-blue-600 hover:text-blue-800">AI-Powered Content Operations</Link></li>
                <li><Link to="/guides/marketing-automation-intelligence" className="text-blue-600 hover:text-blue-800">Marketing Automation Intelligence</Link></li>
                <li><Link to="/guides/csr-trust-engineering" className="text-blue-600 hover:text-blue-800">CSR & Trust Engineering</Link></li>
              </ul>
            </div>

            {/* Content & Research */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Content & Research</h2>
              <ul className="space-y-2">
                <li><Link to="/insights" className="text-blue-600 hover:text-blue-800">Strategic Insights</Link></li>
                <li><Link to="/case-studies" className="text-blue-600 hover:text-blue-800">Case Studies</Link></li>
                <li><Link to="/research" className="text-blue-600 hover:text-blue-800">Research Hub</Link></li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Featured Insights Articles</h3>
              <ul className="space-y-2">
                <li><Link to="/insights/ai-authority-imperative" className="text-blue-600 hover:text-blue-800">The AI Authority Imperative: Why Traditional SEO is Dead</Link></li>
                <li><Link to="/insights/zero-click-searches" className="text-blue-600 hover:text-blue-800">Zero-Click Searches: The New Reality of Information Discovery</Link></li>
                <li><Link to="/insights/eat-generative-ai" className="text-blue-600 hover:text-blue-800">E-E-A-T in the Age of Generative AI</Link></li>
                <li><Link to="/insights/integrated-service-ecosystem" className="text-blue-600 hover:text-blue-800">The Integrated Service Ecosystem</Link></li>
              </ul>
            </div>

            {/* Legal & Policies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal & Policies</h2>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-blue-600 hover:text-blue-800">Terms of Service</Link></li>
                <li><Link to="/sitemap" className="text-blue-600 hover:text-blue-800">Sitemap</Link></li>
              </ul>
            </div>

            {/* XML Sitemaps Section - FIXED */}
            <div className="mb-12 bg-blue-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">XML Sitemaps</h2>
              <p className="text-gray-600 mb-6">
                For search engines and AI crawlers, we maintain strategic XML sitemaps organized by content category:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-2">Main Sitemap</h3>
                  <p className="text-sm text-gray-600 mb-3">Primary site structure</p>
                  <a href="/sitemap.xml" className="text-blue-600 hover:text-blue-800 font-medium" target="_blank" rel="noopener noreferrer">
                    sitemap.xml
                  </a>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-2">Sitemap Index</h3>
                  <p className="text-sm text-gray-600 mb-3">Complete index of all sitemap files</p>
                  <a href="/sitemap-index.xml" className="text-blue-600 hover:text-blue-800 font-medium" target="_blank" rel="noopener noreferrer">
                    sitemap-index.xml
                  </a>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-2">Main Pages</h3>
                  <p className="text-sm text-gray-600 mb-3">Core website pages and navigation</p>
                  <a href="/sitemap-main-pages.xml" className="text-blue-600 hover:text-blue-800 font-medium" target="_blank" rel="noopener noreferrer">
                    sitemap-main-pages.xml
                  </a>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-2">Services</h3>
                  <p className="text-sm text-gray-600 mb-3">All service pages</p>
                  <a href="/sitemap-services.xml" className="text-blue-600 hover:text-blue-800 font-medium" target="_blank" rel="noopener noreferrer">
                    sitemap-services.xml
                  </a>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-2">Content</h3>
                  <p className="text-sm text-gray-600 mb-3">Insights & research</p>
                  <a href="/sitemap-content.xml" className="text-blue-600 hover:text-blue-800 font-medium" target="_blank" rel="noopener noreferrer">
                    sitemap-content.xml
                  </a>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-2">Authority</h3>
                  <p className="text-sm text-gray-600 mb-3">Case studies & authority pages</p>
                  <a href="/sitemap-authority.xml" className="text-blue-600 hover:text-blue-800 font-medium" target="_blank" rel="noopener noreferrer">
                    sitemap-authority.xml
                  </a>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-2">Images</h3>
                  <p className="text-sm text-gray-600 mb-3">All site images and visual content</p>
                  <a href="/sitemap-images.xml" className="text-blue-600 hover:text-blue-800 font-medium" target="_blank" rel="noopener noreferrer">
                    sitemap-images.xml
                  </a>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-2">News</h3>
                  <p className="text-sm text-gray-600 mb-3">Latest news and announcements</p>
                  <a href="/sitemap-news.xml" className="text-blue-600 hover:text-blue-800 font-medium" target="_blank" rel="noopener noreferrer">
                    sitemap-news.xml
                  </a>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Technical Files & SEO Resources</h3>
                <p className="text-gray-600 mb-4">
                  <strong>Robots Control:</strong> <a href="/robots.txt" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">robots.txt</a>
                </p>
                <p className="text-sm text-gray-600">
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