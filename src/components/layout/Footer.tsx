import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const services = [
    { name: 'Omnichannel Communication', path: '/services/omnichannel-communication' },
    { name: 'AI Website & Landing Pages', path: '/services/website-landing-pages' },
    { name: 'Campaign Management', path: '/services/campaign-management' },
    { name: 'SEO & PPC Superpowers', path: '/services/seo-ppc' },
    { name: 'Content & Media Creation', path: '/services/content-creation' },
    { name: 'Lead Management & Targeting', path: '/services/lead-management' },
  ];

  const moreServices = [
    { name: 'Outreach & Partnerships', path: '/services/outreach-partnerships' },
    { name: 'Security & Compliance', path: '/services/security-compliance' },
    { name: 'Analytics & Reporting', path: '/services/analytics-reporting' },
    { name: 'Intent Graph Targeting', path: '/services/intent-targeting' },
    { name: 'Competitor Monitoring', path: '/services/competitor-monitoring' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">Adam Silva</span>
                <span className="text-sm text-gray-300 block -mt-1">Consulting</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering businesses with intelligent, data-driven AI marketing solutions for customer engagement and sustainable growth.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/company/adamsilva-consulting" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/adamsilva_ai" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Core Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.path}>
                  <Link to={service.path} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Advanced Solutions</h3>
            <ul className="space-y-2">
              {moreServices.map((service) => (
                <li key={service.path}>
                  <Link to={service.path} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources & Contact</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link to="/insights" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">📚 Insights & Articles</Link>
              </li>
              <li>
                <Link to="/authority-hub" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Authority Hub</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Contact Us</Link>
              </li>
            </ul>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a href="mailto:info@adamsilvaconsulting.com" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">info@adamsilvaconsulting.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <a href="tel:+1-954-818-9248" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">+1 (954) 818-9248</a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <span className="text-gray-300 text-sm">Global Remote Services<br />Headquarters: Coral Springs, FL</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Adam Silva Consulting. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 lg:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};