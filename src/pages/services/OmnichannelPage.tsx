import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MessageSquare, 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCircle,
  Zap,
  Target,
  BarChart3,
  Share2
} from 'lucide-react';

export const OmnichannelPage: React.FC = () => {
  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Increased Efficiency",
      description: "Automation of routine tasks and centralized management free teams for strategic initiatives, boosting productivity by 75%"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Faster Response Times", 
      description: "AI handles routine queries instantly, allowing human agents to focus on complex issues with 90% faster resolution"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Improved Personalization",
      description: "AI analysis delivers higher engagement and conversion rates through precise behavioral targeting and content optimization"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Seamless Customer Journey",
      description: "Consistent experience across all touchpoints with contextual conversation continuity and unified customer profiles"
    }
  ];

  const features = [
    "AI-powered sentiment analysis and contextual insights",
    "Real-time customer history and behavioral prediction", 
    "Automated personalized replies and follow-ups",
    "Cross-channel conversation continuity",
    "Predictive customer behavior modeling",
    "Intelligent agent assistance and workflow automation"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-xl w-fit mx-auto mb-6">
              <Users className="h-12 w-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Automated Omnichannel Communication
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Seamlessly engage customers across SMS, voice, email, and social media with AI-powered personalization 
              that ensures consistent, contextual interactions at every touchpoint.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Today
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Definition */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Omnichannel Communication?</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              Automated omnichannel communication represents a sophisticated marketing strategy that integrates and unifies 
              customer interactions across all available channels, including SMS, voice calls, email, and social media direct messages. 
              This approach ensures a single, cohesive, and personalized customer experience that maintains conversation context 
              as customers move between platforms.
            </p>
            <p className="mb-6">
              Unlike traditional multi-channel strategies where different channels operate in isolation, omnichannel ensures 
              continuity of conversation and context. This allows customers to transition effortlessly between platforms 
              without the frustration of repeating information, creating a truly seamless experience that builds trust and satisfaction.
            </p>
            <p>
              In today's digital landscape, customers expect instant, personalized responses across their preferred communication 
              channels. Organizations that fail to provide this unified experience risk losing customers to competitors who 
              offer more sophisticated, AI-powered engagement strategies.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-Powered Operational Excellence</h2>
            <p className="text-lg text-gray-600">
              Our advanced AI mechanisms aggregate customer data, predict behaviors, and automate personalized interactions 
              across all communication channels with unprecedented precision and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Core AI Capabilities</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Key Integration</h4>
                <p className="text-gray-700 text-sm">
                  AI tools are seamlessly integrated directly into both voice and digital communication channels, 
                  providing <a href="https://www.avaya.com/en/blogs/why-ai-matters-for-omnichannel-customer-service/" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  real-time sentiment analysis, contextual insights, and detailed customer histories</a>, 
                  significantly empowering live agents to deliver more personalized and effective support.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-6 flex items-center justify-center">
                <MessageSquare className="h-20 w-20 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3">Unified Customer Intelligence Hub</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dynamic visualization of AI aggregating customer data from multiple touchpoints - email opens, 
                SMS responses, social media interactions, and voice call sentiment - into a unified profile 
                that enables predictive personalization and contextual engagement across all channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tangible Business Benefits</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your customer engagement with measurable improvements in efficiency, satisfaction, and revenue growth 
              through intelligent automation and predictive personalization.
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
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Scalability at Enterprise Level</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our <a href="https://www.stackadapt.com/resources/blog/omnichannel-marketing-automation-strategy" 
                target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                omnichannel marketing automation strategy</a> enables maintaining consistency and personalization 
                across numerous touchpoints as customer interactions scale rapidly, preventing the disjointed 
                experiences often seen in multi-channel setups.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Through comprehensive <a href="https://trengo.com/blog/omnichannel-communication-these-are-the-biggest-benefits" 
                target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                omnichannel communication benefits</a>, businesses achieve not just improved efficiency, 
                but also enhanced customer loyalty and significantly higher lifetime value through consistent, 
                intelligent engagement at every interaction point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Elements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Omnichannel Excellence Visualized</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                <Phone className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Agent Assistant Interface</h3>
              <p className="text-sm text-gray-600">
                Modern agent dashboard displaying real-time customer context, AI-generated response suggestions, 
                sentiment analysis indicators, and unified conversation history across all channels with 
                intelligent workflow automation prompts.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Share2 className="h-16 w-16 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cross-Channel Data Flow</h3>
              <p className="text-sm text-gray-600">
                Dynamic data visualization showing customer interactions flowing seamlessly between SMS, 
                email, social media, and voice channels, with AI maintaining context and personalizing 
                responses based on comprehensive behavioral analysis.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Mail className="h-16 w-16 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Predictive Engagement Timeline</h3>
              <p className="text-sm text-gray-600">
                Advanced timeline interface showing AI-predicted optimal engagement moments, personalized 
                content recommendations, and automated follow-up sequences based on customer behavior 
                patterns and interaction preferences across all touchpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Customer Communications?
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Join industry leaders who are delivering exceptional customer experiences through AI-powered omnichannel automation. 
            Let's discuss how our intelligent communication solutions can revolutionize your customer engagement strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Schedule Your Demo
            </Link>
            <Link 
              to="/services/website-landing-pages"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Explore Next Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};