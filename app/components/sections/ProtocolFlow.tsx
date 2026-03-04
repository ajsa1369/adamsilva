import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    title: 'AI Agent Searches',
    body: 'ChatGPT, Perplexity, or Google AI Mode gets a shopping intent from your customer.',
    color: '#0ea5e9',
    rgb: '14,165,233',
    image: '/images/insights/ai_chatbot_information_discovery_architecture_diagram.jpg',
  },
  {
    step: '02',
    title: 'UCP Discovery',
    body: 'The agent reads your /.well-known/ucp manifest — your full catalog, pricing, and capabilities.',
    color: '#a855f7',
    rgb: '168,85,247',
    image: '/images/insights/ai-engine-optimization-dashboard.png',
  },
  {
    step: '03',
    title: 'ACP Checkout',
    body: 'The agent initiates purchase via Stripe Payment Token. No human login. No cart abandonment.',
    color: '#10b981',
    rgb: '16,185,129',
    image: '/images/insights/ai_automation_it_service_management_workflow.jpg',
  },
  {
    step: '04',
    title: 'AP2 Verified',
    body: 'Cryptographic mandate confirms the transaction. Audit trail created. Revenue secured.',
    color: '#f59e0b',
    rgb: '245,158,11',
    image: '/images/insights/ai_authority_imperative_1_1.jpg',
  },
]

export function ProtocolFlow() {
  return (
    <section
      className="section"
      aria-labelledby="commerce-demo-heading"
      style={{ paddingTop: '4rem', paddingBottom: '4rem' }}
    >
      <div className="container">
        <div className="mb-10">
          <div className="enterprise-eyebrow">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
            >
              How It Works
            </span>
          </div>
          <h2
            id="commerce-demo-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.625rem, 3vw, 2.25rem)',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '0.75rem',
            }}
          >
            From AI Discovery to Completed Purchase
          </h2>
          <p style={{ color: 'var(--color-muted)', maxWidth: '520px', fontSize: '0.9375rem' }}>
            When an AI agent shops for your customer, this is the exact sequence our protocol stack enables.
          </p>
        </div>

        {/* Step cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {/* Connecting line (desktop only) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[7rem] left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, #0ea5e9, #a855f7, #10b981, #f59e0b)' }}
          />

          {STEPS.map((item) => (
            <div key={item.step} className="card overflow-hidden group relative z-10">
              {/* Image */}
              <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, rgba(${item.rgb},0.1) 0%, var(--color-surface) 100%)`,
                  }}
                />
                {/* Step badge */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-white text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: `rgba(${item.rgb},0.85)`,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  Step {item.step}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--color-text)',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.6,
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Result bar */}
        <div
          className="mt-8 rounded-lg px-6 py-4 flex flex-wrap items-center justify-between gap-4"
          style={{
            background: 'rgba(14,165,233,0.05)',
            border: '1px solid rgba(14,165,233,0.15)',
          }}
        >
          <div>
            <span
              className="text-xs font-bold uppercase tracking-wider mr-3"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
            >
              Result:
            </span>
            <span style={{ fontSize: '0.9375rem', color: 'var(--color-text)', fontWeight: 600 }}>
              Your business transacts with AI agents 24/7 — no website visit, no human required.
            </span>
          </div>
          <Link href="/protocols" className="btn-secondary text-sm flex-shrink-0">
            See the Full Protocol Stack
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  )
}
