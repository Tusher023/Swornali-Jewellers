'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../../components/store-provider'
import { findProduct, formatPrice, goldRates, getProductsByCategory } from '../../../lib/products'

export default function ProductDetailClient({ slug }: { slug: string }) {
  const product = findProduct(slug)
  
  const { wishlist, toggleWishlist, addToCart, addRecentlyViewed, toast } = useStore()
  
  const [activeImage, setActiveImage] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [goldPurity, setGoldPurity] = useState<'18K' | '21K' | '22K' | '24K'>('22K')
  
  const [openAccordion, setOpenAccordion] = useState<string | null>('description')

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product)
      setActiveImage(product.image)
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0])
      }
    }
  }, [product, addRecentlyViewed])

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-display text-[var(--text-primary)] mb-4">Product Not Found</h1>
        <p className="text-[var(--text-secondary)] mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link href="/products" className="btn btn-primary">Browse Collection</Link>
      </div>
    )
  }

  const relatedProducts = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4)
  const images = [product.image, ...(product.images || [])].filter(Boolean)

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize)
    toast(`Added ${product.name} to bag`)
  }

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  const estimatedGoldValue = product.weightGrams ? product.weightGrams * goldRates[goldPurity] : 0

  return (
    <div className="min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-[var(--bg-secondary)] border-b border-[#222] py-4">
        <div className="container mx-auto px-4">
          <nav className="breadcrumb text-sm text-[var(--text-muted)] flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--gold-400)] transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-[var(--gold-400)] transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)] line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left: Image Gallery */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="relative aspect-square bg-[var(--bg-secondary)] rounded-lg overflow-hidden group">
              {activeImage && (
                <Image 
                  src={activeImage}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-125 origin-center cursor-zoom-in"
                  priority
                />
              )}
              {product.badge && (
                <div className="absolute top-4 left-4 bg-[var(--gold-500)] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                  {product.badge}
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    className={`relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 ${activeImage === img ? 'border-[var(--gold-500)]' : 'border-transparent hover:border-[#444]'}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <Image src={img} alt={`${product.name} - View ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="w-full md:w-1/2 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {product.collection && (
                <span className="section-label mb-2 block">{product.collection}</span>
              )}
              
              <h1 className="font-display text-3xl md:text-4xl text-[var(--text-primary)] mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-[var(--gold-500)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating || 5) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className="text-[var(--text-secondary)] text-sm">{product.reviews || 0} Reviews</span>
              </div>
              
              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-bold text-[var(--gold-400)]">{formatPrice(product.price)}</span>
                {product.compareAtPrice && (
                  <span className="text-lg text-[var(--text-muted)] line-through mb-1">{formatPrice(product.compareAtPrice)}</span>
                )}
              </div>
              
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                {product.description}
              </p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 py-6 border-y border-[#222] mb-8">
                <div>
                  <span className="block text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Material</span>
                  <span className="text-[var(--text-primary)] font-medium">{product.material}</span>
                </div>
                <div>
                  <span className="block text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Purity</span>
                  <span className="text-[var(--text-primary)] font-medium">{product.purity || '-'}</span>
                </div>
                <div>
                  <span className="block text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Stone</span>
                  <span className="text-[var(--text-primary)] font-medium">{product.stone || 'None'}</span>
                </div>
                <div>
                  <span className="block text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Weight</span>
                  <span className="text-[var(--text-primary)] font-medium">{product.weightGrams ? `${product.weightGrams}g` : '-'}</span>
                </div>
              </div>

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Size</span>
                    <button className="text-xs text-[var(--gold-400)] hover:underline">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button 
                        key={size}
                        className={`tag !rounded-md ${selectedSize === size ? 'bg-[var(--gold-500)] text-white border-[var(--gold-500)]' : 'border-[#333] hover:border-[#666] text-[var(--text-secondary)]'}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <div className="qty-selector flex items-center border border-[#333] rounded-md overflow-hidden h-12 w-full sm:w-32 flex-shrink-0">
                  <button 
                    className="w-10 h-full flex items-center justify-center text-[var(--text-secondary)] hover:bg-[#222] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    readOnly 
                    className="w-full h-full bg-transparent text-center text-[var(--text-primary)] font-medium focus:outline-none"
                  />
                  <button 
                    className="w-10 h-full flex items-center justify-center text-[var(--text-secondary)] hover:bg-[#222] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="w-full flex-grow flex items-center gap-3">
                  <button 
                    className="btn btn-primary btn-lg flex-grow flex items-center justify-center gap-2 h-12 w-full"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <ShoppingBag size={18} />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
                  </button>
                  <button 
                    className="w-12 h-12 border border-[#333] rounded-md flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--gold-500)] hover:text-[var(--gold-500)] transition-colors flex-shrink-0"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart size={20} className={wishlist.includes(product.id) ? "fill-[var(--gold-500)] text-[var(--gold-500)]" : ""} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-8">
                <div className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-[var(--text-secondary)]">
                  {product.stock > 5 ? 'In Stock - Ready to Ship' : product.stock > 0 ? `Low Stock - Only ${product.stock} left` : 'Out of Stock'}
                </span>
              </div>

              {/* Gold Price Calculator */}
              {product.weightGrams && (
                <div className="bg-[var(--bg-secondary)] border border-[#222] rounded-lg p-5 mb-8">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gold-400)]"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    Gold Value Calculator
                  </h3>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="block text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Weight</span>
                      <span className="text-[var(--text-primary)] font-medium">{product.weightGrams}g</span>
                    </div>
                    <div>
                      <span className="block text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Purity</span>
                      <select 
                        className="bg-[var(--bg-card)] border border-[#333] text-[var(--text-primary)] rounded px-2 py-1 text-sm outline-none focus:border-[var(--gold-500)]"
                        value={goldPurity}
                        onChange={(e) => setGoldPurity(e.target.value as '18K'|'21K'|'22K'|'24K')}
                      >
                        <option value="18K">18K (75.0% Gold)</option>
                        <option value="21K">21K (87.5% Guinea Gold)</option>
                        <option value="22K">22K (91.6% Standard Gold)</option>
                        <option value="24K">24K (99.9% Fine Gold)</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[#333] flex justify-between items-center">
                    <span className="text-sm text-[var(--text-secondary)]">Estimated Metal Value:</span>
                    <span className="font-bold text-[var(--gold-400)]">{formatPrice(estimatedGoldValue)}</span>
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)] mt-2 italic">*Value based on current market rate, excluding making charges & taxes.</p>
                </div>
              )}

              {/* Accordions */}
              <div className="border-t border-[#222]">
                <div className="accordion-item border-b border-[#222]">
                  <button 
                    className="accordion-header w-full py-4 flex justify-between items-center text-left focus:outline-none"
                    onClick={() => toggleAccordion('description')}
                  >
                    <span className="font-semibold text-[var(--text-primary)]">Description</span>
                    {openAccordion === 'description' ? <ChevronUp size={20} className="text-[var(--text-muted)]" /> : <ChevronDown size={20} className="text-[var(--text-muted)]" />}
                  </button>
                  <AnimatePresence>
                    {openAccordion === 'description' && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="accordion-content overflow-hidden text-[var(--text-secondary)] pb-4 leading-relaxed text-sm"
                      >
                        {product.longDescription || product.description}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="accordion-item border-b border-[#222]">
                  <button 
                    className="accordion-header w-full py-4 flex justify-between items-center text-left focus:outline-none"
                    onClick={() => toggleAccordion('care')}
                  >
                    <span className="font-semibold text-[var(--text-primary)]">Care Instructions</span>
                    {openAccordion === 'care' ? <ChevronUp size={20} className="text-[var(--text-muted)]" /> : <ChevronDown size={20} className="text-[var(--text-muted)]" />}
                  </button>
                  <AnimatePresence>
                    {openAccordion === 'care' && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="accordion-content overflow-hidden text-[var(--text-secondary)] pb-4 leading-relaxed text-sm"
                      >
                        <ul className="list-disc pl-4 space-y-2">
                          <li>Store your jewelry in a clean, dry place.</li>
                          <li>Keep away from harsh chemicals, perfumes, and cosmetics.</li>
                          <li>Clean gently with a soft, non-abrasive cloth.</li>
                          <li>Remove before swimming, bathing, or exercising.</li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="accordion-item border-b border-[#222]">
                  <button 
                    className="accordion-header w-full py-4 flex justify-between items-center text-left focus:outline-none"
                    onClick={() => toggleAccordion('shipping')}
                  >
                    <span className="font-semibold text-[var(--text-primary)]">Shipping & Returns</span>
                    {openAccordion === 'shipping' ? <ChevronUp size={20} className="text-[var(--text-muted)]" /> : <ChevronDown size={20} className="text-[var(--text-muted)]" />}
                  </button>
                  <AnimatePresence>
                    {openAccordion === 'shipping' && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="accordion-content overflow-hidden text-[var(--text-secondary)] pb-4 leading-relaxed text-sm"
                      >
                        <p className="mb-2"><strong>Free Insured Shipping:</strong> 3-5 business days across Bangladesh.</p>
                        <p><strong>Returns:</strong> 15-day return policy for unused items in original packaging with tags intact. Custom orders are non-refundable.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </motion.div>
          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="section-title text-3xl mb-8 font-display text-center text-[var(--text-primary)]">You May Also Like</h2>
            <div className="grid-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relProduct => (
                <div key={relProduct.id} className="product-card group relative flex flex-col bg-[var(--bg-card)] rounded-lg overflow-hidden border border-[#222]">
                  <Link href={`/products/${relProduct.slug}`} className="relative aspect-[4/5] overflow-hidden block">
                    <Image 
                      src={relProduct.image || 'https://images.unsplash.com/photo-1599643478524-fb66f70a00bf?w=800&q=80'}
                      alt={relProduct.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1">{relProduct.category}</span>
                    <Link href={`/products/${relProduct.slug}`} className="hover:text-[var(--gold-400)] transition-colors">
                      <h3 className="font-semibold text-base text-[var(--text-primary)] mb-2 line-clamp-1">{relProduct.name}</h3>
                    </Link>
                    <div className="mt-auto font-bold text-[var(--gold-400)]">{formatPrice(relProduct.price)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

