import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Adam Silva Consulting',
  description: 'Master Service Agreement and Terms of Service for Adam Silva Consulting.',
}

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-sm mb-10" style={{ color: 'var(--color-muted)' }}>
          Last updated: March 4, 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              1. Agreement to Terms
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              By placing an order through adamsilvaconsulting.com (the &quot;Site&quot;), you (&quot;Client&quot;) enter
              into a binding agreement with Adam Silva Consulting LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us&quot;).
              These Terms of Service, together with any order confirmation or statement of work, constitute the
              entire agreement between the parties (the &quot;Agreement&quot;). By completing checkout you acknowledge
              that you have read, understood, and agree to be bound by this Agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              2. Services &amp; Deliverables
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              The Company provides AI consulting, agent development, search optimization, and related digital
              services as described on the applicable service or package page at the time of purchase. Specific
              deliverables, timelines, and milestones will be outlined in the onboarding process following payment.
              The Company reserves the right to modify its service methodology and tooling at any time, provided
              that any such changes do not materially reduce the scope of the purchased deliverables.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              3. Payment Terms
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>3.1 Pricing.</strong> All prices are listed in
                U.S. Dollars (USD). Prices are as displayed on the Site at the time of purchase.
              </p>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>3.2 Setup &amp; Recurring Fees.</strong> Certain
                services include a one-time setup fee and/or a recurring monthly retainer. The setup fee is due
                at checkout. Monthly retainers are billed on the same calendar day each month following the
                initial payment.
              </p>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>3.3 Preferred Payment Method.</strong> The Company
                prefers payment via ACH bank transfer or wire transfer. ACH/wire payments incur no additional fees.
              </p>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>3.4 Credit Card Convenience Fee.</strong> Payments
                made by credit or debit card are subject to a 4% convenience fee, which is added to the order total
                at checkout. This fee is non-refundable under all circumstances.
              </p>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>3.5 Late Payments.</strong> Recurring invoices
                not paid within 7 days of the due date may result in suspension of services. Accounts more than
                30 days past due may be subject to a 1.5% monthly late fee on the outstanding balance.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              4. No Refunds &mdash; All Sales Are Final
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              All purchases are final and non-refundable. Due to the nature of digital consulting services,
              the Company does not offer refunds, credits, or chargebacks for any reason, including but not
              limited to dissatisfaction with results, change of business direction, or failure to provide
              necessary access or materials in a timely manner. By completing checkout, you expressly waive
              any right to a refund or chargeback. Disputed charges may be subject to collection proceedings
              and associated legal fees.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              5. Cancellation of Recurring Services
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              For services with a recurring monthly retainer, the Client may cancel future billing by providing
              written notice at least 14 days before the next billing date. Cancellation stops future charges
              only; no prorated refunds are given for the current billing period. Setup fees are non-refundable
              regardless of cancellation timing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              6. Client Responsibilities
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              The Client agrees to provide timely access to accounts, platforms, content, and information
              necessary for the Company to perform the services. Delays caused by the Client&apos;s failure to
              provide required access or materials do not extend deadlines or entitle the Client to a refund.
              The Client is responsible for the accuracy of all information provided.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              7. Intellectual Property
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>7.1 Client Content.</strong> The Client retains
                ownership of all pre-existing content, data, and materials provided to the Company.
              </p>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>7.2 Deliverables.</strong> Upon full payment,
                the Client receives a non-exclusive, perpetual license to use all deliverables created by the
                Company for the Client&apos;s business purposes.
              </p>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>7.3 Company IP.</strong> The Company retains
                ownership of all proprietary frameworks, methodologies, templates, code libraries, and tools
                used in the delivery of services. Nothing in this Agreement transfers ownership of Company IP
                to the Client.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              8. Confidentiality
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              Both parties agree to keep confidential any proprietary or sensitive information disclosed during
              the engagement. This obligation survives termination of the Agreement for a period of two (2) years.
              The Company may use the Client&apos;s name and a general description of the engagement in its
              portfolio and marketing materials unless the Client opts out in writing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              9. Limitation of Liability
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              To the maximum extent permitted by law, the Company&apos;s total liability for any claim arising
              out of this Agreement shall not exceed the total fees paid by the Client in the six (6) months
              preceding the claim. In no event shall the Company be liable for any indirect, incidental, special,
              consequential, or punitive damages, including lost profits, lost revenue, or lost data, regardless
              of the theory of liability. The Company does not guarantee specific business outcomes, revenue
              increases, search rankings, or lead volumes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              10. Disclaimer of Warranties
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              Services are provided &quot;as is&quot; and &quot;as available.&quot; The Company makes no warranties,
              express or implied, including but not limited to warranties of merchantability, fitness for a particular
              purpose, or non-infringement. The Company does not warrant that services will be uninterrupted,
              error-free, or that any specific result will be achieved.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              11. Indemnification
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              The Client agrees to indemnify and hold harmless the Company, its officers, employees, and
              contractors from any claims, damages, losses, or expenses (including reasonable attorney&apos;s fees)
              arising from the Client&apos;s use of the deliverables, breach of this Agreement, or violation of
              any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              12. Dispute Resolution
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              Any disputes arising under this Agreement shall first be addressed through good-faith negotiation.
              If unresolved within 30 days, disputes shall be submitted to binding arbitration under the rules
              of the American Arbitration Association, conducted in the state of the Company&apos;s principal place
              of business. Each party shall bear its own costs and attorney&apos;s fees unless the arbitrator
              determines otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              13. Governing Law
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              This Agreement shall be governed by and construed in accordance with the laws of the State of
              Florida, without regard to its conflict of laws provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              14. Modifications
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              The Company reserves the right to update these Terms at any time. Changes take effect upon posting
              to the Site. Continued use of the Site or services after changes constitutes acceptance of the
              revised Terms. Material changes will be communicated via email to active clients.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              15. Severability
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              If any provision of this Agreement is found to be unenforceable, the remaining provisions shall
              continue in full force and effect.
            </p>
          </section>

          <section className="pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <p className="text-xs" style={{ color: 'var(--color-muted-2)' }}>
              By completing a purchase on adamsilvaconsulting.com, you confirm that you have read and agree
              to these Terms of Service. If you have questions, contact us at{' '}
              <a href="mailto:adam@adamsilvaconsulting.com" style={{ color: 'var(--color-accent)' }}>
                adam@adamsilvaconsulting.com
              </a>{' '}
              before placing your order.
            </p>
          </section>

        </div>
      </div>
    </section>
  )
}
