/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fcc: {
          dark: '#070a0f',
          surface: '#0d131f',
          card: '#131b2c',
          cardHover: '#182238',
          border: 'rgba(255, 255, 255, 0.08)',
          fire: '#ff5722',
          orange: '#f97316',
          amber: '#f59e0b',
          gold: '#fbbf24',
          emerald: '#10b981',
          crimson: '#ef4444',
          cyan: '#06b6d4',
          muted: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Teko', 'Rajdhani', 'Oswald', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'glow-fire': '0 0 25px -5px rgba(249, 115, 22, 0.4)',
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'fire-gradient': 'linear-gradient(135deg, #ff5722 0%, #f97316 50%, #f59e0b 100%)',
        'hero-gradient': 'linear-gradient(to bottom, rgba(7,10,15,0.7) 0%, rgba(7,10,15,0.95) 80%, #070a0f 100%)',
      }
    },
  },
  plugins: [],
}
