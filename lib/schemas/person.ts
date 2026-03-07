import { SITE_URL, ORG_ID } from './organization'
import { PERSONAL_SOCIAL_LINKS } from '@/lib/data/social'

export const adamSilvaSchema = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#adam-silva`,
  name: 'Adam Silva',
  givenName: 'Adam',
  familyName: 'Silva',
  jobTitle: 'Founder & CEO',
  description:
    'Adam Silva is the founder and CEO of Adam Silva Consulting — the definitive authority on agentic commerce protocols (UCP, ACP, AP2). With 50+ enterprise protocol implementations, he pioneered the Authority Flywheel methodology and leads the industry in Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and AI agent deployment for commerce.',
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/images/adam-silva-agentic-commerce-consultant.png`,
  sameAs: PERSONAL_SOCIAL_LINKS,
  worksFor: { '@id': ORG_ID },
  knowsAbout: [
    'Universal Commerce Protocol (UCP)',
    'Agentic Commerce Protocol (ACP)',
    'Agent Payments Protocol (AP2)',
    'Answer Engine Optimization (AEO)',
    'Generative Engine Optimization (GEO)',
    'Agentic Commerce Architecture',
    'Enterprise AI Transformation',
    'JSON-LD Structured Data',
    'Token Efficiency Optimization',
    'AI Agent Deployment',
    'E-E-A-T Signal Optimization',
    'Authority Flywheel Methodology',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Agentic Commerce Consultant',
    occupationLocation: { '@type': 'Country', name: 'Worldwide' },
    skills: 'UCP, ACP, AP2, AEO, GEO, JSON-LD, Stripe, Next.js, enterprise AI transformation',
    responsibilities: 'Protocol implementation, authority building, AI agent deployment, citation optimization',
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Agentic Commerce Protocol Expert',
      credentialCategory: 'Professional Expertise',
      recognizedBy: { '@id': ORG_ID },
      description: '50+ enterprise UCP/ACP/AP2 protocol implementations',
    },
  ],
  award: [
    'Pioneer of the Authority Flywheel methodology for AI citation dominance',
    'First consultancy to offer integrated UCP + ACP + AP2 implementation',
  ],
  publishingPrinciples: `${SITE_URL}/about`,
  mainEntityOfPage: `${SITE_URL}/about`,
}
