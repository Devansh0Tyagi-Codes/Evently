/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          'blue-dark': '#1D4ED8',
          'purple-dark': '#6D28D9',
        },
        dark: {
          900: '#07080F',
          800: '#0D0F1C',
          700: '#111827',
          600: '#1A1F2E',
          500: '#242938',
          400: '#2E3447',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        'gradient-dark': 'linear-gradient(180deg, #07080F 0%, #0D0F1C 100%)',
        'gradient-card': 'linear-gradient(145deg, #111827 0%, #0D0F1C 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
