'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Truck, CreditCard, ClipboardList, ChevronRight } from 'lucide-react'
import { useStore } from '../../components/store-provider'
import { formatPrice } from '../../lib/products'

type CheckoutStep = 'shipping' | 'payment' | 'review' | 'success'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, couponDiscount, placeOrder } = useStore()
  
  const [step, setStep] = useState<CheckoutStep>('shipping')
  const [orderId, setOrderId] = useState('')
  
  const [formData, setFormData] = useState({
    recipientName: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    postalCode: ''
  })
  
  const [paymentMethod, setPaymentMethod] = useState('cod')

  useEffect(() => {
    if (cart.length === 0 && step !== 'success') {
      router.push('/cart')
    }
  }, [cart.length, step, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('review')
  }

  const handlePlaceOrder = () => {
    // In a real app, this would send data to the backend
    const order = placeOrder({
      id: `checkout-${Date.now()}`,
      label: 'Checkout address',
      recipientName: formData.recipientName,
      phone: formData.phone,
      line1: formData.line1,
      line2: formData.line2,
      city: formData.city,
      postalCode: formData.postalCode,
      isDefault: false,
    })
    setOrderId(order.id)
    setStep('success')
  }

  const grandTotal = cartTotal - couponDiscount

  if (cart.length === 0 && step !== 'success') {
    return null // Will redirect
  }

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card max-w-lg w-full p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-24 h-24 text-[var(--gold-400)] mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-3xl font-display text-[var(--text-primary)] mb-4">Order Confirmed!</h1>
          <p className="text-[var(--text-secondary)] mb-6">
            Thank you for your purchase. Your order <span className="text-[var(--text-primary)] font-medium">#{orderId}</span> has been received and is being processed.
          </p>
          
          <div className="bg-[var(--bg-secondary)] p-4 rounded-md mb-8 inline-block">
            <span className="text-sm text-[var(--text-muted)]">Estimated Delivery</span>
            <div className="text-[var(--text-primary)] mt-1">3 - 5 Business Days</div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collections" className="btn btn-secondary">
              Continue Shopping
            </Link>
            <Link href="/account/orders" className="btn btn-primary">
              View Orders
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="page-header mb-10">
        <h1 className="section-title">Checkout</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Step Indicator */}
        <div className="steps flex justify-between items-center mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-[var(--bg-card)] -z-10"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[var(--gold-400)] -z-10 transition-all duration-300" style={{ width: step === 'shipping' ? '0%' : step === 'payment' ? '50%' : '100%' }}></div>
          
          {['shipping', 'payment', 'review'].map((s, index) => {
            const isActive = step === s
            const isPast = ['shipping', 'payment', 'review'].indexOf(step) > index
            
            let Icon = Truck
            if (s === 'payment') Icon = CreditCard
            if (s === 'review') Icon = ClipboardList
            
            return (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 ${isActive || isPast ? 'bg-[var(--gold-400)] text-[#111]' : 'bg-[var(--bg-card)] text-[var(--text-muted)]'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-sm font-medium capitalize ${isActive || isPast ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                  {s}
                </span>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-2/3">
            {/* Step 1: Shipping */}
            {step === 'shipping' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-display text-[var(--text-primary)] mb-6">Shipping Address</h2>
                <form onSubmit={handleShippingSubmit} className="glass-card p-6 md:p-8 rounded-lg space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input required type="text" name="recipientName" value={formData.recipientName} onChange={handleInputChange} className="form-input" placeholder="Enter your full name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-input" placeholder="+880 1XXX XXXXXX" />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Address Line 1</label>
                    <input required type="text" name="line1" value={formData.line1} onChange={handleInputChange} className="form-input" placeholder="House/Apartment, Street name" />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Address Line 2 (Optional)</label>
                    <input type="text" name="line2" value={formData.line2} onChange={handleInputChange} className="form-input" placeholder="Area, Landmark" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="form-label">City/District</label>
                      <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="form-input" placeholder="Dhaka" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Postal Code</label>
                      <input required type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="form-input" placeholder="1212" />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <button type="submit" className="btn btn-primary">
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 'payment' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-display text-[var(--text-primary)]">Payment Method</h2>
                  <button onClick={() => setStep('shipping')} className="text-sm text-[var(--text-muted)] hover:text-[var(--gold-400)] transition-colors">
                    Edit Shipping
                  </button>
                </div>
                <form onSubmit={handlePaymentSubmit} className="glass-card p-6 md:p-8 rounded-lg">
                  <div className="space-y-4 mb-8">
                    {[
                      { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive the order' },
                      { id: 'bkash', label: 'bKash', desc: 'Pay via bKash mobile banking' },
                      { id: 'nagad', label: 'Nagad', desc: 'Pay via Nagad mobile banking' },
                      { id: 'card', label: 'Credit/Debit Card', desc: 'Visa, MasterCard, Amex' }
                    ].map(method => (
                      <label key={method.id} className={`flex items-start gap-4 p-4 rounded-md border cursor-pointer transition-colors ${paymentMethod === method.id ? 'border-[var(--gold-400)] bg-[var(--bg-secondary)]' : 'border-[var(--bg-card)] hover:border-[var(--text-muted)]'}`}>
                        <div className="mt-1">
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={() => setPaymentMethod(method.id)}
                            className="w-4 h-4 text-[var(--gold-400)] bg-transparent border-[var(--text-muted)] focus:ring-[var(--gold-400)] focus:ring-offset-gray-900" 
                          />
                        </div>
                        <div>
                          <div className="font-medium text-[var(--text-primary)]">{method.label}</div>
                          <div className="text-sm text-[var(--text-secondary)] mt-1">{method.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button type="button" onClick={() => setStep('shipping')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Review Order
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 'review' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-display text-[var(--text-primary)]">Review Your Order</h2>
                </div>
                
                <div className="glass-card p-6 md:p-8 rounded-lg space-y-8">
                  {/* Address Review */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-[var(--text-primary)] uppercase tracking-wide text-sm">Shipping Information</h3>
                      <button onClick={() => setStep('shipping')} className="text-xs text-[var(--gold-400)] hover:underline">Edit</button>
                    </div>
                    <div className="text-[var(--text-secondary)] text-sm">
                      <p className="text-[var(--text-primary)] font-medium mb-1">{formData.recipientName}</p>
                      <p>{formData.line1}{formData.line2 ? `, ${formData.line2}` : ''}</p>
                      <p>{formData.city}, {formData.postalCode}</p>
                      <p className="mt-2">Phone: {formData.phone}</p>
                    </div>
                  </div>
                  
                  <hr className="border-[var(--bg-card)]" />
                  
                  {/* Payment Review */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-[var(--text-primary)] uppercase tracking-wide text-sm">Payment Method</h3>
                      <button onClick={() => setStep('payment')} className="text-xs text-[var(--gold-400)] hover:underline">Edit</button>
                    </div>
                    <div className="text-[var(--text-secondary)] text-sm">
                      {paymentMethod === 'cod' ? 'Cash on Delivery' : 
                       paymentMethod === 'bkash' ? 'bKash' : 
                       paymentMethod === 'nagad' ? 'Nagad' : 'Credit/Debit Card'}
                    </div>
                  </div>
                  
                  <hr className="border-[var(--bg-card)]" />
                  
                  {/* Items Review */}
                  <div>
                    <h3 className="font-medium text-[var(--text-primary)] uppercase tracking-wide text-sm mb-4">Items ({cart.length})</h3>
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative w-16 h-16 bg-[var(--bg-secondary)] rounded flex-shrink-0">
                            <Image src={item.product.image} alt={item.product.name} fill className="object-cover rounded" />
                          </div>
                          <div className="flex-1">
                            <div className="text-[var(--text-primary)] text-sm">{item.product.name}</div>
                            <div className="text-[var(--text-muted)] text-xs mt-1">Qty: {item.quantity} {item.size ? `| Size: ${item.size}` : ''}</div>
                          </div>
                          <div className="text-[var(--text-primary)] text-sm font-medium">
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            <div className="glass-card p-6 md:p-8 rounded-lg sticky top-24">
              <h2 className="text-xl font-display text-[var(--text-primary)] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-[var(--text-secondary)]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[var(--text-primary)]">{formatPrice(cartTotal)}</span>
                </div>
                
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[var(--gold-400)]">
                    <span>Discount</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-400">Free</span>
                </div>
              </div>

              <div className="border-t border-[var(--bg-card)] pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-[var(--text-primary)] font-medium">Grand Total</span>
                  <span className="text-2xl text-[var(--gold-400)] font-medium">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {step === 'review' ? (
                <button onClick={handlePlaceOrder} className="btn btn-primary btn-lg w-full">
                  Place Order
                </button>
              ) : (
                <div className="text-center text-[var(--text-muted)] text-sm">
                  Please complete all steps to place your order.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
