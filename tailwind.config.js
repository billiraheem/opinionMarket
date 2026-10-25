export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#0052FF',
          600: '#0047E0',
          700: '#003BBF',
          800: '#00309C',
          900: '#002275',
          glow: 'rgba(0, 82, 255, 0.25)',
        },
        market: {
          yes: '#00C076',
          'yes-tint': 'rgba(0, 192, 118, 0.12)',
          'yes-border': 'rgba(0, 192, 118, 0.3)',
          no: '#F43F5E',
          'no-tint': 'rgba(244, 63, 94, 0.12)',
          'no-border': 'rgba(244, 63, 94, 0.3)',
          gold: '#F59E0B',
          teal: '#14B8A6',
          indigo: '#6366F1',
          coral: '#FB7185',
          lime: '#84CC16',
        },
        dark: {
          bg: '#000000',
          card: '#0E0E0E',
          surface: '#141414',
          'card-hover': '#1B1B1B',
          border: '#222222',
          'border-subtle': '#181818',
          muted: '#8E8E93',
          subtle: '#5A5A5A',
        },
        light: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          'card-hover': '#F1F5F9',
          border: '#E2E8F0',
          muted: '#64748B',
          subtle: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'card-light': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover-light': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'card-dark': '0 1px 3px 0 rgba(0, 0, 0, 0.5)',
        'card-hover-dark': '0 12px 28px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0, 82, 255, 0.3)',
        'glow-brand': '0 0 20px rgba(0, 82, 255, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
