import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAuthorityOpen, setIsAuthorityOpen] = useState(false);
  const location = useLocation();

  // FORCE BUNDLE CHANGE - This console.log will appear in production bundle
  console.log('Header loaded - Build timestamp: 1761009867');

  const services = [
    { name: 'Omnichannel Communication', path: '/services/omnichannel-communication' },
    { name: 'AI Website & Landing Pages', path: '/services/website-landing-pages' },
    { name: 'Campaign Management', path: '/services/campaign-management' },
    { name: 'SEO & PPC Superpowers', path: '/services/seo-ppc' },
    { name: 'Content & Media Creation', path: '/services/content-creation' },
    { name: 'Lead Management & Targeting', path: '/services/lead-management' },
    { name: 'Outreach & Partnerships', path: '/services/outreach-partnerships' },
    { name: 'Security & Compliance', path: '/services/security-compliance' },
    { name: 'Analytics & Reporting', path: '/services/analytics-reporting' },
    { name: 'Intent Graph Targeting', path: '/services/intent-targeting' },
    { name: 'Competitor Monitoring', path: '/services/competitor-monitoring' }
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg group-hover:from-blue-700 group-hover:to-teal-700 transition-all duration-200">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">Adam Silva</span>
              <span className="text-sm text-gray-600 block -mt-1">Consulting</span>
            </div>
          </Link>

          {/* Desktop Navigation - EXPLICIT AND SIMPLE */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className={`font-medium transition-colors ${isActive('/') && location.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <button className="flex items-center space-x-1 font-medium text-gray-700 hover:text-blue-600 transition-colors">
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  {services.map((service) => (
                    <Link key={service.path} to={service.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" className={`font-medium transition-colors ${isActive('/about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              About
            </Link>
            
            {/* Authority Hub Dropdown WITH INSIGHTS */}
            <div className="relative" onMouseEnter={() => setIsAuthorityOpen(true)} onMouseLeave={() => setIsAuthorityOpen(false)}>
              <button className={`flex items-center space-x-1 font-medium transition-colors ${isActive('/authority-hub') || isActive('/insights') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                <span>Authority Hub</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isAuthorityOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAuthorityOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <Link to="/authority-hub" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                    Authority Hub Home
                  </Link>
                  <Link to="/insights" className="block px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors">
                    📚 Insights & Articles
                  </Link>
                </div>
              )}
            </div>

            {/* INSIGHTS AS STANDALONE LINK - HIGHLY VISIBLE */}
            <Link to="/insights" className={`font-medium transition-colors ${isActive('/insights') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              📚 Insights
            </Link>

            <Link to="/contact" className={`font-medium transition-colors ${isActive('/contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              Contact
            </Link>

            <Link to="/contact" className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="space-y-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              
              <div className="px-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Services</p>
                <div className="space-y-1">
                  {services.map((service) => (
                    <Link key={service.path} to={service.path} onClick={() => setIsMenuOpen(false)} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">
                About
              </Link>

              <div className="px-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Authority Hub</p>
                <div className="space-y-1">
                  <Link to="/authority-hub" onClick={() => setIsMenuOpen(false)} className="block py-1.5 text-sm text-gray-600 hover:text-blue-600">
                    Authority Hub Home
                  </Link>
                  <Link to="/insights" onClick={() => setIsMenuOpen(false)} className="block py-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700">
                    📚 Insights & Articles
                  </Link>
                </div>
              </div>

              {/* INSIGHTS STANDALONE IN MOBILE TOO */}
              <Link to="/insights" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold">
                📚 Insights & Articles
              </Link>

              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </Link>
              
              <div className="px-4 pt-2">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:from-blue-700 hover:to-teal-700 transition-all">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};