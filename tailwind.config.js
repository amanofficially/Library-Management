/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", 'Georgia', 'serif'],
        sans: ["'DM Sans'", 'system-ui', 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      colors: {
        ink: {
          50:  '#f0f2f5',
          100: '#d9dee8',
          200: '#b2bdcf',
          300: '#8a9bb6',
          400: '#637a9c',
          500: '#3c5983',
          600: '#2e4569',
          700: '#1f3150',
          800: '#111e36',
          900: '#080e1b',
        },
        gold: {
          50:  '#fdf8ee',
          100: '#faefd0',
          200: '#f5d98a',
          300: '#f0c347',
          400: '#e6a817',
          500: '#c98b0b',
          600: '#a36d08',
          700: '#7c5006',
          800: '#553504',
          900: '#2e1b02',
        },
        emerald: {
          50:  '#edfaf4',
          100: '#c6f0db',
          200: '#8de0b8',
          300: '#4dcc93',
          400: '#1db372',
          500: '#0f9058',
          600: '#096d42',
          700: '#054d2e',
          800: '#02301c',
          900: '#01180d',
        },
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease both',
        'slide-up':   'slideUp 0.4s ease both',
        'slide-in':   'slideIn 0.3s ease both',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp:   { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideIn:   { from: { opacity: 0, transform: 'translateX(-12px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        pulseSoft: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.6 } },
      },
      boxShadow: {
        'card':   '0 1px 3px rgba(8,14,27,0.08), 0 4px 16px rgba(8,14,27,0.06)',
        'card-hover': '0 4px 12px rgba(8,14,27,0.12), 0 12px 32px rgba(8,14,27,0.1)',
        'glow':   '0 0 0 3px rgba(201,139,11,0.2)',
      },
    },
  },
  plugins: [],
}
