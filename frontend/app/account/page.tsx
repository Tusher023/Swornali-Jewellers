'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '../../components/store-provider';
import { formatPrice } from '../../lib/products';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, 
  User, 
  MapPin, 
  ShoppingBag, 
  Heart, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Trash2, 
  Star,
  Settings
} from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, orders, addresses, addAddress, removeAddress, setDefaultAddress, wishlist } = useStore();
  const [mounted, setMounted] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'Bangladesh'
  });

  useEffect(() => {
    setMounted(true);
    if (!user && mounted) {
      router.push('/auth/login');
    }
  }, [user, mounted, router]);

  if (!mounted) return null;

  if (!user) {
    return (
      <div className="section min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display text-[var(--text-primary)] mb-4">Please log in</h1>
          <p className="text-[var(--text-secondary)] mb-8">You need to be logged in to view your account.</p>
          <Link href="/auth/login" className="btn btn-primary inline-flex">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      id: Math.random().toString(36).substr(2, 9),
      ...newAddress,
      isDefault: addresses.length === 0
    });
    setIsAddingAddress(false);
    setNewAddress({ name: '', street: '', city: '', state: '', zip: '', country: 'Bangladesh' });
  };

  return (
    <div className="section pb-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-display text-[var(--text-primary)] mb-2">
              Welcome, {user.firstName}
            </h1>
            <p className="text-[var(--text-secondary)]">Manage your account and orders</p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary flex items-center gap-2 self-start md:self-auto">
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--gold-400)]">
                <User size={20} />
              </div>
              <h3 className="text-lg font-display text-[var(--text-primary)]">Profile</h3>
            </div>
            <div className="space-y-2 text-[var(--text-secondary)]">
              <p>{user.firstName} {user.lastName}</p>
              <p>{user.email}</p>
              <p>+880 1234 567890</p>
            </div>
            <button className="text-[var(--gold-400)] mt-4 text-sm font-medium hover:text-[var(--gold-500)] transition-colors flex items-center gap-1">
              <Settings size={14} /> Edit Profile
            </button>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--gold-400)]">
                  <ShoppingBag size={20} />
                </div>
                <h3 className="text-lg font-display text-[var(--text-primary)]">Recent Orders</h3>
              </div>
              <span className="text-2xl font-light text-[var(--text-primary)]">{orders.length}</span>
            </div>
            <div className="space-y-3">
              {orders.slice(0, 2).map(order => (
                <div key={order.id} className="flex justify-between items-center text-sm">
                  <span className="text-[var(--text-secondary)]">Order #{order.id.slice(0, 6)}</span>
                  <span className={`status status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              ))}
              {orders.length === 0 && (
                <p className="text-[var(--text-muted)] text-sm">No recent orders</p>
              )}
            </div>
          </div>

          <div className="card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--gold-400)]">
                    <Heart size={20} />
                  </div>
                  <h3 className="text-lg font-display text-[var(--text-primary)]">Wishlist</h3>
                </div>
                <span className="text-2xl font-light text-[var(--text-primary)]">{wishlist.length}</span>
              </div>
              <p className="text-[var(--text-secondary)] text-sm mb-4">
                You have {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later.
              </p>
            </div>
            <Link href="/wishlist" className="text-[var(--gold-400)] text-sm font-medium hover:text-[var(--gold-500)] transition-colors">
              View Wishlist &rarr;
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Order History */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-display text-[var(--text-primary)] border-b border-[var(--border-color)] pb-4">
              Order History
            </h2>
            
            {orders.length === 0 ? (
              <div className="empty-state py-12">
                <ShoppingBag size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
                <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No orders yet</h3>
                <p className="text-[var(--text-secondary)] mb-6">When you place an order, it will appear here.</p>
                <Link href="/shop" className="btn btn-primary">Start Shopping</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="card overflow-hidden">
                    <div 
                      className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors"
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    >
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium text-[var(--text-primary)]">Order #{order.id}</span>
                          <span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)]">{new Date(order.date).toLocaleDateString()} • {order.items.length} items</p>
                      </div>
                      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <span className="font-medium text-[var(--gold-400)]">{formatPrice(order.total)}</span>
                        {expandedOrder === order.id ? <ChevronUp size={20} className="text-[var(--text-muted)]" /> : <ChevronDown size={20} className="text-[var(--text-muted)]" />}
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedOrder === order.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden"
                        >
                          <div className="p-6 space-y-4">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-[var(--bg-primary)] rounded overflow-hidden relative">
                                    {/* Using empty div as placeholder for image to save imports */}
                                    <div className="absolute inset-0 bg-[var(--bg-card)]"></div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-[var(--text-primary)]">{item.product.name}</p>
                                    <p className="text-xs text-[var(--text-muted)]">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                                <span className="text-sm text-[var(--text-secondary)]">{formatPrice(item.product.price)}</span>
                              </div>
                            ))}
                            <div className="border-t border-[var(--border-color)] pt-4 mt-4 flex justify-between">
                              <span className="font-medium text-[var(--text-primary)]">Total</span>
                              <span className="font-medium text-[var(--gold-400)]">{formatPrice(order.total)}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Addresses */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-4">
              <h2 className="text-2xl font-display text-[var(--text-primary)]">
                Addresses
              </h2>
              <button 
                onClick={() => setIsAddingAddress(!isAddingAddress)}
                className="text-[var(--gold-400)] hover:text-[var(--gold-500)] p-2 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>

            <AnimatePresence>
              {isAddingAddress && (
                <motion.form
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleAddAddress}
                  className="card p-6 space-y-4"
                >
                  <h3 className="font-medium text-[var(--text-primary)] mb-4">Add New Address</h3>
                  <div className="space-y-3">
                    <div className="form-group">
                      <input required type="text" placeholder="Full Name" className="form-input" value={newAddress.name} onChange={e => setNewAddress({...newAddress, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <input required type="text" placeholder="Street Address" className="form-input" value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="form-group">
                        <input required type="text" placeholder="City" className="form-input" value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <input required type="text" placeholder="State/Division" className="form-input" value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="form-group">
                        <input required type="text" placeholder="ZIP Code" className="form-input" value={newAddress.zip} onChange={e => setNewAddress({...newAddress, zip: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <input required type="text" placeholder="Country" className="form-input" value={newAddress.country} onChange={e => setNewAddress({...newAddress, country: e.target.value})} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="btn btn-primary flex-1 text-sm py-2">Save</button>
                    <button type="button" onClick={() => setIsAddingAddress(false)} className="btn btn-secondary flex-1 text-sm py-2">Cancel</button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {addresses.length === 0 && !isAddingAddress ? (
                <div className="text-center py-8 text-[var(--text-muted)] border border-dashed border-[var(--border-color)] rounded-lg">
                  <MapPin size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No addresses saved</p>
                </div>
              ) : (
                addresses.map(address => (
                  <div key={address.id} className={`card p-5 relative border ${address.isDefault ? 'border-[var(--gold-400)]/50' : 'border-transparent'}`}>
                    {address.isDefault && (
                      <span className="absolute top-0 right-0 bg-[var(--gold-400)] text-[var(--bg-primary)] text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                        DEFAULT
                      </span>
                    )}
                    <h4 className="font-medium text-[var(--text-primary)] mb-2">{address.name}</h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                      {address.street}<br />
                      {address.city}, {address.state} {address.zip}<br />
                      {address.country}
                    </p>
                    <div className="flex gap-3 border-t border-[var(--border-color)] pt-3 mt-3">
                      {!address.isDefault && (
                        <button 
                          onClick={() => setDefaultAddress(address.id)}
                          className="text-xs font-medium text-[var(--text-primary)] hover:text-[var(--gold-400)] transition-colors flex items-center gap-1"
                        >
                          <Star size={14} /> Set Default
                        </button>
                      )}
                      <button 
                        onClick={() => removeAddress(address.id)}
                        className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 ml-auto"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
