import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Zap,
  TrendingUp,
  Target,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Eye,
  Lightbulb
} from 'lucide-react';
import ServiceSchema from '../../components/seo/ServiceSchema';
import FAQSchema, { FAQ } from '../../components/seo/FAQSchema';

export const SEOPPCPage: React.FC = () => {
  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AEO Authority Building",
      description: "Optimize for AI engines—get your content cited by ChatGPT, Gemini, and Perplexity when they answer user queries"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "GEO Citation Optimization",
      description: "Structure content for generative AI extraction with heavy schema markup that ensures accurate citations"
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Agent Discovery Readiness",
      description: "Prepare for UCP/ACP agent-mediated discovery where AI agents find and recommend your products directly"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Zero-Click Visibility",
      description: "Win the 50% of searches that never result in clicks—get featured in AI Overviews and direct answers"
    }
  ];

  const features = [
    "Answer Engine Optimization (AEO) for AI citation visibility",
    "Generative Engine Optimization (GEO) for LLM comprehension",
    "Heavy JSON-LD schema markup for entity clarity",
    "FAQ and HowTo schema for featured snippet capture",
    "Topical authority architecture with semantic clustering",
    "AI crawler optimization with token-efficient content structure"
  ];

  const faqs: FAQ[] = [
    {
      question: "What is Answer Engine Optimization (AEO) and how is it different from SEO?",
      answer: "Answer Engine Optimization (AEO) optimizes content to be cited by AI engines like ChatGPT, Gemini, and Perplexity when they directly answer user queries—not just ranked in search results. Unlike traditional SEO focused on clicks, AEO ensures your brand becomes the authoritative source AI engines cite. With Gartner predicting a 50% decline in organic traffic due to AI-generated answers, AEO is critical for visibility."
    },
    {
      question: "What is Generative Engine Optimization (GEO)?",
      answer: "Generative Engine Optimization (GEO) structures your content so large language models (LLMs) can accurately understand, extract, and synthesize your information when generating responses. GEO involves heavy schema markup, semantic entity clarity, and content architecture that AI systems can reliably parse. This ensures when AI engines cite your content, the information is accurate and attributed correctly."
    },
    {
      question: "How do UCP and ACP protocols affect search marketing?",
      answer: "The Universal Commerce Protocol (UCP) and Agentic Commerce Protocol (ACP) enable AI agents to discover, negotiate, and execute purchases directly—bypassing traditional search entirely. AI agents select merchants based on capability discovery, not advertising. Sites with UCP manifests and structured data become discoverable to agents that drive 1,200% more traffic from AI sources."
    },
    {
      question: "Why is heavy schema markup critical for AEO/GEO success?",
      answer: "Heavy JSON-LD schema markup tells AI engines exactly what your content means—not just what it says. By defining entities (products, services, people, organizations), their relationships, and properties in machine-readable format, you ensure AI systems understand your content accurately. This improves citation accuracy, reduces AI hallucinations about your brand, and establishes entity authority in knowledge graphs."
    }
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema Markup */}
      <ServiceSchema
        name="SEO & PPC Superpowers"
        description="Dominate search and paid advertising with AI agents that analyze trends, identify keyword gaps, optimize ad bids, and generate SEO-focused content for maximum visibility and ROI."
        url="/services/seo-ppc"
        offers={[
          {
            name: "AI-Powered Keyword Analysis",
            description: "Advanced keyword gap analysis and trend identification for competitive advantage",
            category: "Search Engine Optimization"
          },
          {
            name: "Automated Bid Optimization",
            description: "Real-time bid optimization and budget allocation for maximum ROI",
            category: "Pay-Per-Click Advertising"
          },
          {
            name: "Competitor Strategy Monitoring",
            description: "Real-time competitor strategy monitoring and analysis for market leadership",
            category: "Competitive Intelligence"
          },
          {
            name: "SEO Content Generation",
            description: "AI-powered SEO-optimized content generation with keyword targeting",
            category: "Content Optimization"
          }
        ]}
      />

      <FAQSchema
        faqs={faqs}
        pageUrl="https://www.adamsilvaconsulting.com/services/seo-ppc"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-xl w-fit mx-auto mb-6">
              <Search className="h-12 w-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              SEO & PPC Superpowers
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Dominate search and paid advertising with AI agents that analyze trends, identify keyword gaps,
              optimize ad bids, and generate SEO-focused content for maximum visibility and ROI.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Supercharge Your Search
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Definition */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Revolutionizing Search Marketing with AI</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              Search Engine Optimization (SEO) and Pay-Per-Click (PPC) advertising are foundational digital marketing strategies,
              critical for enhancing online visibility, driving targeted traffic, and generating qualified leads. Traditional approaches
              often involve time-consuming manual research, reactive bid adjustments, and content creation that struggles to keep pace
              with rapidly evolving search algorithms and competitive landscapes.
            </p>
            <p className="mb-6">
              Adam Silva Consulting's AI-powered SEO & PPC platform transforms this paradigm by deploying intelligent agents that
              continuously analyze market trends, identify crucial keyword gaps, and optimize advertising performance in real-time.
              Our sophisticated AI leverages machine learning, natural language processing, and predictive analytics to automate
              and enhance every aspect of search marketing.
            </p>
            <p>
              This comprehensive approach ensures that businesses maintain a proactive competitive advantage, capturing emerging
              opportunities while maximizing the effectiveness of their search marketing investments through intelligent automation
              and data-driven optimization strategies.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-Powered Search Domination</h2>
            <p className="text-lg text-gray-600">
              Our advanced AI mechanisms continuously monitor, analyze, and optimize search performance through
              intelligent automation that delivers superior results while reducing manual effort and costs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Advanced AI Search Features</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Intelligent Optimization</h4>
                <p className="text-gray-700 text-sm">
                  Our <a href="https://www.clickguard.com/blog/top-10-ai-tools-for-ppc-marketing/"
                    target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                    AI-powered PPC tools</a> leverage machine learning and predictive analytics to optimize campaigns,
                  while <a href="https://www.seoclarity.net/blog/seo-competitor-analysis-16701/" target="_blank"
                    rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">competitor keyword analysis</a>
                  reveals critical opportunities for market dominance.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-6 flex items-center justify-center">
                <Lightbulb className="h-20 w-20 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3">AI Search Intelligence Hub</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comprehensive interface displaying AI analyzing search trends, competitor strategies, and keyword
                opportunities in real-time, with automated bid adjustments, content optimization recommendations,
                and predictive performance forecasting across multiple search engines and advertising platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Measurable Search Marketing Success</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience unprecedented search marketing performance with AI-driven optimization that delivers higher rankings,
              lower costs, enhanced targeting, and sustained competitive advantage through intelligent automation.
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
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Dynamic Optimization for Maximum Impact</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Traditional PPC management often involves manual adjustments based on periodic performance reviews, leading to missed
                opportunities and inefficient spending. Our <a href="https://www.americaneagle.com/insights/blog/post/the-role-of-ai-in-ppc-advertising"
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  AI-driven PPC advertising platform</a> enables continuous, real-time optimization of ad bids, budgets,
                and creative elements based on live performance data.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By intelligently optimizing landing pages for organic search while simultaneously enhancing paid campaigns,
                our AI creates a synergistic effect where SEO improvements boost PPC performance and vice versa. This integrated
                approach delivers compounded benefits, ensuring superior return on digital marketing investments and sustained
                search market leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Elements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Search Optimization Visualized</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                <TrendingUp className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-Time Bid Optimization</h3>
              <p className="text-sm text-gray-600">
                Advanced dashboard showing AI dynamically adjusting bid strategies across thousands of keywords
                simultaneously, with real-time performance indicators, cost-per-click optimization, and automated
                budget reallocation based on conversion data and market competition.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Target className="h-16 w-16 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Keyword Gap Analysis Engine</h3>
              <p className="text-sm text-gray-600">
                Sophisticated analysis interface displaying AI identifying untapped keyword opportunities,
                competitor content gaps, search volume trends, and ranking difficulty assessments with
                automated content recommendations for maximum organic search visibility.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Search className="h-16 w-16 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Competitor Intelligence Dashboard</h3>
              <p className="text-sm text-gray-600">
                Comprehensive monitoring system displaying competitor ad strategies, keyword targeting patterns,
                landing page changes, and budget allocation insights with AI-generated recommendations for
                strategic interception and competitive advantage in search results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about our AI-powered SEO & PPC services
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Dominate Search Results?
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Transform your search marketing performance with AI-powered optimization that delivers higher rankings,
            lower costs, and sustained competitive advantage. Experience the future of intelligent search marketing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Start Dominating Today
            </Link>
            <Link
              to="/services/content-creation"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Explore Content Creation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
