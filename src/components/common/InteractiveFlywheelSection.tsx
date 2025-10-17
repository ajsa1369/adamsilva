import React, { useState } from 'react';
import { Brain, Users, BarChart3, Target, Zap, Shield, TrendingUp, MessageSquare, Globe, Database, Cog, Sparkles } from 'lucide-react';

const InteractiveFlywheelSection: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  
  // Define all services with their connections/relationships
  const services = [
    {
      id: 'tracking',
      title: 'Intelligent Master Tracking',
      icon: <Database className="w-6 h-6" />,
      description: 'Unified customer data platform',
      position: { angle: 0, radius: 280 },
      relatedServices: ['analytics', 'automation', 'identity']
    },
    {
      id: 'communication',
      title: 'Omnichannel Communication',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Multi-channel engagement',
      position: { angle: 30, radius: 280 },
      relatedServices: ['website', 'campaign', 'tracking']
    },
    {
      id: 'website',
      title: 'AI Website & Landing Pages',
      icon: <Globe className="w-6 h-6" />,
      description: 'Intelligent web experiences',
      position: { angle: 60, radius: 280 },
      relatedServices: ['communication', 'analytics', 'testing']
    },
    {
      id: 'campaign',
      title: 'Campaign Management',
      icon: <Target className="w-6 h-6" />,
      description: 'Orchestrated marketing',
      position: { angle: 90, radius: 280 },
      relatedServices: ['communication', 'analytics', 'automation']
    },
    {
      id: 'analytics',
      title: 'Predictive Analytics',
      icon: <BarChart3 className="w-6 h-6" />,
      description: 'AI-powered insights',
      position: { angle: 120, radius: 280 },
      relatedServices: ['tracking', 'campaign', 'testing']
    },
    {
      id: 'automation',
      title: 'Marketing Automation',
      icon: <Zap className="w-6 h-6" />,
      description: 'Intelligent workflows',
      position: { angle: 150, radius: 280 },
      relatedServices: ['campaign', 'identity', 'tracking']
    },
    {
      id: 'testing',
      title: 'A/B Testing & Optimization',
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'Continuous improvement',
      position: { angle: 180, radius: 280 },
      relatedServices: ['website', 'analytics', 'campaign']
    },
    {
      id: 'identity',
      title: 'Identity Resolution',
      icon: <Users className="w-6 h-6" />,
      description: 'Unified customer view',
      position: { angle: 210, radius: 280 },
      relatedServices: ['tracking', 'automation', 'communication']
    },
    {
      id: 'compliance',
      title: 'Compliance Management',
      icon: <Shield className="w-6 h-6" />,
      description: 'Automated protection',
      position: { angle: 240, radius: 280 },
      relatedServices: ['tracking', 'communication', 'identity']
    },
    {
      id: 'integration',
      title: 'System Integration',
      icon: <Cog className="w-6 h-6" />,
      description: 'Seamless connectivity',
      position: { angle: 270, radius: 280 },
      relatedServices: ['tracking', 'automation', 'compliance']
    },
    {
      id: 'intelligence',
      title: 'Marketing Intelligence',
      icon: <Brain className="w-6 h-6" />,
      description: 'Strategic insights',
      position: { angle: 300, radius: 280 },
      relatedServices: ['analytics', 'campaign', 'testing']
    },
    {
      id: 'personalization',
      title: 'AI Personalization',
      icon: <Sparkles className="w-6 h-6" />,
      description: 'Hyper-targeted experiences',
      position: { angle: 330, radius: 280 },
      relatedServices: ['communication', 'website', 'identity']
    }
  ];

  // Helper function to calculate position
  const getPosition = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius
    };
  };

  // Check if a service should be highlighted
  const isRelated = (serviceId: string) => {
    if (!hoveredService) return false;
    if (serviceId === hoveredService) return true;
    const hoveredServiceData = services.find(s => s.id === hoveredService);
    return hoveredServiceData?.relatedServices.includes(serviceId) ?? false;
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.5) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Service Ecosystem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hover over any service to see how our integrated solutions work together 
            to create a powerful AI-driven marketing ecosystem
          </p>
        </div>

        {/* Flywheel Container */}
        <div className="relative" style={{ height: '700px' }}>
          {/* Central Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-gradient-to-br from-blue-600 to-teal-600 text-white rounded-full w-48 h-48 flex items-center justify-center shadow-2xl border-4 border-white">
              <div className="text-center">
                <Brain className="w-16 h-16 mx-auto mb-2" />
                <div className="font-bold text-lg">AI Authority</div>
                <div className="text-sm opacity-90">Flywheel</div>
              </div>
            </div>
          </div>

          {/* Connection Lines (drawn behind service cards) */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {hoveredService && services.find(s => s.id === hoveredService)?.relatedServices.map((relatedId) => {
              const hoveredPos = getPosition(
                services.find(s => s.id === hoveredService)!.position.angle,
                services.find(s => s.id === hoveredService)!.position.radius
              );
              const relatedPos = getPosition(
                services.find(s => s.id === relatedId)!.position.angle,
                services.find(s => s.id === relatedId)!.position.radius
              );
              
              return (
                <line
                  key={`${hoveredService}-${relatedId}`}
                  x1={`calc(50% + ${hoveredPos.x}px)`}
                  y1={`calc(50% + ${hoveredPos.y}px)`}
                  x2={`calc(50% + ${relatedPos.x}px)`}
                  y2={`calc(50% + ${relatedPos.y}px)`}
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.6"
                  className="animate-pulse"
                />
              );
            })}
            
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Service Cards */}
          {services.map((service) => {
            const position = getPosition(service.position.angle, service.position.radius);
            const isHighlighted = isRelated(service.id);
            const isHovered = service.id === hoveredService;

            return (
              <div
                key={service.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  isHighlighted || !hoveredService ? 'scale-100 opacity-100 z-20' : 'scale-90 opacity-40 z-0'
                } ${isHovered ? 'scale-110 z-30' : ''}`}
                style={{
                  left: `calc(50% + ${position.x}px)`,
                  top: `calc(50% + ${position.y}px)`,
                }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div 
                  className={`bg-white rounded-xl shadow-lg border-2 p-4 w-48 cursor-pointer transition-all duration-300 ${
                    isHovered 
                      ? 'border-blue-500 shadow-2xl' 
                      : isHighlighted 
                        ? 'border-teal-400 shadow-xl' 
                        : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className={`${
                    isHovered 
                      ? 'bg-gradient-to-br from-blue-600 to-teal-600' 
                      : isHighlighted 
                        ? 'bg-gradient-to-br from-teal-500 to-blue-500' 
                        : 'bg-gray-100'
                  } text-white p-3 rounded-lg mb-3 transition-colors duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {service.description}
                  </p>
                  
                  {/* Connection indicator */}
                  {isHighlighted && !isHovered && (
                    <div className="mt-2 text-xs text-teal-600 font-medium">
                      ✓ Connected
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            {hoveredService 
              ? `${services.find(s => s.id === hoveredService)?.title} connects with ${services.find(s => s.id === hoveredService)?.relatedServices.length} related services`
              : 'Hover over any service to see its connections'}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default InteractiveFlywheelSection;