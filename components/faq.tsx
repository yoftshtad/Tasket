'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is Tasket?',
      answer: 'Tasket is the all-in-one platform for university students. Access lecture notes, past exams, and study modules across all departments, so you can focus on what matters – acing your courses!',
    },
    {
      question: 'Is it free?',
      answer: 'Yes! Tasket is completely free now and forever.',
    },
    {
      question: 'Can I download the documents?',
      answer: 'Absolutely! Tasket allows you to download lecture notes, past exams, and study modules for offline access.',
    },
    {
      question: 'Can i upload documents?',
      answer: 'Not yet, but we are working on it! We plan to allow students to contribute their own notes and past exams in the future.',
    },
    {
      question: 'Do i have to signup to view documents?',
      answer: 'Yes! Creating an account allows you to view your favorite documents, track your downloads, and contribute to the community in the future.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <h3 className="text-lg font-semibold text-black">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
