/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bubble: ['Fredoka', 'Nunito', 'Poppins', 'sans-serif'],
        display: ['Fredoka', 'Poppins', 'sans-serif'],
        sans: ['Nunito', 'Poppins', 'sans-serif'],
      },
      colors: {
        flavor: {
          vanilla: {
            bg: '#459ab8',
            outer: '#67c1e4',
            dark: '#28586c',
            sub: '#bee5f5',
            accent: '#ffe89c',
          },
          cookies: {
            bg: '#9c5c47',
            outer: '#da866c',
            dark: '#5c3427',
            sub: '#f0c8bc',
            accent: '#e6977e',
          },
          mint: {
            bg: '#4ea162',
            outer: '#74d68b',
            dark: '#2b663a',
            sub: '#c6f2cf',
            accent: '#98ebb0',
          },
          strawberry: {
            bg: '#cc4663',
            outer: '#f588a0',
            dark: '#7c1f34',
            sub: '#fed1dc',
            accent: '#ff94aa',
          }
        },
        cream: {
          wave: '#FFF5D6',
          light: '#FEF9E7',
          button: '#FAEED1',
        }
      },
      animation: {
        'float-slow': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 1.5s ease-in-out infinite',
        'ping-soft': 'pingSoft 1s ease-in-out infinite',
        'marquee': 'marquee 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%': { transform: 'translateX(-50%) translateY(-6px)' },
        },
        pingSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.7' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
      }
    },
  },
  plugins: [],
}
