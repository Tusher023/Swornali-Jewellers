import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        gold: {
          50: '#fdf8ef',
          100: '#f5e6c8',
          200: '#e8d0a0',
          300: '#d4b778',
          400: '#c9a96e',
          500: '#b59a65',
          600: '#a08550',
          700: '#8b7535',
          800: '#6b5a2a',
          900: '#4a3e1e',
        },
        champagne: '#c9a96e',
        ivory: '#f5f0e8',
        surface: {
          DEFAULT: '#111111',
          card: '#141414',
          elevated: '#1a1a1a',
          hover: '#1e1e1e',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeInUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeInDown: { from: { opacity: '0', transform: 'translateY(-16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.9)' }, to: { opacity: '1', transform: 'scale(1)' } },
        pulseGold: { '0%, 100%': { boxShadow: '0 0 0 0 rgba(181,154,101,0.4)' }, '50%': { boxShadow: '0 0 0 8px rgba(181,154,101,0)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #b59a65, #8b7535)',
        'gold-shine': 'linear-gradient(135deg, #c9a96e, #b59a65, #d4b778)',
      },
    },
  },
  plugins: [],
} satisfies Config;
