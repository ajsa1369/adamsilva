import { SITE_URL, ORG_ID } from './organization'

export const adamSilvaSchema = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#adam-silva`,
  name: 'Adam Silva',
  givenName: 'Adam',
  familyName: 'Silva',
  jobTitle: 'Founder & Principal Consultant',
  description:
    'Adam Silva is the founder of Adam Silva Consulting and a leading authority on agentic commerce protocols — UCP, ACP, and AP2. He helps enterprises build the infrastructure required for AI-mediated transactions, answer engine optimization, and generative engine optimization.',
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/images/adam-silva-agentic-commerce-consultant.png`,
  sameAs: [
    'https://www.linkedin.com/in/adamsilvacons',
    'https://twitter.com/adamsilvacons',
  ],
  worksFor: { '@id': ORG_ID },
  knowsAbout: [
    'Universal Commerce Protocol (UCP)',
    'Agentic Commerce Protocol (ACP)',
    'Agent Payments Protocol (AP2)',
    'Answer Engine Optimization',
    'Generative Engine Optimization',
    'Agentic Commerce Architecture',
    'Enterprise AI Transformation',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Agentic Commerce Protocol Expert',
      credentialCategory: 'Professional Expertise',
      recognizedBy: { '@id': ORG_ID },
    },
  ],
}
