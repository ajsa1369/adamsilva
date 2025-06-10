import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Eye, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  CheckCircle,
  Brain,
  Shield,
  Zap
} from 'lucide-react';

export const IntentTargetingPage: React.FC = () => {
  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Hyper-Personalized Campaigns",
      description: "Individual-level understanding of customer interests enables powerful, tailored marketing across all channels"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Anonymous Audience Reach", 
      description: "Identify, segment, and target users whether logged in or not, amplifying marketing efforts and expanding reach"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Increased Engagement & Revenue",
      description: "More accurate targeting and personalization lead to higher engagement and direct revenue growth by 250%"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Enhanced Attribution",
      description: "Precise quantification of advertising impact on revenue, mapping online touchpoints to offline purchases"
    }
  ];

  const features = [
    "AI-powered identity resolution with deterministic and probabilistic matching",
    "Real-time intent data capture and behavioral analysis", 
    "Cross-device and cross-channel customer profile unification",
    "Privacy-compliant data processing with GDPR and CCPA adherence",
    "Anonymous visitor identification and engagement tracking",
    "Predictive customer lifetime value and conversion modeling"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-xl w-fit mx-auto mb-6">
              <Target className="h-12 w-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Intent Graph Identity Targeting
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Identify "who is searching, not just what they search" by linking keyword and domain behavior to specific 
              names, emails, and device data for hyper-personalized campaigns across all channels.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Target with Precision
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Definition */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding the "Who" Behind Every Search</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              At its core, an identity graph is an online database that meticulously stores all identifiers associated with 
              individual customers and prospects, providing a comprehensive, stable, and continuously evolving view of audiences 
              across both online and offline channels. Identity resolution, which underpins this process, is crucial for achieving 
              a unified customer view, particularly as the industry phases out reliance on third-party cookies.
            </p>
            <p className="mb-6">
              Adam Silva Consulting's Intent Graph Identity Targeting service transforms anonymous digital behavior into actionable 
              customer intelligence by connecting various identifiers from disparate platforms, channels, and devices, matching them 
              to unified customer profiles. Our AI significantly enhances identity resolution through advanced pattern recognition, 
              automated data linking, and real-time behavioral prediction capabilities.
            </p>
            <p>
              Intent data, a key component of our platform, captures comprehensive digital behavior including website visits, 
              search terms, content downloads, and social media activity to provide deep insights into customer interests, needs, 
              and purchase intentions. This enables true "segment-of-one" personalization where marketing messages are precisely 
              tailored to individual real-time intent and preferences across all touchpoints.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-Powered Identity Intelligence System</h2>
            <p className="text-lg text-gray-600">
              Our sophisticated AI mechanisms connect anonymous behavior to known identities, enabling hyper-personalized 
              marketing while maintaining strict privacy compliance and data protection standards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Advanced AI Identity Features</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Privacy-First Intelligence</h4>
                <p className="text-gray-700 text-sm">
                  Our <a href="https://www.okta.com/identity-101/identity-resolution/" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  identity resolution platform</a> operates in a cookieless world while maintaining privacy compliance, 
                  enabling <a href="https://www.liveintent.com/blog/li-weekly-whats-an-identity-graph/" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">comprehensive identity graphs</a> 
                  that deliver hyper-personalization without compromising data protection.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-6 flex items-center justify-center">
                <Brain className="h-20 w-20 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3">AI Identity Resolution Engine</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sophisticated interface displaying AI connecting anonymous browsing patterns, device fingerprints, 
                and behavioral signals to create unified customer profiles, while maintaining privacy compliance 
                and enabling real-time personalization across all marketing touchpoints and channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Revolutionary Targeting Capabilities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your marketing precision with AI-powered identity targeting that delivers true personalization, 
              enhanced attribution, and measurable revenue growth through intelligent customer understanding.
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
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Bridging the Anonymous-to-Known Gap</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                The challenge of "90% of your visitors remain anonymous" is a significant hurdle in digital marketing. 
                Our AI-powered identity graphs, leveraging both deterministic and probabilistic matching methods, effectively 
                bridge this gap by connecting disparate data points—anonymous browsing activity, IP addresses, and device IDs—to 
                a single, identifiable customer profile.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This not only enables consistent personalization even before a user logs in or provides PII, but also provides 
                a far more accurate and comprehensive picture for multi-touch attribution and ROI measurement. Clients gain 
                clearer understanding of true marketing impact and can optimize spend with greater confidence, leading to more 
                strategic and effective resource allocation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Compliance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy-First Personalization</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Navigate the balance between hyper-personalization and privacy protection with AI-powered solutions 
              that comply with GDPR, CCPA, and emerging privacy regulations while delivering exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">GDPR & CCPA Compliant</h3>
              <p className="text-gray-600 text-sm">Automatic data anonymization and pseudonymization with strict PII security controls</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-teal-100 p-3 rounded-lg w-fit mb-4">
                <Zap className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cookieless Future Ready</h3>
              <p className="text-gray-600 text-sm">Advanced identity resolution that operates effectively without third-party cookies</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4">
                <Eye className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparent Data Usage</h3>
              <p className="text-gray-600 text-sm">Clear consent management and data usage transparency for customer trust</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Elements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Identity Intelligence Visualized</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Unified Customer Profile Builder</h3>
              <p className="text-sm text-gray-600">
                Advanced interface displaying AI connecting anonymous website visits, email interactions, social media 
                engagement, and purchase history into comprehensive customer profiles with real-time intent scoring 
                and personalization recommendations across all touchpoints.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Target className="h-16 w-16 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Intent Signal Analysis Dashboard</h3>
              <p className="text-sm text-gray-600">
                Real-time intent monitoring interface showing AI analyzing search patterns, content consumption, 
                and behavioral signals to predict purchase intent, optimal engagement timing, and personalized 
                content recommendations for maximum conversion effectiveness.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Shield className="h-16 w-16 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Privacy-Compliant Data Flow</h3>
              <p className="text-sm text-gray-600">
                Comprehensive privacy dashboard showing AI-powered data processing with automatic anonymization, 
                consent management workflows, and GDPR/CCPA compliance monitoring while maintaining effective 
                personalization and customer intelligence capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Unlock True Customer Intelligence?
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Transform your targeting capabilities with AI-powered identity resolution that delivers hyper-personalized experiences, 
            enhanced attribution, and measurable revenue growth while maintaining strict privacy compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Start Targeting Precisely
            </Link>
            <Link 
              to="/services/competitor-monitoring"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Explore Competitor Monitoring
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};