'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, ShieldCheck, Clock, RefreshCw, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export interface GoldRateItem {
  karat: string;
  name: string;
  bengali: string;
  pricePerBhori: number;
  pricePerGram: number;
  change: string;
  purity: string;
  hallmarkCode: string;
  description: string;
}

export const BANGLADESH_GOLD_RATES: GoldRateItem[] = [
  {
    karat: '22K',
    name: '22 Karat Guinea Gold',
    bengali: '২২ ক্যারেট গিনি সোনা (ক্যাডমিয়াম)',
    pricePerBhori: 229081,
    pricePerGram: Math.round(229081 / 11.664), // ~19,640
    change: '+৳1,166',
    purity: '91.6% Pure Gold',
    hallmarkCode: '916 HALLMARK',
    description: 'সর্বাধিক জনপ্রিয় ও রাজকীয় ব্রাইডাল গহনার মানদণ্ড। ১০০% হলমার্কযুক্ত।',
  },
  {
    karat: '21K',
    name: '21 Karat Hallmark Gold',
    bengali: '২১ ক্যারেট হলমার্ক সোনা',
    pricePerBhori: 218817,
    pricePerGram: Math.round(218817 / 11.664), // ~18,760
    change: '+৳1,108',
    purity: '87.5% Pure Gold',
    hallmarkCode: '875 HALLMARK',
    description: 'দৈনন্দিন পরিধান ও ক্লাসিক ডিজাইনের মজবুত ও টেকসই অলংকার।',
  },
  {
    karat: '18K',
    name: '18 Karat Diamond Cut Gold',
    bengali: '১৮ ক্যারেট ডায়মন্ড কাট সোনা',
    pricePerBhori: 187907,
    pricePerGram: Math.round(187907 / 11.664), // ~16,110
    change: '+৳933',
    purity: '75.0% Pure Gold',
    hallmarkCode: '750 HALLMARK',
    description: 'প্রাকৃতিক হীরাখচিত আংটি, পেন্ডেন্ট ও আধুনিক পাশ্চাত্য ডিজাইনের জন্য আদর্শ।',
  },
  {
    karat: 'Traditional',
    name: 'Traditional Method Gold (Sonaton)',
    bengali: 'সনাতন পদ্ধতির সোনা',
    pricePerBhori: 153498,
    pricePerGram: Math.round(153498 / 11.664), // ~13,160
    change: '+৳816',
    purity: 'Traditional Assay',
    hallmarkCode: 'SONATON',
    description: 'সনাতন পদ্ধতির পুরনো ও ঐতিহ্যবাহী স্বর্ণালংকার বিনিময় ও বিক্রয় দর।',
  },
  {
    karat: 'Silver 22K',
    name: '22 Karat Pure Silver (Rupa)',
    bengali: '২২ ক্যারেট বিশুদ্ধ রূপা',
    pricePerBhori: 4316,
    pricePerGram: Math.round(4316 / 11.664), // ~370
    change: 'Stable',
    purity: '92.5% Sterling Silver',
    hallmarkCode: '925 STERLING',
    description: 'বিশুদ্ধ রূপার অলংকার, পায়েল, নূপুর ও উপহার সামগ্রী।',
  },
];

export const BAJUS_RATE_METADATA = {
  authority: 'Bangladesh Jewellers Association (BAJUS)',
  authorityBengali: 'বাংলাদেশ জুয়েলার্স অ্যাসোসিয়েশন (বাজুস)',
  effectiveDate: 'October 2026 (সর্বশেষ নির্ধারিত বাজার দর)',
  unitBhori: '১ ভরি = ১১.৬৬৪ গ্রাম = ১৬ আনা = ৯৬ রতি',
  vatNotice: 'সরকার নির্ধারিত ৫% ভ্যাট অন্তর্ভুক্ত। মজুরি নকশাভেদে নির্ধারিত হবে।',
  showroomNotice: 'স্বর্ণালী জুয়েলার্স, মেহেদী মার্কেট, রাজগঞ্জ রোড, যশোর (হটলাইন: 01818-049601)',
};

interface LiveGoldRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LiveGoldRateModal({ isOpen, onClose }: LiveGoldRateModalProps) {
  const [selectedUnit, setSelectedUnit] = useState<'bhori' | 'gram'>('bhori');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-2xl bg-[#0e0e0e] border border-[#c9a96e]/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden z-10 my-auto text-[#f5f5f5]"
        >
          {/* Header Banner */}
          <div className="relative px-6 py-5 bg-gradient-to-r from-[#18140c] via-[#120f09] to-[#0e0e0e] border-b border-[#2a2418]">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#c9a96e]/15 border border-[#c9a96e]/40 text-[#c9a96e] text-[11px] font-bold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE BAJUS MARKET RATE · বাংলাদেশ</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
                  <span>আজকের লাইভ স্বর্ণ ও রূপার দর</span>
                  <Sparkles size={18} className="text-[#c9a96e]" />
                </h3>
                <p className="text-xs text-[#a3a3a3]">
                  {BAJUS_RATE_METADATA.authorityBengali} কর্তৃক সর্বশেষ নির্ধারিত সরকারি রেট
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="p-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#262626] border border-[#333] text-[#aaa] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Unit Toggle */}
            <div className="mt-4 flex items-center justify-between flex-wrap gap-2 pt-3 border-t border-[#222]">
              <span className="text-xs text-[#888] flex items-center gap-1.5">
                <Clock size={13} className="text-[#c9a96e]" />
                {BAJUS_RATE_METADATA.effectiveDate}
              </span>

              <div className="inline-flex p-0.5 rounded-lg bg-[#141414] border border-[#2a2418]">
                <button
                  type="button"
                  onClick={() => setSelectedUnit('bhori')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    selectedUnit === 'bhori'
                      ? 'bg-[#c9a96e] text-black shadow'
                      : 'text-[#999] hover:text-white'
                  }`}
                >
                  প্রতি ভরি (১১.৬৬৪ গ্রাম)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUnit('gram')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    selectedUnit === 'gram'
                      ? 'bg-[#c9a96e] text-black shadow'
                      : 'text-[#999] hover:text-white'
                  }`}
                >
                  প্রতি গ্রাম (১ গ্রাম)
                </button>
              </div>
            </div>
          </div>

          {/* Rate Cards List */}
          <div className="p-4 sm:p-6 space-y-3 max-h-[60vh] overflow-y-auto">
            {BANGLADESH_GOLD_RATES.map((rate) => {
              const displayPrice =
                selectedUnit === 'bhori' ? rate.pricePerBhori : rate.pricePerGram;
              const unitText = selectedUnit === 'bhori' ? '/ ভরি' : '/ গ্রাম';

              return (
                <div
                  key={rate.karat}
                  className="group relative p-4 rounded-xl bg-[#141414] hover:bg-[#181818] border border-[#262626] hover:border-[#c9a96e]/50 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Left: Karat details */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-[#c9a96e]/20 text-[#f5d77f] border border-[#c9a96e]/40">
                          {rate.karat}
                        </span>
                        <h4 className="font-semibold text-white text-base">
                          {rate.bengali}
                        </h4>
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          <TrendingUp size={11} />
                          {rate.change}
                        </span>
                      </div>
                      <p className="text-xs text-[#888]">
                        {rate.purity} · {rate.hallmarkCode} · {rate.name}
                      </p>
                    </div>

                    {/* Right: Live Price */}
                    <div className="text-left sm:text-right shrink-0">
                      <div className="text-xl sm:text-2xl font-bold font-display text-[#c9a96e]">
                        ৳ {displayPrice.toLocaleString('en-BD')}
                        <span className="text-xs font-normal text-[#888] ml-1">{unitText}</span>
                      </div>
                      <div className="text-[11px] text-[#777]">
                        {selectedUnit === 'bhori'
                          ? `(গ্রাম: ৳ ${rate.pricePerGram.toLocaleString('en-BD')})`
                          : `(ভরি: ৳ ${rate.pricePerBhori.toLocaleString('en-BD')})`}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#1f1f1f] text-[11px] text-[#777] flex items-center justify-between">
                    <span>{rate.description}</span>
                    <span className="text-[#c9a96e]/80 font-mono text-[10px]">১০০% হলমার্ক নিশ্চিত</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note & Official Information */}
          <div className="p-4 sm:px-6 sm:py-4 bg-[#0a0a0a] border-t border-[#222] space-y-2 text-xs text-[#888]">
            <div className="flex items-center gap-2 text-[#c9a96e] font-semibold">
              <ShieldCheck size={15} />
              <span>{BAJUS_RATE_METADATA.unitBhori}</span>
            </div>
            <p className="text-[11px] text-[#777] leading-relaxed">
              📌 {BAJUS_RATE_METADATA.vatNotice}
              <br />
              🏛️ <strong>শোরুম:</strong> {BAJUS_RATE_METADATA.showroomNotice}
            </p>
            <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
              <Link
                href="/products"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs text-[#c9a96e] hover:text-[#f5d77f] font-semibold transition-colors"
              >
                <span>এই দরে আমাদের কালেকশন দেখুন</span>
                <ChevronRight size={13} />
              </Link>
              <a
                href="https://wa.me/8801818049601"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#1a160e] hover:bg-[#251e12] border border-[#c9a96e]/40 text-[#c9a96e] text-xs font-bold transition-colors"
              >
                সরাসরি দর জানতে WhatsApp: 01818-049601
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/**
 * Live Gold Rate Banner Strip (for top marquee or dedicated section)
 */
export function LiveGoldRateTickerStrip({ onOpenModal }: { onOpenModal?: () => void }) {
  return (
    <div className="w-full bg-gradient-to-r from-[#0a0a0a] via-[#141009] to-[#0a0a0a] border-b border-[#2a2418] py-1.5 px-4 text-xs">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3 flex-wrap">
        {/* Left: Ticker title */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-bold tracking-wider text-[#c9a96e] uppercase text-[10px] sm:text-xs">
            BAJUS লাইভ রেট:
          </span>
        </div>

        {/* Middle: Horizontal Ticker items */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto py-0.5 scrollbar-none text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[#888]">২২K গিনি:</span>
            <span className="font-bold text-white font-mono">৳ ২,২৯,০৮১</span>
            <span className="text-[10px] text-[#c9a96e]">/ভরি</span>
          </div>

          <span className="text-[#333]">|</span>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[#888]">২১K হলমার্ক:</span>
            <span className="font-bold text-white font-mono">৳ ২,১৮,৮১৭</span>
            <span className="text-[10px] text-[#c9a96e]">/ভরি</span>
          </div>

          <span className="text-[#333]">|</span>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[#888]">১৮K ডায়মন্ড কাট:</span>
            <span className="font-bold text-white font-mono">৳ ১,৮৭,৯০৭</span>
            <span className="text-[10px] text-[#c9a96e]">/ভরি</span>
          </div>

          <span className="text-[#333]">|</span>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[#888]">২২K রূপা:</span>
            <span className="font-bold text-white font-mono">৳ ৪,৩১৬</span>
            <span className="text-[10px] text-[#c9a96e]">/ভরি</span>
          </div>
        </div>

        {/* Right: Trigger Modal Button */}
        {onOpenModal && (
          <button
            type="button"
            onClick={onOpenModal}
            className="shrink-0 text-[10px] sm:text-xs font-bold text-[#c9a96e] hover:text-[#f5d77f] flex items-center gap-1 underline underline-offset-2 transition-colors ml-auto sm:ml-0"
          >
            <span>বিস্তারিত লাইভ চার্ট</span>
            <ChevronRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Dedicated Homepage Section for Gold Rate Today (Bangladesh)
 */
export function LiveGoldRateSection({ onOpenModal }: { onOpenModal?: () => void }) {
  const [selectedUnit, setSelectedUnit] = useState<'bhori' | 'gram'>('bhori');

  return (
    <section className="py-16 sm:py-20 bg-[#0a0a0a] border-t border-[#1f1f1f] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(201,169,110,0.08)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#c9a96e]/30 text-[#c9a96e] text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>BAJUS OFFICIAL RATE · বাংলাদেশ বাজার দর</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Gold Rate Today · আজকের স্বর্ণের লাইভ দর
          </h2>

          <p className="text-sm text-[#999] leading-relaxed">
            বাংলাদেশ জুয়েলার্স অ্যাসোসিয়েশন (বাজুস) নির্ধারিত সর্বশেষ বাজার দর অনুযায়ী ১০০% হলমার্ক বিশুদ্ধ স্বর্ণ ও রূপার লাইভ মূল্যতালিকা
          </p>

          {/* Unit Switcher */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex p-1 rounded-lg bg-[#141414] border border-[#2a2418]">
              <button
                type="button"
                onClick={() => setSelectedUnit('bhori')}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  selectedUnit === 'bhori'
                    ? 'bg-[#c9a96e] text-black shadow-md'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                প্রতি ভরি (১১.৬৬৪ গ্রাম)
              </button>
              <button
                type="button"
                onClick={() => setSelectedUnit('gram')}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  selectedUnit === 'gram'
                    ? 'bg-[#c9a96e] text-black shadow-md'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                প্রতি গ্রাম (১ গ্রাম)
              </button>
            </div>
          </div>
        </div>

        {/* 4 Primary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {BANGLADESH_GOLD_RATES.slice(0, 4).map((item) => {
            const price = selectedUnit === 'bhori' ? item.pricePerBhori : item.pricePerGram;
            const unitText = selectedUnit === 'bhori' ? '/ ভরি' : '/ গ্রাম';

            return (
              <div
                key={item.karat}
                className="relative rounded-xl p-5 bg-[#141414] border border-[#262626] hover:border-[#c9a96e]/60 transition-all duration-300 hover:-translate-y-1 group shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
              >
                {/* Karat Badge & Live tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-[#c9a96e]/20 text-[#f5d77f] border border-[#c9a96e]/40">
                    {item.karat}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-0.5">
                    <TrendingUp size={11} /> {item.change}
                  </span>
                </div>

                {/* Bengali Title */}
                <h3 className="font-display font-bold text-white text-lg group-hover:text-[#c9a96e] transition-colors">
                  {item.bengali}
                </h3>
                <div className="text-[11px] text-[#777] mb-4">{item.hallmarkCode}</div>

                {/* Price Display */}
                <div className="pt-3 border-t border-[#222]">
                  <div className="text-2xl font-bold font-display text-[#c9a96e]">
                    ৳ {price.toLocaleString('en-BD')}
                  </div>
                  <div className="text-xs text-[#888] mt-0.5 flex justify-between">
                    <span>{unitText}</span>
                    <span className="text-[11px] text-[#666]">
                      {selectedUnit === 'bhori'
                        ? `গ্রাম: ৳${item.pricePerGram.toLocaleString('en-BD')}`
                        : `ভরি: ৳${item.pricePerBhori.toLocaleString('en-BD')}`}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-[11px] text-[#777] leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Silver & Bottom Notice Strip */}
        <div className="mt-6 p-4 rounded-xl bg-[#121212] border border-[#222] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#888]">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-[#282828] text-white border border-[#444]">
              SILVER (রূপা)
            </span>
            <span className="text-white font-medium">
              ২২ ক্যারেট ক্যাডমিয়াম রূপা: <strong className="text-[#c9a96e]">৳ ৪,৩১৬ /ভরি</strong> (গ্রাম: ৳৩৭০)
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="text-[#666] text-[11px]">
              📍 মেহিদী মার্কেট, রাজগঞ্জ রোড, যশোর
            </span>
            {onOpenModal ? (
              <button
                type="button"
                onClick={onOpenModal}
                className="px-3.5 py-1.5 rounded-lg bg-[#c9a96e] hover:bg-[#d8bc85] text-black font-bold text-xs transition-colors"
              >
                সম্পূর্ণ রেট চার্ট খুলুন
              </button>
            ) : (
              <Link
                href="/about"
                className="px-3.5 py-1.5 rounded-lg bg-[#c9a96e] hover:bg-[#d8bc85] text-black font-bold text-xs transition-colors"
              >
                সম্পূর্ণ রেট চার্ট খুলুন
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

