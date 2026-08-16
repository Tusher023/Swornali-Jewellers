'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '../lib/products';

/* ───────── Types ───────── */
export type CartLine = { id: string; product: Product; quantity: number; size: string };
export type Order = { id: string; createdAt: string; date: string; total: number; status: string; items: CartLine[]; address?: Address };
export type Address = { id: string; label?: string; recipientName?: string; phone?: string; line1?: string; line2?: string; city: string; postalCode?: string; name?: string; street?: string; state?: string; zip?: string; country?: string; isDefault: boolean };
export type AuthUser = { id: string; firstName: string; lastName: string; email: string; phone?: string } | null;

type Store = {
  /* Auth */
  user: AuthUser;
  login: (email: string, password: string) => boolean;
  register: (firstName: string, lastName: string, email: string, password: string) => boolean;
  logout: () => void;

  /* Cart */
  cart: CartLine[];
  addToCart: (product: Product, quantityOrSize?: number | string, selectedSize?: string) => void;
  updateQuantity: (id: string, sizeOrQuantity: string | number, quantity?: number) => void;
  removeFromCart: (id: string, size?: string) => void;
  clearCart: () => void;
  cartTotal: number;

  /* Wishlist */
  wishlist: string[];
  toggleWishlist: (id: string) => void;

  /* Orders */
  orders: Order[];
  placeOrder: (address?: Address) => Order;

  /* Addresses */
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'> | Address) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  /* Coupons */
  couponCode: string | null;
  couponDiscount: number;
  applyCoupon: (code: string, _legacyDiscount?: number) => { success: boolean; message: string };
  removeCoupon: () => void;

  /* Recently viewed */
  recentlyViewed: string[];
  addRecentlyViewed: (id: string | Product) => void;

  /* Toast */
  toast: (message: string, level?: 'success' | 'error') => void;
  toastMessage: string | null;
  clearToast: () => void;
};

const StoreContext = createContext<Store | null>(null);
const storageKey = 'swornali-store-v2';

/* ── Coupon database ── */
const coupons: Record<string, { type: 'percentage' | 'fixed'; value: number; minPurchase: number }> = {
  WELCOME10: { type: 'percentage', value: 10, minPurchase: 30000 },
  GOLD500: { type: 'fixed', value: 500, minPurchase: 50000 },
  LOVE15: { type: 'percentage', value: 15, minPurchase: 80000 },
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  /* ── Persist ── */
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const v = JSON.parse(saved);
        setUser(v.user ?? null);
        setCart(v.cart ?? []);
        setWishlist(v.wishlist ?? []);
        setOrders(v.orders ?? []);
        setAddresses(v.addresses ?? []);
        setRecentlyViewed(v.recentlyViewed ?? []);
      } catch { localStorage.removeItem(storageKey); }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(storageKey, JSON.stringify({ user, cart, wishlist, orders, addresses, recentlyViewed }));
  }, [user, cart, wishlist, orders, addresses, recentlyViewed, ready]);

  /* ── Toast auto-dismiss ── */
  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const cartTotal = useMemo(() => cart.reduce((sum, l) => sum + l.product.price * l.quantity, 0), [cart]);

  const couponDiscount = useMemo(() => {
    if (!couponCode || !coupons[couponCode]) return 0;
    const c = coupons[couponCode];
    if (cartTotal < c.minPurchase) return 0;
    return c.type === 'percentage' ? Math.round(cartTotal * c.value / 100) : c.value;
  }, [couponCode, cartTotal]);

  const showToast = useCallback((msg: string) => setToastMessage(msg), []);

  const value = useMemo<Store>(() => ({
    /* Auth */
    user,
    login: (email, _password) => {
      setUser({ id: 'usr-1', firstName: 'Swornali', lastName: 'Customer', email, phone: '+880 1700-000000' });
      showToast('Welcome back!');
      return true;
    },
    register: (firstName, lastName, email, _password) => {
      setUser({ id: `usr-${Date.now()}`, firstName, lastName, email });
      showToast('Account created successfully!');
      return true;
    },
    logout: () => { setUser(null); showToast('Logged out'); },

    /* Cart */
    cart, cartTotal,
    addToCart: (product, quantityOrSize = product.sizes[0] ?? 'Standard', selectedSize) => {
      const quantity = typeof quantityOrSize === 'number' ? quantityOrSize : 1;
      const size = selectedSize ?? (typeof quantityOrSize === 'string' ? quantityOrSize : product.sizes[0] ?? 'Standard');
      setCart((c) => {
        const found = c.find((l) => l.product.id === product.id && l.size === size);
        return found ? c.map((l) => l === found ? { ...l, quantity: l.quantity + quantity } : l) : [...c, { id: product.id, product, size, quantity }];
      });
      showToast(`${product.name} added to your bag`);
    },
    updateQuantity: (id, sizeOrQuantity, maybeQuantity) => {
      const size = typeof sizeOrQuantity === 'string' ? sizeOrQuantity : undefined;
      const qty = typeof sizeOrQuantity === 'number' ? sizeOrQuantity : maybeQuantity ?? 1;
      setCart((c) => qty < 1 ? c.filter((l) => l.id !== id || (size !== undefined && l.size !== size)) : c.map((l) => l.id === id && (size === undefined || l.size === size) ? { ...l, quantity: qty } : l));
    },
    removeFromCart: (id, size) => { setCart((c) => c.filter((l) => l.id !== id || (size !== undefined && l.size !== size))); showToast('Item removed'); },
    clearCart: () => setCart([]),

    /* Wishlist */
    wishlist,
    toggleWishlist: (id) => {
      const has = wishlist.includes(id);
      setWishlist((w) => has ? w.filter((v) => v !== id) : [...w, id]);
      showToast(has ? 'Removed from wishlist' : 'Saved to wishlist ♡');
    },

    /* Orders */
    orders,
    placeOrder: (address) => {
      const total = cartTotal - couponDiscount;
      const order: Order = {
        id: `SW-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString(), date: new Date().toISOString(),
        total, status: 'Confirmed', items: [...cart], address,
      };
      setOrders((o) => [order, ...o]);
      setCart([]);
      setCouponCode(null);
      showToast(`Order ${order.id} confirmed! ✓`);
      return order;
    },

    /* Addresses */
    addresses,
    addAddress: (addr) => {
      const id = `addr-${Date.now()}`;
      setAddresses((a) => [...a, { ...addr, id }]);
      showToast('Address saved');
    },
    removeAddress: (id) => setAddresses((a) => a.filter((x) => x.id !== id)),
    setDefaultAddress: (id) => setAddresses((a) => a.map((x) => ({ ...x, isDefault: x.id === id }))),

    /* Coupons */
    couponCode, couponDiscount,
    applyCoupon: (code) => {
      const upper = code.toUpperCase().trim();
      const c = coupons[upper];
      if (!c) return { success: false, message: 'Invalid coupon code' };
      if (cartTotal < c.minPurchase) return { success: false, message: `Minimum purchase ৳${c.minPurchase.toLocaleString()} required` };
      setCouponCode(upper);
      const disc = c.type === 'percentage' ? Math.round(cartTotal * c.value / 100) : c.value;
      showToast(`Coupon applied! You save ৳${disc.toLocaleString()}`);
      return { success: true, message: `${c.type === 'percentage' ? `${c.value}%` : `৳${c.value}`} discount applied` };
    },
    removeCoupon: () => { setCouponCode(null); showToast('Coupon removed'); },

    /* Recently viewed */
    recentlyViewed,
    addRecentlyViewed: (value) => { const id = typeof value === 'string' ? value : value.id; setRecentlyViewed((r) => [id, ...r.filter((v) => v !== id)].slice(0, 10)); },

    /* Toast */
    toast: showToast, toastMessage, clearToast: () => setToastMessage(null),
  }), [user, cart, wishlist, orders, addresses, recentlyViewed, couponCode, couponDiscount, cartTotal, toastMessage, showToast]);

  return (
    <StoreContext.Provider value={value}>
      {children}
      {toastMessage && <div className="toast" role="status">{toastMessage}</div>}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used inside StoreProvider');
  return context;
};
