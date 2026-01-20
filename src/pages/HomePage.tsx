import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Brain,
  Zap,
  Target,
  BarChart3,
  Shield,
  Users,
  TrendingUp,
  Globe,
  Lock,
  Cpu
} from 'lucide-react';
import FAQSchema, { FAQ } from '../components/seo/FAQSchema';
import OrganizationSchema from '../components/seo/OrganizationSchema';
import InteractiveFlywheelSection from '../components/common/InteractiveFlywheelSection';

export const HomePage: React.FC = () => {
  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Agentic Commerce Ready",
      description: "Future-proof your business with UCP, ACP, and AP2 protocol compliance for AI agent-driven transactions"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Protocol-Native Architecture",
      description: "SPA + SSR with heavy schema markup delivers machine-readable capabilities that AI agents prioritize"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "AI Engine Authority",
      description: "Build topical authority with AEO/GEO optimization that gets your brand cited by ChatGPT, Gemini, and AI Mode"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Cryptographic Trust",
      description: "AP2 mandate-based verification provides non-repudiable proof of authorization for autonomous transactions"
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "What is the Universal Commerce Protocol (UCP) and why does it matter?",
      answer: "The Universal Commerce Protocol (UCP) is Google's open standard launched in January 2026, co-developed with Shopify, Walmart, Target, and Etsy. It establishes a common language for AI agents to discover, negotiate, and execute purchases across any merchant. UCP matters because it solves the 'N×N integration bottleneck'—instead of building custom integrations for each AI platform, merchants implement UCP once and gain access to every UCP-compatible agent surface including Google AI Mode, Gemini, and ChatGPT."
    },
    {
      question: "How is the Agentic Commerce Protocol (ACP) different from UCP?",
      answer: "ACP, developed by OpenAI and Stripe, powers ChatGPT Instant Checkout with a centralized, opinionated architecture optimized for speed. UCP is decentralized and ecosystem-driven, supporting any agent and payment provider. ACP uses Shared Payment Tokens (SPT) through Stripe, while UCP is payment-agnostic. Both protocols enable AI agents to complete purchases, but UCP offers broader interoperability and full-stack capabilities including discovery, execution, and post-purchase support."
    },
    {
      question: "What is AP2 (Agent Payments Protocol) and how does it ensure trust?",
      answer: "AP2 is Google's cryptographically-signed mandate system that provides verifiable proof of user authorization for agent-initiated payments. It uses three mandate types: Intent Mandates (capturing user instructions), Cart Mandates (locking exact items and prices), and Payment Mandates (sent to payment networks). AP2 uses ECDSA signatures and Verifiable Credentials to create tamper-proof audit trails, solving the critical question: 'How do we prove the user actually approved this transaction?'"
    },
    {
      question: "Why is SPA + SSR architecture essential for agentic commerce?",
      answer: "AI crawlers allocate limited 'token budgets' when processing websites. Legacy platforms like Shopify and Wix impose a 'Hydration Tax'—heavy JavaScript that wastes tokens before reaching actual content. SPA + SSR (Single Page Application with Server-Side Rendering) delivers lean, fully-rendered HTML with dense JSON-LD schema, achieving sub-300ms render-to-first-fact times that agents prioritize. Sites optimizing for token efficiency see 20-50% increases in AI-sourced traffic."
    },
    {
      question: "What is Answer Engine Optimization (AEO) versus traditional SEO?",
      answer: "Traditional SEO optimizes for clicks in search results; AEO optimizes for being cited by AI engines when they answer queries directly. AEO requires heavy schema markup, structured data, FAQ schemas, and content optimized for AI comprehension. As Gartner predicts a 50% decline in organic traffic due to AI answering queries without sending users to websites, AEO is critical for maintaining visibility in the agent-mediated discovery era."
    },
    {
      question: "How do AI agents decide which merchants to transact with?",
      answer: "AI agents operate within 'constraint environments' and optimize for transaction completion probability. They prioritize merchants with: (1) Clean structured data and heavy schema markup, (2) Fast response times under 300ms, (3) Reliable inventory APIs with 15-minute refresh cycles, (4) Published UCP manifests at /.well-known/ucp, (5) Low friction checkout flows, and (6) Verifiable trust signals via AP2 mandates. Operational excellence now trumps brand awareness in agent selection."
    },
    {
      question: "What makes Adam Silva Consulting uniquely qualified for agentic commerce?",
      answer: "Adam Silva Consulting architects bespoke SPA + SSR frameworks with protocol-native design for UCP, ACP, and AP2 compliance. We implement Human-in-the-Loop (HITL) workflows that maintain E-E-A-T authority while leveraging automation. Our expertise spans the intersection of modern web architecture, cryptographic trust infrastructure, and AI authority building—ensuring clients are visible, trusted, and transactable by AI agents across all surfaces."
    },
    {
      question: "How long does it take to become agentic commerce ready?",
      answer: "A complete agentic commerce implementation typically takes 12-16 weeks across four phases: Phase 1 (Weeks 1-6) covers SSR/Edge deployment and heavy schema implementation; Phase 2 (Weeks 7-10) implements UCP/ACP protocols and AP2 mandate signing; Phase 3 (Weeks 11-13) handles certification and security testing; Phase 4 (Weeks 14+) establishes ongoing operations and authority building. Early benefits like improved AI citations often appear within the first month."
    }
  ];

  const services = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Omnichannel Communication",
      description: "Seamlessly engage customers across SMS, voice, email, and social media with AI-powered personalization",
      path: "/services/omnichannel-communication"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Website & Landing Pages",
      description: "Generate high-converting pages instantly with automated A/B testing and competitor design cloning",
      path: "/services/website-landing-pages"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Intelligent Campaign Management",
      description: "Orchestrate complex marketing funnels with real-time optimization and AI-driven performance insights",
      path: "/services/campaign-management"
    }
  ];

  const stats = [
    { number: "50%", label: "Average Revenue Increase" },
    { number: "200%", label: "Marketing ROI Improvement" },
    { number: "75%", label: "Reduction in Manual Tasks" },
    { number: "90%", label: "Customer Satisfaction Rate" }
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema - Organization for rich search results */}
      <OrganizationSchema />

      {/* FAQ Schema for featured snippets */}
      <FAQSchema
        faqs={faqs}
        pageUrl="https://www.adamsilvaconsulting.com/"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build AI Authority for the
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"> Agentic Commerce Era</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              The web is shifting from human-centric to agent-centric. We architect SPA + SSR solutions with heavy schema markup
              optimized for UCP, ACP, and AP2 protocols—ensuring AI agents discover, trust, and transact with your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Start Your Transformation</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/services/omnichannel-communication"
                className="text-gray-700 px-8 py-4 rounded-lg font-medium text-lg border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              The Future of Marketing is Here
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Traditional marketing approaches struggle to meet today's evolving consumer expectations and real-time market dynamics.
              Adam Silva Consulting pioneers a comprehensive ecosystem of AI-powered services that transforms marketing from a
              fragmented, reactive discipline into a highly efficient, hyper-personalized, and strategically proactive engine
              for sustained competitive advantage.
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
        </div>
      </section>

      {/* Interactive Flywheel Section */}
      <InteractiveFlywheelSection />

      {/* Featured Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive AI-Powered Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our integrated suite of eleven specialized services work synergistically to create a holistic marketing ecosystem
              that delivers exponential results through intelligent automation and predictive insights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <div key={index} className="group bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-lg w-fit mb-6 group-hover:scale-105 transition-transform duration-200">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <Link
                  to={service.path}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services/omnichannel-communication"
              className="inline-flex items-center bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              View All 11 Services
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Measurable Results That Matter
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Our AI-powered solutions deliver quantifiable improvements across every marketing metric,
              driving sustainable growth and competitive advantage for our clients.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Join industry leaders who are already leveraging AI to drive unprecedented growth.
            Let's discuss how our comprehensive suite of AI-powered solutions can revolutionize your marketing strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Schedule Your Consultation
            </Link>
            <Link
              to="/services/omnichannel-communication"
              className="text-gray-700 px-8 py-4 rounded-lg font-medium text-lg border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
            >
              Explore Our Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about AI-powered authority building, AEO, GEO, and marketing transformation
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Your AI Strategy Consultation
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
