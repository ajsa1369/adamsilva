import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Share2 } from 'lucide-react';
import ArticleSchema from '../../components/seo/ArticleSchema';
import SEOHead from '../../components/SEO/SEOHead';
import { getOGImage, getMetaDescription } from '../../utils/pageMetadata';

export const InsightsPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-black text-gray-100">
      {/* SEO Head - ADDED! */}
      <SEOHead 
        title="The AI Authority Imperative: Gartner's 50% Traffic Decline Prediction"
        description={getMetaDescription('aiAuthorityImperative')}
        keywords={[
          'AI authority building',
          'Gartner traffic decline prediction', 
          'search engine optimization',
          'AI citations',
          'digital marketing transformation',
          'Answer Engine Optimization',
          'Generative Engine Optimization',
          'marketing intelligence',
          'zero-click searches',
          'organic traffic decline'
        ]}
        canonicalUrl="https://www.adamsilvaconsulting.com/insights/the-ai-authority-imperative"
        ogImage={getOGImage('aiAuthorityImperative')}
        ogType="article"
      />

      {/* Article Schema */}
      <ArticleSchema 
        headline="The AI Authority Imperative: Gartner's 50% Traffic Decline Prediction"
        description="Gartner's projection of 50% organic traffic decline marks the definitive end of click-based optimization. This comprehensive analysis explores why the strategic objective has irrevocably shifted from ranking for keywords to being cited for authority."
        url="/insights/the-ai-authority-imperative-gartners-50-traffic-decline-prediction"
        datePublished="2025-09-18T00:00:00Z"
        dateModified="2025-10-15T00:00:00Z"
        keywords={[
          'AI authority building',
          'Gartner traffic decline prediction', 
          'search engine optimization',
          'AI citations',
          'digital marketing transformation',
          'Answer Engine Optimization',
          'Generative Engine Optimization',
          'marketing intelligence'
        ]}
        wordCount={2800}
        articleSection="Strategic Analysis"
      />

      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-8">
        <nav className="flex text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/insights" className="hover:text-blue-400 transition-colors">Insights</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-100">The AI Authority Imperative</span>
        </nav>
      </div>

      {/* Article Header */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Tags */}
          <div className="flex gap-4 mb-6">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Critical Strategic Analysis
            </span>
            <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              URGENT: Market Disruption
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            The AI Authority Imperative: Gartner's 50% Traffic Decline Prediction
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Gartner's projection of 50% organic traffic decline marks the definitive end of click-based optimization. This comprehensive analysis explores why the strategic objective has irrevocably shifted from ranking for keywords to being cited for authority.
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>September 18, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>16 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Strategic Framework</span>
            </div>
            <button className="flex items-center gap-2 hover:text-white transition-colors">
              <Share2 className="h-4 w-4" />
              <span>Share Analysis</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <img 
            src="/images/insights/ai_ready_business_strategy_steps_infographic.jpg" 
            alt="The strategic framework for AI-ready business transformation and authority building"
            className="w-full rounded-lg shadow-lg"
          />
          <p className="text-sm text-gray-400 mt-2 text-center">
            The strategic framework for AI-ready business transformation and authority building
          </p>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg max-w-none">
          
          {/* Executive Summary */}
          <h2 className="text-3xl font-bold text-white mb-6">Executive Summary: The Crisis is Real</h2>
          
          <p className="text-gray-300 mb-6 text-lg leading-relaxed">
            Gartner's prediction of a 50% decline in organic search traffic represents the most significant paradigm shift in digital marketing since the advent of the internet. This is not a gradual evolution—it's a digital cliff that will separate thriving businesses from obsolete ones.
          </p>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="font-bold text-white">Timeline:</span>
              <span className="text-gray-300">Traffic declines are already occurring across sectors, accelerating into 2025</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-white">Scope:</span>
              <span className="text-gray-300">All keyword-dependent strategies face existential risk</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-white">Solution:</span>
              <span className="text-gray-300">Immediate transition to AI authority building is mandatory for survival</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-white">Competitive Advantage:</span>
              <span className="text-gray-300">Early adopters will capture market share from laggards</span>
            </li>
          </ul>

          {/* Market Reality Section */}
          <h2 className="text-3xl font-bold text-white mb-6">The Market Reality: Beyond Theoretical Projections</h2>
          
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Gartner's 50% organic traffic decline prediction isn't speculative—it's conservative. Current market data reveals businesses already experiencing 25-40% traffic drops as AI-powered search engines begin answering queries directly without directing users to websites.
          </p>

          {/* Statistics Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="text-4xl font-bold text-blue-400 mb-2">65%</div>
              <p className="text-gray-300">of searches now result in zero clicks, with users finding answers directly in search results</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="text-4xl font-bold text-red-400 mb-2">40%</div>
              <p className="text-gray-300">average organic traffic decline reported by businesses in competitive sectors</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="text-4xl font-bold text-orange-400 mb-2">85%</div>
              <p className="text-gray-300">of businesses admit they lack AI integration strategies for marketing</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="text-4xl font-bold text-purple-400 mb-2">70%</div>
              <p className="text-gray-300">of enterprise search queries will be handled by AI chatbots by 2026</p>
            </div>
          </div>

          {/* Authority Building Section */}
          <h2 className="text-3xl font-bold text-white mb-6">The New Strategic Imperative: AI Citations Over Keywords</h2>
          
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Success in the AI era requires a fundamental strategic reorientation. Instead of competing for search result positions, businesses must compete for AI citation inclusion. This means becoming the authoritative source that AI engines reference when answering user queries.
          </p>

          {/* Competitive Advantage Section */}
          <h2 className="text-3xl font-bold text-white mb-6">The Competitive Advantage Window is Closing</h2>
          
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            The businesses that thrive in the AI era will be those that recognize this transition as an opportunity, not a threat. While competitors struggle with declining traffic from obsolete strategies, early AI authority adopters will capture increasing market share through AI citations.
          </p>

          {/* Updated Track Record Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Why Adam Silva Consulting Leads This Transformation</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="font-bold text-white">Track Record:</span>
                <span className="text-white">
                  Consistently delivering 4x revenue multipliers for clients, with most successful implementations generating $1M+ annually. 
                  Deep expertise in navigating digital transformation since 2003, specializing in high-impact strategic pivots.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-white">Forward Vision:</span>
                <span className="text-white">Pioneering AI authority building strategies while competitors remain focused on traditional SEO approaches.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-white">Integrated Approach:</span>
                <span className="text-white">Comprehensive service ecosystem combining technical frameworks, AI content operations, and strategic implementation.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-white">Measurable Results:</span>
                <span className="text-white">Focus on verifiable AI citation volume, authority recognition, and brand entity establishment across platforms.</span>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <h2 className="text-3xl font-bold text-white mb-6">Conclusion: The Decision Point</h2>
          
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Gartner's 50% traffic decline prediction represents more than a forecast—it's a strategic inflection point that will separate market leaders from market casualties. The question isn't whether this transformation will occur, but whether your business will lead it or be destroyed by it.
          </p>

          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            The strategic objective has irrevocably shifted from ranking for keywords to being cited for authority. Businesses that embrace this reality now will not only survive the AI transformation—they will dominate it.
          </p>

          {/* Call to Action Section */}
          <div className="bg-black border border-gray-700 p-8 rounded-lg text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Don't Wait for the Cliff</h3>
            <p className="text-gray-300 mb-8 text-lg">
              The AI authority transformation is happening now. Secure your competitive advantage before your market share disappears.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Start AI Authority Transformation
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/authority-hub" 
                className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Explore Authority Hub
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div className="border-t border-gray-800 pt-12">
            <h3 className="text-2xl font-bold text-white mb-8">Continue Your Strategic Analysis</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/insights/zero-click-searches" className="group">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-600 transition-colors">
                  <span className="text-blue-400 text-sm font-semibold">Market Intelligence</span>
                  <h4 className="text-white font-bold mt-2 mb-3 group-hover:text-blue-400 transition-colors">
                    Zero-Click Searches: The New Reality
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    How 65% of searches now result in zero clicks and what it means for business visibility.
                  </p>
                  <span className="text-blue-400 text-sm font-semibold">Read Analysis</span>
                </div>
              </Link>
              <Link to="/insights/integrated-service-ecosystem" className="group">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-600 transition-colors">
                  <span className="text-purple-400 text-sm font-semibold">Strategic Framework</span>
                  <h4 className="text-white font-bold mt-2 mb-3 group-hover:text-blue-400 transition-colors">
                    Integrated Service Ecosystem
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    How interconnected services create compound authority growth and competitive advantages.
                  </p>
                  <span className="text-blue-400 text-sm font-semibold">Read Analysis</span>
                </div>
              </Link>
              <Link to="/insights/e-e-a-t-evolution" className="group">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-600 transition-colors">
                  <span className="text-green-400 text-sm font-semibold">Authority Building</span>
                  <h4 className="text-white font-bold mt-2 mb-3 group-hover:text-blue-400 transition-colors">
                    E-E-A-T in the AI Era
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    How Google's E-E-A-T framework has evolved for AI evaluation and authority assessment.
                  </p>
                  <span className="text-blue-400 text-sm font-semibold">Read Analysis</span>
                </div>
              </Link>
            </div>
            
            <div className="text-center mt-8">
              <Link 
                to="/insights" 
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Back to All Strategic Intelligence
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
