import type { Metadata } from 'next'
import { Roboto, Roboto_Condensed, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { JsonLd } from './components/seo/JsonLd'
import { organizationSchema, websiteSchema } from '@/lib/schemas/organization'
import { logoImageSchema } from '@/lib/schemas/image'

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['600', '700'],
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
})

const SITE_URL = 'https://www.adamsilvaconsulting.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Adam Silva Consulting — Full-Stack AI Agency & Agentic Commerce',
    template: '%s | Adam Silva Consulting',
  },
  description:
    'Full-stack AI agency — custom AI agents, workflow automation, lead generation, advertising, agentic commerce protocols (UCP/ACP/AP2), and AEO/GEO optimization. We build your entire AI revenue infrastructure.',
  keywords: [
    'AI agency',
    'custom AI agents',
    'workflow automation',
    'lead generation',
    'agentic commerce',
    'UCP',
    'Universal Commerce Protocol',
    'ACP',
    'Agentic Commerce Protocol',
    'AP2',
    'Agent Payments Protocol',
    'AEO',
    'Answer Engine Optimization',
    'GEO',
    'Generative Engine Optimization',
    'AI agent commerce',
    'Adam Silva Consulting',
  ],
  authors: [{ name: 'Adam Silva', url: `${SITE_URL}/about` }],
  creator: 'Adam Silva Consulting',
  publisher: 'Adam Silva Consulting',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Adam Silva Consulting',
    title: 'Adam Silva Consulting — Full-Stack AI Agency & Agentic Commerce',
    description:
      'Custom AI agents, workflow automation, lead generation, advertising, and agentic commerce protocols. The full-stack AI agency.',
    images: [
      {
        url: `${SITE_URL}/images/adam-silva-consulting-agentic-commerce-hero.png`,
        width: 1200,
        height: 630,
        alt: 'Adam Silva Consulting — Full-Stack AI Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@adamsilvacons',
    creator: '@adamsilvacons',
    title: 'Adam Silva Consulting — Full-Stack AI Agency & Agentic Commerce',
    description: 'Custom AI agents, workflow automation, lead generation, and agentic commerce protocols.',
    images: [`${SITE_URL}/images/adam-silva-consulting-agentic-commerce-hero.png`],
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
}

const rootSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    websiteSchema,
    logoImageSchema,
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#060d1f" />
        <link rel="alternate" type="application/rss+xml" title="Adam Silva Consulting Insights" href="/feed.xml" />
        <JsonLd data={rootSchema} />
      </head>
      <body className={`${robotoCondensed.variable} ${roboto.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {/* Theme init script — prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
