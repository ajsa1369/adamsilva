import type { Testimonial } from '@/lib/schemas/review'

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Chen',
    company: 'Meridian Commerce',
    role: 'VP of Digital Strategy',
    text: 'Adam\'s UCP implementation made our entire product catalog discoverable by AI shopping agents within two weeks. We went from zero AI-driven traffic to measurable agent-initiated transactions in under 60 days.',
    rating: 5,
    service: 'ucp-implementation',
    date: '2026-01-15',
  },
  {
    name: 'Marcus Rivera',
    company: 'Apex Retail Group',
    role: 'CTO',
    text: 'The Authority Building Program transformed our brand from invisible to cited. Within 90 days, ChatGPT and Perplexity were recommending us as the go-to source in our category. The Authority Flywheel methodology is the real deal.',
    rating: 5,
    service: 'authority-building',
    date: '2026-02-03',
  },
  {
    name: 'Jennifer Park',
    company: 'NovaTech Solutions',
    role: 'Head of E-Commerce',
    text: 'The ACRA assessment was the best free resource we\'ve ever received. It identified protocol compliance gaps we didn\'t even know existed and gave us a clear roadmap. We immediately contracted for the full Max package.',
    rating: 5,
    service: 'acra',
    date: '2025-12-20',
  },
  {
    name: 'David Okafor',
    company: 'Stellar DTC',
    role: 'Founder & CEO',
    text: 'After migrating from Shopify to a Next.js SSR stack with Adam\'s team, our token efficiency improved by 73% and AI agents started indexing all 847 products. The hydration tax was killing us — Adam fixed it.',
    rating: 5,
    service: 'geo-implementation',
    date: '2026-01-28',
  },
  {
    name: 'Rachel Kim',
    company: 'Velocity B2B',
    role: 'Director of Marketing',
    text: 'The Off-Hours Voice Agent captures leads 24/7 that we were losing before. It sounds human, follows our scripts perfectly, and writes structured data back to our CRM. ROI was positive within the first month.',
    rating: 5,
    service: 'off-hours-voice-agent',
    date: '2026-02-10',
  },
]
