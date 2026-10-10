'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export interface BannerSlide {
  id: string;
  category: 'gold' | 'silver' | 'bridal' | 'diamond';
  categoryLabel: string;
  bgGradient: string;
  accentColor: string;
  tag: string;
  titlePrimary: string;
  titleHighlight: string;
  bengaliSubtitle: string;
  image: string;
  imageFallback: string;
  alt: string;
  offerPurity: string;
  offerDiscount: string;
  offerDetail: string;
  couponCode: string;
  link: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: 'gold-bridal',
    category: 'bridal',
    categoryLabel: '22K Guinea Gold',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, #1e1810 0%, #120e08 50%, #070503 100%)',
    accentColor: '#c9a96e',
    tag: 'RAM PRASAD TARAFDER ATELIER',
    titlePrimary: 'ROYAL BRIDAL',
    titleHighlight: 'FESTIVAL',
    bengaliSubtitle: '২২ ক্যারেট গিনি সোনা ও ১০০% হলমার্ক ব্রাইডাল সেট',
    image: '/images/royal-necklace.jpg',
    imageFallback: '/Swornali-Jewellers/images/royal-necklace.jpg',
    alt: 'Royal Gold Bridal Necklace',
    offerPurity: '22K GUINEA GOLD',
    offerDiscount: 'FLAT 25% OFF',
    offerDetail: 'CERTIFIED HALLMARK · MEHEDI MARKET JASHORE',
    couponCode: 'BRIDAL25',
    link: '/products?category=Necklaces',
  },
  {
    id: 'silver-sparkle',
    category: 'silver',
    categoryLabel: 'Pure Silver Jewellery',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, #1a1317 0%, #110c10 50%, #080507 100%)',
    accentColor: '#c9a96e',
    tag: 'FESTIVE COLLECTION · স্বর্নালী জুয়েলার্স',
    titlePrimary: 'SWORNALI BIG',
    titleHighlight: 'SPARKLE',
    bengaliSubtitle: 'বিশুদ্ধ রূপা ও ১৮ ক্যারেট সিলভার অলংকার',
    image: '/images/royal-jhumka.jpg',
    imageFallback: '/Swornali-Jewellers/images/royal-jhumka.jpg',
    alt: '18K Oxidised Silver & Pure Silver Jewellery',
    offerPurity: '18K OXIDISED SILVER',
    offerDiscount: '25% OFF',
    offerDetail: 'ON MAKING CHARGES & CRAFTSMANSHIP',
    couponCode: 'SPARKLE',
    link: '/products?category=Earrings',
  },
  {
    id: 'diamond-solitaire',
    category: 'diamond',
    categoryLabel: 'Solitaire Diamonds',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, #13161c 0%, #0c0e12 50%, #050608 100%)',
    accentColor: '#c9a96e',
    tag: 'TIMELESS NATURAL ICONS',
    titlePrimary: 'CELESTE SOLITAIRE',
    titleHighlight: 'DAYS',
    bengaliSubtitle: 'সার্টিফাইড ন্যাচারাল ডায়মন্ড ও ১৮K সোনা',
    image: '/images/royal-ring.jpg',
    imageFallback: '/Swornali-Jewellers/images/royal-ring.jpg',
    alt: 'Royal Diamond Solitaire Ring',
    offerPurity: '18K NATURAL DIAMOND',
    offerDiscount: 'FLAT 20% OFF',
    offerDetail: 'GIA EQUIVALENT · BESPOKE FINISHING',
    couponCode: 'SOLITAIRE',
    link: '/products?category=Rings',
  },
  {
    id: 'heritage-bangles',
    category: 'gold',
    categoryLabel: 'Heritage Bangles',
    bgGradient: 'radial-gradient(ellipse at 50% 50%, #1b1511 0%, #110d09 50%, #070503 100%)',
    accentColor: '#c9a96e',
    tag: 'TRADITION, HALLMARK & TRUST',
    titlePrimary: 'HERITAGE PEACOCK',
    titleHighlight: 'BANGLES',
    bengaliSubtitle: 'ঐতিহ্যবাহী ময়ূরপঙ্খী স্বর্ণবালা কালেকশন',
    image: '/images/royal-bangles.jpg',
    imageFallback: '/Swornali-Jewellers/images/royal-bangles.jpg',
    alt: 'Handcrafted Peacock Gold Bangles',
    offerPurity: '22K HALLMARK GOLD',
    offerDiscount: 'SPECIAL OFFER',
    offerDetail: 'HANDCRAFTED BY MASTER ARTISANS',
    couponCode: 'HERITAGE',
    link: '/products?category=Bracelets',
  },
];

export default function GivaHeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = SLIDES[activeSlide];

  return (
    <div className="w-full bg-[#0a0a0a] pt-4 pb-8 border-b border-[#1f1f1f]">
      {/* ═══════════════════════════════════════════════
          GIVA-STYLE METAL QUICK-SWITCHER PILL TABS
          ═══════════════════════════════════════════════ */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 px-4 mb-5 overflow-x-auto scrollbar-none py-1">
        {SLIDES.map((s, idx) => {
          const isActive = activeSlide === idx;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSlide(idx)}
              className={`px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm border whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-[#c9a96e] to-[#dfc085] text-black border-transparent shadow-[0_0_20px_rgba(201,169,110,0.45)] scale-105 font-bold'
                  : 'bg-[#141414] text-[#a0a0a0] border-[#262626] hover:border-[#c9a96e] hover:text-[#c9a96e]'
              }`}
            >
              {s.categoryLabel}
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════
          MAIN HERO BANNER CAROUSEL
          ═══════════════════════════════════════════════ */}
      <div
        className="max-w-[1440px] mx-auto px-3 sm:px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.7)] border border-[#222] min-h-[380px] sm:min-h-[420px] md:min-h-[460px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full flex items-center"
              style={{ background: slide.bgGradient }}
            >
              {/* Background ambient sparkle dust dots */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(201,169,110,0.8) 1.5px, transparent 1.5px), radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
                  backgroundSize: '45px 45px, 70px 70px',
                  backgroundPosition: '0 0, 25px 25px',
                }}
              />

              <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 items-center px-6 sm:px-12 md:px-16 py-8 md:py-0 gap-6 md:gap-4">
                {/* ───────── LEFT: Festive Title & Brand ───────── */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="md:col-span-4 text-center md:text-left flex flex-col justify-center items-center md:items-start"
                >
                  <span
                    className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-2 px-3.5 py-1 rounded-full bg-[#161616] border border-[#c9a96e]/35 text-[#c9a96e] shadow-sm"
                  >
                    ✦ {slide.tag}
                  </span>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.08] mt-1">
                    <span className="block">{slide.titlePrimary}</span>
                    <span
                      className="block font-serif italic text-4xl sm:text-5xl lg:text-6xl drop-shadow-[0_0_25px_rgba(201,169,110,0.5)] font-light mt-0.5 text-[#c9a96e]"
                    >
                      {slide.titleHighlight}
                    </span>
                    <span className="block text-xl sm:text-2xl font-bold tracking-widest mt-1 text-[#e0e0e0]">
                      DAYS
                    </span>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#a0a0a0] font-medium mt-3 max-w-xs leading-relaxed">
                    {slide.bengaliSubtitle}
                  </p>

                  <div className="mt-5">
                    <Link
                      href={slide.link}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#c9a96e] to-[#dfc085] shadow-[0_4px_20px_rgba(201,169,110,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_28px_rgba(201,169,110,0.55)]"
                    >
                      Shop Collection <span>&rarr;</span>
                    </Link>
                  </div>
                </motion.div>

                {/* ───────── CENTER: Jewellery Ornament Display (Floating Animation) ───────── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                  className="md:col-span-4 flex items-center justify-center relative py-2"
                >
                  {/* Subtle radial gold spotlight glow */}
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.15, 0.28, 0.15],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-[#c9a96e]/20 blur-3xl -z-10"
                  />

                  {/* Rotating subtle gold ring behind ornament */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full border border-[rgba(201,169,110,0.18)] border-dashed pointer-events-none -z-10"
                  />

                  {/* Floating Ornament Container */}
                  <motion.div
                    animate={{
                      y: [0, -12, 0, 8, 0],
                      rotate: [0, 1.5, 0, -1.5, 0],
                    }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 flex items-center justify-center"
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.src.includes('Swornali-Jewellers')) {
                          img.src = slide.imageFallback;
                        }
                      }}
                      className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] drop-shadow-[0_0_30px_rgba(201,169,110,0.35)] transition-transform duration-700 hover:scale-105"
                    />

                    {/* Sparkle star flairs */}
                    <motion.div
                      animate={{
                        scale: [0.8, 1.25, 0.8],
                        opacity: [0.4, 1, 0.4],
                        rotate: [0, 45, 0],
                      }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-2 right-4 text-xl sm:text-2xl pointer-events-none text-[#c9a96e]"
                    >
                      ✦
                    </motion.div>
                    <motion.div
                      animate={{
                        scale: [1.2, 0.7, 1.2],
                        opacity: [0.8, 0.3, 0.8],
                      }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                      className="absolute bottom-4 left-2 text-lg pointer-events-none text-[#f5d77f]"
                    >
                      ✧
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* ───────── RIGHT: Offer Box & Coupon Code ───────── */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="md:col-span-4 text-center md:text-right flex flex-col justify-center items-center md:items-end"
                >
                  <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#c9a96e] uppercase">
                    {slide.offerPurity}
                  </span>

                  <div className="flex items-baseline justify-center md:justify-end gap-1.5 my-1">
                    <span className="text-xs uppercase font-bold text-[#888]">FLAT</span>
                    <span
                      className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    >
                      {slide.offerDiscount}
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs font-semibold text-[#a0a0a0] tracking-wide max-w-xs mt-1">
                    {slide.offerDetail}
                  </p>

                  {/* Coupon code box in dark & gold */}
                  <div className="mt-4 px-5 py-2 rounded-lg bg-[#141414] border border-dashed border-[#c9a96e] shadow-sm inline-flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#888] uppercase tracking-wider">
                      CODE :
                    </span>
                    <span
                      className="text-xs sm:text-sm font-extrabold tracking-widest text-[#c9a96e]"
                    >
                      {slide.couponCode}
                    </span>
                  </div>

                  <span className="block text-[9px] text-[#777] mt-2 tracking-wider">
                    *T&C Apply · Available at Showroom & Online
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ═══════════════════════════════════════════
              CAROUSEL NAVIGATION CONTROLS & DOTS
              ═══════════════════════════════════════════ */}
          {/* Previous Arrow */}
          <button
            onClick={() =>
              setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#141414]/90 hover:bg-[#c9a96e] text-[#c9a96e] hover:text-black shadow-lg flex items-center justify-center transition-all duration-200 z-20 border border-[#262626]"
            aria-label="Previous Slide"
          >
            &#8249;
          </button>

          {/* Next Arrow */}
          <button
            onClick={() => setActiveSlide((prev) => (prev + 1) % SLIDES.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#141414]/90 hover:bg-[#c9a96e] text-[#c9a96e] hover:text-black shadow-lg flex items-center justify-center transition-all duration-200 z-20 border border-[#262626]"
            aria-label="Next Slide"
          >
            &#8250;
          </button>

          {/* Carousel Dots */}
          <div className="absolute bottom-3.5 inset-x-0 flex items-center justify-center gap-2 z-20">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === idx
                    ? 'w-7 h-2 bg-[#c9a96e] shadow-[0_0_10px_rgba(201,169,110,0.8)]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
