import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Zap, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  CheckCircle,
  Clock,
  UserCheck,
  Brain
} from 'lucide-react';

export const LeadManagementPage: React.FC = () => {
  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Increased Efficiency",
      description: "Automation of repetitive tasks and intelligent lead identification optimize resource allocation by 85%"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Enhanced Scalability", 
      description: "AI-powered tools manage vast data volumes enabling effective lead management processes at enterprise scale"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Hyper-Personalization",
      description: "Tailored campaigns that resonate with specific audiences, increasing conversion rates by up to 300%"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Optimized Sales Focus",
      description: "Predictive lead scoring allows sales teams to prioritize high-value prospects, improving close rates by 40%"
    }
  ];

  const features = [
    "AI-powered predictive lead scoring and qualification",
    "Automated customer segmentation based on behavior and demographics", 
    "Intelligent chatbots for real-time engagement and lead capture",
    "Personalized email sequences with optimal timing optimization",
    "Advanced customer persona building through data analysis",
    "Predictive analytics for customer lifetime value forecasting"
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
              Precision Lead Management & Targeting
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Qualify leads, build detailed customer personas, and schedule engagement at the perfect time 
              based on sophisticated AI analysis that maximizes conversion potential.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Optimize Your Leads
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Definition */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Revolutionary Lead Management Through AI</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              AI-driven lead generation fundamentally revolutionizes how businesses attract and convert prospects by automating 
              workflows, significantly increasing efficiency, and creating hyper-personalized customer experiences at scale. 
              Traditional lead management often involves manual qualification processes, generic nurturing sequences, and 
              reactive engagement strategies that fail to capitalize on optimal conversion opportunities.
            </p>
            <p className="mb-6">
              Adam Silva Consulting's precision lead management platform transforms this approach by meticulously analyzing 
              customer behaviors and patterns to identify the most promising leads, ensuring targeted outreach occurs at precisely 
              the right moment. Our AI algorithms automate the entire lead qualification, scoring, and segmentation process, 
              allowing human teams to focus on strategic initiatives rather than manual tasks.
            </p>
            <p>
              Through sophisticated behavioral analysis and predictive modeling, our platform creates detailed customer personas, 
              delivers personalized messaging based on individual preferences and purchase history, and optimizes engagement timing 
              to maximize conversion rates. This comprehensive approach ensures that every lead receives the right message, 
              at the right time, through the right channel for maximum impact.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-Powered Lead Intelligence System</h2>
            <p className="text-lg text-gray-600">
              Our advanced AI mechanisms analyze behavioral patterns, predict conversion likelihood, and automate 
              personalized engagement strategies that transform prospects into qualified leads and loyal customers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Advanced AI Lead Features</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Predictive Intelligence</h4>
                <p className="text-gray-700 text-sm">
                  Our <a href="https://www.salesforce.com/marketing/ai/lead-generation/" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  AI lead generation platform</a> leverages predictive analytics to identify high-potential prospects, 
                  while <a href="https://www.iovox.com/blog/ai-lead-generation" target="_blank" 
                  rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">advanced lead scoring algorithms</a> 
                  ensure optimal resource allocation and conversion optimization.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-6 flex items-center justify-center">
                <Brain className="h-20 w-20 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3">AI Lead Intelligence Hub</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comprehensive dashboard displaying AI analyzing customer touchpoints, behavioral patterns, and 
                engagement history to generate predictive lead scores, optimal contact timing recommendations, 
                and personalized nurturing sequences that maximize conversion potential across all channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Measurable Lead Management Success</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your lead generation and conversion process with AI-driven insights that deliver higher quality prospects, 
              improved conversion rates, and optimized sales team productivity through intelligent automation.
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
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Hyper-Personalized Lead Nurturing at Scale</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                The inherent challenge in lead nurturing is delivering truly relevant messages at the optimal moment for each 
                individual lead - a task that becomes incredibly difficult to scale manually while maintaining effectiveness. 
                Our AI resolves this by continuously analyzing real-time behavioral data, predicting individual readiness for 
                conversion, and automating personalized outreach across multiple channels.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This approach moves beyond generic drip campaigns to dynamic, adaptive nurturing sequences that feel highly 
                relevant and timely to each prospect. The result is significantly increased conversion rates and reduced wasted 
                effort on poorly timed or irrelevant communications, delivering nurtured, high-potential leads that are far 
                more likely to convert into valuable customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Elements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lead Management Excellence Visualized</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                <UserCheck className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Predictive Lead Scoring Engine</h3>
              <p className="text-sm text-gray-600">
                Advanced interface displaying AI analyzing hundreds of behavioral signals, engagement patterns, 
                and demographic data to generate real-time lead scores with conversion probability indicators 
                and recommended next actions for optimal sales team prioritization.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Clock className="h-16 w-16 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Optimal Timing Intelligence</h3>
              <p className="text-sm text-gray-600">
                Sophisticated timing optimization dashboard showing AI predicting the best moments for email sends, 
                phone calls, and social media engagement based on individual prospect behavior patterns, 
                time zone preferences, and historical response data.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dynamic Persona Builder</h3>
              <p className="text-sm text-gray-600">
                Comprehensive persona creation interface displaying AI analyzing customer data to build detailed 
                buyer profiles with behavioral insights, pain points, preferred communication channels, and 
                personalized messaging recommendations for maximum engagement effectiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Lead Management?
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Experience the power of AI-driven lead qualification, scoring, and nurturing that delivers higher conversion rates, 
            optimized sales productivity, and measurable revenue growth through intelligent automation and personalization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Optimize Your Leads Now
            </Link>
            <Link 
              to="/services/outreach-partnerships"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Explore Outreach & Partnerships
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};