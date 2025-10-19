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
  TrendingUp
} from 'lucide-react';
import FAQSchema, { FAQ } from '../components/seo/FAQSchema';

export const HomePage: React.FC = () => {
  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Proven ROI Growth",
      description: "AI-driven optimization delivers measurable improvements with up to 200% ROI on marketing investments"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning-Fast Implementation",
      description: "Deploy sophisticated marketing systems in minutes, not months, with our automated AI solutions"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Hyper-Personalization",
      description: "Create individual customer experiences at scale through advanced AI identity resolution and intent mapping"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Maintain complete compliance with GDPR, CCPA, and TCPA through automated data protection systems"
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "What is AI-powered authority building and how does it work?",
      answer: "AI-powered authority building is the strategic process of becoming the definitive source that AI engines trust and cite when answering user queries. It works by combining technical SEO frameworks, AI-optimized content creation, topical authority development, and Answer Engine Optimization (AEO) to ensure your business becomes the go-to reference for AI search engines like ChatGPT, Bard, and Bing AI."
    },
    {
      question: "How is Answer Engine Optimization (AEO) different from traditional SEO?",
      answer: "While traditional SEO focuses on ranking in search results for clicks, Answer Engine Optimization (AEO) focuses on being cited by AI engines when they answer user questions directly. AEO requires structured data, FAQ schemas, clear question-answer formats, and content optimized for AI comprehension rather than just keyword density. This shift is critical as Gartner predicts 50% organic traffic decline due to AI answering queries without sending users to websites."
    },
    {
      question: "What is Generative Engine Optimization (GEO) and why is it important?",
      answer: "Generative Engine Optimization (GEO) is the practice of optimizing content and brand presence to be favorably cited and referenced by generative AI models like ChatGPT, Claude, and other large language models. It's important because these AI systems are increasingly how people discover information and make decisions. GEO involves creating authoritative, well-structured content that AI models can easily understand, cite, and recommend to users."
    },
    {
      question: "How quickly can I see results from AI marketing automation?",
      answer: "AI marketing automation delivers rapid results with initial optimizations visible within 24-48 hours. Significant improvements typically occur within 7-14 days, including enhanced lead qualification, automated campaign optimization, and improved targeting. Our AI systems continuously learn and optimize, delivering up to 200% ROI improvements and reducing manual marketing tasks by 80% within the first month."
    },
    {
      question: "What makes Adam Silva Consulting different from other digital marketing agencies?",
      answer: "Adam Silva Consulting specializes exclusively in AI-powered authority building for the generative AI era. Unlike traditional agencies focused on clicks and traffic, we optimize for AI citations and authority recognition. Our integrated service ecosystem combines technical frameworks, AI content operations, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and strategic implementation to build defensible competitive advantages that competitors cannot easily replicate."
    },
    {
      question: "Do you work with businesses of all sizes or specific industries?",
      answer: "We work with businesses ready to lead the AI transformation across all industries and sizes. Our AI-powered solutions scale from growing companies to enterprise clients. We serve businesses globally through virtual consulting, with particular expertise in B2B services, technology companies, professional services, and any organization seeking to build authoritative market presence in the AI-driven landscape."
    },
    {
      question: "How do you measure success in AI authority building?",
      answer: "Success in AI authority building is measured through verifiable metrics including AI citation volume, featured snippet ownership, brand entity recognition across platforms, voice search response rates, and brand authority scores. We track how often AI engines cite your content when answering relevant queries, your presence in AI-generated responses, and the growth of your topical authority domains. Traditional metrics like traffic and rankings are supplemented with AI-specific authority indicators."
    },
    {
      question: "What is the investment required for AI marketing transformation?",
      answer: "Investment varies based on business size and scope, but our AI marketing solutions typically deliver 4x revenue multipliers with most successful implementations generating $1M+ annually. We focus on high-impact strategic implementations that provide measurable ROI within 30-90 days. Our approach emphasizes sustainable, long-term authority building rather than short-term tactics, ensuring continued competitive advantage as AI adoption accelerates."
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
      path: "/services/ai-websites-landing-pages"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Intelligent Campaign Management",
      description: "Orchestrate complex marketing funnels with real-time optimization and AI-driven performance insights",
      path: "/services/marketing-intelligence"
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
              Transform Your Marketing with 
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"> AI Intelligence</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Revolutionize customer engagement and drive exponential growth through our comprehensive suite of 
              AI-powered marketing solutions. From automated omnichannel communication to predictive analytics, 
              we deliver measurable results that transform businesses.
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
                to="/services/ai-websites-landing-pages"
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

      {/* Featured Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive AI-Powered Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our integrated suite of specialized services work synergistically to create a holistic marketing ecosystem 
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
              to="/services/ai-websites-landing-pages"
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