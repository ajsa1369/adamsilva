import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, TrendingUp, Zap, Brain } from 'lucide-react';
import FAQSchema, { FAQ } from '../../components/seo/FAQSchema';

export const InsightsIndex: React.FC = () => {
  // FAQ for Insights page targeting agentic commerce and marketing intelligence queries  
  const insightsFaqs: FAQ[] = [
    {
      question: "What is agentic commerce and why does it matter for business?",
      answer: "Agentic commerce is the paradigm shift where AI agents—ChatGPT, Gemini, autonomous shopping assistants—discover, negotiate, and execute purchases on behalf of users. Three protocols define this era: UCP (Universal Commerce Protocol) for discovery, ACP (Agentic Commerce Protocol) for checkout execution, and AP2 (Agent Payments Protocol) for cryptographic trust. With AI-sourced traffic up 1,200% in 2025-2026, businesses must architect for agent-mediated transactions or risk invisibility."
    },
    {
      question: "How do UCP, ACP, and AP2 protocols work together?",
      answer: "UCP (Google/Shopify) handles discovery—AI agents fetch your capabilities from /.well-known/ucp manifests. ACP (OpenAI/Stripe) enables execution—Instant Checkout in ChatGPT using Shared Payment Tokens. AP2 provides the trust layer—cryptographically signed mandates proving user authorization. Together, they form the complete agentic commerce stack: discovery, execution, and trust verification for autonomous AI transactions."
    },
    {
      question: "Why is SPA + SSR architecture essential for agentic commerce?",
      answer: "AI crawlers allocate limited 'token budgets' when processing websites. Legacy platforms impose a 'Hydration Tax'—heavy JavaScript that wastes tokens before reaching content. SPA + SSR delivers lean, fully-rendered HTML with dense JSON-LD schema in under 300ms—the threshold agents require. Sites optimizing for token efficiency see 20-50% increases in AI-sourced traffic and 3-5x higher citation rates."
    },
    {
      question: "What is the difference between SEO, AEO, and GEO optimization?",
      answer: "SEO optimizes for clicks in search results. Answer Engine Optimization (AEO) optimizes for being cited by AI engines when they answer queries directly—critical as Gartner predicts 50% organic traffic decline. Generative Engine Optimization (GEO) structures content so LLMs accurately understand and synthesize your information. Modern visibility requires all three: SEO for traditional search, AEO for AI citations, GEO for accurate AI comprehension."
    }
  ];
  const featuredArticles = [
    {
      id: 'ai-authority-imperative',
      title: 'The AI Authority Imperative: Gartner\'s 50% Traffic Decline Prediction',
      excerpt: 'Gartner\'s projection of 50% organic traffic decline marks the definitive end of click-based optimization.',
      category: 'Critical Strategic Analysis',
      categoryColor: 'red',
      date: 'September 18, 2025',
      readTime: '16 min read',
      image: '/images/insights/ai_ready_business_strategy_steps_infographic.jpg',
      path: '/insights/the-ai-authority-imperative-gartners-50-traffic-decline-prediction',
      featured: true
    },
    {
      id: 'zero-click-searches',
      title: 'Zero-Click Searches: The New Reality of Information Discovery',
      excerpt: 'How 65% of searches now result in zero clicks and what it means for business visibility.',
      category: 'Market Intelligence',
      categoryColor: 'blue',
      date: 'September 15, 2025',
      readTime: '12 min read',
      image: '/images/insights/business_yoy_growth_decline_forecast_chart.jpg',
      path: '/insights/zero-click-searches-the-new-reality-of-information-discovery',
      featured: false
    },
    {
      id: 'integrated-service-ecosystem',
      title: 'The Integrated Service Ecosystem: Strategic Flywheel Analysis',
      excerpt: 'How interconnected services create compound authority growth and competitive advantages.',
      category: 'Strategic Framework',
      categoryColor: 'purple',
      date: 'September 12, 2025',
      readTime: '14 min read',
      image: '/images/insights/seo-ai-transformation-optimization-concept.jpg',
      path: '/insights/the-integrated-service-ecosystem-strategic-flywheel-analysis',
      featured: false
    },
    {
      id: 'e-e-a-t-evolution',
      title: 'E-E-A-T Evolution: Building Authority in the Generative AI Era',
      excerpt: 'How Google\'s E-E-A-T framework has evolved for AI evaluation and authority assessment.',
      category: 'Authority Building',
      categoryColor: 'green',
      date: 'September 10, 2025',
      readTime: '18 min read',
      image: '/images/insights/ai_ready_business_strategy_steps_infographic.jpg',
      path: '/insights/e-e-a-t-evolution-building-authority-in-the-generative-ai-era',
      featured: false
    }
  ];

  const categories = [
    { name: 'All', count: 12, active: true },
    { name: 'Strategic Framework', count: 4, active: false },
    { name: 'Market Intelligence', count: 3, active: false },
    { name: 'Authority Building', count: 3, active: false },
    { name: 'AI Transformation', count: 2, active: false }
  ];

  const getCategoryColor = (color: string) => {
    const colors: { [key: string]: string } = {
      red: 'bg-red-600',
      blue: 'bg-blue-600',
      purple: 'bg-purple-600',
      green: 'bg-green-600',
      orange: 'bg-orange-600'
    };
    return colors[color] || 'bg-gray-600';
  };

  return (
    <main className="min-h-screen bg-black text-gray-100">
      {/* FAQ Schema for Marketing Intelligence */}
      <FAQSchema
        faqs={insightsFaqs}
        pageUrl="https://www.adamsilvaconsulting.com/insights"
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Strategic Intelligence Hub
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Critical analysis, market intelligence, and strategic frameworks for navigating the AI transformation era
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <TrendingUp className="h-5 w-5" />
                <span>Market Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Brain className="h-5 w-5" />
                <span>AI Strategy</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Zap className="h-5 w-5" />
                <span>Authority Building</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`px-4 py-2 rounded-full border transition-colors ${category.active
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
                  }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Featured Analysis</h2>
          {featuredArticles
            .filter(article => article.featured)
            .map(article => (
              <Link key={article.id} to={article.path} className="group block">
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-600 transition-colors">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`${getCategoryColor(article.categoryColor)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                          {article.category}
                        </span>
                        {article.category === 'Critical Strategic Analysis' && (
                          <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            URGENT
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-6 text-gray-400 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Latest Strategic Intelligence</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles
              .filter(article => !article.featured)
              .map(article => (
                <Link key={article.id} to={article.path} className="group">
                  <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-600 transition-colors h-full">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <span className={`${getCategoryColor(article.categoryColor)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                        {article.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-4 mb-3 group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 mb-4 text-sm line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-gray-500 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Stay Ahead of the AI Transformation
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Get exclusive strategic intelligence and critical market analysis delivered weekly.
              Join industry leaders navigating the generative AI era.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-4">
              Join 2,500+ strategic leaders. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
