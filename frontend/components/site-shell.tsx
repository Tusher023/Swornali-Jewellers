'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useStore } from './store-provider';

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
          ANNOUNCEMENT BAR
          ═══════════════════════════════════════ */}

      <div className="announcement-bar">
        ✦ {common('deliveryAnnouncement')} ✦
      </div>

      {/* ═══════════════════════════════════════
          HEADER
          ═══════════════════════════════════════ */}

      <header
        className={`site-header ${
          scrolled ? 'scrolled' : ''
        }`}
      >
        <div className="header-inner">

          {/* ───────── Brand ───────── */}

          <Link href="/" className="brand-logo flex items-center gap-3">
            <img
              src="/Swornali-Jewellers/images/logo.png"
              alt="স্বর্ণালী জুয়েলার্স - Swornali Jewellers"
              className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_2px_10px_rgba(201,169,110,0.35)] transition-transform duration-300 hover:scale-105"
            />
            <div className="flex flex-col text-left">
              <span className="font-display tracking-widest text-[#f5f5f5] text-base md:text-lg font-bold leading-tight">
                স্বর্ণালী
              </span>
              <span className="text-[9px] tracking-[0.28em] text-[#c9a96e] font-semibold uppercase leading-none">
                JEWELLERS
              </span>
            </div>
          </Link>

          {/* ═════════════════════════════════════
              DESKTOP NAVIGATION
              ═════════════════════════════════════ */}

          <nav
            className="nav-links"
            aria-label={navigation('mainNavigation')}
          >
            <li>
              <Link
                href="/products"
                className={
                  pathname === '/products'
                    ? 'text-gold'
                    : ''
                }
              >
                {navigation('products')}
              </Link>
            </li>

            <li>
              <Link href="/products?category=Rings">
                {navigation('rings')}
              </Link>
            </li>

            <li>
              <Link href="/products?category=Necklaces">
                {navigation('necklaces')}
              </Link>
            </li>

            <li>
              <Link href="/products?category=Earrings">
                {navigation('earrings')}
              </Link>
            </li>

            <li>
              <Link href="/products?category=Bracelets">
                {navigation('bracelets')}
              </Link>
            </li>

            <li>
              <Link href="/custom-jewelry">
                {navigation('customJewelry')}
              </Link>
            </li>

            <li>
              <Link href="/about">
                {navigation('about')}
              </Link>
            </li>
          </nav>

          {/* ═════════════════════════════════════
              HEADER ACTIONS
              ═════════════════════════════════════ */}

          <div className="header-actions">

            {/* Search */}

            <button
              type="button"
              onClick={() =>
                setSearchOpen((value) => !value)
              }
              aria-label={common('search')}
              style={{
                position: 'relative',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                />

                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                />
              </svg>
            </button>

            {/* Wishlist */}

            <Link
              href="/wishlist"
              aria-label={navigation('wishlist')}
              style={{
                position: 'relative',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>

              {wishlist.length > 0 && (
                <span className="badge-count">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag */}

            <Link
              href="/cart"
              aria-label={navigation('cart')}
              style={{
                position: 'relative',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />

                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                />

                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>

              {count > 0 && (
                <span className="badge-count">
                  {count}
                </span>
              )}
            </Link>

            {/* Account */}

            <Link
              href={
                user
                  ? '/account'
                  : '/auth/login'
              }
              className="hidden lg:flex"
              aria-label={navigation('account')}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />

                <circle
                  cx="12"
                  cy="7"
                  r="4"
                />
              </svg>
            </Link>

            {/* Mobile menu */}

            <button
              type="button"
              className={`mobile-menu-btn ${
                mobileOpen ? 'open' : ''
              }`}
              onClick={() =>
                setMobileOpen((value) => !value)
              }
              aria-label={common('menu')}
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* ═════════════════════════════════════
            SEARCH OVERLAY
            ═════════════════════════════════════ */}

        {searchOpen && (
          <div
            className="animate-fade-in-down"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--bg-secondary)',
              borderBottom:
                '1px solid var(--border-subtle)',
              padding: '16px 24px',
              zIndex: 99,
            }}
          >
            <form
              onSubmit={handleSearch}
              style={{
                display: 'flex',
                gap: '12px',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              <input
                className="form-input"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder={common('searchPlaceholder')}
                autoFocus
                style={{
                  flex: 1,
                }}
              />

              <button
                type="submit"
                className="btn btn-primary btn-sm"
              >
                {common('search')}
              </button>
            </form>
          </div>
        )}
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
              <span className="font-display tracking-widest text-[#f5f5f5] text-xl font-bold leading-tight">
                স্বর্ণালী
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#c9a96e] font-semibold uppercase">
                JEWELLERS
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
              href="https://wa.me/8801818341601"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="Chat on WhatsApp (+880 1818-341601)"
            >
              wa
            </a>
            <a
              href="tel:+8801818341601"
              aria-label="Call"
              title="Call 01818-341601"
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