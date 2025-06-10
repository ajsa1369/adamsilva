import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Zap, 
  TrendingUp, 
  Target, 
  ArrowRight, 
  CheckCircle,
  Brain,
  Users,
  Settings
} from 'lucide-react';

export const CampaignManagementPage: React.FC = () => {
  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Faster Decision Making",
      description: "AI rapidly analyzes data and recommends actionable insights, enabling quick campaign adjustments with 85% faster response times"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Improved ROI", 
      description: "AI identifies key insights and optimizes media buys, ensuring maximum returns on campaign expenditures with proven 200% ROI improvements"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Enhanced CRM Integration",
      description: "AI automates routine tasks, reduces human error, and delivers personalized messages while identifying at-risk customers proactively"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Precise Audience Segmentation",
      description: "AI intelligently categorizes customers by traits, interests, and behaviors, enabling highly targeted and effective campaigns"
    }
  ];

  const features = [
    "AI-powered customer behavior prediction and personalization",
    "Real-time campaign optimization and performance adjustment", 
    "Automated content creation and scheduling across channels",
    "Predictive lead scoring and opportunity identification",
    "Dynamic send time optimization for maximum engagement",
    "Comprehensive ROI tracking and attribution modeling"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-xl w-fit mx-auto mb-6">
              <BarChart3 className="h-12 w-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Intelligent Campaign Management
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Orchestrate complex marketing funnels, optimize campaigns in real-time, and receive AI-driven feedback 
              for continuous improvement that transforms your marketing performance.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Optimize Your Campaigns
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Definition */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Intelligent Campaign Management?</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              Campaign management encompasses the entire lifecycle of a marketing initiative, from initial planning and execution 
              to ongoing optimization activities, all aimed at ensuring a cohesive and impactful message reaches the target audience 
              effectively. Traditional campaign management often involves manual processes, delayed insights, and reactive adjustments 
              that limit marketing effectiveness.
            </p>
            <p className="mb-6">
              Adam Silva Consulting's intelligent campaign management platform transforms this approach by leveraging advanced AI 
              to analyze extensive customer data, predict behaviors, recommend optimal actions, and personalize content for each lead 
              in real-time. This creates a proactive, data-driven marketing ecosystem that continuously optimizes for maximum performance.
            </p>
            <p>
              Our AI-powered system provides comprehensive campaign orchestration that goes beyond simple automation to deliver 
              true intelligence - understanding customer intent, predicting optimal engagement timing, and automatically adjusting 
              strategies based on real-time performance data across all marketing channels.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-Driven Campaign Orchestration</h2>
            <p className="text-lg text-gray-600">
              Our sophisticated AI mechanisms analyze customer data, optimize timing, create content, and provide real-time insights 
              that transform campaigns from reactive initiatives to proactive growth engines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Advanced AI Campaign Features</h3>
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
                  Our platform provides <a href="https://www.ibm.com/think/topics/ai-in-marketing" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  comprehensive AI marketing capabilities</a> that link marketing efforts to specific tactics, 
                  while <a href="https://www.teamwork.com/blog/campaign-management-software/" target="_blank" 
                  rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">advanced campaign management tools</a> 
                  enable real-time optimization and performance tracking across all channels.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-6 flex items-center justify-center">
                <Brain className="h-20 w-20 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3">AI Campaign Orchestration Center</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comprehensive dashboard displaying AI analyzing customer journeys, predicting optimal touchpoints, 
                automatically adjusting campaign elements in real-time, and providing predictive insights for 
                future campaign performance across multiple channels and audience segments simultaneously.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Measurable Campaign Success</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your marketing performance with AI-driven insights that deliver faster decisions, higher ROI, 
              and more effective customer engagement through intelligent automation and predictive optimization.
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
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Holistic Marketing Ecosystem Optimization</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Unlike traditional campaign management that optimizes individual elements in isolation, our AI-powered platform 
                optimizes the entire marketing ecosystem. By integrating data from CRM, email, social media, and advertising platforms, 
                AI identifies synergistic opportunities and bottlenecks across the complete customer journey.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This integrated approach ensures that improvements in one area, such as ad targeting, are leveraged to enhance others, 
                like lead nurturing content, leading to a compounding effect on overall marketing effectiveness and ROI rather than 
                isolated gains. The result is comprehensive business growth driven by intelligent, interconnected marketing strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Elements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Campaign Intelligence Visualized</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                <Settings className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-Time Optimization Engine</h3>
              <p className="text-sm text-gray-600">
                Dynamic interface showing AI continuously monitoring campaign performance metrics, automatically 
                adjusting bid strategies, content delivery timing, and audience targeting parameters while 
                campaigns are actively running for maximum effectiveness.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Predictive Customer Journey Map</h3>
              <p className="text-sm text-gray-600">
                Advanced visualization displaying AI-predicted customer pathways through marketing funnels, 
                with personalized touchpoint recommendations, engagement probability scores, and automated 
                nurturing sequences tailored to individual customer behaviors and preferences.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Channel Performance Dashboard</h3>
              <p className="text-sm text-gray-600">
                Comprehensive analytics interface displaying unified performance data across email, social media, 
                paid advertising, and content marketing channels, with AI-generated insights, trend predictions, 
                and automated recommendations for cross-channel optimization strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Orchestrate Intelligent Campaigns?
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Transform your marketing performance with AI-powered campaign management that delivers real-time optimization, 
            predictive insights, and measurable ROI improvements. Experience the future of intelligent marketing orchestration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Start Optimizing Today
            </Link>
            <Link 
              to="/services/seo-ppc"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Explore SEO & PPC
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};