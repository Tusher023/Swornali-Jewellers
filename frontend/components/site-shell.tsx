'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useStore } from './store-provider';
import { LiveGoldRateModal, LiveGoldRateTickerStrip } from './live-gold-rate';

const PRODUCT_TYPES = [
  { name: 'Rings', bengali: 'আংটি', hasSub: true, href: '/products?category=Rings' },
  { name: 'Pendants', bengali: 'লকেট / পেন্ডেন্ট', hasSub: true, href: '/products?category=Pendants' },
  { name: 'Bracelets', bengali: 'বালা ও ব্রেসলেট', hasSub: true, href: '/products?category=Bracelets' },
  { name: 'Earrings', bengali: 'দুল ও ঝুমকা', hasSub: true, href: '/products?category=Earrings' },
  { name: 'Anklets', bengali: 'পায়েল ও নূপুর', hasSub: false, href: '/products?category=Anklets' },
  { name: 'Chains', bengali: 'সোনার চেইন', hasSub: false, href: '/products?category=Chains' },
  { name: 'Sets', bengali: 'নেকলেস ও ব্রাইডাল সেট', hasSub: false, href: '/products?category=Sets' },
  { name: 'Mangalsutras', bengali: 'মঙ্গলসূত্র', hasSub: false, href: '/products?category=Mangalsutras' },
  { name: 'Nose Pins', bengali: 'নাকফুল ও নোলক', hasSub: false, href: '/products?category=Nose+Pins' },
  { name: 'Toe Rings', bengali: 'তোড়া / আঙ্গুলের আংটি', hasSub: false, href: '/products?category=Toe+Rings' },
];

const SUB_ITEMS: Record<string, { label: string; href: string }[]> = {
  Rings: [
    { label: 'All Rings (সকল আংটি)', href: '/products?category=Rings' },
    { label: 'Solitaire Rings (হীরাখচিত আংটি)', href: '/products?category=Rings' },
    { label: '22K Guinea Gold Rings (২২K সোনা)', href: '/products?category=Rings' },
    { label: 'Couple Bands (যুগল আংটি)', href: '/products?category=Rings' },
  ],
  Pendants: [
    { label: 'All Pendants (সকল পেন্ডেন্ট)', href: '/products?category=Pendants' },
    { label: 'Gold Pendants (সোনার লকেট)', href: '/products?category=Pendants' },
    { label: 'Diamond Pendants (হীরার লকেট)', href: '/products?category=Pendants' },
  ],
  Bracelets: [
    { label: 'All Bracelets (বালা ও ব্রেসলেট)', href: '/products?category=Bracelets' },
    { label: 'Peacock Bangles (ময়ূর বালা)', href: '/products?category=Bracelets' },
    { label: 'Traditional Bala (ঐতিহ্যবাহী স্বর্ণবালা)', href: '/products?category=Bracelets' },
    { label: 'Chain Bracelets (চেইন ব্রেসলেট)', href: '/products?category=Bracelets' },
  ],
  Earrings: [
    { label: 'All Earrings (সকল দুল)', href: '/products?category=Earrings' },
    { label: 'Royal Jhumkas (ঐতিহ্যবাহী ঝুমকো)', href: '/products?category=Earrings' },
    { label: 'Studs & Tops (টপ দুল)', href: '/products?category=Earrings' },
    { label: 'Drop Earrings (ঝুলন্ত দুল)', href: '/products?category=Earrings' },
  ],
};

/* ═══════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════ */

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const navigation = useTranslations('Navigation');
  const common = useTranslations('Common');

  const { cart, wishlist, user } = useStore();

  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [productTypeOpen, setProductTypeOpen] = useState(false);
  const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(null);
  const [mobileProductTypeOpen, setMobileProductTypeOpen] = useState(false);
  const [goldRateModalOpen, setGoldRateModalOpen] = useState(false);

  const count = cart.reduce((total, item) => total + item.quantity, 0);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  /* ───────── Scroll effect ───────── */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* ───────── Close menus when route changes ───────── */

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setProductTypeOpen(false);
    setHoveredSubCategory(null);
  }, [pathname]);

  /* ───────── Search ───────── */

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    router.push(
      `/products?q=${encodeURIComponent(trimmedQuery)}`
    );

    setSearchOpen(false);
    setQuery('');
  };

  return (
    <>
      {/* ═══════════════════════════════════════
          ANNOUNCEMENT BAR (GOLD & OBSIDIAN)
          ═══════════════════════════════════════ */}

      <div className="announcement-bar flex items-center justify-center gap-2 text-[11px] sm:text-xs py-2 bg-[#0e0e0e] text-[#c9a96e] border-b border-[#1f1f1f] font-medium tracking-wide">
        <span>✦ Easy 15-Day Return Policy · ১০০% হলমার্ক বিশুদ্ধ স্বর্ণ · সারা বাংলাদেশে ফ্রি হোম ডেলিভারি · যশোর শোরুম: 01818-049601 ✦</span>
      </div>

      {/* ═══════════════════════════════════════
          LIVE GOLD & SILVER RATE BANNER STRIP (BAJUS BANGLADESH)
          ═══════════════════════════════════════ */}
      <LiveGoldRateTickerStrip onOpenModal={() => setGoldRateModalOpen(true)} />

      {/* ═══════════════════════════════════════
          HEADER (DARK LUXURY & GOLD)
          ═══════════════════════════════════════ */}

      <header
        className={`site-header bg-[#0a0a0a] transition-all duration-200 ${
          scrolled ? 'scrolled shadow-[0_4px_25px_rgba(0,0,0,0.8)] border-b border-[#c9a96e]/30' : 'border-b border-[#1f1f1f]'
        }`}
      >
        {/* Tier 1: Brand Logo, Location Selector, Wide Search Bar, Action Buttons */}
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-3 md:gap-6">

          {/* ───────── Brand Logo ───────── */}
          <Link href="/" className="brand-logo flex items-center gap-2.5 shrink-0">
            <img
              src="/Swornali-Jewellers/images/logo.png"
              alt="স্বর্ণালী জুয়েলার্স - Swornali Jewellers"
              className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_2px_12px_rgba(201,169,110,0.4)] transition-transform duration-300 hover:scale-105"
            />
            <div className="flex flex-col text-left">
              <span className="font-display tracking-wide text-white text-base md:text-lg font-bold leading-tight">
                স্বর্ণালী জুয়েলার্স
              </span>
              <span className="text-[9px] md:text-[10px] tracking-[0.22em] text-[#c9a96e] font-semibold uppercase leading-tight mt-0.5">
                SWORNALI JEWELLERS
              </span>
            </div>
          </Link>

          {/* ───────── Location Selector (Desktop) ───────── */}
          <Link
            href="/about"
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#242424] hover:border-[#c9a96e] transition-colors bg-[#121212] shrink-0"
            title="শো-রুম: মেহেদী মার্কেট, রাজগঞ্জ রোড, যশোর"
          >
            <span className="text-[#c9a96e] text-sm">📍</span>
            <div className="text-left text-[11px] leading-tight">
              <span className="block text-[#888] font-medium">Where to Deliver?</span>
              <span className="block font-bold text-[#f0f0f0]">যশোর / সারা বাংলাদেশ ⌵</span>
            </div>
          </Link>

          {/* ───────── Prominent Search Bar (Center) ───────── */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl relative hidden md:block">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search "Bracelets", "Rings", "গলার হার", "বালা"...'
              className="w-full pl-5 pr-12 py-2.5 rounded-full border border-[#262626] bg-[#141414] text-sm text-[#f0f0f0] placeholder-[#777] focus:outline-none focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e] transition-all shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c9a96e] hover:text-[#f5d77f] transition-colors"
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>

          {/* ───────── Action Items: STORES, ACCOUNT, WISHLIST, CART ───────── */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* STORES / SHOWROOM */}
            <Link href="/about" className="flex flex-col items-center text-[#c9a96e] hover:text-[#f5d77f] transition-colors group">
              <svg className="w-5 h-5 text-[#c9a96e] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-[10px] font-semibold tracking-wider text-[#a0a0a0] group-hover:text-[#c9a96e] uppercase mt-1 hidden sm:block">STORES</span>
            </Link>

            {/* ACCOUNT */}
            <Link href={user ? '/account' : '/auth/login'} className="flex flex-col items-center text-[#c9a96e] hover:text-[#f5d77f] transition-colors group">
              <svg className="w-5 h-5 text-[#c9a96e] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-[10px] font-semibold tracking-wider text-[#a0a0a0] group-hover:text-[#c9a96e] uppercase mt-1 hidden sm:block">ACCOUNT</span>
            </Link>

            {/* WISHLIST */}
            <Link href="/wishlist" className="flex flex-col items-center text-[#c9a96e] hover:text-[#f5d77f] transition-colors relative group">
              <div className="relative">
                <svg className="w-5 h-5 text-[#c9a96e] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#c9a96e] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold tracking-wider text-[#a0a0a0] group-hover:text-[#c9a96e] uppercase mt-1 hidden sm:block">WISHLIST</span>
            </Link>

            {/* CART */}
            <Link href="/cart" className="flex flex-col items-center text-[#c9a96e] hover:text-[#f5d77f] transition-colors relative group">
              <div className="relative">
                <svg className="w-5 h-5 text-[#c9a96e] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#c9a96e] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold tracking-wider text-[#a0a0a0] group-hover:text-[#c9a96e] uppercase mt-1 hidden sm:block">CART</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="lg:hidden p-1.5 text-[#c9a96e]"
              aria-label={common('menu')}
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Input Row */}
        <div className="md:hidden px-4 pb-2.5">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search "Bracelets", "Rings", "গলার হার"...'
              className="w-full pl-4 pr-10 py-2 rounded-full border border-[#262626] bg-[#141414] text-xs text-white placeholder-[#777]"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c9a96e]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>
        </div>

        {/* Tier 2: Category Navigation Row (Obsidian & Gold) */}
        <div className="hidden lg:block border-t border-[#1a1a1a] bg-[#0e0e0e]">
          <nav className="max-w-[1440px] mx-auto px-8 flex items-center justify-between text-xs font-semibold text-[#ccc] tracking-wide py-2.5 whitespace-nowrap gap-5">
            {/* Product Type with Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={() => setProductTypeOpen(true)}
              onMouseLeave={() => {
                setProductTypeOpen(false);
                setHoveredSubCategory(null);
              }}
            >
              <button
                type="button"
                onClick={() => setProductTypeOpen(!productTypeOpen)}
                className="hover:text-[#c9a96e] transition-colors py-1 flex items-center gap-1 font-semibold uppercase tracking-wide bg-transparent border-none cursor-pointer text-[#ddd] text-xs"
              >
                Product Type <span className={`text-[10px] text-[#c9a96e] transition-transform ${productTypeOpen ? 'rotate-180' : ''}`}>⌵</span>
              </button>

              {/* Product Type Dropdown Menu (Matches user screenshot) */}
              {productTypeOpen && (
                <div className="absolute top-full left-0 mt-1.5 bg-[#141414] border border-[#2a2a2a] rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.85)] py-2 z-50 flex animate-in fade-in slide-in-from-top-1 duration-150">
                  {/* Primary 10 Categories List */}
                  <div className="w-[200px] flex flex-col py-1">
                    {PRODUCT_TYPES.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onMouseEnter={() => (item.hasSub ? setHoveredSubCategory(item.name) : setHoveredSubCategory(null))}
                        onClick={() => setProductTypeOpen(false)}
                        className={`flex items-center justify-between px-5 py-2.5 text-[13px] font-medium transition-colors ${
                          hoveredSubCategory === item.name
                            ? 'bg-[#1f1f1f] text-[#c9a96e] font-semibold'
                            : 'text-[#e0e0e0] hover:bg-[#1a1a1a] hover:text-[#c9a96e]'
                        }`}
                      >
                        <span>{item.name}</span>
                        {item.hasSub && (
                          <span className="text-[13px] text-[#888] ml-4 font-normal">›</span>
                        )}
                      </Link>
                    ))}
                  </div>

                  {/* Sub-menu panel for items with > (Rings, Pendants, Bracelets, Earrings) */}
                  {hoveredSubCategory && SUB_ITEMS[hoveredSubCategory] && (
                    <div className="w-[230px] border-l border-[#262626] bg-[#181818] py-2 flex flex-col">
                      <div className="px-5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#c9a96e] border-b border-[#262626] mb-1">
                        {hoveredSubCategory} Collection
                      </div>
                      {SUB_ITEMS[hoveredSubCategory].map((sub, i) => (
                        <Link
                          key={i}
                          href={sub.href}
                          onClick={() => setProductTypeOpen(false)}
                          className="px-5 py-2 text-[12px] text-[#bbb] hover:text-[#c9a96e] hover:bg-[#202020] font-medium transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link href="/products?category=Necklaces" className="hover:text-[#c9a96e] transition-colors py-1">
              Shop for Women
            </Link>
            <Link href="/products?category=Rings" className="hover:text-[#c9a96e] transition-colors py-1">
              Shop for Men
            </Link>
            <Link href="/products?collection=Royal+Bridal" className="hover:text-[#c9a96e] transition-colors py-1">
              Bridal Collection
            </Link>
            <Link href="/products" className="hover:text-[#c9a96e] transition-colors py-1 flex items-center gap-1">
              Shop by Price <span className="text-[10px] text-[#888]">⌵</span>
            </Link>
            <Link href="/products?category=Bracelets" className="hover:text-[#c9a96e] transition-colors py-1">
              22K Guinea Gold
            </Link>
            <Link href="/products?category=Earrings" className="hover:text-[#c9a96e] transition-colors py-1">
              21K Hallmark Gold
            </Link>
            <Link href="/products?category=Earrings" className="hover:text-[#c9a96e] transition-colors py-1">
              Pure Silver Jewellery
            </Link>
            <button
              type="button"
              onClick={() => setGoldRateModalOpen(true)}
              className="hover:text-[#c9a96e] text-left transition-colors py-1 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Gold Rate Today</span>
              <span className="text-[9px] bg-[#c9a96e]/20 text-[#c9a96e] border border-[#c9a96e]/40 px-1.5 py-0.5 rounded font-bold animate-pulse">
                LIVE BD
              </span>
            </button>
            <Link href="/custom-jewelry" className="hover:text-[#c9a96e] transition-colors py-1">
              Custom Jewellery
            </Link>
          </nav>
        </div>
      </header>

      {/* ═══════════════════════════════════════
          MOBILE OVERLAY
          ═══════════════════════════════════════ */}

      <div
        className={`mobile-overlay ${
          mobileOpen ? 'open' : ''
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ═══════════════════════════════════════
          MOBILE NAVIGATION
          ═══════════════════════════════════════ */}

      <nav
        className={`mobile-nav ${
          mobileOpen ? 'open' : ''
        }`}
        aria-label={navigation('mobileNavigation')}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '1.5rem',
          }}
          aria-label={common('close')}
        >
          ✕
        </button>

        {/* Mobile Product Type Expandable Accordion */}
        <div className="py-1 border-b border-[var(--border-subtle)]">
          <button
            type="button"
            onClick={() => setMobileProductTypeOpen(!mobileProductTypeOpen)}
            className="w-full flex items-center justify-between py-2 text-left font-serif text-[15px] font-semibold text-[var(--text-primary)] bg-transparent border-none cursor-pointer"
          >
            <span>Product Type (সকল গহনা)</span>
            <span className={`text-xs transition-transform ${mobileProductTypeOpen ? 'rotate-180 text-[#84253e]' : ''}`}>⌵</span>
          </button>

          {mobileProductTypeOpen && (
            <div className="pl-3 py-2 flex flex-col gap-1 bg-[#faf8f5] rounded-lg my-1 border border-[#eee7dd]">
              {PRODUCT_TYPES.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-3 text-xs font-semibold text-[#444] hover:text-[#84253e] flex items-center justify-between rounded hover:bg-white transition-colors"
                >
                  <span>{item.name}</span>
                  <span className="text-[10px] text-[#888]">{item.bengali}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/products">
          {navigation('products')}
        </Link>

        <Link href="/products?category=Rings">
          {navigation('rings')}
        </Link>

        <Link href="/products?category=Necklaces">
          {navigation('necklaces')}
        </Link>

        <Link href="/products?category=Earrings">
          {navigation('earrings')}
        </Link>

        <Link href="/products?category=Bracelets">
          {navigation('bracelets')}
        </Link>

        <Link href="/custom-jewelry">
          {navigation('customJewelry')}
        </Link>

        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            setGoldRateModalOpen(true);
          }}
          className="text-left py-2 text-[#c9a96e] font-semibold flex items-center justify-between w-full"
        >
          <span>Gold Rate Today (লাইভ রেট)</span>
          <span className="text-[10px] bg-[#c9a96e]/20 text-[#c9a96e] border border-[#c9a96e]/40 px-2 py-0.5 rounded font-bold">
            LIVE BD
          </span>
        </button>

        <Link href="/about">
          {navigation('about')}
        </Link>

        <Link href="/contact">
          {navigation('contact')}
        </Link>

        <div
          style={{
            borderTop:
              '1px solid var(--border-subtle)',
            marginTop: '16px',
            paddingTop: '16px',
          }}
        >
          <Link
            href={
              user
                ? '/account'
                : '/auth/login'
            }
          >
            {user
              ? navigation('account')
              : common('signIn')}
          </Link>

          <Link href="/wishlist">
            {navigation('wishlist')} ({wishlist.length})
          </Link>

          <Link href="/cart">
            {navigation('cart')} ({count})
          </Link>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          LIVE GOLD RATE MODAL (BAJUS BANGLADESH)
          ═══════════════════════════════════════ */}
      <LiveGoldRateModal
        isOpen={goldRateModalOpen}
        onClose={() => setGoldRateModalOpen(false)}
      />
    </>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */

export function Footer() {
  const pathname = usePathname();
  const navigation = useTranslations('Navigation');
  const common = useTranslations('Common');
  const footer = useTranslations('Footer');

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="footer-grid">

        {/* ═════════════════════════════════════
            BRAND
            ═════════════════════════════════════ */}

        <div className="footer-brand">
          <Link href="/" className="inline-flex items-center gap-3.5 mb-4 group">
            <img
              src="/Swornali-Jewellers/images/logo.png"
              alt="স্বর্ণালী জুয়েলার্স - Swornali Jewellers"
              className="h-14 w-auto object-contain drop-shadow-[0_2px_12px_rgba(201,169,110,0.4)] transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col text-left">
              <span className="font-display tracking-wide text-white text-xl font-bold leading-tight">
                স্বর্ণালী জুয়েলার্স
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#c9a96e] font-semibold uppercase mt-0.5">
                SWORNALI JEWELLERS
              </span>
            </div>
          </Link>

          <p style={{ fontSize: '0.82rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
            {footer('description')}
          </p>

          <div style={{ marginTop: '14px', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            <div style={{ color: 'var(--gold-400)', fontWeight: 600 }}>{footer('proprietor')}</div>
            <div>📍 {footer('location')}</div>
            <div>📞 {footer('hotline')}</div>
          </div>

          <div
            className="footer-social"
            style={{
              marginTop: '16px',
            }}
          >
            <a
              href="https://wa.me/8801818049601"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="Chat on WhatsApp (+880 1818-049601)"
            >
              wa
            </a>
            <a
              href="tel:+8801818049601"
              aria-label="Call"
              title="Call 01818-049601"
            >
              📞
            </a>
            <a
              href="#"
              aria-label="Facebook"
            >
              f
            </a>
            <a
              href="#"
              aria-label="Instagram"
            >
              ig
            </a>
          </div>
        </div>

        {/* ═════════════════════════════════════
            SHOP
            ═════════════════════════════════════ */}

        <div className="footer-col">
          <h4>
            {footer('shop')}
          </h4>

          <Link href="/products?category=Rings">
            {navigation('rings')}
          </Link>

          <Link href="/products?category=Necklaces">
            {navigation('necklaces')}
          </Link>

          <Link href="/products?category=Earrings">
            {navigation('earrings')}
          </Link>

          <Link href="/products?category=Bracelets">
            {navigation('bracelets')}
          </Link>

          <Link href="/products">
            {footer('allJewellery')}
          </Link>
        </div>

        {/* ═════════════════════════════════════
            COMPANY
            ═════════════════════════════════════ */}

        <div className="footer-col">
          <h4>
            {footer('company')}
          </h4>

          <Link href="/about">
            {navigation('about')}
          </Link>

          <Link href="/custom-jewelry">
            {navigation('customJewelry')}
          </Link>

          <Link href="/contact">
            {navigation('contact')}
          </Link>

          <Link href="/shipping">
            {footer('shippingReturns')}
          </Link>
        </div>

        {/* ═════════════════════════════════════
            CUSTOMER CARE
            ═════════════════════════════════════ */}

        <div className="footer-col">
          <h4>
            {footer('customerCare')}
          </h4>

          <Link href="/shipping">
            {footer('deliveryInformation')}
          </Link>

          <Link href="/shipping">
            {footer('returnPolicy')}
          </Link>

          <Link href="/contact">
            {footer('sizeGuide')}
          </Link>

          <Link href="/contact">
            {footer('careInstructions')}
          </Link>
        </div>
      </div>

      {/* ═════════════════════════════════════
          FOOTER BOTTOM
          ═════════════════════════════════════ */}

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Swornali Jewellers.{' '}
          {footer('allRightsReserved')}
        </p>

        <p
          style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
          }}
        >
          {footer('vatDelivery')}
        </p>
      </div>
    </footer>
  );
}