import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { JsonLd } from '@/app/components/seo/JsonLd'
import { buildBreadcrumbSchema, SITE_URL, ORG_ID } from '@/lib/schemas/organization'

export const metadata: Metadata = {
  title: 'Agentic Commerce Glossary — UCP, ACP, AP2, AEO, GEO Definitions | Adam Silva Consulting',
  description:
    'Definitive glossary of 20+ agentic commerce terms: UCP, ACP, AP2, AEO, GEO, hydration tax, token efficiency, authority flywheel, verifiable credentials, and more. Maintained by Adam Silva Consulting.',
  alternates: {
    canonical: `${SITE_URL}/glossary`,
  },
  openGraph: {
    title: 'Agentic Commerce Glossary — UCP, ACP, AP2, AEO, GEO Definitions',
    description:
      'Definitive glossary of 20+ agentic commerce terms maintained by the protocol implementation authority.',
    url: `${SITE_URL}/glossary`,
    type: 'website',
  },
}

const SITE_URL_CONST = 'https://www.adamsilvaconsulting.com'

interface GlossaryTerm {
  term: string
  letter: string
  definition: string
  relatedPage?: { label: string; href: string }
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Agentic Commerce',
    letter: 'A',
    definition:
      'Commerce mediated entirely by AI agents acting on behalf of human buyers, without requiring browser sessions or manual interaction. In agentic commerce, AI agents discover merchants via UCP, negotiate and execute transactions via ACP, and authorize payments via AP2 mandates — completing the full purchase lifecycle autonomously. This represents a fundamental shift from human-to-website commerce to agent-to-API commerce.',
    relatedPage: { label: 'Agentic Commerce Protocols', href: '/protocols' },
  },
  {
    term: 'ACP (Agentic Commerce Protocol)',
    letter: 'A',
    definition:
      'The OpenAI-led open standard for AI agent checkout execution, developed in partnership with Stripe. ACP defines the API surface that merchants must expose to allow AI agents to add items to carts, apply promotions, and complete checkout using Stripe Payment Tokens (SPT). ChatGPT Instant Checkout is the most prominent ACP implementation. Without ACP endpoints, AI agents cannot execute purchases in your store — the transaction stalls.',
    relatedPage: { label: 'ACP Protocol Guide', href: '/protocols/acp' },
  },
  {
    term: 'AEO (Answer Engine Optimization)',
    letter: 'A',
    definition:
      'The discipline of optimizing digital content and infrastructure to be cited by AI answer engines including ChatGPT, Perplexity, Claude, Google AI Mode, and Bing Copilot. AEO differs from traditional SEO in that it targets AI systems that synthesize answers rather than listing links. Effective AEO requires structured data (JSON-LD), answer-first content format, E-E-A-T signals, and topical authority — the combination that makes AI systems cite your brand as the authoritative source.',
    relatedPage: { label: 'AEO Audit Service', href: '/services/aeo-audit' },
  },
  {
    term: 'AP2 (Agent Payments Protocol)',
    letter: 'A',
    definition:
      'Google\'s cryptographic mandate framework for agentic transactions. AP2 introduces two mandate types — Intent Mandates (for browsing and comparison authorization) and Cart Mandates (for specific transaction authorization) — signed with Verifiable Credentials. AP2 makes agentic transactions legally defensible by creating cryptographic proof of user authorization for every AI-mediated purchase. It is the trust layer that enterprise procurement, compliance, and non-repudiation requirements demand.',
    relatedPage: { label: 'AP2 Protocol Guide', href: '/protocols/ap2' },
  },
  {
    term: 'Authority Flywheel',
    letter: 'A',
    definition:
      'A compounding cycle of authority accumulation developed by Adam Silva Consulting. The four stages are: (1) Protocol compliance makes your business machine-readable; (2) Schema-rich content gets parsed by AI systems; (3) AI systems cite your content as authoritative; (4) Citations drive more authority signals, accelerating the cycle. Once set in motion, the Authority Flywheel generates compounding returns — each citation makes future citations more likely.',
    relatedPage: { label: 'Authority Building Program', href: '/services/authority-building' },
  },
  {
    term: 'Cart Mandate (AP2)',
    letter: 'C',
    definition:
      'An AP2 cryptographic authorization type that permits an AI agent to execute a specific, pre-approved transaction on the user\'s behalf. A Cart Mandate is more restrictive than an Intent Mandate — it authorizes a specific cart (specific items, quantities, and price) rather than general browsing. Cart Mandates are signed with Verifiable Credentials, providing cryptographic proof that the user explicitly authorized the precise transaction the AI agent completes.',
    relatedPage: { label: 'AP2 Mandate Infrastructure', href: '/services/ap2-trust-layer' },
  },
  {
    term: 'ChatGPT Instant Checkout',
    letter: 'C',
    definition:
      'OpenAI\'s consumer-facing implementation of the Agentic Commerce Protocol (ACP), enabling users to complete purchases entirely within the ChatGPT interface without navigating to external merchant websites. ChatGPT Instant Checkout uses Stripe Payment Tokens (SPT) for payment authorization and communicates with merchant ACP endpoints to execute checkout. It demonstrates ACP working in production at scale, and represents the primary demand driver for merchant ACP adoption.',
    relatedPage: { label: 'ACP Integration Service', href: '/services/acp-integration' },
  },
  {
    term: 'E-E-A-T',
    letter: 'E',
    definition:
      'Experience, Expertise, Authoritativeness, and Trustworthiness — Google\'s quality evaluation framework for content and websites. E-E-A-T signals include author credentials, first-hand experience documentation, third-party citations, industry recognition, and on-site trust indicators (privacy policy, contact information, organizational schema). AI systems use E-E-A-T signals to determine citation worthiness. Strong E-E-A-T is a prerequisite for becoming the source AI agents cite in your topic area.',
    relatedPage: { label: 'GEO Implementation', href: '/services/geo-implementation' },
  },
  {
    term: 'GEO (Generative Engine Optimization)',
    letter: 'G',
    definition:
      'The practice of optimizing digital content and infrastructure to appear in outputs generated by AI language models and generative search engines, including ChatGPT, Google AI Mode, Perplexity, and Gemini. GEO focuses on structured data coverage, entity disambiguation, topical depth, and content format — ensuring AI models have high-quality, unambiguous information to generate accurate citations. GEO targets the content synthesis layer, while AEO targets the answer retrieval layer.',
    relatedPage: { label: 'GEO Implementation Service', href: '/services/geo-implementation' },
  },
  {
    term: 'Hydration Tax',
    letter: 'H',
    definition:
      'The performance penalty imposed by client-side React rendering (CSR) on AI agent crawlers and search engines. In a client-side SPA, the server delivers a near-empty HTML shell — JavaScript must execute to render content. AI agents and Googlebot frequently encounter blank pages, index zero products, and generate no citations as a result. The "tax" is the cost paid in discoverability and indexation for choosing CSR architecture. Server-Side Rendering (SSR) eliminates the hydration tax.',
    relatedPage: { label: 'Hydration Tax Article', href: '/insights/hydration-tax-client-side-rendering' },
  },
  {
    term: 'Intent Mandate (AP2)',
    letter: 'I',
    definition:
      'An AP2 cryptographic authorization type that permits an AI agent to browse, compare, and evaluate products on a user\'s behalf without completing a purchase. Intent Mandates are broader than Cart Mandates — they authorize exploratory agent behavior (searching catalogs, checking prices, comparing specifications) but not transaction execution. They are signed with Verifiable Credentials, providing a cryptographic audit trail of user-authorized browsing activity.',
    relatedPage: { label: 'AP2 Trust Layer Service', href: '/services/ap2-trust-layer' },
  },
  {
    term: 'JSON-LD',
    letter: 'J',
    definition:
      'JavaScript Object Notation for Linked Data — the W3C standard for embedding machine-readable semantic data in web pages. JSON-LD uses Schema.org vocabulary to describe entities (Organization, Product, Article, Person, Service) and their relationships in a format AI agents and search engines parse without executing JavaScript. Embedded in HTML `<script type="application/ld+json">` tags, JSON-LD is the primary mechanism for communicating structured facts to AI systems that process your pages.',
    relatedPage: { label: 'GEO Implementation', href: '/services/geo-implementation' },
  },
  {
    term: 'SSR (Server-Side Rendering)',
    letter: 'S',
    definition:
      'The architectural pattern of rendering complete HTML on the web server before delivering it to the browser or crawler. In SSR, every page request returns fully-populated HTML — no JavaScript execution required to read content. AI agents and search crawlers receive complete, parseable content on the first HTTP response. SSR is foundational to agentic commerce readiness: without it, AI agents encounter blank pages, index nothing, and generate no citations. Next.js App Router uses SSR by default.',
    relatedPage: { label: 'Case Studies', href: '/case-studies#dtc-ssr-migration-hydration-tax' },
  },
  {
    term: 'Stripe SPT (Stripe Payment Token)',
    letter: 'S',
    definition:
      'The payment authorization mechanism used in ACP (Agentic Commerce Protocol) implementations. Stripe Payment Tokens allow AI agents to complete purchases on behalf of users using pre-authorized payment methods stored by Stripe — without the agent ever seeing raw card data. The SPT is generated when a user pre-authorizes AI agent purchasing, and is passed by the AI agent to ACP checkout endpoints to complete transactions. It is the payment primitive that makes ChatGPT Instant Checkout possible.',
    relatedPage: { label: 'ACP Integration Service', href: '/services/acp-integration' },
  },
  {
    term: 'Token Efficiency',
    letter: 'T',
    definition:
      'The measure of how economically a web page communicates useful information to AI agents, expressed as meaningful content tokens divided by total page tokens. Pages bloated with navigation markup, repeated scripts, inline styles, and empty containers force AI agents to process (and pay for) tokens that carry no semantic value. High token efficiency means AI agents extract maximum signal per token consumed — reducing cost and improving citation accuracy. Token efficiency is the agentic-era equivalent of page speed.',
    relatedPage: { label: 'Token Efficiency Article', href: '/insights/token-efficiency-make-pages-cheap-to-parse' },
  },
  {
    term: 'Topical Authority',
    letter: 'T',
    definition:
      'The state of being recognized by AI systems and search engines as the definitive source on a specific topic or domain. Topical authority is built through comprehensive coverage (hub-and-spoke content architecture), consistent citation by authoritative sources, schema-reinforced entity relationships, and demonstrated expertise signals. When an AI system develops topical authority associations, it preferentially cites your brand for related queries — creating a compounding citation advantage that amplifies over time.',
    relatedPage: { label: 'Authority Building Program', href: '/services/authority-building' },
  },
  {
    term: 'UCP (Universal Commerce Protocol)',
    letter: 'U',
    definition:
      'Google\'s open standard for AI agent commerce discovery, specifying how merchants declare their commerce capabilities in a machine-readable format at /.well-known/ucp/manifest.json. UCP manifests describe what a business sells, how AI agents can query inventory and pricing, which payment methods are accepted, and what fulfillment options are available. AI agents — including Google AI Mode, autonomous shopping assistants, and enterprise procurement agents — use UCP capability profiles to decide which merchants they can transact with. Without a UCP manifest, a business is invisible to AI-mediated commerce.',
    relatedPage: { label: 'UCP Protocol Guide', href: '/protocols/ucp' },
  },
  {
    term: 'UCP Manifest',
    letter: 'U',
    definition:
      'A JSON configuration file hosted at /.well-known/ucp/manifest.json that declares a merchant\'s AI commerce capabilities per the Universal Commerce Protocol specification. The manifest specifies the merchant\'s name, commerce capabilities (catalog browsing, cart management, checkout), supported transport protocols (REST, MCP, A2A), authentication requirements, and product category declarations. Every business seeking AI agent discoverability must maintain a valid, up-to-date UCP manifest — it is the entry point for every AI agent that wants to transact with your business.',
    relatedPage: { label: 'UCP Implementation Service', href: '/services/ucp-implementation' },
  },
  {
    term: 'Verifiable Credentials (VC)',
    letter: 'V',
    definition:
      'W3C-standardized cryptographic proofs used in AP2 (Agent Payments Protocol) mandate authorization. Verifiable Credentials are digitally signed attestations that can be independently verified without contacting the issuing authority. In the AP2 context, VCs are used to sign Intent and Cart Mandates — creating tamper-proof, cryptographically verifiable evidence that a user authorized an AI agent to perform a specific action. VCs are what make agentic transactions legally defensible and auditable.',
    relatedPage: { label: 'AP2 Trust Layer Service', href: '/services/ap2-trust-layer' },
  },
  {
    term: '.well-known',
    letter: 'W',
    definition:
      'A standardized URL path prefix (defined by RFC 8615) used for machine-readable discovery files that describe a website\'s capabilities and configurations. In agentic commerce, three critical .well-known paths are required: /.well-known/ucp/manifest.json (UCP discovery), /.well-known/acp/config.json (ACP checkout configuration), and /.well-known/ap2/mandates.json (AP2 mandate schema). AI agents check these endpoints as the first step in determining whether a merchant is agent-transactable.',
    relatedPage: { label: 'Protocol Implementation', href: '/protocols' },
  },
]

// Group terms by letter
const termsByLetter = glossaryTerms.reduce<Record<string, GlossaryTerm[]>>((acc, term) => {
  if (!acc[term.letter]) acc[term.letter] = []
  acc[term.letter].push(term)
  return acc
}, {})

const sortedLetters = Object.keys(termsByLetter).sort()

const definedTermSetSchema = {
  '@type': 'DefinedTermSet',
  '@id': `${SITE_URL_CONST}/glossary#term-set`,
  name: 'Agentic Commerce Glossary',
  description:
    'Definitive definitions for UCP, ACP, AP2, AEO, GEO, and all agentic commerce terminology. Maintained by Adam Silva Consulting.',
  url: `${SITE_URL_CONST}/glossary`,
  publisher: { '@id': ORG_ID },
  inDefinedTermSet: `${SITE_URL_CONST}/glossary`,
  hasDefinedTerm: glossaryTerms.map((t) => ({
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL_CONST}/glossary#${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name: t.term,
    description: t.definition,
    inDefinedTermSet: `${SITE_URL_CONST}/glossary#term-set`,
    url: `${SITE_URL_CONST}/glossary#${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  })),
}

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Glossary', url: '/glossary' },
])

const pageSchemas = [definedTermSetSchema, breadcrumbSchema]

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={pageSchemas} />

      {/* Hero */}
      <section className="section gradient-hero" aria-labelledby="glossary-heading">
        <div className="container">
          <div className="max-w-3xl">
            <span className="badge mb-6">Reference Library</span>
            <h1
              id="glossary-heading"
              className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight"
            >
              Agentic Commerce Glossary
            </h1>
            <p className="text-xl text-[var(--color-muted)] leading-relaxed speakable-answer">
              Definitive definitions for UCP, ACP, AP2, AEO, GEO, and every term that matters
              in the agentic commerce era. {glossaryTerms.length} terms, maintained by
              Adam Silva Consulting.
            </p>
          </div>
        </div>
      </section>

      {/* A-Z Navigation */}
      <section className="section-sm bg-[var(--color-surface)] sticky top-0 z-10 border-b border-[var(--color-border)]">
        <div className="container">
          <nav aria-label="Glossary alphabet navigation">
            <div className="flex flex-wrap gap-2">
              {sortedLetters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-9 h-9 flex items-center justify-center rounded-lg font-bold text-sm transition-colors hover:bg-[var(--color-accent)] hover:text-white border border-[var(--color-border)] text-[var(--color-text)]"
                >
                  {letter}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </section>

      {/* Terms */}
      <section className="section" aria-label="Glossary terms">
        <div className="container max-w-4xl">
          <dl className="space-y-16">
            {sortedLetters.map((letter) => (
              <div key={letter} id={`letter-${letter}`} className="scroll-mt-32">
                {/* Letter heading */}
                <div className="flex items-center gap-4 mb-8">
                  <span
                    className="text-5xl font-black text-[var(--color-accent)] opacity-20 select-none"
                    aria-hidden="true"
                  >
                    {letter}
                  </span>
                  <div className="flex-1 border-t border-[var(--color-border)]" />
                </div>

                <div className="space-y-8">
                  {termsByLetter[letter].map((term) => {
                    const termId = term.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    return (
                      <div
                        key={term.term}
                        id={termId}
                        className="card p-6 scroll-mt-40"
                      >
                        <dt className="mb-3">
                          <h2 className="text-xl font-bold text-[var(--color-text)]">
                            {term.term}
                          </h2>
                        </dt>
                        <dd>
                          <p className="prose-asc text-sm leading-relaxed mb-4 speakable-answer">
                            {term.definition}
                          </p>
                          {term.relatedPage && (
                            <Link
                              href={term.relatedPage.href}
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent)] hover:underline"
                            >
                              {term.relatedPage.label}
                              <ArrowRight size={13} />
                            </Link>
                          )}
                        </dd>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[var(--color-surface)]" aria-labelledby="glossary-cta-heading">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="badge mb-6">Ready to Implement?</span>
            <h2
              id="glossary-cta-heading"
              className="text-3xl font-bold text-[var(--color-text)] mb-4"
            >
              From Definitions to Deployment
            </h2>
            <p className="text-[var(--color-muted)] mb-8 leading-relaxed">
              Understanding the terms is step one. Implementation is step two. Adam Silva
              Consulting handles the full UCP, ACP, AP2 protocol stack — from manifest files
              to checkout endpoints to mandate infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/acra" className="btn-primary">
                Free ACRA
                <ArrowRight size={16} />
              </Link>
              <Link href="/protocols" className="btn-secondary">
                Explore the Protocols
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
