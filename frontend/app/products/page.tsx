'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useStore } from '../../components/store-provider'
import { products, categories, searchProducts, sortProducts, formatPrice, materials, stones, type Product } from '../../lib/products'

function ProductsContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const initialCategory = searchParams.get('category') || ''

  const { wishlist, toggleWishlist } = useStore()
  
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [activePriceRange, setActivePriceRange] = useState('')
  const [activeMaterial, setActiveMaterial] = useState('')
  const [activeStone, setActiveStone] = useState('')
  const [sortBy, setSortBy] = useState('Newest')
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  useEffect(() => {
    let result = products

    if (q) {
      result = searchProducts(q)
    }

    if (activeCategory) {
      result = result.filter(p => p.category === activeCategory)
    }

    if (activePriceRange) {
      if (activePriceRange === 'under50k') {
        result = result.filter(p => p.price < 50000)
      } else if (activePriceRange === '50k-1L') {
        result = result.filter(p => p.price >= 50000 && p.price <= 100000)
      } else if (activePriceRange === 'over1L') {
        result = result.filter(p => p.price > 100000)
      }
    }

    if (activeMaterial) {
      result = result.filter(p => p.material === activeMaterial)
    }

    if (activeStone) {
      result = result.filter(p => p.stone === activeStone)
    }

    result = sortProducts(result, sortBy)
    
    setFilteredProducts(result)
  }, [q, activeCategory, activePriceRange, activeMaterial, activeStone, sortBy])

  return (
    <div className="section min-h-screen">
      <div className="container mx-auto px-4">
        <div className="page-header text-center mb-12">
          <h1 className="section-title text-4xl mb-4 font-display text-[var(--text-primary)]">Our Collection</h1>
          <p className="section-subtitle text-[var(--text-secondary)]">Discover our exquisite range of fine jewelry</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 flex flex-col gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-[var(--text-primary)]">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`tag ${!activeCategory ? 'bg-[var(--gold-500)] text-white border-[var(--gold-500)]' : 'border-[#333] hover:border-[#666] text-[var(--text-secondary)]'}`}
                  onClick={() => setActiveCategory('')}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.name}
                    className={`tag ${activeCategory === cat.name ? 'bg-[var(--gold-500)] text-white border-[var(--gold-500)]' : 'border-[#333] hover:border-[#666] text-[var(--text-secondary)]'}`}
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 text-[var(--text-primary)]">Price</h3>
              <div className="flex flex-col gap-2">
                <button 
                  className={`text-left px-3 py-2 rounded-md transition-colors ${activePriceRange === 'under50k' ? 'bg-[var(--bg-secondary)] text-[var(--gold-400)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'}`}
                  onClick={() => setActivePriceRange(prev => prev === 'under50k' ? '' : 'under50k')}
                >
                  Under ৳50K
                </button>
                <button 
                  className={`text-left px-3 py-2 rounded-md transition-colors ${activePriceRange === '50k-1L' ? 'bg-[var(--bg-secondary)] text-[var(--gold-400)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'}`}
                  onClick={() => setActivePriceRange(prev => prev === '50k-1L' ? '' : '50k-1L')}
                >
                  ৳50K - ৳1L
                </button>
                <button 
                  className={`text-left px-3 py-2 rounded-md transition-colors ${activePriceRange === 'over1L' ? 'bg-[var(--bg-secondary)] text-[var(--gold-400)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'}`}
                  onClick={() => setActivePriceRange(prev => prev === 'over1L' ? '' : 'over1L')}
                >
                  Over ৳1L
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 text-[var(--text-primary)]">Material</h3>
              <select 
                className="form-input w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[#333]"
                value={activeMaterial}
                onChange={e => setActiveMaterial(e.target.value)}
              >
                <option value="">All Materials</option>
                {materials.map(mat => (
                  <option key={mat} value={mat}>{mat}</option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 text-[var(--text-primary)]">Stone</h3>
              <select 
                className="form-input w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[#333]"
                value={activeStone}
                onChange={e => setActiveStone(e.target.value)}
              >
                <option value="">All Stones</option>
                {stones.map(stone => (
                  <option key={stone} value={stone}>{stone}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <p className="text-[var(--text-secondary)]">{filteredProducts.length} Products Found</p>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-secondary)]">Sort by:</span>
                <select 
                  className="form-input !py-1 !px-2 w-auto bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[#333]"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value="Newest">Newest</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Highest Rated">Highest Rated</option>
                  <option value="Name">Name</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="empty-state text-center py-16 bg-[var(--bg-secondary)] rounded-lg">
                <p className="text-[var(--text-muted)] text-lg mb-4">No products found matching your criteria.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setActiveCategory('')
                    setActivePriceRange('')
                    setActiveMaterial('')
                    setActiveStone('')
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <motion.div 
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="product-card group relative flex flex-col bg-[var(--bg-card)] rounded-lg overflow-hidden border border-[#222]"
                  >
                    <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] overflow-hidden block">
                      <Image 
                        src={product.image || 'https://images.unsplash.com/photo-1599643478524-fb66f70a00bf?w=800&q=80'}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-[var(--gold-500)] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          {product.badge}
                        </div>
                      )}
                    </Link>
                    <button 
                      className="absolute top-3 right-3 p-2 rounded-full bg-[var(--bg-primary)]/80 hover:bg-[var(--gold-500)] text-[var(--text-primary)] hover:text-white transition-colors z-10"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleWishlist(product.id)
                      }}
                    >
                      <Heart 
                        size={18} 
                        className={wishlist.includes(product.id) ? "fill-[var(--gold-500)] text-[var(--gold-500)] hover:text-white hover:fill-white" : ""} 
                      />
                    </button>
                    
                    <div className="p-4 flex flex-col flex-grow">
                      <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1">{product.category}</span>
                      <Link href={`/products/${product.slug}`} className="hover:text-[var(--gold-400)] transition-colors">
                        <h3 className="font-semibold text-base text-[var(--text-primary)] mb-2 line-clamp-1">{product.name}</h3>
                      </Link>
                      <div className="mt-auto flex items-center gap-2">
                        <span className="font-bold text-[var(--gold-400)]">{formatPrice(product.price)}</span>
                        {product.compareAtPrice && (
                          <span className="text-[var(--text-muted)] text-sm line-through">{formatPrice(product.compareAtPrice)}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[var(--text-secondary)]">Loading collection...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
