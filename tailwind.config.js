/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#F97316',
          light:   '#FED7AA',
          dark:    '#EA6C00',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted:   '#F8F8F7',
          subtle:  '#FAFAF9',
        },
        ink: {
          DEFAULT: '#111111',
          secondary: '#666666',
          muted:     '#888888',
          faint:     '#BBBBBB',
        },
        border: {
          DEFAULT: '#E5E5E5',
          strong:  '#CCCCCC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:         '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 24px -4px rgba(0,0,0,0.10), 0 2px 8px -2px rgba(0,0,0,0.06)',
        input:        '0 1px 2px 0 rgba(0,0,0,0.04)',
        navbar:       '0 1px 0 0 #E5E5E5',
      },
      transitionDuration: {
        '400': '400ms',
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease-out both',
        'slide-up':   'slideUp 0.35s ease-out both',
        'page-enter': 'pageEnter 0.3s ease-out both',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pageEnter: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
