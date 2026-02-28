import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildFAQSchema } from '@/lib/schemas/faq'
import { buildHowToSchema } from '@/lib/schemas/service'
import {
  organizationSchema,
  buildBreadcrumbSchema,
  SITE_URL,
  ORG_ID,
} from '@/lib/schemas/organization'
import { adamSilvaSchema } from '@/lib/schemas/person'

export const metadata: Metadata = {
  title:
    'AP2 — Agent Payments Protocol: Cryptographic Trust for Agentic Transactions | Adam Silva Consulting',
  description:
    'AP2 (Agent Payments Protocol) is Google\'s cryptographic mandate framework for agentic commerce. Learn how Intent mandates, Cart mandates, Verifiable Credentials, and the x402 payment protocol create non-repudiable audit trails for enterprise AI transactions.',
  alternates: {
    canonical: 'https://www.adamsilvaconsulting.com/protocols/ap2',
  },
}

const ap2FAQs = [
  {
    question: 'What is Agent Payments Protocol (AP2)?',
    answer:
      'Agent Payments Protocol (AP2) is Google\'s cryptographic mandate framework for agentic commerce transactions. It defines how users issue verifiable authorization mandates to AI agents — signed with W3C Verifiable Credentials — giving those agents cryptographically provable authority to purchase on their behalf. AP2 creates the non-repudiation audit trail that enterprise procurement, legal compliance, and financial governance require for AI-mediated spending.',
  },
  {
    question: 'What is the difference between an AP2 Intent Mandate and a Cart Mandate?',
    answer:
      'An Intent Mandate is a broad authorization: it grants an AI agent permission to purchase within a defined category (e.g., "SaaS tools under $200/month") without specifying the exact product. It is issued during a browsing or discovery session before the agent has identified a specific item. A Cart Mandate is a narrow, transaction-specific authorization: it is bound to a specific cart — defined items, exact price, specific merchant — and authorizes only that precise transaction. Both are signed Verifiable Credentials; Cart Mandates include a cryptographic hash of the cart contents for tamper-evidence.',
  },
  {
    question: 'What are Verifiable Credentials in the AP2 context?',
    answer:
      'In AP2, Verifiable Credentials (VCs) are W3C-standard signed digital documents that prove an AI agent has authorization to transact. Google\'s AP2 implementation supports two VC formats: JWT VC (JSON Web Token Verifiable Credential) for REST-compatible systems, and LDP VC (Linked Data Proof Verifiable Credential) for semantic interoperability. The credential is signed by the user\'s identity provider (or directly by the user\'s key) and includes claims about who authorized the agent, what they can purchase, and for how much.',
  },
  {
    question: 'What is the x402 payment protocol?',
    answer:
      'x402 is a crypto-native payment protocol that extends the HTTP 402 "Payment Required" status code into a machine-to-machine payment standard. In the AP2 context, x402 enables AI agents to pay for API access, digital content, and micro-transactions in stablecoin or CBDC without Stripe or traditional payment rails. The agent sends an x402 payment proof in the Authorization header; the server verifies the on-chain transaction before serving the resource. AP2 mandates can authorize x402 payments the same way they authorize card transactions.',
  },
  {
    question: 'Why do enterprises need AP2 beyond UCP and ACP?',
    answer:
      'UCP and ACP handle discovery and checkout — they make transactions possible. AP2 makes transactions legally defensible. Enterprise procurement requires: (1) documented proof that a human authorized each AI purchase category, (2) an immutable audit trail showing exactly what the agent bought and when, (3) cryptographic non-repudiation so neither the buyer nor the merchant can deny the transaction terms. AP2 mandates and VCs provide all three. Without AP2, AI agent purchases exist in a legal gray zone that procurement compliance, auditors, and finance controllers cannot accept.',
  },
]

const ap2HowToSteps = [
  {
    name: 'Publish the AP2 mandates endpoint at /.well-known/ap2/mandates.json',
    text:
      'Create /.well-known/ap2/mandates.json on your server. This discovery file declares your AP2 version, your mandate endpoint URLs, supported credential formats (JWT VC and/or LDP VC), and supported payment rails (card, x402). Serve it publicly with Content-Type: application/json. AI agents and enterprise procurement systems fetch this file to understand what authorization infrastructure you support before issuing mandates.',
  },
  {
    name: 'Implement Intent Mandate issuance and verification',
    text:
      'Build the Intent Mandate API endpoint. When an AI agent or enterprise system requests browsing-level authorization, issue a signed Intent Mandate VC containing: the authorized agent DID, purchase category constraints, spend limits, validity window, and issuer signature. Store a mandate ID and hash for audit trail purposes. On the receiving side — when agents present mandates — verify the VC signature, check expiry, confirm the category constraint matches the requested purchase, and log the verification event.',
  },
  {
    name: 'Implement Cart Mandate binding to specific transactions',
    text:
      'Build the Cart Mandate API endpoint. Cart Mandates bind authorization to a specific cart: hash the cart contents (item IDs, quantities, prices, merchant ID), include that hash in the VC claims, and sign the credential. When an agent presents a Cart Mandate at checkout, recompute the cart hash and verify it matches the mandate claim. Any cart modification — price change, quantity change, item swap — invalidates the mandate and requires re-issuance. This tamper-evidence is the foundation of non-repudiable transaction records.',
  },
  {
    name: 'Integrate Verifiable Credential issuance (JWT VC and LDP VC)',
    text:
      'Choose your VC format based on your tech stack. JWT VC: issue standard JWTs with W3C VC claims using your signing key (RS256 or ES256). Include standard fields: @context, type, issuer, credentialSubject, expirationDate. Sign with your private key and return the signed token. LDP VC: issue JSON-LD credentials with a linked data proof (Ed25519Signature2020 or similar). For enterprise deployments, support both formats. Publish your public key at a DID document or JWKS endpoint so verifiers can validate signatures.',
  },
  {
    name: 'Build the non-repudiation audit trail',
    text:
      'Every mandate issuance, presentation, verification, and checkout must be logged to an immutable audit store. Minimum fields: mandate_id, type (intent/cart), agent_did, user_id, timestamp_utc, action (issued/verified/used/revoked), transaction_id if used at checkout, cart_hash if cart mandate, outcome (success/failure/tampered). For enterprise compliance, write these logs to an append-only store (cloud audit log, blockchain anchor, or WORM storage). The audit trail is the legal record that proves what the AI agent was authorized to do and what it actually did.',
  },
]

const techArticleSchema = {
  '@type': 'TechArticle',
  '@id': `${SITE_URL}/protocols/ap2#article`,
  headline: 'Agent Payments Protocol (AP2) Technical Guide',
  name: 'Agent Payments Protocol (AP2) Technical Guide',
  description:
    'A comprehensive technical guide to Agent Payments Protocol (AP2) — Google\'s cryptographic mandate framework for agentic commerce. Covers Intent mandates, Cart mandates, Verifiable Credentials (JWT VC and LDP VC), x402 crypto payment protocol, and enterprise audit trail requirements.',
  url: `${SITE_URL}/protocols/ap2`,
  author: { '@id': `${SITE_URL}/#adam-silva` },
  publisher: { '@id': ORG_ID },
  datePublished: '2025-06-01',
  dateModified: '2026-02-01',
  inLanguage: 'en-US',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: [
    { '@type': 'Thing', name: 'Agent Payments Protocol', alternateName: 'AP2' },
    { '@type': 'Thing', name: 'Verifiable Credentials' },
    { '@type': 'Thing', name: 'Cryptographic Trust' },
    { '@type': 'Thing', name: 'Agentic Commerce' },
  ],
  mentions: [
    { '@type': 'Organization', name: 'Google LLC', url: 'https://www.google.com' },
    { '@type': 'Thing', name: 'W3C Verifiable Credentials' },
    { '@type': 'Thing', name: 'x402 Payment Protocol' },
  ],
  proficiencyLevel: 'Expert',
}

const ap2HowToSchema = buildHowToSchema(
  'How to Implement AP2 Mandates',
  'A five-step guide to implementing Agent Payments Protocol mandates — Intent mandates, Cart mandates, Verifiable Credentials, and the non-repudiation audit trail required for enterprise agentic commerce.',
  ap2HowToSteps,
  'P7D'
)

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Protocols', url: '/protocols' },
  { name: 'AP2', url: '/protocols/ap2' },
])

const pageSchemas = [
  { '@context': 'https://schema.org', '@graph': [
    techArticleSchema,
    ap2HowToSchema,
    buildFAQSchema(ap2FAQs),
    breadcrumbSchema,
    organizationSchema,
    adamSilvaSchema,
  ]},
]

const mandatesJsonExample = `{
  // AP2 protocol version
  "ap2_version": "1.0",

  // Mandate endpoints — where agents go to get authorization
  "mandate_endpoints": {
    "intent_mandate": "/api/ap2/mandates/intent",   // broad category authorization
    "cart_mandate": "/api/ap2/mandates/cart",        // specific transaction authorization
    "revoke": "/api/ap2/mandates/revoke",            // mandate revocation
    "verify": "/api/ap2/mandates/verify"             // third-party mandate verification
  },

  // Credential formats supported
  "credential_formats": ["JWT_VC", "LDP_VC"],

  // Signing key discovery
  "issuer_did": "did:web:www.acmecommerce.com",
  "jwks_uri": "https://www.acmecommerce.com/.well-known/jwks.json",

  // Supported payment rails for AP2-authorized transactions
  "payment_rails": ["stripe_spt", "x402", "credit_card"],

  // Intent Mandate policy defaults
  "intent_mandate_defaults": {
    "max_validity_hours": 24,
    "max_spend_per_mandate": {
      "amount": "500",
      "currency": "USD"
    },
    "allowed_categories": ["software", "professional_services", "digital_goods"]
  },

  // Cart Mandate policy
  "cart_mandate_policy": {
    "hash_algorithm": "SHA-256",
    "max_validity_minutes": 30,     // cart mandates expire quickly to prevent replay
    "require_price_lock": true       // price must match exactly at checkout
  },

  // Audit trail configuration
  "audit": {
    "log_all_verifications": true,
    "retention_days": 2555,          // 7 years for enterprise compliance
    "export_endpoint": "/api/ap2/audit/export"
  }
}`

const vcIssuanceExample = `// Example: JWT VC for a Cart Mandate
{
  // Standard JWT header
  "alg": "ES256",
  "typ": "JWT",
  "kid": "did:web:merchant.com#key-1"
}
// JWT payload (decoded):
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://ap2.google.com/credentials/v1"
  ],
  "type": ["VerifiableCredential", "AP2CartMandate"],
  "id": "urn:uuid:f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "issuer": "did:web:merchant.com",
  "issuanceDate": "2026-02-15T14:30:00Z",
  "expirationDate": "2026-02-15T15:00:00Z",  // 30-min window
  "credentialSubject": {
    "id": "did:key:z6MkrCD...AgentDID",      // the agent being authorized
    "mandateType": "cart",
    "authorizedBy": "did:key:z6MkpTU...UserDID",
    "merchant": "acme-commerce",
    "cartHash": "sha256:e3b0c44298fc1c...",   // tamper-evident cart binding
    "authorizedAmount": {
      "amount": "149.99",
      "currency": "USD"
    },
    "paymentRail": "stripe_spt",
    "nonce": "abc123xyz"                      // replay attack prevention
  },
  "proof": {
    "type": "JsonWebSignature2020",
    "created": "2026-02-15T14:30:00Z",
    "verificationMethod": "did:web:merchant.com#key-1",
    "proofPurpose": "assertionMethod",
    "jws": "eyJhbGciOiJFUzI1NiJ9...signature"
  }
}`

const mandateTypes = [
  {
    type: 'Intent Mandate',
    badge: 'Browsing Authorization',
    color: '#3b82f6',
    icon: 'I',
    scope: 'Category-level',
    validity: 'Up to 24 hours',
    useCase: 'Shopping research and discovery sessions',
    description:
      'An Intent Mandate grants an AI agent permission to browse, compare, and research purchases within a defined category — without committing to any specific transaction. The user defines category constraints ("SaaS tools"), spend limits ($200/month), and a validity window. The agent presents this mandate when fetching product information and pricing from merchants, proving it has legitimate browse authority without requiring per-product user confirmation.',
    whenIssued:
      'When a user starts a shopping session: "Find me the best project management tool under $100/month." The Intent Mandate covers the entire session.',
    claims: [
      'Agent DID (identity of the authorized agent)',
      'Purchase category constraints',
      'Maximum spend per transaction',
      'Validity window (start/expiry)',
      'Issuer signature (user or IDP)',
    ],
  },
  {
    type: 'Cart Mandate',
    badge: 'Transaction Authorization',
    color: '#10b981',
    icon: 'C',
    scope: 'Transaction-specific',
    validity: 'Up to 30 minutes',
    useCase: 'Specific purchase execution',
    description:
      'A Cart Mandate is a cryptographically bound authorization for one specific transaction. It includes a SHA-256 hash of the cart contents — every item, quantity, price, and merchant — making it tamper-evident. If anything in the cart changes between mandate issuance and checkout (price update, inventory change, item modification), the hash verification fails and the transaction is rejected. Cart Mandates are the gold standard for enterprise purchase compliance because they create a document trail binding user intent to the exact transaction executed.',
    whenIssued:
      'When the agent has selected specific items and is ready to proceed to checkout: cart is defined, price is confirmed, merchant is known.',
    claims: [
      'Agent DID (authorized agent identity)',
      'Cart hash (SHA-256 of items + prices + merchant)',
      'Exact authorized amount',
      'Merchant identifier',
      'Payment rail (stripe_spt, x402, etc.)',
      'Short-lived expiry (anti-replay)',
    ],
  },
]

const enterpriseReasons = [
  {
    title: 'Procurement Compliance',
    icon: 'P',
    description:
      'Enterprise procurement policies require documented authorization for every purchase. AP2 Intent and Cart Mandates serve as the machine-readable equivalent of a purchase order — signed by an authorized principal, scoped to a specific category or transaction, and verifiable by auditors without human attestation.',
  },
  {
    title: 'Legal Defensibility',
    icon: 'L',
    description:
      'When an AI agent makes a purchase, the question "who authorized this?" must have a cryptographically verifiable answer. AP2 Verifiable Credentials provide that answer: the VC proves which user authorized which agent to purchase what, signed with a key traceable to the user\'s identity. Courts and regulators accept cryptographic signatures as proof of authorization.',
  },
  {
    title: 'Non-Repudiation Audit Trails',
    icon: 'A',
    description:
      'AP2 mandates that every mandate issuance, presentation, and verification be logged with timestamp, agent identity, and cryptographic proof. The resulting audit trail is non-repudiable: neither the buyer\'s agent nor the merchant can claim a transaction did not occur or that different terms were agreed to. For financial close, SOX compliance, and dispute resolution, this trail is essential.',
  },
  {
    title: 'Spend Control and Delegation Governance',
    icon: 'G',
    description:
      'Enterprises grant employees spending authority within defined limits. AP2 extends this model to AI agents: finance controllers issue Intent Mandates with category and amount constraints, employees cannot exceed their delegated budget, and every agent purchase is traced to the authorizing human. AP2 makes AI agent spending auditable under the same governance framework as corporate cards.',
  },
]

export default function AP2Page() {
  return (
    <>
      <JsonLd data={pageSchemas} />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      >
        <div className="container py-3">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-[var(--color-muted-2)]">/</li>
            <li>
              <Link href="/protocols" className="hover:text-[var(--color-accent)] transition-colors">
                Protocols
              </Link>
            </li>
            <li aria-hidden="true" className="text-[var(--color-muted-2)]">/</li>
            <li aria-current="page" className="font-semibold text-[var(--color-text)]">
              AP2
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="section gradient-hero"
        aria-labelledby="ap2-hero-heading"
      >
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="badge badge-ap2">AP2</span>
              <span className="text-sm text-[var(--color-muted)]">Governed by Google</span>
              <span className="text-sm text-[var(--color-muted-2)]">&middot;</span>
              <span className="text-sm text-[var(--color-muted)]">Version 1.0</span>
            </div>
            <h1
              id="ap2-hero-heading"
              className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight"
            >
              Agent Payments Protocol (AP2): Cryptographic Trust for Agentic Transactions
            </h1>
            <div
              className="speakable-answer card p-5 border-l-4 border-[#10b981] bg-[var(--color-surface)]"
              aria-label="Quick answer"
            >
              <p className="text-[var(--color-text)] leading-relaxed">
                AP2 is Google&apos;s cryptographic mandate framework for agentic commerce. Intent
                and Cart mandates — signed with W3C Verifiable Credentials — give AI agents
                provable authority to purchase on behalf of users and create the non-repudiation
                audit trail enterprise procurement, legal compliance, and financial governance
                require. AP2 is the trust layer that makes AI spending legally defensible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is AP2 */}
      <section className="section" aria-labelledby="what-is-ap2-heading">
        <div className="container max-w-3xl">
          <span className="badge mb-4">Protocol Overview</span>
          <h2
            id="what-is-ap2-heading"
            className="text-3xl font-bold text-[var(--color-text)] mb-6"
          >
            What is AP2?
          </h2>
          <div className="prose-asc space-y-5">
            <p>
              Agent Payments Protocol (AP2) is Google&apos;s mandate framework for establishing
              cryptographically verifiable trust in AI-mediated transactions. Where UCP handles
              discovery and ACP handles checkout execution, AP2 answers the hardest question in
              agentic commerce: <em>how do we prove an AI agent was authorized to make that
              purchase?</em> AP2 answers with signed Verifiable Credentials that create a
              tamper-evident chain of authorization from user to agent to transaction.
            </p>
            <p>
              AP2 operates through two types of cryptographic mandates. An{' '}
              <strong className="text-[var(--color-text)]">Intent Mandate</strong> is a
              broad, category-scoped authorization — &ldquo;this agent may purchase SaaS
              software under $200/month on my behalf.&rdquo; An Intent Mandate covers an
              entire shopping session or time period, allowing the agent to browse, compare,
              and negotiate without requiring per-product approvals. A{' '}
              <strong className="text-[var(--color-text)]">Cart Mandate</strong> is a
              transaction-specific authorization — it includes a cryptographic hash of the
              exact cart contents, binding the user&apos;s authorization to a specific set
              of items, prices, and a merchant. If any element of the cart changes, the
              hash verification fails and the transaction is blocked.
            </p>
            <p>
              Both mandate types are issued as{' '}
              <strong className="text-[var(--color-text)]">W3C Verifiable Credentials
              (VCs)</strong> — the global standard for machine-verifiable digital credentials.
              AP2 supports JWT VC format for REST-compatible systems and LDP VC (Linked Data
              Proof) format for semantic interoperability. AP2 also integrates with the{' '}
              <strong className="text-[var(--color-text)]">x402 crypto payment protocol</strong>,
              which extends the HTTP 402 status code into a machine-to-machine payment rail
              for crypto and CBDC payments — enabling AI agents to pay for API access and
              digital goods in stablecoin without traditional payment processors.
            </p>
          </div>
        </div>
      </section>

      {/* Mandate Types */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="mandate-types-heading"
      >
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge mb-4">Authorization Framework</span>
            <h2
              id="mandate-types-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              AP2 Mandate Types
            </h2>
            <p className="text-[var(--color-muted)]">
              Two levels of cryptographic authorization — one for discovery sessions, one for
              specific transactions. Both produce Verifiable Credential artifacts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mandateTypes.map((mandate) => (
              <div
                key={mandate.type}
                className="card p-7 flex flex-col"
                style={{ borderTop: `3px solid ${mandate.color}` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
                    style={{ background: mandate.color }}
                    aria-hidden="true"
                  >
                    {mandate.icon}
                  </div>
                  <div>
                    <h3
                      className="font-bold text-lg"
                      style={{ color: mandate.color }}
                    >
                      {mandate.type}
                    </h3>
                    <span
                      className="text-xs font-semibold badge"
                      style={{
                        background: `color-mix(in srgb, ${mandate.color} 15%, transparent)`,
                        color: mandate.color,
                      }}
                    >
                      {mandate.badge}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-5">
                  {mandate.description}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-5 text-xs">
                  <div className="card p-3 text-center">
                    <p className="text-[var(--color-muted-2)] mb-1">Scope</p>
                    <p className="font-semibold text-[var(--color-text)]">{mandate.scope}</p>
                  </div>
                  <div className="card p-3 text-center">
                    <p className="text-[var(--color-muted-2)] mb-1">Validity</p>
                    <p className="font-semibold text-[var(--color-text)]">{mandate.validity}</p>
                  </div>
                  <div className="card p-3 text-center">
                    <p className="text-[var(--color-muted-2)] mb-1">Use Case</p>
                    <p className="font-semibold text-[var(--color-text)]">{mandate.useCase}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <p className="text-xs font-semibold text-[var(--color-muted-2)] mb-2 uppercase tracking-wide">
                    When issued
                  </p>
                  <p className="text-xs text-[var(--color-muted)] mb-4 leading-relaxed italic">
                    &ldquo;{mandate.whenIssued}&rdquo;
                  </p>
                  <p className="text-xs font-semibold text-[var(--color-muted-2)] mb-2 uppercase tracking-wide">
                    VC credential claims
                  </p>
                  <ul className="space-y-1">
                    {mandate.claims.map((claim, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-muted)]">
                        <span
                          className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                          style={{ background: mandate.color }}
                          aria-hidden="true"
                        />
                        {claim}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mandates JSON Example */}
      <section className="section" aria-labelledby="ap2-config-heading">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <span className="badge mb-4">Specification</span>
            <h2
              id="ap2-config-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-2"
            >
              AP2 Mandates Discovery File
            </h2>
            <p className="text-[var(--color-muted)] mb-6">
              The <code className="font-mono text-sm">/.well-known/ap2/mandates.json</code> discovery
              document declares your mandate infrastructure. Agents and enterprise procurement
              systems fetch this to understand your AP2 capabilities before requesting authorization.
            </p>
            <div className="schema-viewer p-5">
              <pre className="text-[var(--color-text)] whitespace-pre overflow-x-auto leading-relaxed">
                <code>{mandatesJsonExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Verifiable Credentials */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="vc-section-heading"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <span className="badge mb-4">Credential Infrastructure</span>
            <h2
              id="vc-section-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-2"
            >
              Verifiable Credentials in AP2
            </h2>
            <p className="text-[var(--color-muted)] mb-6">
              AP2 mandates are issued as W3C Verifiable Credentials. Below is a real
              Cart Mandate JWT VC showing the complete credential structure — header, payload,
              and proof.
            </p>
            <div className="schema-viewer p-5 mb-6">
              <pre className="text-[var(--color-text)] whitespace-pre overflow-x-auto leading-relaxed">
                <code>{vcIssuanceExample}</code>
              </pre>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="card p-5">
                <h3 className="font-bold text-[var(--color-text)] mb-3">JWT VC</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
                  JSON Web Token format. Best for REST APIs, Stripe integrations, and systems
                  already using JWT-based auth. Compact, widely supported, easy to decode
                  with standard JWT libraries.
                </p>
                <div className="schema-viewer px-3 py-2">
                  <code className="text-xs text-[var(--color-muted)] font-mono">
                    alg: ES256 | RS256<br />
                    typ: JWT<br />
                    standard VC claims
                  </code>
                </div>
              </div>
              <div className="card p-5">
                <h3 className="font-bold text-[var(--color-text)] mb-3">LDP VC</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
                  Linked Data Proof format. Best for semantic web interoperability, enterprise
                  DID-based identity systems, and cross-organization credential exchange.
                  Supports Ed25519Signature2020 and BBS+ for selective disclosure.
                </p>
                <div className="schema-viewer px-3 py-2">
                  <code className="text-xs text-[var(--color-muted)] font-mono">
                    proof.type: Ed25519Signature2020<br />
                    @context: w3c/credentials/v1<br />
                    JSON-LD expanded format
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Reasons */}
      <section className="section" aria-labelledby="enterprise-heading">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge mb-4">Enterprise Value</span>
            <h2
              id="enterprise-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              Why Enterprises Need AP2
            </h2>
            <p className="text-[var(--color-muted)]">
              UCP and ACP make AI commerce possible. AP2 makes it compliant.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {enterpriseReasons.map((reason) => (
              <div key={reason.title} className="card p-6 flex gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm bg-[var(--color-accent)]"
                  aria-hidden="true"
                >
                  {reason.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text)] mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation HowTo */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="ap2-implementation-heading"
      >
        <div className="container max-w-3xl">
          <span className="badge mb-4">Implementation Guide</span>
          <h2
            id="ap2-implementation-heading"
            className="text-3xl font-bold text-[var(--color-text)] mb-2"
          >
            How to Implement AP2 Mandates
          </h2>
          <p className="text-[var(--color-muted)] mb-8">
            Five steps to full cryptographic trust infrastructure — from discovery file to
            non-repudiation audit trail.
          </p>

          <ol className="space-y-6">
            {ap2HowToSteps.map((step, i) => (
              <li key={i} className="card p-6 flex gap-5">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: '#10b981' }}
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text)] mb-2 leading-snug">
                    {step.name}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="ap2-faq-heading">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge mb-4">FAQ</span>
            <h2
              id="ap2-faq-heading"
              className="text-3xl font-bold text-[var(--color-text)]"
            >
              AP2 Questions Answered
            </h2>
          </div>
          <div className="space-y-4">
            {ap2FAQs.map((faq, i) => (
              <details key={i} className="card p-5 group" open={i === 0}>
                <summary className="font-semibold text-[var(--color-text)] cursor-pointer flex items-center justify-between list-none">
                  <span>{faq.question}</span>
                  <span
                    className="text-[var(--color-muted-2)] text-lg group-open:rotate-45 transition-transform flex-shrink-0 ml-4"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-[var(--color-muted)] leading-relaxed speakable-answer">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section bg-[var(--color-surface)]"
        aria-labelledby="ap2-cta-heading"
      >
        <div className="container">
          <div className="max-w-2xl mx-auto text-center card p-10">
            <span className="badge badge-ap2 mb-6">AP2 Trust Layer</span>
            <h2
              id="ap2-cta-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              Build Cryptographic Trust for Your Agentic Transactions
            </h2>
            <p className="text-[var(--color-muted)] mb-8 leading-relaxed">
              Adam Silva Consulting implements the complete AP2 trust layer — mandate APIs,
              Verifiable Credential issuance, x402 payment integration, and enterprise audit
              trail infrastructure. Built alongside UCP discovery and ACP checkout for the
              complete agentic commerce stack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/ap2-trust-layer" className="btn-primary">
                Implement AP2 Trust Layer
              </Link>
              <Link href="/protocols" className="btn-secondary">
                Explore Full Protocol Stack
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
