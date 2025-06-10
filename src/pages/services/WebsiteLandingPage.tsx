import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Zap, 
  TrendingUp, 
  Target, 
  ArrowRight, 
  CheckCircle,
  Smartphone,
  BarChart3,
  Palette
} from 'lucide-react';

export const WebsiteLandingPage: React.FC = () => {
  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Rapid Deployment",
      description: "Create professional, high-converting web assets in minutes, reducing development time by 95%"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Optimized Performance", 
      description: "AI-generated content inherently optimized for user experience, SEO visibility, and conversion goals"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Democratized Design",
      description: "Achieve stunning results without extensive design or coding expertise through intelligent automation"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Continuous Improvement",
      description: "Automated A/B testing and AI-driven feedback loops constantly refine pages for maximum impact"
    }
  ];

  const features = [
    "Automated website design and professional logo creation",
    "SEO-friendly content generation with keyword optimization", 
    "Instant competitor design cloning and analysis",
    "Automated A/B testing for continuous optimization",
    "Mobile-responsive design with accessibility compliance",
    "Real-time performance monitoring and conversion tracking"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-xl w-fit mx-auto mb-6">
              <Globe className="h-12 w-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              AI-Driven Website & Landing Pages
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Instantly generate high-converting landing pages, clone competitor designs, and automatically A/B test elements 
              for maximum performance with our intelligent web development platform.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create Your Website Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Definition */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Revolutionary Web Development Through AI</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              Landing pages are pivotal assets in digital marketing, directly influencing lead quality, conversion rates, 
              and overall profitability for lead generation campaigns. Traditional web development often requires weeks 
              or months of design, development, and testing cycles, creating bottlenecks that prevent rapid market response.
            </p>
            <p className="mb-6">
              Adam Silva Consulting's AI-driven platform revolutionizes this process by autonomously designing entire websites, 
              creating professional logos, securing domain names, and hosting sites based on simple business descriptions. 
              This eliminates the need for specialized technical skills while delivering professional-grade results.
            </p>
            <p>
              Our intelligent system generates all necessary website copy and images, meticulously tailoring them to specific 
              business needs and incorporating SEO-friendly keywords to ensure high search engine rankings. This comprehensive 
              approach transforms web development from a complex, time-consuming process into an instant, intelligent solution.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-Powered Development Mechanisms</h2>
            <p className="text-lg text-gray-600">
              Our advanced AI algorithms handle every aspect of web development, from design and content creation 
              to optimization and testing, delivering professional results in minutes rather than months.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Core AI Development Features</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Advanced Optimization</h4>
                <p className="text-gray-700 text-sm">
                  Our platform enables <a href="https://blog.clickpointsoftware.com/use-ai-prompts-to-build-high-converting-landing-pages-for-lead-gen" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  AI-powered lead generation optimization</a> through automated testing and refinement, 
                  while <a href="https://landingsite.ai/" target="_blank" rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-700">advanced AI website builders</a> 
                  create stunning, conversion-focused designs with no technical skills required.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-6 flex items-center justify-center">
                <Palette className="h-20 w-20 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3">AI Design Intelligence Hub</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sophisticated interface showing AI analyzing competitor designs, generating multiple layout variations, 
                optimizing color schemes and typography, while simultaneously creating SEO-optimized content and 
                conducting real-time A/B tests to identify the highest-converting design elements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Transformative Business Advantages</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience unprecedented speed, quality, and performance in web development through intelligent automation 
              that delivers professional results without the traditional complexity and cost.
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
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Competitive Intelligence Integration</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our AI platform not only creates original designs but also analyzes competitor strategies to identify 
                high-performing elements. Through <a href="https://narrato.io/blog/using-ai-landing-page-builder-how-to-avoid-the-most-common-mistakes/" 
                target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                intelligent AI landing page optimization</a>, we help avoid common pitfalls while incorporating 
                proven conversion strategies.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The platform's <a href="https://getgenie.ai/ai-content-generation-for-landing-pages/" 
                target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                AI content generation capabilities</a> ensure that every page is not just visually appealing, 
                but also optimized for search engines and conversion goals, creating a comprehensive digital presence 
                that drives measurable business results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Elements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Web Development Visualized</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                <Smartphone className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Responsive Design Generator</h3>
              <p className="text-sm text-gray-600">
                AI-powered interface displaying real-time responsive design generation across multiple device formats, 
                with automatic optimization for mobile, tablet, and desktop viewports while maintaining conversion 
                elements and accessibility compliance standards.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Target className="h-16 w-16 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">A/B Testing Dashboard</h3>
              <p className="text-sm text-gray-600">
                Advanced analytics interface showing multiple page variations being tested simultaneously, 
                with real-time conversion data, statistical significance indicators, and AI recommendations 
                for optimal design elements and content placement.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Globe className="h-16 w-16 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Competitor Analysis Engine</h3>
              <p className="text-sm text-gray-600">
                Sophisticated analysis dashboard displaying competitor website teardowns, design element comparisons, 
                conversion funnel analysis, and AI-generated recommendations for incorporating winning strategies 
                while maintaining brand uniqueness and differentiation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Launch Your High-Converting Website Today
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Join thousands of businesses who have transformed their online presence with AI-powered web development. 
            Experience the future of website creation with intelligent design, automated optimization, and instant deployment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Start Building Now
            </Link>
            <Link 
              to="/services/campaign-management"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Explore Campaign Management
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};