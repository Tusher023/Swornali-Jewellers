'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '../../../components/store-provider';
import { Eye, EyeOff } from 'lucide-react';
import { AuthJewelleryShowcase } from '../../../components/auth-jewellery-showcase';

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
      <AuthJewelleryShowcase pieceType="ring" />

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
