import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy | Adam Silva Consulting',
  description: 'Refund and cancellation policy for Adam Silva Consulting services. 14-day refund window for unstarted work.',
}

export default function RefundPolicyPage() {
  return (
    <section
      className="py-20 px-6"
      style={{ background: 'var(--color-base)' }}
    >
      <div className="max-w-3xl mx-auto prose-custom">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
        >
          Refund Policy
        </h1>
        <p className="text-sm mb-10" style={{ color: 'var(--color-muted)' }}>
          Last updated: March 6, 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              1. Overview
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              Adam Silva Consulting LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides
              professional consulting services including AI readiness assessments, search engine optimization, agentic
              commerce implementations, and related digital transformation services. Because our services involve
              specialized labor that cannot be recouped once performed, this refund policy outlines the conditions under
              which refunds may be issued.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              2. 14-Day Refund Window
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>
                You may request a full refund within <strong style={{ color: 'var(--color-text)' }}>14 calendar days</strong> of
                your purchase date, provided that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>No work has been started on your project or engagement.</li>
                <li>No deliverables, reports, audits, or assessments have been provided.</li>
                <li>No consulting calls or strategy sessions have taken place.</li>
                <li>No access to proprietary tools, templates, or resources has been granted.</li>
              </ul>
              <p>
                If all conditions above are met, we will issue a full refund to your original payment method within
                5&ndash;10 business days.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              3. Once Work Has Begun
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>No refunds are available once work has commenced.</strong> Our
                services involve dedicated, specialized labor from senior consultants. Once a project is underway, the
                time and expertise invested cannot be recovered or reassigned.
              </p>
              <p>
                Work is considered &quot;commenced&quot; when any of the following occurs:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A kickoff call or strategy session has been conducted.</li>
                <li>Audit, analysis, or research has begun on your behalf.</li>
                <li>Deliverables or draft materials have been shared.</li>
                <li>Access to tools, dashboards, or proprietary resources has been provisioned.</li>
                <li>Third-party tools or subscriptions have been purchased on your behalf.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              4. Subscription Services
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>
                For services billed on a recurring (monthly) basis:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong style={{ color: 'var(--color-text)' }}>Cancellation:</strong> You may cancel your subscription
                  at any time through your customer portal or by contacting us. Cancellation takes effect at the end of
                  the current billing period.
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text)' }}>No partial refunds:</strong> We do not issue refunds for
                  partial billing periods. You will continue to receive service through the end of your paid period.
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text)' }}>Setup fees:</strong> One-time setup fees are non-refundable
                  once the onboarding process has begun.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              5. Free Services (ACRA)
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              Our AI Commerce Readiness Assessment (ACRA) is provided at no cost. Since no payment is collected, no
              refund applies. By requesting an ACRA, you consent to us contacting you with the results and related
              service recommendations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              6. Exceptions
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>
                We may, at our sole discretion, offer partial refunds or service credits in exceptional circumstances,
                including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A material failure on our part to deliver agreed-upon services.</li>
                <li>Documented service outages or technical failures caused by us.</li>
                <li>Duplicate charges or billing errors.</li>
              </ul>
              <p>
                Any exceptions are evaluated on a case-by-case basis and are not guaranteed.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              7. Chargebacks
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>
                We strongly encourage you to contact us directly before initiating a chargeback with your bank or
                credit card company. Filing a chargeback without first attempting to resolve the issue with us may
                result in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Immediate suspension of all active services and access.</li>
                <li>Forfeiture of any deliverables, reports, or work product in progress.</li>
                <li>Submission of evidence to the payment processor documenting services rendered.</li>
                <li>Collection action for the value of services already performed.</li>
              </ul>
              <p>
                We maintain detailed records of all client communications, project milestones, deliverables, and
                service activity. These records are submitted as evidence in any dispute proceeding.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              8. How to Request a Refund
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>
                To request a refund, contact us within the 14-day window using any of the following methods:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong style={{ color: 'var(--color-text)' }}>Email:</strong>{' '}
                  <a href="mailto:billing@adamsilvaconsulting.com" style={{ color: 'var(--color-accent)' }}>
                    billing@adamsilvaconsulting.com
                  </a>
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text)' }}>Phone:</strong>{' '}
                  <a href="tel:+15127018896" style={{ color: 'var(--color-accent)' }}>
                    (512) 701-8896
                  </a>
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text)' }}>Contact form:</strong>{' '}
                  <Link href="/contact" style={{ color: 'var(--color-accent)' }}>
                    adamsilvaconsulting.com/contact
                  </Link>
                </li>
              </ul>
              <p>
                Please include your full name, email address used at purchase, order or invoice number, and reason
                for the refund request. We will respond within 2 business days.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              9. Modifications
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              We reserve the right to modify this refund policy at any time. Changes will be posted on this page with
              an updated &quot;Last updated&quot; date. Continued use of our services after changes constitutes
              acceptance of the revised policy. The policy in effect at the time of your purchase governs your
              transaction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              10. Governing Law
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              This refund policy is governed by the laws of the State of Texas, United States. Any disputes arising
              from this policy shall be resolved in the courts of Travis County, Texas.
            </p>
          </section>

          <div
            className="mt-12 pt-8"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
              Questions about this policy? Contact us at{' '}
              <a href="mailto:billing@adamsilvaconsulting.com" style={{ color: 'var(--color-accent)' }}>
                billing@adamsilvaconsulting.com
              </a>
              .
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="/privacy" className="text-xs" style={{ color: 'var(--color-accent)' }}>
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs" style={{ color: 'var(--color-accent)' }}>
                Terms of Service
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
