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
    id: 'silver-sparkle',
    category: 'silver',
    categoryLabel: 'Silver Jewellery',
    bgGradient: 'linear-gradient(105deg, #fbe9ea 0%, #f7dcdb 35%, #fcebeb 65%, #fae2e1 100%)',
    accentColor: '#982c44',
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
    id: 'gold-bridal',
    category: 'bridal',
    categoryLabel: 'Gold Jewellery',
    bgGradient: 'linear-gradient(105deg, #fbf4e6 0%, #f8eccf 35%, #faedd3 65%, #f6e5be 100%)',
    accentColor: '#8a5c1e',
    tag: 'RAM PRASAD TARAFDER ATELIER',
    titlePrimary: 'ROYAL BRIDAL',
    titleHighlight: 'FESTIVAL',
    bengaliSubtitle: '২২ ক্যারেট গিনি সোনা ও হলমার্ক ব্রাইডাল সেট',
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
    id: 'diamond-solitaire',
    category: 'diamond',
    categoryLabel: 'Demifine & Diamonds',
    bgGradient: 'linear-gradient(105deg, #f5f2eb 0%, #eee8dc 35%, #f6f1e8 65%, #ece4d5 100%)',
    accentColor: '#2b2622',
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
    categoryLabel: '22K Guinea Bangles',
    bgGradient: 'linear-gradient(105deg, #fbeee0 0%, #f6e0c6 35%, #faead8 65%, #f3d7b8 100%)',
    accentColor: '#8f4b1d',
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
    <div className="w-full bg-[#faf8f5] pt-3 pb-6">
      {/* ═══════════════════════════════════════════════
          GIVA-STYLE METAL QUICK-SWITCHER PILL TABS
          ═══════════════════════════════════════════════ */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 px-4 mb-4 overflow-x-auto scrollbar-none py-1">
        {SLIDES.map((s, idx) => {
          const isActive = activeSlide === idx;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSlide(idx)}
              className={`px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm border whitespace-nowrap ${
                isActive
                  ? 'bg-[#84253e] text-white border-[#84253e] shadow-md scale-105'
                  : 'bg-white text-[#4a4a4a] border-[#e2dcd2] hover:border-[#84253e] hover:text-[#84253e]'
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
        <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#ede5d8] min-h-[380px] sm:min-h-[420px] md:min-h-[460px] flex items-center">
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
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.8) 1.5px, transparent 1.5px), radial-gradient(circle, rgba(201,169,110,0.4) 1px, transparent 1px)',
                  backgroundSize: '40px 40px, 60px 60px',
                  backgroundPosition: '0 0, 20px 20px',
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
                    className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-2 px-3 py-1 rounded-full bg-white/70 border border-white/90 shadow-sm"
                    style={{ color: slide.accentColor }}
                  >
                    {slide.tag}
                  </span>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1c1c1c] leading-[1.08] mt-1">
                    <span className="block">{slide.titlePrimary}</span>
                    <span
                      className="block font-serif italic text-4xl sm:text-5xl lg:text-6xl drop-shadow-sm font-light mt-0.5"
                      style={{ color: slide.accentColor }}
                    >
                      {slide.titleHighlight}
                    </span>
                    <span className="block text-xl sm:text-2xl font-bold tracking-widest mt-1 text-[#222]">
                      DAYS
                    </span>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#555] font-medium mt-3 max-w-xs">
                    {slide.bengaliSubtitle}
                  </p>

                  <div className="mt-5">
                    <Link
                      href={slide.link}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: slide.accentColor }}
                    >
                      Shop Collection <span>&rarr;</span>
                    </Link>
                  </div>
                </motion.div>

                {/* ───────── CENTER: Jewellery Ornament Display ───────── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                  className="md:col-span-4 flex items-center justify-center relative py-2"
                >
                  {/* Subtle radial spotlight shadow */}
                  <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-white/50 blur-2xl -z-10" />

                  <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 flex items-center justify-center">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.src.includes('Swornali-Jewellers')) {
                          img.src = slide.imageFallback;
                        }
                      }}
                      className="w-full h-full object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.18)] transition-transform duration-700 hover:scale-105"
                    />

                    {/* Sparkle star flair */}
                    <div
                      className="absolute -top-2 right-4 text-xl sm:text-2xl animate-pulse pointer-events-none"
                      style={{ color: slide.accentColor }}
                    >
                      ✦
                    </div>
                    <div
                      className="absolute bottom-4 left-2 text-lg animate-pulse delay-300 pointer-events-none"
                      style={{ color: slide.accentColor }}
                    >
                      ✧
                    </div>
                  </div>
                </motion.div>

                {/* ───────── RIGHT: Offer Box & Coupon Code ───────── */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="md:col-span-4 text-center md:text-right flex flex-col justify-center items-center md:items-end"
                >
                  <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#2d2d2d] uppercase">
                    {slide.offerPurity}
                  </span>

                  <div className="flex items-baseline justify-center md:justify-end gap-1.5 my-1">
                    <span className="text-xs uppercase font-bold text-[#666]">FLAT</span>
                    <span
                      className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
                      style={{ color: slide.accentColor }}
                    >
                      {slide.offerDiscount}
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs font-semibold text-[#666] tracking-wide max-w-xs mt-1">
                    {slide.offerDetail}
                  </p>

                  {/* GIVA-style outlined coupon code box */}
                  <div className="mt-4 px-5 py-2 rounded-lg bg-white/90 border border-dashed border-[#84253e] shadow-sm inline-flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#555] uppercase tracking-wider">
                      CODE :
                    </span>
                    <span
                      className="text-xs sm:text-sm font-extrabold tracking-widest"
                      style={{ color: slide.accentColor }}
                    >
                      {slide.couponCode}
                    </span>
                  </div>

                  <span className="block text-[9px] text-[#888] mt-2 tracking-wider">
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
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#333] shadow-md flex items-center justify-center transition-all duration-200 z-20 border border-[#e5decb]"
            aria-label="Previous Slide"
          >
            &#8249;
          </button>

          {/* Next Arrow */}
          <button
            onClick={() => setActiveSlide((prev) => (prev + 1) % SLIDES.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#333] shadow-md flex items-center justify-center transition-all duration-200 z-20 border border-[#e5decb]"
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
                    ? 'w-7 h-2 bg-[#84253e]'
                    : 'w-2 h-2 bg-[#84253e]/30 hover:bg-[#84253e]/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

