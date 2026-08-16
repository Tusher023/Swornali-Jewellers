'use client';

import { useState } from 'react';
import { useStore } from '../../components/store-provider';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { toast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Your message has been sent successfully!', 'success');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-(--text-secondary) text-lg max-w-2xl mx-auto"
          >
            We are here to assist you with inquiries, appointments, or custom jewelry requests.
          </motion.p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 rounded-2xl border border-(--gold-400)/20 bg-(--bg-card)"
          >
            <h2 className="text-2xl font-display text-(--gold-400) mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label text-(--text-secondary) block mb-2 text-sm">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label text-(--text-secondary) block mb-2 text-sm">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none" 
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label text-(--text-secondary) block mb-2 text-sm">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label text-(--text-secondary) block mb-2 text-sm">Subject</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none" 
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Custom Jewelry">Custom Jewelry</option>
                    <option value="Appointments">Book an Appointment</option>
                    <option value="Support">Support / Order Status</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label text-(--text-secondary) block mb-2 text-sm">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input w-full bg-(--bg-secondary) border border-(--gold-400)/30 rounded-md p-3 text-(--text-primary) focus:border-(--gold-400) outline-none min-h-[150px]" 
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full py-4 text-lg bg-(--gold-400) text-black font-semibold rounded-md hover:bg-(--gold-500) transition-colors">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-(--bg-card) p-8 rounded-2xl border border-(--gold-400)/20 h-full">
              <h2 className="text-2xl font-display text-(--gold-400) mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-(--gold-400)/10 flex items-center justify-center shrink-0 text-(--gold-400)">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-(--text-primary) font-medium mb-1">Our Store</h3>
                    <p className="text-(--text-secondary)">Gulshan, Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-(--gold-400)/10 flex items-center justify-center shrink-0 text-(--gold-400)">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-(--text-primary) font-medium mb-1">Phone</h3>
                    <p className="text-(--text-secondary)">+880 1700-SWORNALI</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-(--gold-400)/10 flex items-center justify-center shrink-0 text-(--gold-400)">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-(--text-primary) font-medium mb-1">Email</h3>
                    <p className="text-(--text-secondary)">hello@swornali.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-(--gold-400)/10 flex items-center justify-center shrink-0 text-(--gold-400)">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-(--text-primary) font-medium mb-1">Store Hours</h3>
                    <p className="text-(--text-secondary)">Every day, 10am - 8pm</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-(--gold-400)/20">
                <a href="#" className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366]/10 text-[#25D366] rounded-md hover:bg-[#25D366]/20 transition-colors font-medium border border-[#25D366]/30">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
