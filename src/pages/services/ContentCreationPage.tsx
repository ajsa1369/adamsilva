import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PenTool, 
  Zap, 
  Globe, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Image,
  Video,
  FileText
} from 'lucide-react';
import ServiceSchema from '../../components/seo/ServiceSchema';
import FAQSchema, { FAQ } from '../../components/seo/FAQSchema';

export const ContentCreationPage: React.FC = () => {
  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Faster Content Creation",
      description: "AI automates initial content creation, reducing production time by 90% while maintaining high quality and brand consistency"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Enhanced Optimization", 
      description: "AI analyzes keywords and content structure to improve search rankings and organic traffic by up to 150%"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Reach",
      description: "Multilingual capabilities and localization features enable effective engagement with international audiences at scale"
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Creative Scalability",
      description: "Generate endless content variations and overcome creative blocks with AI-powered ideation and brand-consistent execution"
    }
  ];

  const features = [
    "AI-powered ad copy and social media post generation",
    "Automated blog content and FAQ creation with SEO optimization", 
    "Visual content creation and enhancement for social platforms",
    "Multilingual content translation and cultural localization",
    "Brand voice consistency across all content types and channels",
    "Real-time audience engagement analysis and response generation"
  ];

  const faqs: FAQ[] = [
    {
      question: "How does AI-powered content creation maintain brand consistency at scale?",
      answer: "Our AI platform learns your brand voice, tone, and messaging guidelines to ensure every piece of content - from social media posts to blog articles - maintains consistent brand identity. The AI analyzes your existing content patterns and applies them across all new content generation, while human oversight ensures quality control."
    },
    {
      question: "What types of content can your AI create for my business?",
      answer: "Our AI creates comprehensive content including ad copy, social media posts, blog articles, email sequences, video scripts, visual content enhancements, FAQ responses, product descriptions, and multilingual translations. The system handles both text and visual content optimization for maximum engagement."
    },
    {
      question: "How quickly can I generate content with your AI platform?",
      answer: "AI automates initial content creation, reducing production time by 90%. You can generate blog posts in minutes, create social media content in seconds, and produce ad copy variations instantly. The platform enables endless content variations while maintaining quality and brand consistency."
    },
    {
      question: "Does AI-generated content help with SEO and search rankings?",
      answer: "Yes, our AI analyzes keywords and content structure to improve search rankings and organic traffic by up to 150%. The platform optimizes content for search engines while maintaining natural readability, incorporates relevant keywords strategically, and structures content for featured snippets and voice search optimization."
    }
  ];

  return (
    <div className="bg-white">
      {/* SEO Schema Markup */}
      <ServiceSchema 
        name="Content & Media Creation"
        description="Generate compelling ad copy, social posts, blogs, and stunning images and videos at scale with AI-powered content creation that maintains brand consistency and drives engagement."
        url="/services/content-creation"
        offers={[
          {
            name: "AI-Powered Content Generation",
            description: "Automated ad copy, social media posts, and blog content creation with brand consistency",
            category: "Content Creation"
          },
          {
            name: "Visual Content Enhancement",
            description: "AI-driven visual content creation and enhancement for social platforms",
            category: "Media Production"
          },
          {
            name: "Multilingual Content Services",
            description: "Content translation and cultural localization for global audiences",
            category: "Localization"
          },
          {
            name: "SEO Content Optimization",
            description: "Content optimization for search rankings and organic traffic growth",
            category: "Search Optimization"
          }
        ]}
      />
      
      <FAQSchema 
        faqs={faqs}
        pageUrl="https://www.adamsilvaconsulting.com/services/content-creation"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-xl w-fit mx-auto mb-6">
              <PenTool className="h-12 w-12" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Content & Media Creation
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Generate compelling ad copy, social posts, blogs, and stunning images and videos at scale 
              with AI-powered content creation that maintains brand consistency and drives engagement.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create Content Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Definition */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-Powered Content Excellence at Scale</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              High-quality, engaging content serves as the cornerstone of effective digital marketing, driving brand awareness, 
              customer engagement, and ultimately conversions. Traditional content creation often struggles with scalability, 
              consistency, and the sheer volume required to maintain a competitive presence across multiple channels and platforms.
            </p>
            <p className="mb-6">
              Adam Silva Consulting's AI-powered content and media creation platform revolutionizes this process by generating 
              compelling ad copy, social media posts, blog articles, and even stunning visual and video content within minutes. 
              Our sophisticated AI adapts writing style to match brand voice and tone while ensuring consistency across all 
              channels and formats.
            </p>
            <p>
              Beyond text content, our platform creates and enhances visuals for social posts, generates realistic videos from 
              text prompts, and provides multilingual content translation to expand global reach. This comprehensive approach 
              transforms content creation from a resource-intensive bottleneck into a scalable, intelligent content engine.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Intelligent Content Generation Systems</h2>
            <p className="text-lg text-gray-600">
              Our advanced AI mechanisms create, optimize, and distribute content across all formats and channels, 
              ensuring brand consistency and maximum engagement through data-driven personalization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Advanced AI Content Features</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Hyper-Personalization Engine</h4>
                <p className="text-gray-700 text-sm">
                  Our platform leverages <a href="https://www.adroll.com/blog/ai-generated-content-pros-and-cons" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  AI-generated content optimization</a> to ensure accuracy and consistency across marketing mediums, 
                  while <a href="https://buffer.com/resources/ai-social-media-content-creation/" target="_blank" 
                  rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">AI social media tools</a> 
                  provide endless variations and maintain brand consistency at scale.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-6 flex items-center justify-center">
                <FileText className="h-20 w-20 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3">AI Content Creation Studio</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comprehensive creative workspace displaying AI generating multiple content formats simultaneously - 
                from social media posts and ad copy to blog articles and video scripts - while maintaining 
                brand voice consistency and optimizing for platform-specific engagement patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Transform Your Content Strategy</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience unprecedented content creation speed, quality, and consistency with AI-powered generation 
              that scales with your business while maintaining brand authenticity and engagement effectiveness.
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
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Data-Driven Content Personalization</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Beyond simple content generation, our AI imbues the creation process with advanced intelligence by analyzing 
                audience data, preferences, and engagement patterns to tailor content for specific customer segments or individual users. 
                This <a href="https://sproutsocial.com/insights/ai-content-marketing/" target="_blank" rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-700">AI content marketing approach</a> transforms static broadcasts 
                into dynamic, interactive experiences.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The platform's ability to generate timely, relevant responses and analyze audience interactions creates 
                significantly higher engagement rates, stronger customer relationships, and more effective marketing outcomes. 
                Content truly connects with target audiences on a deeper, more meaningful level through intelligent personalization 
                and contextual relevance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Elements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Creation Excellence Visualized</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg mb-4 flex items-center justify-center">
                <Image className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Format Content Generator</h3>
              <p className="text-sm text-gray-600">
                Dynamic interface showing AI simultaneously creating blog posts, social media captions, ad copy, 
                and email campaigns from a single brief, with real-time brand voice adaptation and platform-specific 
                optimization for maximum engagement across all channels.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Video className="h-16 w-16 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Video Production Studio</h3>
              <p className="text-sm text-gray-600">
                Advanced video creation interface displaying AI transforming text prompts into realistic video content, 
                with automated scene composition, voice synthesis, and visual effects generation for professional-quality 
                marketing videos without traditional production complexity.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Globe className="h-16 w-16 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Global Localization Engine</h3>
              <p className="text-sm text-gray-600">
                Comprehensive translation and localization dashboard showing AI adapting content for multiple languages 
                and cultural contexts, with regional preference analysis, cultural sensitivity checks, and automated 
                content versioning for global market expansion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Learn more about our AI-powered content and media creation services
            </p>
          </div>
          
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Scale Your Content Creation?
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Transform your content strategy with AI-powered creation that delivers engaging, on-brand content at unprecedented 
            speed and scale. Experience the future of intelligent content marketing that drives real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Start Creating Today
            </Link>
            <Link 
              to="/services/lead-management"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Explore Lead Management
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};