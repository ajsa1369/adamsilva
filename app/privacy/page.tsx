import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Adam Silva Consulting',
  description: 'Privacy Policy for Adam Silva Consulting. GDPR, CCPA, and international data protection compliance.',
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm mb-10" style={{ color: 'var(--color-muted)' }}>
          Last updated: March 4, 2026
        </p>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              1. Introduction
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              Adam Silva Consulting LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects
              your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit adamsilvaconsulting.com (the &quot;Site&quot;),
              purchase our services, or otherwise interact with us. This policy applies to all visitors, clients, and
              users worldwide, including those protected by the General Data Protection Regulation (GDPR), the California
              Consumer Privacy Act (CCPA), and other applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              2. Data Controller
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>
                For the purposes of the GDPR and other applicable data protection legislation, the data controller is:
              </p>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>Adam Silva Consulting LLC</strong><br />
                Email:{' '}
                <a href="mailto:legal@adamsilvaconsulting.com" style={{ color: 'var(--color-accent)' }}>
                  legal@adamsilvaconsulting.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              3. Information We Collect
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>3.1 Information You Provide.</strong> When you fill out
                forms, purchase services, or contact us, we may collect: full name, email address, company name, phone
                number, billing address, payment method details (processed by Stripe — we never store full card numbers),
                and the content of any messages you send us.
              </p>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>3.2 Automatically Collected Information.</strong> When
                you visit the Site, we may automatically collect: IP address, browser type and version, operating system,
                referring URL, pages visited and time spent, device identifiers, and approximate geographic location
                derived from IP address.
              </p>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>3.3 Cookies &amp; Tracking Technologies.</strong> We use
                cookies and similar technologies for analytics and to remember your preferences (such as theme settings).
                See Section 10 for our full Cookie Policy.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              4. How We Use Your Information
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>We use collected information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>To process and fulfill your orders and deliver purchased services</li>
                <li>To communicate with you about your account, orders, and engagements</li>
                <li>To send our newsletter (with your explicit consent)</li>
                <li>To improve our Site, services, and user experience</li>
                <li>To comply with legal obligations and enforce our Terms of Service</li>
                <li>To detect and prevent fraud or unauthorized access</li>
                <li>To respond to your inquiries and provide customer support</li>
              </ul>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>Legal Bases for Processing (GDPR).</strong> We process
                your personal data on one or more of the following legal bases: (a) your consent; (b) performance of a
                contract; (c) compliance with a legal obligation; (d) our legitimate interests, such as improving our
                services and preventing fraud.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              5. Data Sharing &amp; Third Parties
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>We do not sell your personal data. We may share information with the following categories of third parties:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>
                  <strong style={{ color: 'var(--color-text)' }}>Payment Processors:</strong> Stripe processes all
                  payments. Stripe&apos;s privacy policy governs their handling of your payment data.
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text)' }}>Hosting &amp; Infrastructure:</strong> Vercel (website
                  hosting), Supabase (database), and related infrastructure providers that process data on our behalf.
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text)' }}>Analytics:</strong> We may use analytics services to
                  understand how visitors use the Site. These services may collect anonymized or pseudonymized data.
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text)' }}>Legal Requirements:</strong> We may disclose information
                  if required by law, court order, or governmental authority.
                </li>
              </ul>
              <p>
                All third-party service providers are contractually obligated to protect your data and may only use it
                for the purposes we specify.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              6. International Data Transfers
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              Our servers and service providers are located in the United States. If you are accessing the Site from
              outside the United States, your data will be transferred to and processed in the United States. We ensure
              that any such transfers comply with applicable data protection laws through appropriate safeguards,
              including Standard Contractual Clauses (SCCs) approved by the European Commission where required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              7. Data Retention
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>We retain personal data only as long as necessary for the purposes described in this policy:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong style={{ color: 'var(--color-text)' }}>Client data:</strong> For the duration of the engagement plus 7 years for tax and legal compliance</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Contact form submissions:</strong> Up to 2 years, or until you request deletion</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Newsletter subscribers:</strong> Until you unsubscribe or request deletion</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Analytics data:</strong> Up to 26 months in anonymized form</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              8. Your Rights Under GDPR
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>
                If you are located in the European Economic Area (EEA), the United Kingdom, or Switzerland, you have
                the following rights under the GDPR:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong style={{ color: 'var(--color-text)' }}>Right of Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Right to Erasure:</strong> Request deletion of your personal data (&quot;right to be forgotten&quot;)</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Right to Restriction:</strong> Request that we restrict the processing of your data</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Right to Object:</strong> Object to processing based on legitimate interests or direct marketing</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:legal@adamsilvaconsulting.com" style={{ color: 'var(--color-accent)' }}>
                  legal@adamsilvaconsulting.com
                </a>
                . We will respond within 30 days. You also have the right to lodge a complaint with your local data
                protection authority.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              9. Your Rights Under CCPA
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>
                If you are a California resident, the California Consumer Privacy Act (CCPA) and the California Privacy
                Rights Act (CPRA) provide you with the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li><strong style={{ color: 'var(--color-text)' }}>Right to Know:</strong> Request disclosure of the categories and specific pieces of personal information we have collected about you</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Right to Delete:</strong> Request deletion of your personal information, subject to certain exceptions</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Right to Correct:</strong> Request correction of inaccurate personal information</li>
                <li><strong style={{ color: 'var(--color-text)' }}>Right to Opt Out:</strong> Opt out of the sale or sharing of your personal information. <strong>We do not sell your personal information.</strong></li>
                <li><strong style={{ color: 'var(--color-text)' }}>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights</li>
              </ul>
              <p>
                To exercise your CCPA rights, contact us at{' '}
                <a href="mailto:legal@adamsilvaconsulting.com" style={{ color: 'var(--color-accent)' }}>
                  legal@adamsilvaconsulting.com
                </a>
                {' '}or submit a request through our{' '}
                <Link href="/contact" style={{ color: 'var(--color-accent)' }}>contact page</Link>.
                We will verify your identity before fulfilling any request and respond within 45 days.
              </p>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>Categories of Personal Information Collected:</strong> Identifiers
                (name, email, IP address), commercial information (purchase history), internet activity (browsing behavior
                on our Site), and professional information (company name, job title).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              10. Cookies &amp; Tracking Technologies
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>We use the following types of cookies:</p>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>
                  <strong style={{ color: 'var(--color-text)' }}>Essential Cookies:</strong> Required for the Site to
                  function (e.g., cart state, theme preference). These cannot be disabled.
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text)' }}>Analytics Cookies:</strong> Help us understand how
                  visitors use the Site. Data is aggregated and anonymized.
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text)' }}>Functional Cookies:</strong> Remember your preferences
                  and settings to enhance your experience.
                </li>
              </ul>
              <p>
                You can control cookies through your browser settings. Disabling essential cookies may affect Site
                functionality. We do not use advertising or tracking cookies for third-party ad targeting.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              11. Data Security
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              We implement appropriate technical and organizational measures to protect your personal data, including
              encryption in transit (TLS/SSL), encrypted database connections, access controls limited to authorized
              personnel, and regular security reviews of our infrastructure. Payment data is handled exclusively by
              Stripe, which is PCI DSS Level 1 certified. While we take reasonable precautions, no method of
              transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              12. Children&apos;s Privacy
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              Our services are intended for business professionals and are not directed at individuals under the age
              of 16. We do not knowingly collect personal data from children. If we become aware that we have collected
              data from a child under 16, we will take steps to delete that information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              13. Do Not Track
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              Some browsers transmit a &quot;Do Not Track&quot; (DNT) signal. We currently honor DNT signals by not
              loading non-essential tracking scripts when a DNT signal is detected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              14. Changes to This Policy
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an
              updated &quot;Last updated&quot; date. If we make material changes that affect how we handle your personal
              data, we will notify active clients by email. Your continued use of the Site after changes are posted
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              15. Contact Us
            </h2>
            <div className="space-y-3" style={{ color: 'var(--color-muted)' }}>
              <p>
                For questions about this Privacy Policy, to exercise your data protection rights, or to file a complaint,
                contact us at:
              </p>
              <p>
                <strong style={{ color: 'var(--color-text)' }}>Adam Silva Consulting LLC</strong><br />
                Email:{' '}
                <a href="mailto:legal@adamsilvaconsulting.com" style={{ color: 'var(--color-accent)' }}>
                  legal@adamsilvaconsulting.com
                </a>
              </p>
              <p>
                For GDPR-related inquiries, you may also contact our data protection team directly at the email above.
                We aim to respond to all data protection requests within 30 days.
              </p>
            </div>
          </section>

          <section className="pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <p className="text-xs" style={{ color: 'var(--color-muted-2)' }}>
              See also our{' '}
              <Link href="/terms" style={{ color: 'var(--color-accent)' }}>Terms of Service</Link>.
            </p>
          </section>

        </div>
      </div>
    </section>
  )
}
