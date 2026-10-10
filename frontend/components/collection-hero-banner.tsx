'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CollectionHeroBannerProps {
  title?: string;
  subtitle?: string;
  bengaliSubtitle?: string;
  totalProducts?: number;
}

const JEWELRY_PIECES = [
  {
    id: 'necklace',
    name: '22K Guinea Gold Bridal Necklace',
    bengali: '২২ ক্যারেট নেকলেস',
    src: '/images/royal-necklace.jpg',
    fallbackSrc: '/Swornali-Jewellers/images/royal-necklace.jpg',
    className: 'top-1/2 left-[6%] -translate-y-1/2 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64',
    rotate: -12,
    floatDuration: 7,
    delay: 0,
    orbitRadius: 18,
  },
  {
    id: 'ring',
    name: '22K Royal Diamond Cut Ring',
    bengali: 'রয়্যাল গোল্ড আংটি',
    src: '/images/royal-ring.jpg',
    fallbackSrc: '/Swornali-Jewellers/images/royal-ring.jpg',
    className: 'top-1/2 right-[6%] -translate-y-1/2 w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60',
    rotate: 15,
    floatDuration: 8.5,
    delay: 0.8,
    orbitRadius: 22,
  },
  {
    id: 'bangles',
    name: 'Handcrafted Heritage Bangles',
    bengali: 'সোনার বালা ও চুড়ি',
    src: '/images/royal-bangles.jpg',
    fallbackSrc: '/Swornali-Jewellers/images/royal-bangles.jpg',
    className: 'top-4 left-[28%] w-28 h-28 sm:w-36 sm:h-36 opacity-35 sm:opacity-45 hidden sm:block',
    rotate: -6,
    floatDuration: 9,
    delay: 1.5,
    orbitRadius: 14,
  },
  {
    id: 'jhumka',
    name: 'Traditional Royal Jhumka',
    bengali: 'ঐতিহ্যবাহী স্বর্ণ ঝুমকা',
    src: '/images/royal-jhumka.jpg',
    fallbackSrc: '/Swornali-Jewellers/images/royal-jhumka.jpg',
    className: 'bottom-4 right-[28%] w-28 h-28 sm:w-36 sm:h-36 opacity-35 sm:opacity-45 hidden sm:block',
    rotate: 8,
    floatDuration: 7.8,
    delay: 2.2,
    orbitRadius: 16,
  },
];

export function CollectionHeroBanner({
  title = 'Our Collection',
  subtitle = 'Discover our exquisite range of fine jewelry',
  bengaliSubtitle = 'স্বর্ণালী জুয়েলার্স · এক্সক্লুসিভ কালেকশন',
  totalProducts,
}: CollectionHeroBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Gold dust & diamond sparkle canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 380);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle simulation
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      color: string;
      isSparkle: boolean;
      sparklePhase: number;
    }

    const goldPalette = [
      'rgba(201, 169, 110, ', // #c9a96e
      'rgba(245, 215, 127, ', // #f5d77f
      'rgba(224, 195, 138, ', // #e0c38a
      'rgba(255, 255, 255, ', // diamond white
    ];

    const particleCount = 45;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.45,
      speedY: -Math.random() * 0.55 - 0.15,
      opacity: Math.random() * 0.6 + 0.2,
      fadeSpeed: Math.random() * 0.008 + 0.003,
      color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
      isSparkle: Math.random() > 0.65,
      sparklePhase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.sparklePhase += 0.04;

        // Reset if out of bounds
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const dynamicOpacity = p.isSparkle
          ? Math.max(0.1, Math.min(0.95, (Math.sin(p.sparklePhase) + 1) * 0.45 * p.opacity))
          : p.opacity;

        ctx.fillStyle = `${p.color}${dynamicOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // 4-point diamond sparkle star flare
        if (p.isSparkle && dynamicOpacity > 0.45) {
          ctx.strokeStyle = `rgba(245, 215, 127, ${dynamicOpacity * 0.75})`;
          ctx.lineWidth = 0.8;
          const flareLen = p.size * 3.2;

          ctx.beginPath();
          ctx.moveTo(p.x - flareLen, p.y);
          ctx.lineTo(p.x + flareLen, p.y);
          ctx.moveTo(p.x, p.y - flareLen);
          ctx.lineTo(p.x, p.y + flareLen);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl mb-12 border border-[#2a2418] bg-[#0a0a0a] shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
      {/* Background ambient radial gradients matching admin obsidian black & gold */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(30, 24, 16, 0.95) 0%, rgba(14, 14, 14, 0.98) 60%, #0a0a0a 100%)',
        }}
      />

      {/* Rotating filigree mandala rings in gold */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[440px] h-[440px] sm:w-[580px] sm:h-[580px] rounded-full border border-[rgba(201,169,110,0.14)] border-dashed opacity-60"
        />
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-[rgba(201,169,110,0.2)] opacity-50"
          style={{
            boxShadow: 'inset 0 0 40px rgba(201, 169, 110, 0.08)',
          }}
        />
        {/* Center Golden Core Glow */}
        <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.18)_0%,rgba(201,169,110,0.03)_55%,transparent_75%)] blur-2xl pointer-events-none" />
      </div>

      {/* Floating Animated Jewelry Pieces (Behind text) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {JEWELRY_PIECES.map((piece) => {
          const hasError = imageErrors[piece.id];
          const imgSrc = hasError ? piece.fallbackSrc : piece.src;

          return (
            <motion.div
              key={piece.id}
              className={`absolute select-none ${piece.className}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: [1, 1.05, 0.98, 1],
                y: [0, -piece.orbitRadius, piece.orbitRadius * 0.6, 0],
                x: [0, piece.orbitRadius * 0.7, -piece.orbitRadius * 0.5, 0],
                rotate: [piece.rotate, piece.rotate + 4, piece.rotate - 3, piece.rotate],
              }}
              transition={{
                duration: piece.floatDuration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: piece.delay,
              }}
            >
              {/* Outer soft gold halo around the jewelry */}
              <div className="relative w-full h-full rounded-full p-2">
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-60"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(201, 169, 110, 0.35) 0%, rgba(201, 169, 110, 0.05) 65%, transparent 80%)',
                  }}
                />

                {/* Jewelry Image with circular mask and subtle gold border */}
                <div className="relative w-full h-full rounded-full overflow-hidden border border-[rgba(201,169,110,0.35)] shadow-[0_10px_30px_rgba(0,0,0,0.7)] backdrop-blur-[2px]">
                  <Image
                    src={imgSrc}
                    alt={piece.name}
                    fill
                    className="object-cover object-center scale-105 filter brightness-105 contrast-105"
                    sizes="(max-width: 768px) 180px, 260px"
                    priority
                    onError={() => {
                      if (!hasError) {
                        setImageErrors((prev) => ({ ...prev, [piece.id]: true }));
                      }
                    }}
                  />
                  {/* Glass shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-amber-200/10 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Gold Dust Sparkle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />

      {/* Dark Vignette & Readability Gradient Overlay to ensure text readability */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(10, 10, 10, 0.78) 0%, rgba(10, 10, 10, 0.65) 45%, rgba(10, 10, 10, 0.92) 85%, #0a0a0a 100%)',
        }}
      />

      {/* Foreground Content: Title, Badges, and Bengali Subtitle */}
      <div className="relative z-[3] py-16 sm:py-20 md:py-24 px-6 max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        {/* Brand Kicker / Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[rgba(201,169,110,0.35)] bg-[#141414]/90 backdrop-blur-md mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
          <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#c9a96e]">
            {bengaliSubtitle}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
        </motion.div>

        {/* Main Title: "Our Collection" */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
        >
          {title}{' '}
          <span className="block sm:inline bg-gradient-to-r from-[#f5d77f] via-[#c9a96e] to-[#e0c38a] bg-clip-text text-transparent">
            স্বর্ণালী
          </span>
        </motion.h1>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 my-2 w-full max-w-xs">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#c9a96e]/60" />
          <span className="text-[#c9a96e] text-sm">◆</span>
          <span className="text-xs tracking-widest text-[#c9a96e] font-serif">100% HALLMARK</span>
          <span className="text-[#c9a96e] text-sm">◆</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#c9a96e]/60" />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl font-light leading-relaxed mt-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
        >
          {subtitle}
          {typeof totalProducts === 'number' && totalProducts > 0 && (
            <span className="ml-2 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#1a160e] text-[#c9a96e] border border-[rgba(201,169,110,0.3)]">
              {totalProducts} Designs Available
            </span>
          )}
        </motion.p>
      </div>
    </div>
  );
}

