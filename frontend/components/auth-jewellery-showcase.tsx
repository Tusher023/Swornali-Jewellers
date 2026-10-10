'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AuthJewelleryShowcaseProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  pieceType?: 'necklace' | 'ring' | 'bangles' | 'jhumka';
}

const PIECE_CONFIGS = {
  necklace: {
    primary: '/images/royal-necklace.jpg',
    fallback: '/Swornali-Jewellers/images/royal-necklace.jpg',
    alt: 'Swornali Jewellers 22K Guinea Gold Royal Bridal Necklace',
    tag: '২২ ক্যারেট গিনি সোনা · রাজকীয় কালেকশন',
    title: 'Royal Bridal Heritage',
    subtitle: 'হাতে গড়া ১০০% হলমার্ক বিশুদ্ধ স্বর্ণালংকার ও ব্রাইডাল সেট',
  },
  ring: {
    primary: '/images/royal-ring.jpg',
    fallback: '/Swornali-Jewellers/images/royal-ring.jpg',
    alt: 'Swornali Jewellers 22K Royal Solitaire Ring',
    tag: 'ন্যাচারাল ডায়মন্ড ও ১৮K/২২K স্বর্ণালী আংটি',
    title: 'Prestige VIP Circle',
    subtitle: 'এক্সক্লুসিভ কালেকশন, কাস্টম অর্ডার ও মেম্বার প্রিভিলেজ',
  },
  bangles: {
    primary: '/images/royal-bangles.jpg',
    fallback: '/Swornali-Jewellers/images/royal-bangles.jpg',
    alt: 'Swornali Jewellers Handcrafted Heritage Bangles',
    tag: 'ময়ূরপঙ্খী স্বর্ণবালা ও চুড়ি',
    title: 'Master Artisan Craft',
    subtitle: 'যশোর ateliers-এর বংশপরম্পরার খাঁটি কারিগরি নৈপুণ্য',
  },
  jhumka: {
    primary: '/images/royal-jhumka.jpg',
    fallback: '/Swornali-Jewellers/images/royal-jhumka.jpg',
    alt: 'Swornali Jewellers Royal Jhumka',
    tag: 'ঐতিহ্যবাহী ঝুমকো ও দুল',
    title: 'Timeless Grace',
    subtitle: 'উৎসব ও শুভানুষ্ঠানের জন্য অনন্য অলংকার',
  },
};

export function AuthJewelleryShowcase({
  title,
  subtitle,
  tag,
  pieceType = 'necklace',
}: AuthJewelleryShowcaseProps) {
  const config = PIECE_CONFIGS[pieceType];
  const [hasError, setHasError] = useState(false);

  const imgSrc = hasError ? config.fallback : config.primary;

  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-[#0a0a0a] items-center justify-center overflow-hidden border-r border-[#1f1f1f] select-none">
      {/* 1. Deep Obsidian & Warm 22K Amber Radial Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(28, 22, 14, 0.95) 0%, rgba(14, 14, 14, 0.98) 60%, #0a0a0a 100%)',
        }}
      />

      {/* 2. Concentric Rotating Filigree Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[440px] h-[440px] rounded-full border border-[rgba(201,169,110,0.18)] border-dashed opacity-75"
        />
        {/* Inner Ring with Gold Inset Shadow */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[320px] h-[320px] rounded-full border border-[rgba(201,169,110,0.28)] opacity-60 shadow-[inset_0_0_30px_rgba(201,169,110,0.12)]"
        />
        {/* Ambient Center Glow */}
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-[260px] h-[260px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.3)_0%,transparent_70%)] blur-3xl pointer-events-none"
        />
      </div>

      {/* 3. Floating Jewellery Centerpiece & Card Content */}
      <div className="relative z-10 flex flex-col items-center text-center p-8 max-w-md mx-auto">
        {/* Animated Floating Piece */}
        <motion.div
          animate={{
            y: [0, -14, 0, 10, 0],
            rotate: [0, 2, 0, -2, 0],
            scale: [1, 1.02, 1, 0.99, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-64 h-64 sm:w-72 sm:h-72 mb-8 flex items-center justify-center"
        >
          {/* Outer Halo */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-75"
            style={{
              background:
                'radial-gradient(circle, rgba(201, 169, 110, 0.4) 0%, rgba(201, 169, 110, 0.08) 65%, transparent 80%)',
            }}
          />

          {/* Masked Luxury Container with Gold Rim */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[rgba(201,169,110,0.5)] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(201,169,110,0.35)] backdrop-blur-[2px] bg-[#12100b]">
            <Image
              src={imgSrc}
              alt={config.alt}
              fill
              className="object-cover object-center scale-105 filter brightness-105 contrast-105 transition-transform duration-700"
              sizes="320px"
              priority
              onError={() => {
                if (!hasError) setHasError(true);
              }}
            />
            {/* Shimmer Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-amber-200/15 pointer-events-none" />
          </div>

          {/* Sparkles */}
          <motion.div
            animate={{
              scale: [0.8, 1.3, 0.8],
              opacity: [0.4, 1, 0.4],
              rotate: [0, 45, 0],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 right-2 text-2xl text-[#f5d77f] drop-shadow-[0_0_10px_rgba(245,215,127,0.8)] pointer-events-none"
          >
            ✦
          </motion.div>
          <motion.div
            animate={{
              scale: [1.2, 0.7, 1.2],
              opacity: [0.8, 0.3, 0.8],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -bottom-2 -left-2 text-xl text-[#c9a96e] drop-shadow-[0_0_10px_rgba(201,169,110,0.8)] pointer-events-none"
          >
            ✧
          </motion.div>
          <motion.div
            animate={{
              scale: [0.7, 1.1, 0.7],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/2 -right-4 text-sm text-[#f5d77f] drop-shadow-[0_0_8px_rgba(245,215,127,0.7)] pointer-events-none"
          >
            ✦
          </motion.div>
        </motion.div>

        {/* Brand Kicker / Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#c9a96e]/35 text-xs text-[#c9a96e] tracking-widest font-semibold uppercase mb-3 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
          <span>{tag || config.tag}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          {title || config.title}
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-[#a3a3a3] font-light leading-relaxed max-w-sm mt-2">
          {subtitle || config.subtitle}
        </p>

        {/* Hallmark Pill */}
        <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-[#c9a96e]/80">
          <span>◆</span>
          <span>১০০% বিএসটিআই ও আন্তর্জাতিক হলমার্ক সার্টিফাইড</span>
          <span>◆</span>
        </div>
      </div>
    </div>
  );
}
