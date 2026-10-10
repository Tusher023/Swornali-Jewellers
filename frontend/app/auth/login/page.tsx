'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '../../../components/store-provider';
import { Eye, EyeOff } from 'lucide-react';
import { AuthJewelleryShowcase } from '../../../components/auth-jewellery-showcase';

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
      <AuthJewelleryShowcase pieceType="necklace" />

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
