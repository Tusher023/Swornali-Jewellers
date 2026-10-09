'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface JewelryItem {
  id: string;
  name: string;
  bengaliName: string;
  category: string;
  purity: string;
  weight: string;
  details: string;
  image: string;
  hallmark: string;
  features: string[];
}

const JEWELRY_COLLECTION: JewelryItem[] = [
  {
    id: 'necklace',
    name: 'Royal Heritage Bridal Necklace',
    bengaliName: 'রাজকীয় গিনি সোনার নেকলেস',
    category: 'Necklaces (নেকলেস)',
    purity: '22K Guinea Gold (৯১৬ হলমার্ক)',
    weight: '48.50 Grams (~৪ ভরি)',
    details: 'ঐতিহ্যবাহী ময়ূর ও পদ্ম মোটিফে হাতে খোদাই করা রাজকীয় বিয়ের নেকলেস। নিখুঁত গিনি গোল্ড ফিলিগ্রি ও ড্রপ মুক্তো।',
    image: '/Swornali-Jewellers/images/royal-necklace.jpg',
    hallmark: '22K 916 BIS Certified',
    features: ['হাতে খোদাইকৃত ফিলিগ্রি', 'ড্রপ পার্ল ও সোনার দানা', 'ঐতিহ্যবাহী ব্রাইডাল কালেকশন'],
  },
  {
    id: 'ring',
    name: 'Imperial Solitaire Filigree Ring',
    bengaliName: 'গিনি সোনার সলিটায়ার আংটি',
    category: 'Rings (আংটি)',
    purity: '22K Yellow Gold & Solitaire Diamond',
    weight: '6.20 Grams (~০.৫ ভরি)',
    details: 'রাজকীয় কুশন-কাট উজ্জ্বল হীরা ও চারিদিকে নিখুঁত ভিক্টোরিয়ান ফিলিগ্রি নকশায় সজ্জিত মাস্টারপিস আংটি।',
    image: '/Swornali-Jewellers/images/royal-ring.jpg',
    hallmark: '22K Hallmarked & Certified Diamond',
    features: ['ভিভিএস ডায়মন্ড সলিটায়ার', 'জটিল সাইড ফিলিগ্রি ওয়ার্ক', 'আরামদায়ক প্রিমিয়াম ফিটিং'],
  },
  {
    id: 'bangles',
    name: 'Kundan Heritage Royal Bala',
    bengaliName: 'ঐতিহ্যবাহী সোনার রতনচূড় ও বালা',
    category: 'Bangles (সোনার বালা)',
    purity: '22K Guinea Gold (২২ ক্যারেট)',
    weight: '36.80 Grams (~৩ ভরি)',
    details: 'যশোরের কারিগরদের নিপুণ হাতে তৈরি জোড়া বালা। ঐতিহ্যবাহী আম্রপালি মোটিফ ও নিখুঁত লক মেকানিজম।',
    image: '/Swornali-Jewellers/images/royal-bangles.jpg',
    hallmark: '100% Hallmarked 22K Gold',
    features: ['ঐতিহ্যবাহী আম্রপালি নকশা', 'নিখুঁত সেফটি স্ক্রু লক', 'রুচিশীল আধুনিক ফিনিশিং'],
  },
  {
    id: 'jhumka',
    name: 'Temple Pearl Royal Jhumka',
    bengaliName: 'রাজকীয় মুক্তো ঝুলন্ত ঝুমকা',
    category: 'Earrings (ঝুমকা ও দুল)',
    purity: '22K Guinea Gold & Natural Pearls',
    weight: '18.40 Grams (~১.৫ ভরি)',
    details: 'প্রাকৃতিক লাল চুনি (Ruby), খাঁটি মুক্তো এবং দ্বিমুখী গম্বুজ নকশায় তৈরি রাজকীয় ব্রাইডাল ঝুমকা।',
    image: '/Swornali-Jewellers/images/royal-jhumka.jpg',
    hallmark: '22K Hallmark & Gemstone Authenticity',
    features: ['খাঁটি দক্ষিণ সাগরীয় মুক্তো', 'প্রাকৃতিক রুবি কুন্দন ওয়ার্ক', 'দীর্ঘস্থায়ী লাইটওয়েট সাপোর্ট'],
  },
];

export function LuxuryJewelryVisualizer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeItem = JEWELRY_COLLECTION[activeIndex];

  // Seamless auto-loop rotation through the 4 collections every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % JEWELRY_COLLECTION.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // Floating Golden Stardust Particles Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      alphaChange: number;
    }> = [];

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 500),
        y: Math.random() * (canvas.height || 500),
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.1,
        alpha: Math.random() * 0.6 + 0.2,
        alphaChange: (Math.random() - 0.5) * 0.012,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.alphaChange;

        if (p.alpha <= 0.1 || p.alpha >= 0.75) {
          p.alphaChange = -p.alphaChange;
        }
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grad.addColorStop(0, `rgba(245, 215, 127, ${p.alpha})`);
        grad.addColorStop(0.5, `rgba(201, 169, 110, ${p.alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(201, 169, 110, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // 3D Mouse Parallax calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePos({
      x: (x - 0.5) * 2,
      y: (y - 0.5) * 2,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full max-w-xl mx-auto select-none">
      {/* ═══════════════════════════════════════════════
          CATEGORY SWITCHER TABS (Loop Indicator)
          ═══════════════════════════════════════════════ */}
      <div className="flex items-center justify-between gap-1.5 p-1.5 mb-3 bg-[#111111]/90 backdrop-blur-md rounded-xl border border-[#c9a96e]/30 shadow-xl shadow-black/60 overflow-x-auto scrollbar-none">
        {JEWELRY_COLLECTION.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeIndex === idx
                ? 'bg-gradient-to-r from-[#c9a96e] to-[#e4cb93] text-black font-bold shadow-md shadow-[#c9a96e]/20 scale-[1.02]'
                : 'text-[#a09888] hover:text-[#f5f0e8] hover:bg-white/5'
            }`}
          >
            <span>{idx === 0 ? '👑' : idx === 1 ? '💍' : idx === 2 ? '✨' : '🌸'}</span>
            <span className="hidden sm:inline">{item.category.split(' ')[0]}</span>
            <span className="sm:hidden">{item.bengaliName.split(' ')[1] || item.bengaliName}</span>
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════
          3D INTERACTIVE JEWELRY SHOWCASE CARD WITH LOOP ANIMATION
          ═══════════════════════════════════════════════ */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[470px] sm:h-[530px] md:h-[560px] rounded-2xl overflow-hidden bg-[#0a0a0a] border border-[#c9a96e]/40 shadow-2xl shadow-black/80 transition-shadow duration-500 hover:shadow-[#c9a96e]/25 group"
        style={{ perspective: '1200px' }}
      >
        {/* Floating 3D Gold Dust Particles Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Studio Golden Backlight Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-gradient-to-tr from-[#c9a96e]/25 via-[#d4af37]/15 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

        {/* ═══════════════════════════════════════════════
            CONTINUOUS 3D FLOATING & BREATHING LOOP ANIMATION
            ═══════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 w-full h-full z-[1]"
          animate={{
            y: [-6, 6, -6],
            rotateZ: [-0.8, 0.8, -0.8],
            rotateY: mousePos.x * 12,
            rotateX: -mousePos.y * 12,
            scale: [1, 1.02, 1],
          }}
          transition={{
            y: { duration: 5, ease: 'easeInOut', repeat: Infinity },
            rotateZ: { duration: 7, ease: 'easeInOut', repeat: Infinity },
            scale: { duration: 6, ease: 'easeInOut', repeat: Infinity },
            rotateY: { type: 'spring', stiffness: 180, damping: 20 },
            rotateX: { type: 'spring', stiffness: 180, damping: 20 },
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Main Photorealistic Jewelry Image in Continuous Loop */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={activeItem.image}
                alt={activeItem.name}
                className="w-full h-full object-cover select-none"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes('/Swornali-Jewellers/images/')) {
                    target.src = target.src.replace('/Swornali-Jewellers/images/', '/images/');
                  }
                }}
              />

              {/* Seamless Looping 3D Metallic Light Shimmer Ray */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.22) 50%, transparent 80%)',
                  mixBlendMode: 'overlay',
                }}
                animate={{
                  x: ['-120%', '120%'],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 1.5,
                }}
              />

              {/* Twinkling Diamond / Gold Sparkles in Loop */}
              <motion.div
                className="absolute top-1/3 left-1/3 pointer-events-none"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.6, 1.3, 0.6],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
              >
                <svg className="w-5 h-5 text-[#fff7d6] drop-shadow-[0_0_8px_#ffd700]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute bottom-1/2 right-1/4 pointer-events-none"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.6, 1.2, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1.8,
                  ease: 'easeInOut',
                }}
              >
                <svg className="w-4 h-4 text-[#ffffff] drop-shadow-[0_0_6px_#c9a96e]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ═══════════════════════════════════════════════
            TOP BADGE (Clean luxury, no buttons)
            ═══════════════════════════════════════════════ */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#c9a96e]/60 text-[11px] font-semibold text-[#c9a96e] shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#c9a96e] animate-ping" />
            <span>{activeItem.hallmark}</span>
          </div>

          <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] tracking-widest text-[#f5f0e8] uppercase font-medium">
            3D Visualizer · 360° Loop
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            BOTTOM PRODUCT SPECS & LOOP PROGRESS
            ═══════════════════════════════════════════════ */}
        <div className="absolute bottom-0 inset-x-0 z-20 p-5 bg-gradient-to-t from-black via-black/90 to-transparent backdrop-blur-[3px]">
          {/* Continuous Loop Timeline Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full mb-3 overflow-hidden">
            <motion.div
              key={activeIndex}
              className="h-full bg-gradient-to-r from-[#c9a96e] to-[#f5d77f]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5.5, ease: 'linear' }}
            />
          </div>

          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#c9a96e] font-semibold">
                স্বর্ণালী জুয়েলার্স · যশোর
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide leading-tight mt-0.5">
                {activeItem.bengaliName}
              </h3>
              <p className="text-[12px] text-[#c4bcaf] line-clamp-1 mt-1 max-w-sm">
                {activeItem.details}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="block text-sm font-bold text-[#c9a96e]">
                {activeItem.weight}
              </span>
              <span className="block text-[11px] text-gray-300 font-medium">
                {activeItem.purity.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* Quick Feature Pills */}
          <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-white/15 overflow-x-auto scrollbar-none">
            {activeItem.features.map((feature, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded text-[11px] bg-white/10 border border-white/15 text-[#f5f0e8] whitespace-nowrap font-medium"
              >
                ✓ {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          BOTTOM 3D INTERACTION HINT BAR
          ═══════════════════════════════════════════════ */}
      <div className="flex items-center justify-between text-[11px] text-[#888] mt-2.5 px-2">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
          <span>Interactive 3D Loop · Move cursor to tilt in 3D</span>
        </span>
        <span className="text-[#c9a96e] font-medium hidden sm:inline">
          {activeIndex + 1} / {JEWELRY_COLLECTION.length}
        </span>
      </div>
    </div>
  );
}
