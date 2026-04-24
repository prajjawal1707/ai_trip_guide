/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        background: 'var(--color-background)', /* stone-50 / gray-950 */
        foreground: 'var(--color-foreground)', /* gray-900 / stone-50 */
        primary: {
          DEFAULT: 'var(--color-primary)', /* green-800 / green-700 */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* brown-700 / brown-600 */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* orange-500 / coral */
          foreground: 'var(--color-accent-foreground)', /* white / black */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-600 / red-500 */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* emerald-600 / emerald-500 */
          foreground: 'var(--color-success-foreground)', /* white / black */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-600 / amber-500 */
          foreground: 'var(--color-warning-foreground)', /* white / black */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-600 / red-500 */
          foreground: 'var(--color-error-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* stone-100 / gray-800 */
          foreground: 'var(--color-muted-foreground)', /* gray-500 / gray-400 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* white / gray-900 */
          foreground: 'var(--color-card-foreground)', /* gray-900 / stone-50 */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* white / gray-900 */
          foreground: 'var(--color-popover-foreground)', /* gray-900 / stone-50 */
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Source Sans 3', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'elevated': '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '300': '300ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'slide-in-right': 'slideInRight 300ms ease-out',
        'fade-in-up': 'fadeInUp 300ms ease-out',
        'pulse-location': 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}