'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { products, categories, testimonials, formatPrice } from '../lib/products';
import GivaHeroCarousel from '../components/giva-hero-carousel';
import { LiveGoldRateSection } from '../components/live-gold-rate';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      {/* 1. GIVA-STYLE HERO CAROUSEL BANNER & METAL QUICK-SWITCHER */}
      <GivaHeroCarousel />

      {/* 2.5 LIVE GOLD RATE TODAY (BANGLADESH BAJUS OFFICIAL RATES) */}
      <LiveGoldRateSection />

      {/* 3. CATEGORY SHOWCASE */}
      <section className="section bg-bg-primary py-24">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <span className="section-label text-gold-500 uppercase tracking-widest text-xs font-bold block mb-4">Discover</span>
            <h2 className="section-title text-4xl md:text-5xl font-display text-text-primary">Shop by Category</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category, i) => (
              <motion.div 
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link href={`/products?category=${category.name}`} className="category-card group block relative aspect-[3/4] overflow-hidden rounded-sm bg-bg-secondary">
                  <Image 
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-8 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-display text-white mb-2 group-hover:text-gold-400 transition-colors">{category.name}</h3>
                    <span className="text-xs text-gold-500/0 uppercase tracking-widest group-hover:text-gold-500 transition-colors duration-500 flex items-center justify-center gap-2">
                      Explore <span>&rarr;</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="section bg-bg-secondary py-28 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-20 flex flex-col items-center">
            <span className="section-label text-gold-500 uppercase tracking-widest text-xs font-bold mb-4">Curated for You</span>
            <h2 className="section-title text-4xl md:text-5xl font-display text-text-primary">Signature Pieces</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 4) * 0.1, duration: 0.6 }}
              >
                <Link href={`/products/${product.slug}`} className="product-card group block">
                  <div className="relative aspect-square overflow-hidden bg-bg-card rounded-sm mb-5">
                    <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.badge && (
                      <div className="absolute top-4 left-4 bg-gold-500 text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest z-10 rounded-sm">
                        {product.badge}
                      </div>
                    )}
                    
                    {/* Hover actions */}
                    <div className="absolute inset-x-0 bottom-0 p-4 flex gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                      <button className="flex-1 bg-white/95 backdrop-blur text-black py-3 text-xs font-bold uppercase tracking-wider hover:bg-gold-400 hover:text-white transition-colors rounded-sm">
                        Quick View
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-center px-2">
                    <div className="text-[10px] text-text-muted mb-2 uppercase tracking-widest font-semibold">{product.category}</div>
                    <h3 className="text-base font-display text-text-primary mb-2 line-clamp-1 group-hover:text-gold-400 transition-colors">{product.name}</h3>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-gold-400 font-medium">{formatPrice(product.price)}</span>
                      {product.compareAtPrice && (
                        <span className="text-text-muted/50 line-through text-sm">{formatPrice(product.compareAtPrice)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Link href="/products" className="btn btn-secondary inline-block px-10 py-4 border-gold-500/30 text-gold-400 hover:border-gold-400 hover:text-gold-300 transition-colors uppercase tracking-widest text-xs font-bold rounded-sm">
              View All Pieces
            </Link>
          </div>
        </div>
      </section>

      {/* 5. BANNER SECTION */}
      <section className="py-32 relative overflow-hidden bg-[#111]">
        <div className="absolute inset-0 opacity-30">
          <Image 
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Gold Texture"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10 flex items-center h-full">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display text-white mb-6 leading-tight">Bring Your <span className="text-gold-500 italic">Vision</span> to Life</h2>
            <p className="text-lg text-gray-300 mb-10 font-light leading-relaxed">
              Work with our master artisans to design a bespoke piece that tells your unique story. From ethically sourced diamonds to rare gemstones, your imagination is the only limit.
            </p>
            <Link href="/custom-jewelry" className="group inline-flex items-center gap-4 bg-gold-500 text-black px-8 py-4 rounded-sm hover:bg-gold-400 transition-colors font-semibold uppercase tracking-wider text-sm">
              Design Your Own Piece
              <span className="text-xl transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="section bg-bg-primary py-28">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-20 flex flex-col items-center">
            <h2 className="section-title text-4xl md:text-5xl font-display text-text-primary mb-6">Loved by Our Clients</h2>
            <div className="w-12 h-[2px] bg-gold-500/50"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.slice(0, 4).map((testimonial, i) => (
              <motion.div 
                key={testimonial.id}
                className="testimonial-card bg-bg-secondary p-8 rounded-sm border border-white/5 relative hover:border-gold-500/20 transition-colors duration-500"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="text-gold-500/10 text-6xl absolute top-4 right-6 font-serif leading-none">"</div>
                <div className="flex text-gold-500 mb-6 gap-1 text-sm">
                  {[...Array(5)].map((_, j) => (
                    <span key={j}>{j < testimonial.rating ? '★' : '☆'}</span>
                  ))}
                </div>
                <p className="text-text-secondary italic mb-8 leading-relaxed text-sm">"{testimonial.text}"</p>
                <div className="mt-auto flex items-center gap-4 border-t border-white/5 pt-6">
                  <div className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center text-gold-400 font-display border border-gold-500/20 text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm tracking-wide">{testimonial.name}</h4>
                    <span className="text-[10px] uppercase tracking-widest text-text-muted">{testimonial.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER */}
      <section className="newsletter-section bg-bg-secondary py-24 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">Join the Inner Circle</h2>
            <p className="text-text-secondary mb-10 text-sm md:text-base leading-relaxed">
              Subscribe to receive exclusive access to new collections, private events, and styling inspiration.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="form-input flex-1 bg-bg-primary border-white/10 text-white placeholder-text-muted px-6 py-4 rounded-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all text-sm"
                required
              />
              <button type="submit" className="btn btn-primary px-10 bg-gold-500 text-black hover:bg-gold-400 py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition-colors">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
