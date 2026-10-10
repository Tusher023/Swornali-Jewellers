'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '../../../components/store-provider';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length > 5) strength += 1;
    if (pass.length > 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    return Math.min(strength, 3);
  };

  const strength = calculatePasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      register(formData.firstName, formData.lastName, formData.email, formData.password);
      router.push('/account');
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
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

        {/* Floating Royal Ring Showcase */}
        <div className="relative z-10 flex flex-col items-center text-center p-8">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-6 animate-[bounce_6s_ease-in-out_infinite]">
            <img
              src="/images/royal-ring.jpg"
              alt="Swornali Jewellers 22K Royal Solitaire Ring"
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.src.includes('Swornali-Jewellers')) {
                  img.src = '/Swornali-Jewellers/images/royal-ring.jpg';
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
            Create VIP Account
          </h2>
          <p className="text-xs text-[#888] max-w-xs mt-1">
            Join the Swornali Prestige Circle for exclusive heirloom releases, member discounts, and priority bespoke craft orders.
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
            <h1 className="text-3xl font-display text-[var(--text-primary)] mb-3">Create Account</h1>
            <p className="text-[var(--text-secondary)]">Join the Swornali family</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  required
                  className="form-input"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  required
                  className="form-input"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                required
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="relative mb-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="form-input pr-10"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2 flex gap-1 h-1.5">
                  <div className={`flex-1 rounded-full ${strength >= 1 ? 'bg-red-500' : 'bg-[var(--bg-secondary)]'}`}></div>
                  <div className={`flex-1 rounded-full ${strength >= 2 ? 'bg-yellow-500' : 'bg-[var(--bg-secondary)]'}`}></div>
                  <div className={`flex-1 rounded-full ${strength >= 3 ? 'bg-green-500' : 'bg-[var(--bg-secondary)]'}`}></div>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full py-3 mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-8 text-[var(--text-secondary)] text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[var(--gold-400)] hover:text-[var(--gold-500)] font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
