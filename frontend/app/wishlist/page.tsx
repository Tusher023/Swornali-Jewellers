'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trash2, ShoppingBag } from 'lucide-react'
import { useStore } from '../../components/store-provider'
import { products, formatPrice } from '../../lib/products'

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, toast } = useStore()
  
  // Find full product objects for wishlisted IDs
  const wishlistedProducts = wishlist
    .map(id => products.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1)
    toggleWishlist(product.id)
    toast('Moved to bag', 'success')
  }

  if (wishlistedProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="empty-state">
          <Heart className="w-16 h-16 mx-auto mb-6 text-[var(--text-muted)]" />
          <h1 className="text-3xl font-display mb-4 text-[var(--text-primary)]">Your Wishlist is Empty</h1>
          <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
            Save items you love to your wishlist to easily find them later.
          </p>
          <Link href="/collections" className="btn btn-primary">
            Explore Collection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="page-header mb-12">
        <h1 className="section-title">Your Wishlist</h1>
        <p className="section-subtitle mt-4">{wishlistedProducts.length} items saved</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {wishlistedProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="product-card group relative flex flex-col h-full bg-[var(--bg-secondary)] border border-[var(--bg-card)] rounded-lg overflow-hidden"
            >
              <div className="relative aspect-[4/5] bg-[var(--bg-card)] overflow-hidden">
                <Link href={`/product/${product.slug}`} className="block w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleWishlist(product.id)
                  }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-[var(--text-primary)] hover:text-red-400 transition-colors z-10"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {product.badge && (
                  <div className="absolute top-4 left-4 tag bg-[var(--gold-500)] text-white text-xs px-2 py-1 uppercase tracking-wider font-medium z-10">
                    {product.badge}
                  </div>
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  {product.category}
                </div>
                <Link href={`/product/${product.slug}`}>
                  <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2 hover:text-[var(--gold-400)] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div className="text-[var(--gold-400)] font-medium">
                    {formatPrice(product.price)}
                  </div>
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-10 h-10 rounded-full bg-[var(--bg-card)] flex items-center justify-center hover:bg-[var(--gold-400)] hover:text-black transition-colors"
                    aria-label="Add to Bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
