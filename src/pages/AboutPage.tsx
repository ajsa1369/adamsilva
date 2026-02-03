import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Target, Shield, Zap, ArrowRight, Globe, Network, Bot } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About | Adam Silva Consulting - Global Infrastructure for Agentic Commerce</title>
        <meta name="description" content="Adam Silva Consulting builds the global infrastructure for agentic commerce. Learn about our mission to prepare businesses for the AI-first economy through UCP, ACP, and AP2 protocol implementation." />
        <link rel="canonical" href="https://www.adamsilvaconsulting.com/about" />
      </Helmet>

      <main className="min-h-screen bg-base">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-base to-secondary/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,245,212,0.15),transparent_50%)]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
                About Adam Silva Consulting
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Building the Global Infrastructure for{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Agentic Commerce
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                We help businesses transition from the legacy web to the AI-first economy
                where autonomous agents discover, negotiate, and transact on behalf of users.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  By 2027, Gartner predicts traditional search traffic will decline 50% as AI agents
                  become the primary interface for commerce. Businesses that fail to adapt will become
                  invisible to the largest distribution channel in history.
                </p>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Adam Silva Consulting exists to ensure your business isn't left behind. We implement
                  the emerging protocols—UCP, ACP, and AP2—that allow AI agents to discover your services,
                  understand your offerings, and transact with cryptographic trust.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="text-gray-300">Global Reach</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-lg">
                    <Network className="w-5 h-5 text-secondary" />
                    <span className="text-gray-300">Protocol First</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                    <Bot className="w-5 h-5 text-primary" />
                    <span className="text-gray-300">Agent Ready</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
                <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">The Three Pillars</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Globe className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">UCP - Discovery</h4>
                        <p className="text-gray-400">Universal Commerce Protocol for AI agent discovery via /.well-known manifests</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Zap className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">ACP - Execution</h4>
                        <p className="text-gray-400">Agentic Commerce Protocol enabling instant checkout without human-designed UI</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">AP2 - Trust</h4>
                        <p className="text-gray-400">Agent Payments Protocol with cryptographic mandates and verifiable credentials</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our Approach
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We don't just optimize for today's AI—we build infrastructure for tomorrow's autonomous economy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Brain,
                  title: 'AI-First Architecture',
                  description: 'Every implementation starts with how AI agents will discover and interact with your business.'
                },
                {
                  icon: Target,
                  title: 'Protocol Compliance',
                  description: 'Full implementation of UCP, ACP, and AP2 standards for maximum agent compatibility.'
                },
                {
                  icon: Shield,
                  title: 'Cryptographic Trust',
                  description: 'Verifiable credentials and mandates that enable secure autonomous transactions.'
                },
                {
                  icon: Zap,
                  title: 'Token Efficiency',
                  description: 'Optimized content structures that minimize AI processing costs while maximizing comprehension.'
                }
              ].map((value, index) => (
                <div key={index} className="group">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 h-full hover:border-primary/50 transition-all duration-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900/50 to-base">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-8">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  50%
                </div>
                <p className="text-gray-400">Predicted decline in traditional search traffic by 2027</p>
              </div>
              <div className="p-8">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  1,200%
                </div>
                <p className="text-gray-400">Growth in AI-driven traffic since ChatGPT launch</p>
              </div>
              <div className="p-8">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  3
                </div>
                <p className="text-gray-400">Core protocols for the agentic commerce stack</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Agentic Infrastructure?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              The window for first-mover advantage is narrowing. Let's ensure your business
              is discoverable, transactable, and trustworthy to the AI agents of tomorrow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:from-[#00D4B8] hover:to-[#9F8FE6] transition-all shadow-lg hover:shadow-xl"
              >
                Start Your Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/insights/the-agentic-commerce-protocols-ucp-acp-ap2"
                className="inline-flex items-center gap-2 px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-primary hover:text-primary transition-all"
              >
                Learn About the Protocols
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
