export interface FAQItem {
  question: string
  answer: string
}

export function buildFAQSchema(faqs: FAQItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildSpeakableSchema(cssSelectors: string[] = ['.speakable-answer']) {
  return {
    '@type': 'SpeakableSpecification',
    cssSelector: cssSelectors,
  }
}
