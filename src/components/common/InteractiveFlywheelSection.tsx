import React, { useState, useEffect } from 'react';
import { Brain, Users, BarChart3, Target, Zap, Shield, TrendingUp, MessageSquare, Globe, Database, Cog, Sparkles } from 'lucide-react';

// CACHE BUSTER: v2.0 - Force fresh deployment with all animations
const InteractiveFlywheelSection: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [pulseScale, setPulseScale] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale(prev => prev === 1 ? 1.05 : 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  const services = [
    {
      id: 'tracking',
      title: 'Intelligent Master Tracking',
      icon: <Database className="w-5 h-5" />,
      description: 'Unified customer data platform',
      position: { angle: 0, radius: 240 },
      relatedServices: ['analytics', 'automation', 'identity'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'communication',
      title: 'Omnichannel Communication',
      icon: <MessageSquare className="w-5 h-5" />,
      description: 'Multi-channel engagement',
      position: { angle: 30, radius: 240 },
      relatedServices: ['website', 'campaign', 'tracking'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'website',
      title: 'AI Website & Landing Pages',
      icon: <Globe className="w-5 h-5" />,
      description: 'Intelligent web experiences',
      position: { angle: 60, radius: 240 },
      relatedServices: ['communication', 'analytics', 'testing'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'campaign',
      title: 'Campaign Management',
      icon: <Target className="w-5 h-5" />,
      description: 'Orchestrated marketing',
      position: { angle: 90, radius: 240 },
      relatedServices: ['communication', 'analytics', 'automation'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'analytics',
      title: 'Predictive Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'AI-powered insights',
      position: { angle: 120, radius: 240 },
      relatedServices: ['tracking', 'campaign', 'testing'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'automation',
      title: 'Marketing Automation',
      icon: <Zap className="w-5 h-5" />,
      description: 'Intelligent workflows',
      position: { angle: 150, radius: 240 },
      relatedServices: ['campaign', 'identity', 'tracking'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'testing',
      title: 'A/B Testing & Optimization',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Continuous improvement',
      position: { angle: 180, radius: 240 },
      relatedServices: ['website', 'analytics', 'campaign'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'identity',
      title: 'Identity Resolution',
      icon: <Users className="w-5 h-5" />,
      description: 'Unified customer view',
      position: { angle: 210, radius: 240 },
      relatedServices: ['tracking', 'automation', 'communication'],
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: 'compliance',
      title: 'Compliance Management',
      icon: <Shield className="w-5 h-5" />,
      description: 'Automated protection',
      position: { angle: 240, radius: 240 },
      relatedServices: ['tracking', 'communication', 'identity'],
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'integration',
      title: 'System Integration',
      icon: <Cog className="w-5 h-5" />,
      description: 'Seamless connectivity',
      position: { angle: 270, radius: 240 },
      relatedServices: ['tracking', 'automation', 'compliance'],
      color: 'from-violet-500 to-purple-500'
    },
    {
      id: 'intelligence',
      title: 'Marketing Intelligence',
      icon: <Brain className="w-5 h-5" />,
      description: 'Strategic insights',
      position: { angle: 300, radius: 240 },
      relatedServices: ['analytics', 'campaign', 'testing'],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'personalization',
      title: 'AI Personalization',
      icon: <Sparkles className="w-5 h-5" />,
      description: 'Hyper-targeted experiences',
      position: { angle: 330, radius: 240 },
      relatedServices: ['communication', 'website', 'identity'],
      color: 'from-amber-500 to-yellow-500'
    }
  ];

  const getPosition = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius
    };
  };

  const isRelated = (serviceId: string) => {
    if (!hoveredService) return false;
    if (serviceId === hoveredService) return true;
    const hoveredServiceData = services.find(s => s.id === hoveredService);
    return hoveredServiceData?.relatedServices.includes(serviceId) ?? false;
  };

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.3),transparent_50%)] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.3),transparent_50%)] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 animate-fade-in">
            Interactive Service Ecosystem
          </h2>
          <p className="text-base md:text-xl text-blue-200 max-w-3xl mx-auto animate-fade-in-delay px-4">
            Hover over any service to see the powerful connections in our AI-driven marketing ecosystem
          </p>
        </div>

        {/* Flywheel Container - Responsive sizing */}
        <div className="relative w-full mx-auto" style={{ height: 'clamp(600px, 80vw, 750px)', maxWidth: '100%' }}>
          {/* Orbital rings - Responsive */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="absolute rounded-full border border-blue-500/20 animate-spin-slow" 
                 style={{ width: 'min(90vw, 550px)', height: 'min(90vw, 550px)', marginLeft: 'min(-45vw, -275px)', marginTop: 'min(-45vw, -275px)' }} />
            <div className="absolute rounded-full border border-purple-500/20 animate-spin-slower" 
                 style={{ width: 'min(75vw, 450px)', height: 'min(75vw, 450px)', marginLeft: 'min(-37.5vw, -225px)', marginTop: 'min(-37.5vw, -225px)' }} />
            <div className="absolute rounded-full border border-cyan-500/20 animate-spin-reverse" 
                 style={{ width: 'min(60vw, 350px)', height: 'min(60vw, 350px)', marginLeft: 'min(-30vw, -175px)', marginTop: 'min(-30vw, -175px)' }} />
          </div>

          {/* Central Hub - Responsive */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div 
              className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 transition-transform duration-300"
              style={{ 
                transform: `scale(${pulseScale})`,
                width: 'clamp(140px, 20vw, 220px)',
                height: 'clamp(140px, 20vw, 220px)'
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-50 blur-2xl animate-pulse"></div>
              
              {/* Rotating ring */}
              <div 
                className="absolute inset-0 rounded-full border-2 md:border-4 border-dashed border-white/30"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
              
              {/* Content */}
              <div className="relative text-center z-10 px-2">
                <Brain className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 text-white drop-shadow-lg animate-float" />
                <div className="font-bold text-base md:text-xl text-white drop-shadow-lg">AI Authority</div>
                <div className="text-xs md:text-base text-blue-100 drop-shadow">Flywheel</div>
              </div>
            </div>
          </div>

          {/* Connection Lines with Animation */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {hoveredService && services.find(s => s.id === hoveredService)?.relatedServices.map((relatedId, index) => {
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
                  stroke="url(#line-gradient)"
                  strokeWidth="3"
                  filter="url(#glow)"
                  className="animate-draw-line"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              );
            })}</svg>

          {/* Service Cards - Responsive */}
          {services.map((service, index) => {
            const position = getPosition(service.position.angle, service.position.radius);
            const isHighlighted = isRelated(service.id);
            const isHovered = service.id === hoveredService;

            return (
              <div
                key={service.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${
                  isHighlighted || !hoveredService ? 'scale-100 opacity-100 z-20' : 'scale-75 opacity-30 z-0 blur-sm'
                } ${isHovered ? 'scale-110 md:scale-125 z-30' : ''}`}
                style={{
                  left: `calc(50% + ${position.x}px)`,
                  top: `calc(50% + ${position.y}px)`,
                  animation: !hoveredService ? `float ${3 + index * 0.2}s ease-in-out infinite` : 'none',
                  animationDelay: `${index * 0.1}s`
                }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                onTouchStart={() => setHoveredService(service.id)}
              >
                <div 
                  className={`relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-2xl border-2 p-3 md:p-5 w-40 md:w-52 cursor-pointer transition-all duration-500 overflow-hidden group ${
                    isHovered 
                      ? 'border-white shadow-[0_0_30px_rgba(59,130,246,0.6)]' 
                      : isHighlighted 
                        ? 'border-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.4)]' 
                        : 'border-gray-700 hover:border-blue-500/50'
                  }`}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                  <div className={`relative bg-gradient-to-br ${
                    isHovered 
                      ? service.color
                      : isHighlighted 
                        ? 'from-teal-500 to-cyan-500' 
                        : 'from-gray-700 to-gray-600'
                  } text-white p-3 rounded-lg md:rounded-xl mb-3 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3`}>
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                  </div>

                  <h3 className="font-bold text-xs md:text-sm text-white mb-1 md:mb-2 leading-tight group-hover:text-blue-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[10px] md:text-xs text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Connection indicator */}
                  {isHighlighted && !isHovered && (
                    <div className="mt-2 text-[10px] md:text-xs text-teal-400 font-bold flex items-center gap-1 animate-pulse">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></div>
                      Connected
                    </div>
                  )}

                  {/* Particle effect on hover */}
                  {isHovered && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-particle"
                          style={{
                            left: '50%',
                            top: '50%',
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Text */}
        <div className="text-center mt-10 md:mt-16 animate-fade-in-delay-2 px-4">
          <p className="text-blue-200 text-sm md:text-lg font-medium">
            {hoveredService 
              ? `${services.find(s => s.id === hoveredService)?.title} integrates with ${services.find(s => s.id === hoveredService)?.relatedServices.length} services`
              : 'Explore the interconnected ecosystem - hover over any service'}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes spin-slower {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        
        @keyframes draw-line {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes particle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slower {
          animation: spin-slower 25s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        
        .animate-draw-line {
          animation: draw-line 0.8s ease-out forwards;
        }
        
        .animate-particle {
          --tx: calc(cos(var(--angle, 0)) * 60px);
          --ty: calc(sin(var(--angle, 0)) * 60px);
          animation: particle 1s ease-out forwards;
        }
        
        .animate-particle:nth-child(1) { --angle: 0deg; }
        .animate-particle:nth-child(2) { --angle: 60deg; }
        .animate-particle:nth-child(3) { --angle: 120deg; }
        .animate-particle:nth-child(4) { --angle: 180deg; }
        .animate-particle:nth-child(5) { --angle: 240deg; }
        .animate-particle:nth-child(6) { --angle: 300deg; }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }
        
        /* Prevent overflow */
        body {
          overflow-x: hidden;
        }
      `}</style>
    </section>
  );
};

export default InteractiveFlywheelSection;