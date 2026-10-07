'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { Product } from '../lib/products';

/* ───────── Types ───────── */

export type CartLine = {
  id: string;
  product: Product;
  quantity: number;
  size: string;
};

export type Address = {
  id: string;
  label?: string;
  recipientName?: string;
  phone?: string;
  line1?: string;
  line2?: string;
  city: string;
  postalCode?: string;
  name?: string;
  street?: string;
  state?: string;
  zip?: string;
  country?: string;
  isDefault: boolean;
};

export type Order = {
  id: string;
  createdAt: string;
  date: string;
  total: number;
  status: string;
  items: CartLine[];
  address?: Address;
};

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
} | null;

type Store = {
  /* Auth */
  user: AuthUser;
  login: (email: string, password: string) => boolean;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => boolean;
  logout: () => void;

  /* Cart */
  cart: CartLine[];
  addToCart: (
    product: Product,
    quantityOrSize?: number | string,
    selectedSize?: string,
  ) => void;
  updateQuantity: (
    id: string,
    sizeOrQuantity: string | number,
    quantity?: number,
  ) => void;
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
  applyCoupon: (
    code: string,
    _legacyDiscount?: number,
  ) => { success: boolean; message: string };
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

/* ───────── Coupon Database ───────── */

const coupons: Record<
  string,
  {
    type: 'percentage' | 'fixed';
    value: number;
    minPurchase: number;
  }
> = {
  WELCOME10: {
    type: 'percentage',
    value: 10,
    minPurchase: 30000,
  },

  GOLD500: {
    type: 'fixed',
    value: 500,
    minPurchase: 50000,
  },

  LOVE15: {
    type: 'percentage',
    value: 15,
    minPurchase: 80000,
  },
};

/* ───────── Store Provider ───────── */

export function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /* ───────── State ───────── */

  const [user, setUser] = useState<AuthUser>(null);

  const [cart, setCart] = useState<CartLine[]>([]);

  const [wishlist, setWishlist] = useState<string[]>([]);

  const [orders, setOrders] = useState<Order[]>([]);

  const [addresses, setAddresses] = useState<Address[]>([]);

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  const [couponCode, setCouponCode] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [ready, setReady] = useState(false);

  /* ───────── Load Persistent Store ───────── */

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
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    setReady(true);
  }, []);

  /* ───────── Save Persistent Store ───────── */

  useEffect(() => {
    if (!ready) {
      return;
    }

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        user,
        cart,
        wishlist,
        orders,
        addresses,
        recentlyViewed,
      }),
    );
  }, [
    user,
    cart,
    wishlist,
    orders,
    addresses,
    recentlyViewed,
    ready,
  ]);

  /* ───────── Toast Auto Dismiss ───────── */

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      setToastMessage(null);
    }, 2800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [toastMessage]);

  /* ───────── Cart Total ───────── */

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (sum, line) => sum + line.product.price * line.quantity,
      0,
    );
  }, [cart]);

  /* ───────── Coupon Discount ───────── */

  const couponDiscount = useMemo(() => {
    if (!couponCode || !coupons[couponCode]) {
      return 0;
    }

    const coupon = coupons[couponCode];

    if (cartTotal < coupon.minPurchase) {
      return 0;
    }

    if (coupon.type === 'percentage') {
      return Math.round((cartTotal * coupon.value) / 100);
    }

    return coupon.value;
  }, [couponCode, cartTotal]);

  /* ───────── Toast ───────── */

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  /* ───────── Recently Viewed ───────── */

  const addRecentlyViewed = useCallback(
    (value: string | Product) => {
      const id = typeof value === 'string' ? value : value.id;

      setRecentlyViewed((current) => {
        /*
         * If this product is already the first item,
         * don't update state again.
         *
         * This is important because the product page
         * calls addRecentlyViewed from useEffect.
         */
        if (current[0] === id) {
          return current;
        }

        return [
          id,
          ...current.filter((itemId) => itemId !== id),
        ].slice(0, 10);
      });
    },
    [],
  );

  /* ───────── Store Value ───────── */

  const value = useMemo<Store>(
    () => ({
      /* ═══════════════════════════════════════
         AUTH
         ═══════════════════════════════════════ */

      user,

      login: (email, _password) => {
        setUser({
          id: 'usr-1',
          firstName: 'Swornali',
          lastName: 'Customer',
          email,
          phone: '+880 1700-000000',
        });

        showToast('Welcome back!');

        return true;
      },

      register: (
        firstName,
        lastName,
        email,
        _password,
      ) => {
        setUser({
          id: `usr-${Date.now()}`,
          firstName,
          lastName,
          email,
        });

        showToast('Account created successfully!');

        return true;
      },

      logout: () => {
        setUser(null);
        showToast('Logged out');
      },

      /* ═══════════════════════════════════════
         CART
         ═══════════════════════════════════════ */

      cart,

      cartTotal,

      addToCart: (
        product,
        quantityOrSize = product.sizes[0] ?? 'Standard',
        selectedSize,
      ) => {
        const quantity =
          typeof quantityOrSize === 'number'
            ? quantityOrSize
            : 1;

        const size =
          selectedSize ??
          (typeof quantityOrSize === 'string'
            ? quantityOrSize
            : product.sizes[0] ?? 'Standard');

        setCart((currentCart) => {
          const found = currentCart.find(
            (line) =>
              line.product.id === product.id &&
              line.size === size,
          );

          if (found) {
            return currentCart.map((line) =>
              line === found
                ? {
                    ...line,
                    quantity: line.quantity + quantity,
                  }
                : line,
            );
          }

          return [
            ...currentCart,
            {
              id: product.id,
              product,
              size,
              quantity,
            },
          ];
        });

        showToast(`${product.name} added to your bag`);
      },

      updateQuantity: (
        id,
        sizeOrQuantity,
        maybeQuantity,
      ) => {
        const size =
          typeof sizeOrQuantity === 'string'
            ? sizeOrQuantity
            : undefined;

        const quantity =
          typeof sizeOrQuantity === 'number'
            ? sizeOrQuantity
            : maybeQuantity ?? 1;

        setCart((currentCart) => {
          if (quantity < 1) {
            return currentCart.filter(
              (line) =>
                line.id !== id ||
                (size !== undefined &&
                  line.size !== size),
            );
          }

          return currentCart.map((line) =>
            line.id === id &&
            (size === undefined ||
              line.size === size)
              ? {
                  ...line,
                  quantity,
                }
              : line,
          );
        });
      },

      removeFromCart: (id, size) => {
        setCart((currentCart) =>
          currentCart.filter(
            (line) =>
              line.id !== id ||
              (size !== undefined &&
                line.size !== size),
          ),
        );

        showToast('Item removed');
      },

      clearCart: () => {
        setCart([]);
      },

      /* ═══════════════════════════════════════
         WISHLIST
         ═══════════════════════════════════════ */

      wishlist,

      toggleWishlist: (id) => {
        const has = wishlist.includes(id);

        setWishlist((currentWishlist) =>
          has
            ? currentWishlist.filter(
                (itemId) => itemId !== id,
              )
            : [...currentWishlist, id],
        );

        showToast(
          has
            ? 'Removed from wishlist'
            : 'Saved to wishlist ♡',
        );
      },

      /* ═══════════════════════════════════════
         ORDERS
         ═══════════════════════════════════════ */

      orders,

      placeOrder: (address) => {
        const total =
          cartTotal - couponDiscount;

        const order: Order = {
          id: `SW-${Date.now()
            .toString()
            .slice(-6)}`,

          createdAt: new Date().toISOString(),

          date: new Date().toISOString(),

          total,

          status: 'Confirmed',

          items: [...cart],

          address,
        };

        setOrders((currentOrders) => [
          order,
          ...currentOrders,
        ]);

        setCart([]);

        setCouponCode(null);

        showToast(
          `Order ${order.id} confirmed! ✓`,
        );

        return order;
      },

      /* ═══════════════════════════════════════
         ADDRESSES
         ═══════════════════════════════════════ */

      addresses,

      addAddress: (address) => {
        const id = `addr-${Date.now()}`;

        setAddresses((currentAddresses) => [
          ...currentAddresses,
          {
            ...address,
            id,
          },
        ]);

        showToast('Address saved');
      },

      removeAddress: (id) => {
        setAddresses((currentAddresses) =>
          currentAddresses.filter(
            (address) => address.id !== id,
          ),
        );
      },

      setDefaultAddress: (id) => {
        setAddresses((currentAddresses) =>
          currentAddresses.map((address) => ({
            ...address,
            isDefault: address.id === id,
          })),
        );
      },

      /* ═══════════════════════════════════════
         COUPONS
         ═══════════════════════════════════════ */

      couponCode,

      couponDiscount,

      applyCoupon: (code) => {
        const upper = code
          .toUpperCase()
          .trim();

        const coupon = coupons[upper];

        if (!coupon) {
          return {
            success: false,
            message: 'Invalid coupon code',
          };
        }

        if (cartTotal < coupon.minPurchase) {
          return {
            success: false,
            message: `Minimum purchase ৳${coupon.minPurchase.toLocaleString()} required`,
          };
        }

        setCouponCode(upper);

        const discount =
          coupon.type === 'percentage'
            ? Math.round(
                (cartTotal * coupon.value) /
                  100,
              )
            : coupon.value;

        showToast(
          `Coupon applied! You save ৳${discount.toLocaleString()}`,
        );

        return {
          success: true,
          message:
            coupon.type === 'percentage'
              ? `${coupon.value}% discount applied`
              : `৳${coupon.value} discount applied`,
        };
      },

      removeCoupon: () => {
        setCouponCode(null);

        showToast('Coupon removed');
      },

      /* ═══════════════════════════════════════
         RECENTLY VIEWED
         ═══════════════════════════════════════ */

      recentlyViewed,

      addRecentlyViewed,

      /* ═══════════════════════════════════════
         TOAST
         ═══════════════════════════════════════ */

      toast: showToast,

      toastMessage,

      clearToast: () => {
        setToastMessage(null);
      },
    }),
    [
      user,
      cart,
      cartTotal,
      wishlist,
      orders,
      addresses,
      recentlyViewed,
      couponCode,
      couponDiscount,
      toastMessage,
      showToast,
      addRecentlyViewed,
    ],
  );

  /* ───────── Provider ───────── */

  return (
    <StoreContext.Provider value={value}>
      {children}

      {toastMessage && (
        <div
          className="toast"
          role="status"
        >
          {toastMessage}
        </div>
      )}
    </StoreContext.Provider>
  );
}

/* ───────── useStore Hook ───────── */

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      'useStore must be used inside StoreProvider',
    );
  }

  return context;
};