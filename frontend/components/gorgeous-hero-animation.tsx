'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const JEWELRY_PIECES = [
  {
    image: '/images/royal-necklace.jpg',
    fallback: '/Swornali-Jewellers/images/royal-necklace.jpg',
    title: 'রাজকীয় ব্রাইডাল নেকলেস',
    subtitle: 'Royal Bridal Gold Necklace',
    carat: '22K Guinea Gold · Certified Hallmark',
  },
  {
    image: '/images/royal-ring.jpg',
    fallback: '/Swornali-Jewellers/images/royal-ring.jpg',
    title: 'হীরাখচিত স্বর্ণাঙ্গুরী',
    subtitle: 'Handcrafted Solitaire Gold Ring',
    carat: '21K Hallmarked Gold · Natural Diamond',
  },
  {
    image: '/images/royal-bangles.jpg',
    fallback: '/Swornali-Jewellers/images/royal-bangles.jpg',
    title: 'ময়ূরপঙ্খী স্বর্ণবালা',
    subtitle: 'Artisanal Heritage Gold Bangles',
    carat: '22K Traditional Guinea Gold',
  },
  {
    image: '/images/royal-jhumka.jpg',
    fallback: '/Swornali-Jewellers/images/royal-jhumka.jpg',
    title: 'ঐতিহ্যবাহী ঝুমকো দুল',
    subtitle: 'Royal Filigree Gold Jhumka',
    carat: '22K Certified Artisanal Gold',
  },
];

export default function GorgeousHeroAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Auto-cycle through the royal jewelry pieces smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % JEWELRY_PIECES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Track mouse coordinates for interactive gold aura & parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  // Golden Particle & Diamond Sparkle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definition
    interface Sparkle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacitySpeed: number;
      color: string;
      isDiamondStar: boolean;
      angle: number;
      rotationSpeed: number;
    }

    const goldColors = [
      'rgba(245, 215, 127, ',
      'rgba(201, 169, 110, ',
      'rgba(255, 235, 179, ',
      'rgba(255, 255, 255, ',
    ];

    const sparklesCount = 55;
    const sparkles: Sparkle[] = Array.from({ length: sparklesCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.45 - 0.15, // gently floating upwards
      opacity: Math.random() * 0.8 + 0.2,
      opacitySpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      color: goldColors[Math.floor(Math.random() * goldColors.length)],
      isDiamondStar: Math.random() > 0.72,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }));

    const drawDiamondStar = (cx: number, cy: number, r: number, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.shadowColor = 'rgba(255, 220, 130, 0.9)';
      ctx.shadowBlur = 10;

      // 4-point sparkle star
      ctx.beginPath();
      ctx.moveTo(0, -r * 2.2);
      ctx.quadraticCurveTo(0, 0, r * 2.2, 0);
      ctx.quadraticCurveTo(0, 0, 0, r * 2.2);
      ctx.quadraticCurveTo(0, 0, -r * 2.2, 0);
      ctx.quadraticCurveTo(0, 0, 0, -r * 2.2);
      ctx.fill();

      // Small central flare
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render sparkles
      for (let i = 0; i < sparkles.length; i++) {
        const p = sparkles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.rotationSpeed;
        p.opacity += p.opacitySpeed;

        if (p.opacity > 0.95 || p.opacity < 0.15) {
          p.opacitySpeed = -p.opacitySpeed;
        }

        // Loop boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        if (p.isDiamondStar) {
          drawDiamondStar(p.x, p.y, p.size, p.opacity);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.shadowColor = 'rgba(201, 169, 110, 0.7)';
          ctx.shadowBlur = 6;
          ctx.fill();
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

  const active = JEWELRY_PIECES[currentIndex];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none"
      style={{ backgroundColor: '#050505' }}
    >
      {/* ═══════════════════════════════════════════════
          1. CINEMATIC JEWELRY BACKGROUND SLIDESHOW
          ═══════════════════════════════════════════════ */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{
            opacity: 0.42,
            scale: 1.12,
            transition: {
              opacity: { duration: 1.8, ease: 'easeInOut' },
              scale: { duration: 6.5, ease: 'easeOut' },
            },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 1.6, ease: 'easeInOut' },
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Main jewelry visual with basePath support */}
          <picture className="w-full h-full block">
            <source srcSet={active.fallback} />
            <img
              src={active.image}
              alt={active.title}
              onError={(e) => {
                // Fallback to github repo path if root path fails
                const img = e.currentTarget;
                if (!img.src.includes('Swornali-Jewellers')) {
                  img.src = active.fallback;
                }
              }}
              className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.12]"
            />
          </picture>
        </motion.div>
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════
          2. ROTATING SACRED GOLD MANDALA & FILIGREE RINGS
          ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        {/* Outer Rotating Filigree Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="w-[620px] h-[620px] md:w-[820px] md:h-[820px] rounded-full border border-[#c9a96e]/30 absolute flex items-center justify-center"
          style={{
            boxShadow: '0 0 60px rgba(201,169,110,0.1), inset 0 0 60px rgba(201,169,110,0.08)',
          }}
        >
          {/* Ring Orbit Nodes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <div
              key={deg}
              className="absolute w-2 h-2 rounded-full bg-[#f5d77f] shadow-[0_0_8px_#f5d77f]"
              style={{
                transform: `rotate(${deg}deg) translate(310px) rotate(-${deg}deg)`,
              }}
            />
          ))}
        </motion.div>

        {/* Inner Counter-Rotating Filigree Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="w-[420px] h-[420px] md:w-[560px] md:h-[560px] rounded-full border border-dashed border-[#c9a96e]/40 absolute flex items-center justify-center"
        >
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div
              key={deg}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#ffffff] shadow-[0_0_6px_#ffffff]"
              style={{
                transform: `rotate(${deg}deg) translate(210px) rotate(-${deg}deg)`,
              }}
            />
          ))}
        </motion.div>

        {/* Central Golden Brand Watermark Crest */}
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-44 h-44 md:w-60 md:h-60 flex items-center justify-center pointer-events-none"
        >
          <img
            src="/Swornali-Jewellers/images/logo.png"
            alt="Swornali Crest"
            onError={(e) => {
              e.currentTarget.src = '/images/logo.png';
            }}
            className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(201,169,110,0.4)]"
          />
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════
          3. INTERACTIVE GOLDEN AURA (follows mouse)
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none blur-[100px]"
        animate={{
          x: mousePos.x * 120 - 60,
          y: mousePos.y * 120 - 60,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 40 }}
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(201, 169, 110, 0.22) 0%, rgba(180, 130, 40, 0.06) 50%, transparent 75%)',
        }}
      />

      {/* ═══════════════════════════════════════════════
          4. SWEEPING LUXURY LIGHT SHIMMER CAUSTIC
          ═══════════════════════════════════════════════ */}
      <motion.div
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatDelay: 3.5,
          ease: 'easeInOut',
        }}
        className="absolute inset-y-0 w-1/2 pointer-events-none"
        style={{
          background: 'linear-gradient(115deg, transparent 35%, rgba(255, 230, 140, 0.08) 50%, transparent 65%)',
          transform: 'skewX(-20deg)',
        }}
      />

      {/* ═══════════════════════════════════════════════
          5. GOLD DUST & DIAMOND PARTICLES CANVAS
          ═══════════════════════════════════════════════ */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* ═══════════════════════════════════════════════
          6. LUXURY VIGNETTES & GRADIENTS
          Ensures foreground typography remains 100% crisp
          ═══════════════════════════════════════════════ */}
      {/* Top Header Dark Vignette */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Bottom Trustbar Blend */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/90 to-transparent z-10 pointer-events-none" />

      {/* Radial Center Focus Darkening to make text stand out intensely */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.45) 0%, rgba(5,5,5,0.75) 60%, rgba(5,5,5,0.92) 100%)',
        }}
      />

      {/* ═══════════════════════════════════════════════
          7. CURRENT FEATURED ATELIER PIECE BADGE
          ═══════════════════════════════════════════════ */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#c9a96e]/30 shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-[#c9a96e] animate-ping" />
        <div className="text-left">
          <span className="block text-[11px] font-semibold text-[#f5d77f] tracking-wide">
            {active.title}
          </span>
          <span className="block text-[9px] text-[#a0a0a0] tracking-wider uppercase">
            {active.carat}
          </span>
        </div>
      </div>
    </div>
  );
}
