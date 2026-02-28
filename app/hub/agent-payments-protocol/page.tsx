import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { buildBreadcrumbSchema, SITE_URL, ORG_ID } from '@/lib/schemas/organization'

export const metadata: Metadata = {
  title: 'Agent Payments Protocol (AP2) Hub — Complete Resource Guide',
  description:
    "Everything you need to understand and implement Agent Payments Protocol (AP2). Google's cryptographic trust layer for agentic transactions — Verifiable Credentials, mandate types, and non-repudiation.",
  alternates: {
    canonical: `${SITE_URL}/hub/agent-payments-protocol`,
  },
  openGraph: {
    title: 'Agent Payments Protocol (AP2) Hub — Complete Resource Guide',
    description:
      "The definitive resource for Agent Payments Protocol (AP2) — Google's cryptographic trust layer for agentic commerce.",
    url: `${SITE_URL}/hub/agent-payments-protocol`,
  },
}

const ap2FAQs = [
  {
    question: 'What is Agent Payments Protocol (AP2)?',
    answer:
      "Agent Payments Protocol (AP2) is Google's cryptographic trust layer for agentic transactions. AP2 mandates the use of W3C Verifiable Credentials to prove payment intent, authorize cart checkouts, and create audit trails — establishing non-repudiation for AI-initiated commerce.",
  },
  {
    question: 'What are AP2 mandate types?',
    answer:
      'AP2 defines two core mandate types: Intent Mandates and Cart Mandates. An Intent Mandate is a Verifiable Credential signed by the user\'s identity wallet that authorizes an AI agent to negotiate and shop on their behalf within defined parameters (merchant categories, spending caps, time windows). A Cart Mandate is a second credential issued at checkout time that authorizes the specific transaction — item list, total amount, merchant identity, and shipping address — creating a cryptographic record of exactly what was purchased and by whom.',
  },
  {
    question: 'What is non-repudiation in agentic commerce?',
    answer:
      "Non-repudiation means that once an AI agent completes a purchase with AP2 mandate credentials, neither the buyer nor the merchant can deny that the transaction occurred or was authorized. The Verifiable Credentials are cryptographically signed and timestamped — they create an immutable audit trail that satisfies enterprise procurement requirements, regulatory compliance (SOX, GDPR), and dispute resolution. Without AP2, AI-initiated transactions lack the legal standing that human-authorized transactions have.",
  },
  {
    question: 'How does AP2 relate to x402 and crypto payments?',
    answer:
      'AP2 is designed to work alongside x402, the HTTP payment protocol developed by Coinbase for blockchain-based transactions. When AP2 is paired with x402, AI agents can execute crypto payment flows — stablecoin settlements on Base or Ethereum mainnet — with the same Verifiable Credential trust layer that governs fiat AP2 transactions. This enables agents to autonomously handle both traditional card payments (via ACP/SPT) and crypto settlements within the same commerce flow.',
  },
  {
    question: 'Is AP2 required for enterprise B2B agentic commerce?',
    answer:
      "For enterprise B2B use cases — particularly procurement, resupply, and contract purchasing — AP2 is effectively mandatory. Enterprise procurement systems require audit trails, approval chain documentation, and spend authorization proofs that only AP2 Verifiable Credentials provide. Consumer-facing agentic commerce (ChatGPT Instant Checkout) can function with ACP alone, but enterprise contexts require the full UCP + ACP + AP2 stack for compliance, risk management, and accounts payable integration.",
  },
]

const definedTermSchema = {
  '@type': 'DefinedTermSet',
  '@id': `${SITE_URL}/hub/agent-payments-protocol#termset`,
  name: 'Agent Payments Protocol (AP2) Definitions',
  publisher: { '@id': ORG_ID },
  hasDefinedTerm: {
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}/hub/agent-payments-protocol#term`,
    name: 'Agent Payments Protocol',
    alternateName: 'AP2',
    termCode: 'AP2',
    description:
      "Agent Payments Protocol (AP2) is Google's cryptographic trust layer for agentic transactions. AP2 mandates use of W3C Verifiable Credentials to prove payment intent, authorize cart checkouts, and create audit trails — establishing non-repudiation for AI-initiated commerce.",
    inDefinedTermSet: `${SITE_URL}/hub/agent-payments-protocol#termset`,
    url: `${SITE_URL}/hub/agent-payments-protocol`,
  },
}

const ap2Schemas = [
  definedTermSchema,
  buildFAQSchema(ap2FAQs),
  buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Hub', url: '/hub' },
    { name: 'Agent Payments Protocol', url: '/hub/agent-payments-protocol' },
  ]),
]

const intentMandateExample = `// AP2 Intent Mandate — Verifiable Credential
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schema.ap2.google.com/v1"
  ],
  "type": ["VerifiableCredential", "AP2IntentMandate"],
  "id": "urn:ap2:mandate:intent:7a4f9c2b",
  "issuer": "did:web:identity.google.com:users:user_abc",
  "issuanceDate": "2026-02-28T10:00:00Z",
  "expirationDate": "2026-03-28T10:00:00Z",
  "credentialSubject": {
    "id": "did:web:chatgpt-agent.openai.com:agents:shopping-v2",
    "type": "AP2IntentAuthorization",
    "authorizedFor": {
      "categories": ["electronics", "software", "office-supplies"],
      "maxTransactionAmount": { "amount": 500000, "currency": "USD" },
      "monthlySpendLimit": { "amount": 2000000, "currency": "USD" },
      "requireCartMandate": true
    }
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2026-02-28T10:00:00Z",
    "verificationMethod": "did:web:identity.google.com:users:user_abc#key-1",
    "proofPurpose": "assertionMethod",
    "proofValue": "z4pQkU3..."
  }
}`

export default function AP2HubPage() {
  return (
    <>
      <JsonLd data={ap2Schemas} />

      {/* Hero */}
      <section className="section border-b border-[var(--color-border)]">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge badge-ap2">AP2</span>
            <span className="badge">Hub Resource</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-text)] mb-6">
            Agent Payments Protocol (AP2)
          </h1>
          <p className="speakable-answer text-lg text-[var(--color-muted)] leading-relaxed max-w-3xl">
            Agent Payments Protocol (AP2) is Google&apos;s cryptographic trust layer for agentic
            transactions. AP2 mandates use of W3C Verifiable Credentials to prove payment intent,
            authorize cart checkouts, and create audit trails — establishing non-repudiation for
            AI-initiated commerce.
          </p>
        </div>
      </section>

      {/* What is AP2 */}
      <section className="section" id="what-is-ap2">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">What is AP2?</h2>
          <div className="prose-asc">
            <p>
              Agent Payments Protocol (AP2) solves the hardest problem in agentic commerce: trust.
              When a human clicks &quot;Place Order,&quot; there is an implicit, legally understood act of
              authorization. When an AI agent places an order on your behalf, how does the merchant
              know you actually authorized it? How does your finance team verify the purchase was
              within policy? How does the court determine liability if something goes wrong?
            </p>
            <p>
              AP2 answers these questions with cryptography. Specifically, AP2 mandates the use of
              W3C Verifiable Credentials — the open standard for machine-verifiable, cryptographically
              signed attestations — to govern every AI-initiated transaction. Before an agent can shop
              on your behalf, you issue it a signed Intent Mandate credential that encodes exactly
              what it&apos;s allowed to purchase: categories, spending limits, merchant whitelist, and time
              window. Before any checkout completes, the agent must present a signed Cart Mandate
              that records exactly what was purchased, from whom, for how much, and where it ships.
            </p>
            <p>
              These credentials create non-repudiation — the legal and cryptographic certainty that
              a transaction occurred and was authorized exactly as recorded. This is not just a
              technical nicety: enterprise procurement departments, SOX compliance auditors, GDPR data
              controllers, and accounts payable systems all require this audit trail before they can
              accept AI-initiated purchases. Without AP2, agentic commerce is a consumer feature.
              With AP2, it becomes enterprise infrastructure.
            </p>
            <p>
              AP2 also defines the trust architecture for multi-agent systems. When a shopping agent
              delegates payment to a payment agent, which delegates delivery tracking to a logistics
              agent, the entire chain of authority must be cryptographically traceable. AP2&apos;s
              Verifiable Credential framework provides exactly this — a chain of signed mandates that
              any auditor or system can verify without calling back to any central authority.
            </p>
          </div>
        </div>
      </section>

      {/* Mandate Types */}
      <section className="section bg-[var(--color-surface)]" id="ap2-mandate-types">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">AP2 Mandate Types</h2>
          <p className="text-[var(--color-muted)] mb-8">
            AP2 defines two mandate types that work together to authorize and document every
            AI-initiated transaction.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="card p-6 border-t-4 border-[#3b82f6]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-black text-[#3b82f6]">M1</span>
                <div>
                  <h3 className="font-bold text-[var(--color-text)]">Intent Mandate</h3>
                  <p className="text-sm text-[var(--color-muted)]">Pre-shopping authorization</p>
                </div>
              </div>
              <p className="text-sm text-[var(--color-muted)] mb-4">
                Issued by the user (or enterprise identity system) to the AI agent before shopping
                begins. Defines the scope of authorization: which merchant categories the agent can
                purchase from, maximum transaction and monthly spend limits, which agents are
                authorized, and how long the mandate is valid.
              </p>
              <ul className="space-y-2">
                {[
                  'Merchant category restrictions',
                  'Per-transaction spend cap',
                  'Monthly cumulative limit',
                  'Agent identity binding',
                  'Time-bound validity window',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6 border-t-4 border-[#10b981]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-black text-[#10b981]">M2</span>
                <div>
                  <h3 className="font-bold text-[var(--color-text)]">Cart Mandate</h3>
                  <p className="text-sm text-[var(--color-muted)]">Per-transaction authorization</p>
                </div>
              </div>
              <p className="text-sm text-[var(--color-muted)] mb-4">
                Issued at checkout time for each specific transaction. The Cart Mandate is a
                Verifiable Credential that cryptographically records the exact items purchased,
                total amount, merchant identity, shipping address, and timestamp. This is the legal
                record of the transaction — the AP2 receipt.
              </p>
              <ul className="space-y-2">
                {[
                  'Exact items and quantities',
                  'Final price including tax and shipping',
                  'Merchant DID (cryptographic ID)',
                  'Delivery address hash',
                  'Timestamp and block reference',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">
            Intent Mandate Credential Example
          </h3>
          <div className="schema-viewer">
            <pre className="text-sm leading-relaxed overflow-x-auto">
              <code>{intentMandateExample}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Verifiable Credentials in AP2 */}
      <section className="section" id="verifiable-credentials">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">
            Verifiable Credentials in AP2
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            AP2 builds on the W3C Verifiable Credentials (VC) standard — the same technology used
            in digital identity systems worldwide. This choice is deliberate: VCs are
            cryptographically verifiable without calling back to any central issuer, which means
            merchants, auditors, and regulators can verify AP2 mandates offline.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Decentralized Verification',
                desc: 'AP2 credentials can be verified by any party with access to the public key — no central authority required. Merchants verify mandates locally using the issuer\'s DID document.',
                color: '#3b82f6',
              },
              {
                title: 'Tamper Evidence',
                desc: 'Ed25519 signatures make any modification to a mandate immediately detectable. A Cart Mandate that has been altered since signing is cryptographically invalid — protecting both merchants and buyers.',
                color: '#8b5cf6',
              },
              {
                title: 'Selective Disclosure',
                desc: 'AP2 supports zero-knowledge proofs, allowing agents to prove they hold a valid mandate without revealing the full credential contents — protecting buyer privacy while satisfying merchant verification requirements.',
                color: '#10b981',
              },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ background: item.color }}
                />
                <h3 className="font-bold text-[var(--color-text)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AP2 + x402 */}
      <section className="section bg-[var(--color-surface)]" id="ap2-x402">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
            AP2 + x402: Crypto-Native Agentic Payments
          </h2>
          <p className="text-[var(--color-muted)] mb-6">
            AP2 is designed to interoperate with x402 — Coinbase&apos;s HTTP payment protocol for
            blockchain-based transactions. Together, they enable a complete crypto-native agentic
            commerce stack.
          </p>
          <div className="card p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-[var(--color-text)] mb-3">AP2 provides:</h3>
                <ul className="space-y-2">
                  {[
                    'Identity and authorization (who is buying and why)',
                    'Mandate credentials (what they\'re allowed to buy)',
                    'Audit trail (cryptographic receipt)',
                    'Dispute evidence (non-repudiation)',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[var(--color-text)] mb-3">x402 provides:</h3>
                <ul className="space-y-2">
                  {[
                    'HTTP-native payment protocol (402 Payment Required)',
                    'Stablecoin settlement (USDC on Base, ETH mainnet)',
                    'Micropayment support (sub-cent transactions)',
                    'Programmable payment conditions',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-sm text-[var(--color-muted)] mt-6 pt-6 border-t border-[var(--color-border)]">
              Combined, AP2 + x402 allows AI agents to make crypto-native purchases with full
              cryptographic authorization trails — opening agentic commerce to DeFi protocols,
              tokenized asset markets, and global B2B settlement without traditional banking rails.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" id="ap2-benefits">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-8">
            Benefits of AP2 Implementation
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Enterprise Compliance',
                stat: 'SOX + GDPR',
                desc: 'AP2 mandate credentials satisfy enterprise audit requirements. Finance teams, compliance officers, and external auditors can verify every AI-initiated purchase without manual invoice reconciliation.',
                color: '#3b82f6',
              },
              {
                title: 'Dispute Resolution',
                stat: '100%',
                statLabel: 'cryptographic proof',
                desc: 'Chargebacks and purchase disputes are resolved with cryptographic mandate evidence. AP2 Cart Mandates prove authorization — eliminating the ambiguity that makes AI-initiated chargebacks expensive.',
                color: '#10b981',
              },
              {
                title: 'Multi-Agent Trust',
                stat: 'N-hop',
                statLabel: 'delegation chains',
                desc: 'AP2 enables auditable trust chains across multi-agent systems. Delegation authority flows from user → orchestrator → specialist agents, all verifiable with credential signatures.',
                color: '#8b5cf6',
              },
            ].map((benefit) => (
              <div key={benefit.title} className="card p-6 text-center">
                <div className="text-4xl font-black mb-1" style={{ color: benefit.color }}>
                  {benefit.stat}
                </div>
                {benefit.statLabel && (
                  <div className="text-xs text-[var(--color-muted-2)] mb-3">{benefit.statLabel}</div>
                )}
                <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">{benefit.title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Teaser */}
      <section className="section bg-[var(--color-surface)]" id="ap2-implementation">
        <div className="container max-w-4xl">
          <div className="card p-8 border-l-4 border-[var(--color-accent)]">
            <span className="badge mb-4">Implementation Service</span>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
              Build Your AP2 Trust Layer
            </h2>
            <p className="text-[var(--color-muted)] mb-6">
              Adam Silva Consulting implements the complete AP2 trust layer — DID document setup,
              Intent and Cart Mandate credential infrastructure, Verifiable Credential issuance APIs,
              mandate verification middleware, and audit trail storage. We also integrate AP2 with
              x402 for crypto-native payment flows when required. Implementation typically completes
              in 6-8 weeks as part of the Agentic Readiness program.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services/ap2-trust-layer" className="btn-primary">
                View AP2 Trust Layer Service
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Schedule a Discovery Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2 className="text-3xl font-bold text-[var(--color-text)]">
              Agent Payments Protocol FAQ
            </h2>
          </div>
          <div className="space-y-4">
            {ap2FAQs.map((faq, i) => (
              <details key={i} className="card p-5 group" open={i === 0}>
                <summary className="font-semibold text-[var(--color-text)] cursor-pointer flex items-center justify-between list-none">
                  <span>{faq.question}</span>
                  <span className="text-[var(--color-muted-2)] text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[var(--color-muted)] text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-[var(--color-surface)]">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
            Make Every AI Transaction Trustworthy
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            AP2 is the difference between consumer-grade and enterprise-grade agentic commerce.
            Build the trust layer that lets your organization accept AI-initiated purchases with
            confidence.
          </p>
          <Link href="/contact" className="btn-primary">
            Talk to Adam About AP2
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
