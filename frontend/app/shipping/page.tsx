'use client';

import { useState } from 'react';
import { faqs } from '../../lib/products';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShippingPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="page-header text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display text-(--gold-400) mb-4">Shipping & Returns</h1>
          <p className="text-(--text-secondary) text-lg">
            Everything you need to know about delivery and our return policy.
          </p>
        </header>

        {/* Shipping Policy */}
        <section className="mb-16">
          <h2 className="text-2xl font-display text-(--gold-400) mb-6">Shipping Policy</h2>
          <div className="glass-card p-8 rounded-2xl border border-(--gold-400)/20 bg-(--bg-card) space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-(--gold-400) shrink-0 mt-1">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-(--text-primary) mb-2">Free Insured Delivery</h3>
                <p className="text-(--text-secondary) leading-relaxed">
                  We offer free, fully insured shipping on all orders nationwide. Every package is dispatched via secure courier services ensuring your precious purchase reaches you safely.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-(--gold-400) shrink-0 mt-1">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-(--text-primary) mb-2">Delivery Timeline</h3>
                <p className="text-(--text-secondary) leading-relaxed">
                  Standard items are processed within 1 business day and delivered within 2-5 business days. Custom orders or bespoke jewelry require 3-4 weeks for crafting before dispatch.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Returns Policy */}
        <section className="mb-16">
          <h2 className="text-2xl font-display text-(--gold-400) mb-6">Return & Exchange</h2>
          <div className="space-y-6 text-(--text-secondary) leading-relaxed">
            <p>
              We want you to be completely satisfied with your purchase. Swornali Jewellers offers a hassle-free 14-day return and exchange policy from the date of delivery.
            </p>
            <h3 className="text-lg font-medium text-(--text-primary) mt-4 mb-2">Conditions for Returns:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>The item must be in its original, unworn condition.</li>
              <li>All original certificates, tags, and packaging must be intact and returned.</li>
              <li>Customized, engraved, or altered pieces are non-refundable and non-exchangeable.</li>
              <li>Returns are subject to quality inspection by our experts.</li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl font-display text-(--gold-400) mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="accordion-item border border-(--gold-400)/20 rounded-lg overflow-hidden bg-(--bg-card)">
                <button
                  className="w-full text-left p-5 flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(faq.q)}
                >
                  <span className="font-medium text-(--text-primary)">{faq.q}</span>
                  <span className="text-(--gold-400)">
                    {openFaq === faq.q ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === faq.q && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-(--text-secondary) border-t border-(--gold-400)/10">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Care Instructions */}
        <section>
          <h2 className="text-2xl font-display text-(--gold-400) mb-6">Jewelry Care Instructions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-(--bg-card) p-6 rounded-xl border border-(--gold-400)/20">
              <h3 className="text-lg font-medium text-(--text-primary) mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-(--gold-400)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Daily Care
              </h3>
              <p className="text-(--text-secondary) text-sm leading-relaxed">
                Remove jewelry before sleeping, showering, or exercising. Avoid exposure to harsh chemicals, perfumes, or cosmetics as they may dull the shine of gold and stones.
              </p>
            </div>
            <div className="card bg-(--bg-card) p-6 rounded-xl border border-(--gold-400)/20">
              <h3 className="text-lg font-medium text-(--text-primary) mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-(--gold-400)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Storage
              </h3>
              <p className="text-(--text-secondary) text-sm leading-relaxed">
                Store each piece individually in soft pouches or lined jewelry boxes to prevent scratches. Keep diamond pieces separate as they can scratch softer stones and gold.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
