import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Zap, 
  Heart, 
  DollarSign, 
  ArrowRight, 
  CheckCircle,
  MessageCircle,
  Handshake,
  TrendingUp
} from 'lucide-react';

export const OutreachPage: React.FC = () => {
  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Hyper-Efficiency",
      description: "Reduce manual outreach time from 9 hours to 5 minutes while scaling partnership efforts by 1000%"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Enhanced Personalization", 
      description: "AI provides tailored experiences by understanding content and tone, leading to 5x more authentic connections"
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Cost-Effectiveness",
      description: "Drastically different economics compared to traditional platforms, reducing partnership acquisition costs by 80%"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Strategic Matching",
      description: "Autonomous identification of ideal partners results in 90% better alignment with campaign objectives"
    }
  ];

  const features = [
    "AI-powered influencer and partner identification and scouting",
    "Automated personalized outreach with natural language communication", 
    "Intelligent relationship management and engagement tracking",
    "Performance monitoring and campaign result optimization",
    "Multi-channel outreach across email, social media, and direct messaging",
    "Predictive partnership success scoring and recommendation engine"
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
              Outreach & Partnerships
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with relevant influencers and potential business partners through sophisticated AI-driven scouting 
              and personalized outreach that builds authentic, profitable relationships at scale.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Build Your Network
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Definition */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-Powered Partnership Ecosystem Building</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              The influencer marketing industry, while booming with tremendous potential, has historically been characterized 
              by cumbersome, inefficient, and difficult-to-scale traditional engagement methods. Manual influencer discovery, 
              outreach, and relationship management often consume enormous resources while delivering inconsistent results 
              and limited scalability for growing businesses.
            </p>
            <p className="mb-6">
              Adam Silva Consulting's AI-powered outreach and partnerships platform revolutionizes this process by deploying 
              intelligent agents that communicate with influencers and potential partners using natural language, autonomously 
              managing tasks such as booking campaigns, tracking results, processing payments, and answering queries. Our 
              sophisticated AI models analyze and understand content, tone of voice, and audience alignment to enable more 
              tailored and authentic communication.
            </p>
            <p>
              Beyond influencer partnerships, our platform assists in identifying suitable business partners through comprehensive 
              data analysis, trend prediction, and audience engagement assessment. This comprehensive approach transforms 
              partnership development from a manual, hit-or-miss process into a strategic, scalable, and highly effective 
              growth engine that expands market reach and drives measurable business results.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Intelligent Partnership Development System</h2>
            <p className="text-lg text-gray-600">
              Our advanced AI mechanisms identify, evaluate, and engage with ideal partners and influencers, 
              creating authentic relationships that drive mutual growth and measurable business outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Advanced AI Partnership Features</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Authentic Communication</h4>
                <p className="text-gray-700 text-sm">
                  Our <a href="https://talent500.com/blog/amt-ai-influencer-marketing-platform/" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  AI-driven influencer platform</a> comprehends tone of voice and content style for authentic communication, 
                  while <a href="https://www.saleshandy.com/blog/ai-outreach-tools/" target="_blank" 
                  rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">AI outreach automation</a> 
                  delivers personalized messaging that builds genuine relationships at scale.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-6 flex items-center justify-center">
                <Handshake className="h-20 w-20 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3">AI Partnership Intelligence Center</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comprehensive platform displaying AI analyzing potential partners and influencers across multiple criteria - 
                audience alignment, engagement rates, content quality, and brand compatibility - while automating 
                personalized outreach and relationship management for maximum partnership success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Transform Your Partnership Strategy</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience unprecedented efficiency and authenticity in partnership development with AI-powered outreach 
              that builds meaningful relationships, expands market reach, and drives measurable business growth.
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
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Authentic Personalization at Scale</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                A common challenge in scaled outreach is the sacrifice of personalization, which often leads to generic, 
                ineffective communications that fail to resonate with recipients. Our AI overcomes this by generating highly 
                personalized outreach that meticulously considers the recipient's context, preferences, and even emotional tone, 
                ensuring that automated outreach feels authentic and human.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This capability transforms partnership development by fostering genuine connections rather than merely sending 
                mass messages. The result is demonstrably better response rates, stronger and more productive partnerships, 
                and a more positive brand perception in outreach efforts, ultimately leading to more fruitful and enduring 
                collaborations that drive sustained business growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Elements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Partnership Excellence Visualized</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                <MessageCircle className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Outreach Automation Engine</h3>
              <p className="text-sm text-gray-600">
                Advanced interface showing AI crafting personalized outreach messages across multiple channels, 
                analyzing recipient preferences and communication styles, while tracking engagement rates and 
                automatically optimizing messaging for maximum response effectiveness.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Influencer Discovery Matrix</h3>
              <p className="text-sm text-gray-600">
                Comprehensive discovery dashboard displaying AI analyzing thousands of potential influencers and partners 
                across multiple criteria - audience demographics, engagement quality, content alignment, and brand safety - 
                with automated scoring and recommendation systems for optimal partnership selection.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <TrendingUp className="h-16 w-16 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Partnership Performance Analytics</h3>
              <p className="text-sm text-gray-600">
                Real-time analytics interface tracking partnership ROI, engagement metrics, conversion rates, and 
                relationship health scores with AI-generated insights for optimization and automated recommendations 
                for expanding successful partnerships and improving underperforming collaborations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Build Powerful Partnerships?
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Transform your outreach strategy with AI-powered partnership development that delivers authentic connections, 
            expanded market reach, and measurable business growth through intelligent automation and personalized engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Start Building Partnerships
            </Link>
            <Link 
              to="/services/security-compliance"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Explore Security & Compliance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};