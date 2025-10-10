import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import StructuredData from './StructuredData';
import { generateFAQSchema, FAQItem } from '../../utils/seo';

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
}

/**
 * AEO-optimized FAQ section
 * Critical for Answer Engine Optimization - AI engines love structured FAQs
 */
export default function FAQSection({ faqs, title = 'Frequently Asked Questions', className = '' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const schema = generateFAQSchema(faqs);
  
  return (
    <section className={`py-16 ${className}`}>
      <StructuredData data={schema} />
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-zinc-800 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-white pr-8">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-zinc-800">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}