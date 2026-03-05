import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ACRALoginForm } from '@/app/components/acra/ACRALoginForm'
import { SITE_URL } from '@/lib/schemas/organization'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sign In or Create Account — ACRA Tool | Adam Silva Consulting',
  description: 'Create a free account to run your Agentic Commerce Readiness Assessment and access your report history.',
  alternates: { canonical: `${SITE_URL}/acra/login` },
}

export default async function ACRALoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) redirect('/acra/run')

  return (
    <section className="section gradient-hero min-h-[80vh] flex items-center" aria-labelledby="login-heading">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left — value prop */}
          <div>
            <span className="badge mb-4">Free Account</span>
            <h1 id="login-heading" className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-4 leading-tight">
              Run Your Free Agentic Commerce Readiness Assessment
            </h1>
            <p className="text-[var(--color-muted)] mb-6 leading-relaxed">
              Create a free account to run unlimited ACRA scans, track your scores over time,
              and see exactly how much revenue AI gaps are costing your business.
            </p>
            <ul className="space-y-2.5">
              {[
                'Full 9-pillar score report',
                'LLM recommendation scores (ChatGPT, Claude, Perplexity, Gemini, Copilot)',
                'Dollar-figure revenue loss projections per gap',
                'Prioritized fix list with service links',
                'Unlimited scans — free forever',
                'Access to your full report history',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--color-muted)]">
                  <CheckCircle size={16} className="shrink-0 mt-0.5 text-green-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — auth form */}
          <div className="card p-8">
            <ACRALoginForm defaultMode="signup" redirectTo="/acra/run" />
          </div>
        </div>
      </div>
    </section>
  )
}
