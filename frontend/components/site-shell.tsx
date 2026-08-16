'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { useStore } from './store-provider';

/* ═══════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════ */
export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { cart, wishlist, user } = useStore();
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const count = cart.reduce((t, i) => t + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setSearchOpen(false); }, [pathname]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) { router.push(`/products?q=${encodeURIComponent(query.trim())}`); setSearchOpen(false); setQuery(''); }
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="announcement-bar">
        ✦ Complimentary insured delivery across Bangladesh on all orders ✦
      </div>

      {/* Header */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          {/* Brand */}
          <Link href="/" className="brand-logo">
            SWORNALI
            <span>JEWELLERS</span>
          </Link>

          {/* Desktop nav */}
          <nav className="nav-links" aria-label="Main navigation">
            <li><Link href="/products" className={pathname === '/products' ? 'text-gold' : ''}>Shop All</Link></li>
            <li><Link href="/products?category=Rings">Rings</Link></li>
            <li><Link href="/products?category=Necklaces">Necklaces</Link></li>
            <li><Link href="/products?category=Earrings">Earrings</Link></li>
            <li><Link href="/products?category=Bracelets">Bracelets</Link></li>
            <li><Link href="/custom-jewelry">Custom</Link></li>
            <li><Link href="/about">Our Story</Link></li>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search" style={{ position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <Link href="/wishlist" aria-label="Wishlist" style={{ position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
            </Link>
            <Link href="/cart" aria-label="Shopping bag" style={{ position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {count > 0 && <span className="badge-count">{count}</span>}
            </Link>
            <Link href={user ? '/account' : '/auth/login'} className="hidden lg:flex" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </Link>

            {/* Mobile menu toggle */}
            <button className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Search overlay */}
        {searchOpen && (
          <div className="animate-fade-in-down" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', padding: '16px 24px', zIndex: 99 }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', maxWidth: '600px', margin: '0 auto' }}>
              <input
                className="form-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search rings, necklaces, diamonds..."
                autoFocus
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-primary btn-sm">Search</button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile menu overlay */}
      <div className={`mobile-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
      <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '1.5rem' }}>✕</button>
        <Link href="/products">Shop All</Link>
        <Link href="/products?category=Rings">Rings</Link>
        <Link href="/products?category=Necklaces">Necklaces</Link>
        <Link href="/products?category=Earrings">Earrings</Link>
        <Link href="/products?category=Bracelets">Bracelets</Link>
        <Link href="/custom-jewelry">Custom Jewellery</Link>
        <Link href="/about">Our Story</Link>
        <Link href="/contact">Contact</Link>
        <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '16px', paddingTop: '16px' }}>
          <Link href={user ? '/account' : '/auth/login'}>{user ? 'My Account' : 'Sign In'}</Link>
          <Link href="/wishlist">Wishlist ({wishlist.length})</Link>
          <Link href="/cart">Bag ({count})</Link>
        </div>
      </nav>
    </>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <div className="brand-logo" style={{ marginBottom: '4px' }}>
            SWORNALI
            <span>JEWELLERS</span>
          </div>
          <p>Fine jewellery for the moments that become heirlooms. Crafted with love in Dhaka, Bangladesh since 2020.</p>
          <div className="footer-social" style={{ marginTop: '20px' }}>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">ig</a>
            <a href="#" aria-label="WhatsApp">wa</a>
            <a href="#" aria-label="Pinterest">p</a>
          </div>
        </div>

        {/* Shop */}
        <div className="footer-col">
          <h4>Shop</h4>
          <Link href="/products?category=Rings">Rings</Link>
          <Link href="/products?category=Necklaces">Necklaces</Link>
          <Link href="/products?category=Earrings">Earrings</Link>
          <Link href="/products?category=Bracelets">Bracelets</Link>
          <Link href="/products">All Jewellery</Link>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h4>Company</h4>
          <Link href="/about">Our Story</Link>
          <Link href="/custom-jewelry">Custom Jewellery</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/shipping">Shipping & Returns</Link>
        </div>

        {/* Customer Care */}
        <div className="footer-col">
          <h4>Customer Care</h4>
          <Link href="/shipping">Delivery Information</Link>
          <Link href="/shipping">Return Policy</Link>
          <Link href="/contact">Size Guide</Link>
          <Link href="/contact">Care Instructions</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Swornali Jewellers. All rights reserved.</p>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          Prices include VAT · Free insured delivery across Bangladesh
        </p>
      </div>
    </footer>
  );
}
