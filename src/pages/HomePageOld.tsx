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
  Cpu,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';
import FAQSchema, { FAQ } from '../components/seo/FAQSchema';
import OrganizationSchema from '../components/seo/OrganizationSchema';
import InteractiveFlywheelSection from '../components/common/InteractiveFlywheelSection';

export const HomePage: React.FC = () => {
  const criticalNeeds = [
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Protocol Implementation",
      description: "UCP, ACP, and AP2 compliance for AI agent discoverability and transactions",
      urgent: true
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Token-Efficient Architecture",
      description: "SPA + SSR with heavy schema markup to eliminate hydration tax and maximize AI crawler efficiency",
      urgent: true
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Cryptographic Trust Infrastructure",
      description: "AP2 mandate signing and verifiable credentials for non-repudiable transaction proof",
      urgent: true
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Answer Engine Optimization",
      description: "AEO and GEO strategies to become the cited authority in AI responses, not just search results",
      urgent: false
    }
  ];

  const protocolOverview = [
    {
      name: "UCP",
      fullName: "Universal Commerce Protocol",
      description: "Google's discovery layer enabling AI agents to find and negotiate with merchants",
      icon: <Globe className="h-8 w-8" />,
      color: "blue"
    },
    {
      name: "ACP",
      fullName: "Agentic Commerce Protocol",
      description: "OpenAI/Stripe's execution layer for instant checkout in AI interfaces",
      icon: <Zap className="h-8 w-8" />,
      color: "green"
    },
    {
      name: "AP2",
      fullName: "Agent Payments Protocol",
      description: "Google's trust layer providing cryptographic proof of user authorization",
      icon: <Lock className="h-8 w-8" />,
      color: "purple"
    }
  ];

  const implementationTimeline = [
    {
      phase: "Phase 1: Foundation",
      weeks: "Weeks 1-6",
      items: [
        "SPA + SSR architecture deployment",
        "Heavy JSON-LD schema implementation",
        "Core Web Vitals optimization (<300ms)",
        "Token efficiency validation"
      ]
    },
    {
      phase: "Phase 2: Protocol Integration",
      weeks: "Weeks 7-10",
      items: [
        "UCP manifest at /.well-known/ucp",
        "ACP checkout adapter setup",
        "AP2 mandate signing infrastructure",
        "Capability negotiation testing"
      ]
    },
    {
      phase: "Phase 3: Security & Scale",
      weeks: "Weeks 11-13",
      items: [
        "Cryptographic infrastructure validation",
        "Protocol compliance certification",
        "Performance benchmarking",
        "Security penetration testing"
      ]
    },
    {
      phase: "Phase 4: Authority Building",
      weeks: "Weeks 14+",
      items: [
        "AI citation monitoring and optimization",
        "Competitive advantage maintenance",
        "Ongoing protocol updates",
        "Authority metrics tracking"
      ]
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "What is the most urgent change businesses need to make for the agentic commerce era?",
      answer: "The most urgent change is architectural: migrating from legacy platforms (Shopify, Wix, WordPress) to SPA + SSR with heavy schema markup. AI crawlers allocate limited token budgets—legacy platforms waste tokens on hydration code before reaching content. Sites not optimized for token efficiency see 20-50% lower AI traffic. This architectural debt will become a competitive moat for early adopters."
    },
    {
      question: "How do UCP, ACP, and AP2 protocols work together?",
      answer: "UCP handles discovery (AI agents find your capabilities via /.well-known/ucp manifests), ACP enables execution (instant checkout in ChatGPT using Shared Payment Tokens), and AP2 provides trust (cryptographic mandates proving user authorization). Together they create the complete agentic commerce stack: discoverability, transaction execution, and verifiable authorization—solving the core challenges of AI-mediated commerce."
    },
    {
      question: "Why can't legacy platforms support these protocols?",
      answer: "Legacy platforms lack root-level access for protocol manifests, impose token-wasting hydration taxes, and have rigid templated architectures. Shopify Plus partially supports UCP but smaller plans and no-code builders cannot host /.well-known/ucp or implement dynamic capability negotiation. WordPress plugins add database overhead that slows the negotiation processes required by UCP's state machine architecture."
    },
    {
      question: "What happens to businesses that don't implement these protocols?",
      answer: "They become invisible to AI agents. With traffic from generative AI sources up 1,200% in 2025-2026, businesses without UCP manifests won't appear in agent discovery, can't participate in ACP instant checkout, and lack AP2 trust infrastructure. Gartner predicts 50% organic traffic decline from AI answering queries directly—businesses not cited by AI engines will lose visibility entirely."
    },
    {
      question: "How long does it take to become agent-commerce ready?",
      answer: "Complete implementation takes 12-16 weeks across four phases: Phase 1 (Weeks 1-6) covers SPA+SSR deployment and schema markup; Phase 2 (Weeks 7-10) implements protocol manifests and adapters; Phase 3 (Weeks 11-13) handles security and certification; Phase 4 (Weeks 14+) focuses on authority building. Early benefits like improved AI citations appear within the first month."
    },
    {
      question: "What makes Adam Silva Consulting uniquely qualified?",
      answer: "We architect bespoke SPA+SSR frameworks with protocol-native design, implement HITL workflows maintaining E-E-A-T authority, and understand the intersection of modern web engineering, cryptographic trust, and AI authority building. Our expertise spans the complete stack: from token-efficient rendering to mandate signing infrastructure—ensuring clients are discoverable, trustworthy, and transactable by AI agents."
    },
    {
      question: "What are the measurable outcomes of agentic commerce readiness?",
      answer: "Clients achieve: 20-50% increases in AI-sourced traffic, 3-5x higher agent citation rates, sub-300ms render times, full protocol compliance, and 3-6 year competitive advantages. The deterministic economy rewards operational excellence—clean structured data, fast APIs, and reliable fulfillment become more valuable than brand awareness in agent selection algorithms."
    }
  ];

  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Protocol-Native Web Architecture",
      description: "SPA + SSR with UCP, ACP, and AP2 compliance for AI agent discoverability and transactions",
      path: "/services/website-landing-pages"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Authority & Citation Optimization",
      description: "AEO and GEO strategies to become the definitive source AI engines cite for your industry",
      path: "/insights/the-ai-authority-imperative-gartners-50-traffic-decline-prediction"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Cryptographic Trust Infrastructure",
      description: "AP2 mandate signing and verifiable credentials for secure AI-mediated transactions",
      path: "/insights/the-agentic-commerce-protocols-ucp-acp-ap2"
    }
  ];

  const stats = [
    { number: "1,200%", label: "AI-Sourced Traffic Growth (2025-2026)" },
    { number: "50%", label: "Predicted Organic Traffic Decline (Gartner)" },
    { number: "3-6 Years", label: "Competitive Advantage for Early Adopters" },
    { number: "12-16 Weeks", label: "Complete Implementation Timeline" }
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
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 inline-block">
              🚨 URGENT: Agentic Commerce Era Has Arrived
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Business Needs These
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"> Critical Changes</span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-600">To Survive the AI Commerce Revolution</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              The web is shifting from human browsing to AI agent transactions. Legacy platforms can't support UCP, ACP, and AP2 protocols.
              Your competitors are already implementing—don't get left behind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                to="/contact"
                className="group bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Start Your Protocol Implementation</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/insights/the-agentic-commerce-protocols-ucp-acp-ap2"
                className="text-gray-700 px-8 py-4 rounded-lg font-medium text-lg border-2 border-gray-200 hover:border-red-300 hover:text-red-600 transition-all duration-200"
              >
                Understand the Protocols
              </Link>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-yellow-800 text-sm">
                <strong>Reality Check:</strong> Traffic from generative AI sources surged 1,200% in 2025-2026.
                Businesses without protocol compliance will become invisible to AI agents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Needs Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              What Your Business <span className="text-red-600">Absolutely Needs</span> Right Now
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The agentic commerce revolution demands fundamental changes. These aren't optional optimizations—they're survival requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {criticalNeeds.map((need, index) => (
              <div key={index} className={`bg-white p-6 rounded-xl shadow-sm border ${need.urgent ? 'border-red-200 bg-red-50' : 'border-gray-100'} hover:shadow-md transition-shadow duration-200`}>
                <div className={`p-3 rounded-lg w-fit mb-4 ${need.urgent ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                  {need.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{need.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{need.description}</p>
                {need.urgent && (
                  <div className="mt-3 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                    URGENT PRIORITY
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              The Three Protocols Powering AI Commerce
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              UCP, ACP, and AP2 work together to enable AI agents to discover, negotiate, and execute transactions with cryptographic trust.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {protocolOverview.map((protocol, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className={`bg-${protocol.color}-100 text-${protocol.color}-600 p-4 rounded-lg w-fit mb-6`}>
                  {protocol.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{protocol.name}</h3>
                <h4 className="text-lg text-gray-700 mb-4">{protocol.fullName}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{protocol.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Your 12-16 Week Transformation Roadmap
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete agentic commerce readiness requires systematic implementation across four critical phases.
            </p>
          </div>

          <div className="space-y-8">
            {implementationTimeline.map((phase, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="lg:w-1/4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{phase.phase}</h3>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                      {phase.weeks}
                    </div>
                  </div>
                  <div className="lg:w-3/4">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-gray-600 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              The Market Reality
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              These aren't predictions—they're current market conditions your business must address immediately.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80 text-sm lg:text-base">{stat.label}</div>
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
              Our Protocol-Native Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We don't just build websites—we architect agentic commerce infrastructure that makes your business discoverable, trustworthy, and transactable by AI agents.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <div key={index} className="group bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                <div className={`bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-lg w-fit mb-6 group-hover:scale-105 transition-transform duration-200`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>
                <Link
                  to={service.path}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform duration-200"
                >
                  Learn More <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Don't Wait for Your Competitors to Implement First
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            The deterministic economy has arrived. AI agents now mediate billions of purchase decisions daily.
            Businesses with protocol compliance gain 3-6 year competitive advantages. Those without become invisible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Begin Your Protocol Implementation</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/insights/the-agentic-commerce-protocols-ucp-acp-ap2"
              className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              Read the Technical Guide
            </Link>
          </div>
          <div className="mt-8 bg-yellow-900/20 border border-yellow-500 rounded-lg p-4">
            <p className="text-yellow-200 text-sm">
              <Clock className="h-4 w-4 inline mr-2" />
              <strong>Time is critical:</strong> Early adopters are already seeing 20-50% increases in AI-sourced traffic.
              The window for competitive advantage is closing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};