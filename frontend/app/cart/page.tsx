'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, ShoppingBag, Plus, Minus, Tag, X } from 'lucide-react'
import { useStore } from '../../components/store-provider'
import { formatPrice } from '../../lib/products'

export default function CartPage() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    couponCode, 
    couponDiscount, 
    applyCoupon, 
    removeCoupon, 
    toast 
  } = useStore()

  const [localCoupon, setLocalCoupon] = useState('')

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (!localCoupon.trim()) return
    
    // Simulate API check
    if (localCoupon.toUpperCase() === 'WELCOME10') {
      applyCoupon(localCoupon, 500) // Fixed discount for demo
      toast('Coupon applied successfully', 'success')
      setLocalCoupon('')
    } else {
      toast('Invalid coupon code', 'error')
    }
  }

  const grandTotal = cartTotal - couponDiscount

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="empty-state">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-[var(--gold-400)]" />
          <h1 className="text-3xl font-display mb-4 text-[var(--text-primary)]">Your Shopping Bag is Empty</h1>
          <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
            Discover our collection of handcrafted luxury jewellery.
          </p>
          <Link href="/collections" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="page-header mb-12">
        <h1 className="section-title">Shopping Bag</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3">
          <div className="border-b border-[var(--bg-card)] pb-4 mb-6 hidden md:grid grid-cols-12 gap-4 text-[var(--text-secondary)] text-sm uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
          
          <div className="space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-[var(--bg-card)] pb-6"
                >
                  <div className="col-span-1 md:col-span-6 flex gap-4">
                    <Link href={`/product/${item.product.slug}`} className="block relative w-20 h-20 flex-shrink-0 bg-[var(--bg-card)] rounded-md overflow-hidden">
                      <Image 
                        src={item.product.image} 
                        alt={item.product.name} 
                        fill 
                        className="object-cover" 
                      />
                    </Link>
                    <div>
                      <Link href={`/product/${item.product.slug}`} className="text-[var(--text-primary)] font-medium hover:text-[var(--gold-400)] transition-colors">
                        {item.product.name}
                      </Link>
                      <div className="text-sm text-[var(--text-secondary)] mt-1">
                        {item.size && <span className="mr-3">Size: {item.size}</span>}
                        {item.product.material && <span>{item.product.material}</span>}
                      </div>
                      <div className="md:hidden mt-2 text-[var(--gold-400)] font-medium">
                        {formatPrice(item.product.price)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 text-center hidden md:block text-[var(--text-secondary)]">
                    {formatPrice(item.product.price)}
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                    <div className="qty-selector">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-[var(--gold-400)] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-[var(--text-primary)]">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-[var(--gold-400)] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                    <div className="text-[var(--text-primary)] font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[var(--text-muted)] hover:text-red-400 transition-colors ml-4"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="glass-card p-6 md:p-8 rounded-lg sticky top-24">
            <h2 className="text-xl font-display text-[var(--text-primary)] mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-[var(--text-secondary)]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[var(--text-primary)]">{formatPrice(cartTotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-400">Free</span>
              </div>

              {couponCode && (
                <div className="flex justify-between items-center text-[var(--gold-400)]">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>{couponCode}</span>
                    <button onClick={removeCoupon} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}
            </div>

            {!couponCode && (
              <form onSubmit={handleApplyCoupon} className="mb-6 flex gap-2">
                <input 
                  type="text" 
                  value={localCoupon}
                  onChange={(e) => setLocalCoupon(e.target.value)}
                  placeholder="Promo code" 
                  className="form-input flex-1"
                />
                <button type="submit" className="btn btn-secondary px-4">Apply</button>
              </form>
            )}

            <div className="border-t border-[var(--bg-card)] pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-[var(--text-primary)] font-medium">Grand Total</span>
                <span className="text-2xl text-[var(--gold-400)] font-medium">{formatPrice(grandTotal)}</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1 text-right">Including VAT</p>
            </div>

            <Link href="/checkout" className="btn btn-primary btn-lg w-full flex justify-center">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
