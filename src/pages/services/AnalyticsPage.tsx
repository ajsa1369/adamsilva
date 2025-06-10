import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Zap, 
  TrendingUp, 
  Eye, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Target,
  Activity
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Faster Insights",
      description: "AI analyzes vast data volumes instantly, providing crucial insights in minutes rather than hours or days"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Cost-Efficiency", 
      description: "Automated analysis streamlines operations and prevents wasteful spending on ineffective strategies by 70%"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Proactive Strategy",
      description: "Predict future trends and address evolving customer needs before they become critical business issues"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Real-Time Optimization",
      description: "Adjust and optimize campaigns while actively running, ensuring maximum impact and responsiveness"
    }
  ];

  const features = [
    "Real-time performance monitoring with sub-2-minute data latency",
    "AI-powered predictive analytics and trend forecasting", 
    "Automated data aggregation from all marketing channels",
    "Customizable dashboards with no-code flexibility and KPI tracking",
    "Full-funnel attribution modeling and ROI measurement",
    "Intelligent alert systems with automated optimization recommendations"
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
              Real-time Analytics & Reporting
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Monitor performance via live dashboards with AI-powered insights that transform data overload into 
              actionable intelligence for faster decisions and continuous optimization.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Unlock Your Insights
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Definition */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Transforming Data into Actionable Intelligence</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              In today's rapidly evolving marketing environments, immediate access to accurate data is not merely advantageous 
              but crucial for avoiding delays, overcoming data silos, and preventing decision paralysis that can hinder strategic 
              agility. Traditional analytics often suffer from significant delays, fragmented data sources, and overwhelming 
              complexity that prevents timely, informed decision-making.
            </p>
            <p className="mb-6">
              Adam Silva Consulting's real-time analytics and reporting platform revolutionizes this paradigm by providing 
              sophisticated analytics capabilities accessible via live dashboards that continuously monitor everything from 
              agent performance to comprehensive campaign results. Our AI-powered system efficiently processes vast datasets, 
              uncovers intricate patterns, and extracts actionable insights with speed far exceeding traditional methods.
            </p>
            <p>
              This intelligent approach ensures that marketing strategies are firmly grounded in solid data, reducing reliance 
              on guesswork and intuition. By automating data aggregation and employing predictive models and machine learning 
              to identify trends and forecast outcomes, our platform transforms raw data into strategic intelligence that 
              drives measurable business results.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-Powered Analytics Intelligence</h2>
            <p className="text-lg text-gray-600">
              Our advanced AI mechanisms process massive datasets in real-time, delivering instant insights and 
              predictive analytics that enable proactive decision-making and continuous optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Advanced AI Analytics Features</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Intelligent Automation</h4>
                <p className="text-gray-700 text-sm">
                  Our <a href="https://improvado.io/blog/ai-marketing-analytics" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  AI marketing analytics platform</a> unveils opportunities hidden in vast data amounts, 
                  while <a href="https://www.appsflyer.com/blog/measurement-analytics/my-dashboards/" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">real-time dashboards</a> 
                  enable faster, smarter marketing decisions through instant data visibility.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-6 flex items-center justify-center">
                <Activity className="h-20 w-20 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3">AI Analytics Command Center</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comprehensive real-time dashboard displaying AI processing multiple data streams simultaneously, 
                generating predictive insights, identifying performance anomalies, and providing automated 
                optimization recommendations with live performance metrics and trend forecasting capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Transform Your Decision-Making Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience unprecedented speed and accuracy in data analysis with AI-powered insights that eliminate 
              delays, reduce costs, and enable proactive strategies through real-time optimization capabilities.
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
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Continuous Optimization Through Adaptive Intelligence</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                The speed of modern digital marketing demands constant adaptation to maintain relevance and effectiveness. 
                Traditional reporting, often characterized by delays, means decisions are frequently made based on outdated information. 
                Our real-time AI analytics provides a continuous feedback loop, allowing marketers to instantly identify 
                underperforming elements or emerging opportunities.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This enables a truly agile marketing approach where strategies are not static but continuously optimized for 
                maximum effectiveness. The dynamic capability ensures that clients are always ahead of the curve, adapting 
                swiftly to market changes and maximizing marketing impact through data-driven intelligence and automated 
                optimization recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Elements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Excellence Visualized</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                <Clock className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-Time Performance Monitor</h3>
              <p className="text-sm text-gray-600">
                Live dashboard interface displaying real-time marketing metrics with sub-2-minute data latency, 
                automated anomaly detection, performance trend indicators, and instant alert notifications for 
                immediate campaign optimization and strategic decision-making.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <TrendingUp className="h-16 w-16 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Predictive Analytics Engine</h3>
              <p className="text-sm text-gray-600">
                Advanced forecasting interface showing AI analyzing historical patterns, market trends, and 
                customer behavior to predict future performance, identify emerging opportunities, and provide 
                strategic recommendations for proactive marketing optimization and planning.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <BarChart3 className="h-16 w-16 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Channel Attribution Hub</h3>
              <p className="text-sm text-gray-600">
                Comprehensive attribution dashboard displaying unified data from all marketing channels, 
                AI-powered customer journey mapping, ROI calculations across touchpoints, and automated 
                insights for optimizing budget allocation and campaign effectiveness measurement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Unlock Real-Time Intelligence?
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Transform your analytics capabilities with AI-powered real-time insights that deliver faster decisions, 
            proactive strategies, and continuous optimization. Experience the future of intelligent marketing analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Start Analyzing Today
            </Link>
            <Link 
              to="/services/intent-targeting"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Explore Intent Targeting
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};