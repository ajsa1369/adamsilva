import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Zap, 
  Target, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle,
  Search,
  AlertTriangle,
  BarChart3
} from 'lucide-react';

export const CompetitorMonitoringPage: React.FC = () => {
  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Proactive Market Response",
      description: "Make informed decisions and react swiftly to competitive moves, anticipating industry trends before they become mainstream"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Strategic Interception", 
      description: "Detect high-intent users engaging with competitors, enabling precise targeting with ads or personalized outreach"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Product & Pricing Optimization",
      description: "Identify gaps in offerings, guide pricing adjustments, and discover how competitors improve conversion rates"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Enhanced SEO & PPC Strategy",
      description: "Uncover competitor keywords, content strategies, and ad tactics for outperforming rivals in search and advertising"
    }
  ];

  const features = [
    "Real-time competitor website and domain visit tracking",
    "AI-powered keyword gap analysis and search strategy monitoring", 
    "Automated competitor ad campaign and content change detection",
    "High-intent user identification and strategic interception capabilities",
    "Comprehensive competitor intelligence reporting and battle cards",
    "Predictive market trend analysis and competitive positioning insights"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-xl w-fit mx-auto mb-6">
              <Eye className="h-12 w-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Competitor Domain & Keyword Monitoring
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Know when your ideal customer browses your competitor's site and intercept high-intent users by detecting 
              when they visit competitor domains or use targeted search terms.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Monitor Competitors Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Definition */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Gaining Proactive Competitive Intelligence</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              Competitor monitoring involves continuously tracking, analyzing, and evaluating the actions, strategies, and 
              performance of market rivals to gain strategic advantages and identify opportunities for business growth. 
              Traditional competitive analysis is often retrospective, providing insights into past performance rather than 
              real-time opportunities that can be immediately acted upon.
            </p>
            <p className="mb-6">
              Adam Silva Consulting's Competitor Domain & Keyword Monitoring service transforms this approach by deploying 
              AI-powered tracking agents that continuously monitor competitors' marketing activity in real-time, providing 
              immediate notifications on their email campaigns, advertising efforts, website edits, and SMS messages. Our 
              sophisticated platform offers a comprehensive "bird's eye view" of competitor activity across key channels.
            </p>
            <p>
              Beyond passive monitoring, our system enables strategic interception by detecting when high-intent users are 
              actively engaging with competitors—visiting their pricing pages or searching for their brand—allowing clients 
              to strategically target these users with highly relevant ads or personalized outreach. This transforms competitive 
              intelligence from reactive analysis into proactive market advantage.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-Powered Competitive Intelligence System</h2>
            <p className="text-lg text-gray-600">
              Our advanced AI mechanisms continuously monitor competitor activities, analyze market trends, and identify 
              strategic opportunities for immediate competitive advantage and market leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Advanced AI Monitoring Features</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Strategic Interception</h4>
                <p className="text-gray-700 text-sm">
                  Our <a href="https://www.panoramata.co/benchmark-marketing/competitor-monitoring-tools" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  competitor monitoring platform</a> provides real-time insights and AI-generated summaries, 
                  while <a href="https://www.aimtechnologies.co/2025/03/04/monitoring-competitors-the-ultimate-guide/" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">comprehensive competitive intelligence</a> 
                  helps predict industry trends and optimize strategic positioning.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-6 flex items-center justify-center">
                <AlertTriangle className="h-20 w-20 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3">AI Competitive Intelligence Hub</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comprehensive monitoring dashboard displaying AI tracking competitor website changes, ad campaigns, 
                keyword strategies, and customer engagement patterns in real-time, with automated alerts and 
                strategic recommendations for immediate competitive response and market advantage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Competitive Advantage Through Intelligence</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your competitive strategy with AI-powered monitoring that delivers real-time insights, strategic 
              interception capabilities, and proactive market intelligence for sustained business leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-3 rounded-lg w-fit mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-50 to-teal-50 p-8 rounded-xl border border-blue-200">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Data-Driven Business Strategy Optimization</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Beyond just ad targeting, AI-powered competitor monitoring provides granular insights into every facet of 
                competitor strategy—from content themes and website changes to ad messaging and pricing models. This deep 
                competitive intelligence allows clients to identify critical product gaps, refine value propositions, and 
                optimize pricing strategies for market competitiveness.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The result is a continuous cycle of improvement across the entire business, not just marketing, fostering 
                sustained competitive advantage and market leadership. By generating more effective content that directly 
                addresses customer needs not adequately met by rivals, businesses can capture market share and establish 
                themselves as industry leaders through strategic intelligence and proactive adaptation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Intelligence Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Competitive Intelligence</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Monitor every aspect of competitor strategy with AI-powered insights that reveal opportunities 
              and enable strategic interception of high-value prospects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Keyword Gap Analysis</h3>
              <p className="text-gray-600 text-sm mb-3">Uncover untapped market opportunities and optimize organic search visibility</p>
              <p className="text-xs text-gray-500">NLP analysis, AI trend detection, content gap identification</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-teal-100 p-3 rounded-lg w-fit mb-4">
                <Target className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ad Strategy Intelligence</h3>
              <p className="text-gray-600 text-sm mb-3">Optimize ad spend and refine campaigns based on competitor tactics</p>
              <p className="text-xs text-gray-500">Real-time tracking, automated summaries, campaign analysis</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4">
                <Eye className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Website Change Monitoring</h3>
              <p className="text-gray-600 text-sm mb-3">Adapt content strategy and identify product innovations quickly</p>
              <p className="text-xs text-gray-500">Automated monitoring, content analysis, AI alerts</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">High-Intent User Interception</h3>
              <p className="text-gray-600 text-sm mb-3">Convert pre-qualified leads and reduce customer acquisition costs</p>
              <p className="text-xs text-gray-500">IP tracking, behavioral analytics, custom audience creation</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Trend Prediction</h3>
              <p className="text-gray-600 text-sm mb-3">Anticipate market shifts and maintain competitive leadership</p>
              <p className="text-xs text-gray-500">AI data aggregation, predictive analytics, sentiment analysis</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-red-100 p-3 rounded-lg w-fit mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitive Battle Cards</h3>
              <p className="text-gray-600 text-sm mb-3">Equip sales teams with crucial competitive positioning insights</p>
              <p className="text-xs text-gray-500">Automated generation, real-time updates, strategic positioning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Elements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Competitive Intelligence Visualized</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                <Search className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-Time Competitor Tracking</h3>
              <p className="text-sm text-gray-600">
                Advanced monitoring interface displaying AI tracking competitor website changes, ad campaigns, 
                keyword rankings, and content updates in real-time with automated alerts and strategic 
                recommendations for immediate competitive response and market positioning.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Target className="h-16 w-16 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Strategic Interception Dashboard</h3>
              <p className="text-sm text-gray-600">
                Sophisticated interface showing AI identifying high-intent users visiting competitor websites, 
                with automated audience creation for targeted advertising, personalized outreach recommendations, 
                and conversion optimization strategies for maximum customer acquisition effectiveness.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Market Intelligence Analytics</h3>
              <p className="text-sm text-gray-600">
                Comprehensive analytics platform displaying competitive landscape analysis, market trend predictions, 
                keyword gap opportunities, and strategic positioning insights with AI-generated recommendations 
                for maintaining competitive advantage and market leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Dominate Your Competition?
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Transform your competitive strategy with AI-powered monitoring that delivers real-time intelligence, strategic 
            interception capabilities, and proactive market insights. Stay ahead of the competition with intelligent automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Start Monitoring Today
            </Link>
            <Link 
              to="/"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};