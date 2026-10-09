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
    details: 'ঐতিহ্যবাহী ময়ূর ও পদ্ম মোটিফে হাতে খোদাই করা রাজকীয় বিয়ের নেকলেস। নিখুঁত গিনি গোল্ড ফিলিগ্রি ও ঝুলন্ত সোনার মুক্তোদানা।',
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
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeItem = JEWELRY_COLLECTION[activeIndex];

  // Auto-slide every 7 seconds if autoplay is active
  useEffect(() => {
    if (!isAutoPlay || isZooming) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % JEWELRY_COLLECTION.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlay, isZooming]);

  // Floating Golden Particles Canvas Animation
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
      canvas.width = canvas.parentElement?.clientWidth || 500;
      canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize 60 luxury golden dust particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.5 - 0.1,
        alpha: Math.random() * 0.6 + 0.2,
        alphaChange: (Math.random() - 0.5) * 0.015,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.alphaChange;

        if (p.alpha <= 0.1 || p.alpha >= 0.8) {
          p.alphaChange = -p.alphaChange;
        }
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        // Golden spark glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(245, 215, 127, ${p.alpha})`);
        gradient.addColorStop(0.5, `rgba(201, 169, 110, ${p.alpha * 0.6})`);
        gradient.addColorStop(1, 'rgba(201, 169, 110, 0)');

        ctx.fillStyle = gradient;
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

    // normalized -1 to +1
    setMousePos({
      x: (x - 0.5) * 2,
      y: (y - 0.5) * 2,
    });

    if (isZooming) {
      setZoomPos({
        x: Math.max(10, Math.min(90, x * 100)),
        y: Math.max(10, Math.min(90, y * 100)),
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full max-w-xl mx-auto select-none">
      {/* ═══════════════════════════════════════════════
          CATEGORY SWITCHER TABS
          ═══════════════════════════════════════════════ */}
      <div className="flex items-center justify-between gap-1.5 p-1.5 mb-3 bg-[#111111]/90 backdrop-blur-md rounded-xl border border-[#c9a96e]/30 shadow-xl shadow-black/60 overflow-x-auto scrollbar-none">
        {JEWELRY_COLLECTION.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setActiveIndex(idx);
              setIsAutoPlay(false);
            }}
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
          3D INTERACTIVE JEWELRY SHOWCASE CARD
          ═══════════════════════════════════════════════ */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#141414] via-[#0d0d0d] to-[#080808] border border-[#c9a96e]/40 shadow-2xl shadow-black/80 transition-shadow duration-500 hover:shadow-[#c9a96e]/20 group"
        style={{ perspective: '1200px' }}
      >
        {/* Floating 3D Gold Dust Particles Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Studio Spotlight Glow Behind Product */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-gradient-to-tr from-[#c9a96e]/20 via-[#d4af37]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* 3D Rotatable Product Showcase Container */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center p-3"
          animate={{
            rotateY: mousePos.x * 12,
            rotateX: -mousePos.y * 12,
            scale: isZooming ? 1.03 : 1,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Main Photorealistic Jewelry Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src={activeItem.image}
                alt={activeItem.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* 3D Cinematic Metallic Ray Sweep (Light Caustic Glint) */}
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/18 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  transform: `translateX(${mousePos.x * 40}%) translateY(${mousePos.y * 40}%)`,
                  mixBlendMode: 'overlay',
                }}
              />

              {/* Continuous Ambient Studio Light Sweep */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#fdf8ef]/12 to-transparent animate-shimmer" />

              {/* Interactive 22K Hallmark Loupe Magnifier */}
              {isZooming && (
                <div
                  className="absolute pointer-events-none w-44 h-44 rounded-full border-2 border-[#c9a96e] shadow-2xl shadow-black overflow-hidden z-20"
                  style={{
                    left: `${zoomPos.x}%`,
                    top: `${zoomPos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    backgroundImage: `url(${activeItem.image})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: '280%',
                    boxShadow: '0 0 25px rgba(201,169,110,0.6), inset 0 0 15px rgba(0,0,0,0.8)',
                  }}
                >
                  <div className="absolute inset-0 rounded-full border border-white/40" />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-widest text-[#f5e6c8] bg-black/80 px-2 py-0.5 rounded-full uppercase border border-[#c9a96e]/40 whitespace-nowrap">
                    22K Hallmark 2.8x
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ═══════════════════════════════════════════════
            TOP BADGES & CONTROLS
            ═══════════════════════════════════════════════ */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
          {/* 100% Hallmark Guaranteed Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#c9a96e]/50 text-[11px] font-semibold text-[#c9a96e] shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-ping" />
            <span>{activeItem.hallmark}</span>
          </div>

          {/* Interactive Tools: Hallmark Loupe Toggle & Autoplay */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsZooming(!isZooming)}
              className={`p-2 rounded-full border transition-all text-xs font-medium shadow-md ${
                isZooming
                  ? 'bg-[#c9a96e] text-black border-[#c9a96e]'
                  : 'bg-black/70 text-gray-300 border-white/20 hover:text-white hover:border-[#c9a96e]'
              }`}
              title="Toggle 22K Hallmark Macro Loupe"
            >
              🔍 <span className="hidden sm:inline text-[10px] ml-1">{isZooming ? 'Zoom On' : 'Loupe'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`p-2 rounded-full border transition-all text-xs shadow-md ${
                isAutoPlay
                  ? 'bg-black/70 text-[#c9a96e] border-[#c9a96e]/40'
                  : 'bg-black/70 text-gray-400 border-white/20'
              }`}
              title={isAutoPlay ? 'Pause 3D rotation' : 'Resume 3D rotation'}
            >
              {isAutoPlay ? '⏸' : '▶'}
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            BOTTOM PRODUCT SPECS OVERLAY
            ═══════════════════════════════════════════════ */}
        <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black via-black/85 to-transparent backdrop-blur-[2px]">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#c9a96e] font-semibold">
                স্বর্ণালী জুয়েলার্স · যশোর
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide leading-tight mt-0.5">
                {activeItem.bengaliName}
              </h3>
              <p className="text-[11px] text-[#a09888] line-clamp-1 mt-0.5 max-w-sm">
                {activeItem.details}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="block text-xs font-bold text-[#c9a96e]">
                {activeItem.weight}
              </span>
              <span className="block text-[10px] text-gray-400">
                {activeItem.purity.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* Quick Feature Pills */}
          <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-white/10 overflow-x-auto scrollbar-none">
            {activeItem.features.map((feature, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-gray-300 whitespace-nowrap"
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
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
          <span>Move cursor or touch to tilt in 3D perspective</span>
        </span>
        <span className="text-[#c9a96e] font-medium hidden sm:inline">
          {activeIndex + 1} / {JEWELRY_COLLECTION.length}
        </span>
      </div>
    </div>
  );
}
