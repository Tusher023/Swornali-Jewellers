'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomJewelryPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <header className="page-header text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display text-(--gold-400) mb-4"
          >
            Design Your Dream Piece
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-(--text-secondary) text-lg max-w-2xl mx-auto"
          >
            Work with our master artisans to create bespoke jewellery that tells your unique story.
          </motion.p>
        </header>

        <section className="mb-20">
          <h2 className="section-title text-center mb-10 text-3xl font-display text-(--gold-400)">The Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Share Your Vision', desc: 'Tell us about your dream design, budget, and timeline.' },
              { step: 2, title: 'Design & Quote', desc: 'Review 3D renders and receive a detailed, transparent quote.' },
              { step: 3, title: 'Crafting', desc: 'Our artisans bring your piece to life with meticulous care.' },
              { step: 4, title: 'Delivery', desc: 'Receive your custom masterpiece in luxury packaging.' },
            ].map((item, index) => (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center border border-(--gold-400)/20 bg-(--bg-card)"
              >
                <div className="w-12 h-12 rounded-full bg-(--gold-400)/10 text-(--gold-400) flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-display text-(--text-primary) mb-2">{item.title}</h3>
                <p className="text-(--text-secondary) text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto">
          <div className="glass-card p-8 md:p-10 rounded-2xl border border-(--gold-400)/20 bg-(--bg-card)">
            <h2 className="text-2xl font-display text-(--gold-400) mb-6 text-center">Start Your Custom Request</h2>
            
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display text-(--text-primary) mb-2">Request Received!</h3>
                <p className="text-(--text-secondary)">Our design team will contact you within 24 hours.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-secondary mt-6"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="form-label text-(--text-secondary) block mb-2 text-sm">Jewelry Type</label>
                    <select className="form-select w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none" required>
                      <option value="">Select Type</option>
                      <option value="Ring">Ring</option>
                      <option value="Necklace">Necklace</option>
                      <option value="Earrings">Earrings</option>
                      <option value="Bracelet">Bracelet</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label text-(--text-secondary) block mb-2 text-sm">Material</label>
                    <select className="form-select w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none" required>
                      <option value="">Select Material</option>
                      <option value="18K Yellow Gold">18K Yellow Gold</option>
                      <option value="18K White Gold">18K White Gold</option>
                      <option value="18K Rose Gold">18K Rose Gold</option>
                      <option value="22K Gold">22K Gold</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label text-(--text-secondary) block mb-2 text-sm">Gold Purity</label>
                    <select className="form-select w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none" required>
                      <option value="">Select Purity</option>
                      <option value="18K">18K</option>
                      <option value="22K">22K</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label text-(--text-secondary) block mb-2 text-sm">Stone Type</label>
                    <select className="form-select w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none" required>
                      <option value="">Select Stone</option>
                      <option value="Diamond">Diamond</option>
                      <option value="Ruby">Ruby</option>
                      <option value="Sapphire">Sapphire</option>
                      <option value="Emerald">Emerald</option>
                      <option value="Pearl">Pearl</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label text-(--text-secondary) block mb-2 text-sm">Size (Optional)</label>
                    <input type="text" className="form-input w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none" placeholder="e.g. Ring Size 6" />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-(--text-secondary) block mb-2 text-sm">Budget Range</label>
                    <select className="form-select w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none" required>
                      <option value="">Select Budget</option>
                      <option value="Under ৳50K">Under ৳50K</option>
                      <option value="৳50K-1L">৳50K - 1 Lakh</option>
                      <option value="৳1L-2L">৳1 Lakh - 2 Lakhs</option>
                      <option value="Over ৳2L">Over ৳2 Lakhs</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label text-(--text-secondary) block mb-2 text-sm">Description of your dream piece</label>
                  <textarea 
                    className="form-textarea w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none min-h-[120px]" 
                    placeholder="Tell us about the design, inspiration, or specific details you have in mind..."
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label text-(--text-secondary) block mb-2 text-sm">Reference Image URL (Optional)</label>
                  <input type="url" className="form-input w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none" placeholder="https://..." />
                </div>

                <button type="submit" className="btn btn-primary w-full py-4 text-lg bg-(--gold-400) text-black font-semibold rounded-md hover:bg-(--gold-500) transition-colors">
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
