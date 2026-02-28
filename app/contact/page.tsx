import type { Metadata } from 'next'
import { Mail, Clock, FileText, ArrowRight } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { ContactForm } from '@/app/components/sections/ContactForm'
import {
  organizationSchema,
  buildBreadcrumbSchema,
  SITE_URL,
} from '@/lib/schemas/organization'

export const metadata: Metadata = {
  title: 'Contact Adam Silva Consulting — Get Agentic Commerce Help',
  description:
    'Contact Adam Silva Consulting to discuss UCP, ACP, AP2 implementation, AEO audits, GEO optimization, or authority building. We respond within 24 business hours. Free 15-minute consultation included.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
}

const contactPageSchema = {
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/contact#webpage`,
  url: `${SITE_URL}/contact`,
  name: 'Contact Adam Silva Consulting — Get Agentic Commerce Help',
  description:
    'Reach Adam Silva Consulting to discuss agentic commerce protocol implementation. We respond within 24 business hours.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
}

const pageSchemas = [
  contactPageSchema,
  organizationSchema,
  buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]),
]

const expectations = [
  {
    icon: Clock,
    title: '24-Hour Response',
    description:
      'We respond to all inquiries within 24 business hours. No auto-responder black holes — a real reply from the team.',
  },
  {
    icon: FileText,
    title: 'Free 15-Minute Consultation',
    description:
      'Every inquiry includes a complimentary 15-minute discovery call. No obligation, no hard sell — just clarity on your situation.',
  },
  {
    icon: ArrowRight,
    title: 'No Long-Term Contract Required',
    description:
      'Start with the $100 AI Readiness Check. Subsequent engagements are structured around clear deliverables, not retainer lock-ins.',
  },
]

export default function ContactPage() {
  return (
    <>
      <JsonLd data={pageSchemas} />

      {/* Hero */}
      <section className="section gradient-hero" aria-labelledby="contact-hero-heading">
        <div className="container">
          <div className="max-w-2xl">
            <span className="badge mb-6">Get in Touch</span>
            <h1
              id="contact-hero-heading"
              className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4 leading-tight"
            >
              Contact Adam Silva Consulting
            </h1>
            <p className="text-xl text-[var(--color-muted)] leading-relaxed speakable-answer">
              Ready to build agentic commerce infrastructure? Tell us about your project and
              we&apos;ll map the fastest path from your current state to full UCP/ACP/AP2
              compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" aria-labelledby="contact-form-heading">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 items-start">

            {/* Left — Form */}
            <div className="lg:col-span-3">
              <h2
                id="contact-form-heading"
                className="text-2xl font-bold text-[var(--color-text)] mb-6"
              >
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Right — Info */}
            <div className="lg:col-span-2 space-y-6">

              {/* What to Expect */}
              <div className="card p-6">
                <h2 className="font-bold text-[var(--color-text)] mb-5 text-base">
                  What to Expect
                </h2>
                <div className="space-y-5">
                  {expectations.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)',
                          }}
                        >
                          <Icon size={16} style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <div>
                          <div className="font-semibold text-[var(--color-text)] text-sm mb-1">
                            {item.title}
                          </div>
                          <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Direct Contact */}
              <div className="card p-6">
                <h2 className="font-bold text-[var(--color-text)] mb-4 text-base">
                  Direct Contact
                </h2>
                <a
                  href="mailto:info@adamsilvaconsulting.com"
                  className="flex items-center gap-2.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Mail size={15} style={{ color: 'var(--color-accent)' }} />
                  info@adamsilvaconsulting.com
                </a>
                <p className="mt-3 text-xs text-[var(--color-muted-2)]">
                  We respond to all inquiries within 24 business hours.
                </p>
              </div>

              {/* Response Commitment */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)',
                }}
              >
                <p className="text-sm font-semibold text-[var(--color-text)] mb-1">
                  Our Response Commitment
                </p>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  We respond to all inquiries within 24 business hours. If your project is
                  time-sensitive, indicate that in your message and we will prioritize
                  accordingly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
