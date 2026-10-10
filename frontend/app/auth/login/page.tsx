'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '../../../components/store-provider';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      login(email, password);
      router.push('/account');
    }, 800);
  };

  return (
    <div className="auth-split min-h-screen flex">
      {/* Left side - Luxury Animated Floating Jewellery Showcase */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0a0a0a] items-center justify-center overflow-hidden border-r border-[#1f1f1f]">
        {/* Radial gold ambient glow */}
        <div className="absolute w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        {/* Concentric rotating filigree rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[360px] h-[360px] rounded-full border border-[rgba(201,169,110,0.2)] border-dashed animate-[spin_60s_linear_infinite]" />
          <div className="w-[260px] h-[260px] rounded-full border border-[rgba(201,169,110,0.25)] animate-[spin_40s_linear_infinite_reverse]" />
        </div>

        {/* Floating Royal Jewellery Centerpiece */}
        <div className="relative z-10 flex flex-col items-center text-center p-8">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-6 animate-[bounce_6s_ease-in-out_infinite]">
            <img
              src="/images/royal-necklace.jpg"
              alt="Swornali Jewellers 22K Royal Bridal Necklace"
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.src.includes('Swornali-Jewellers')) {
                  img.src = '/Swornali-Jewellers/images/royal-necklace.jpg';
                }
              }}
              className="w-full h-full object-cover rounded-full border-2 border-[rgba(201,169,110,0.4)] shadow-[0_15px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(201,169,110,0.3)] filter brightness-105"
            />
            {/* Sparkles */}
            <span className="absolute -top-3 -right-2 text-2xl text-[#c9a96e] animate-pulse">✦</span>
            <span className="absolute -bottom-2 -left-2 text-xl text-[#f5d77f] animate-pulse">✧</span>
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-[#141414] border border-[#c9a96e]/30 text-xs text-[#c9a96e] tracking-widest font-semibold uppercase mb-2">
            স্বর্ণালী জুয়েলার্স · ১০০% হলমার্ক বিশুদ্ধতা
          </div>
          <h2 className="text-2xl font-display font-bold text-white tracking-wide">
            Royal Atelier Heritage
          </h2>
          <p className="text-xs text-[#888] max-w-xs mt-1">
            Exquisite 22K Guinea Gold & Certified Natural Diamond Jewellery crafted by master artisans.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[var(--bg-primary)]">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block text-2xl font-display text-[var(--gold-400)] mb-8 tracking-wider">
              SWORNALI
            </Link>
            <h1 className="text-3xl font-display text-[var(--text-primary)] mb-3">Welcome Back</h1>
            <p className="text-[var(--text-secondary)]">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                required
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <div className="flex justify-between items-center mb-1">
                <label className="form-label mb-0" htmlFor="password">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-[var(--gold-400)] hover:text-[var(--gold-500)]">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="form-input pr-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 rounded border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--gold-400)] focus:ring-[var(--gold-400)]" 
              />
              <label htmlFor="remember" className="text-sm text-[var(--text-secondary)]">Remember me</label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full py-3"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-8 text-[var(--text-secondary)] text-sm">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-[var(--gold-400)] hover:text-[var(--gold-500)] font-medium transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
