/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Netflix colors
        'netflix-black': '#141414',
        'netflix-red': '#e50914',
        'netflix-dark-gray': '#2f2f2f',
        'netflix-gray': '#808080',
        'netflix-light-gray': '#b3b3b3',
        
        // German Shepherd coat colors
        shepherd: {
          black: '#1A1A1A',
          tan: '#C4A484',
          brown: '#8B4513',
          beige: '#D2B48C',
        },
        primary: {
          50: '#f8f6f3',
          100: '#ede8e0',
          200: '#ddd2c1',
          300: '#c4a484',
          400: '#b8956f',
          500: '#a0825a',
          600: '#8b4513',
          700: '#6d3410',
          800: '#4a240b',
          900: '#1a1a1a',
        },
        accent: {
          50: '#faf9f7',
          100: '#f2f0eb',
          200: '#e6e1d7',
          300: '#d2b48c',
          400: '#c4a484',
          500: '#b8956f',
          600: '#a0825a',
          700: '#8b4513',
          800: '#6d3410',
          900: '#4a240b',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        netflix: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'tree-fade': 'treeFade 0.8s ease-out',
        'slideshow': 'slideshow 0.8s ease-in-out',
        'netflix-scale': 'netflixScale 0.3s ease-out',
        'netflix-fade': 'netflixFade 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(196, 164, 132, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(196, 164, 132, 0.8), 0 0 30px rgba(196, 164, 132, 0.6)' },
        },
        treeFade: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideshow: {
          '0%': { opacity: '0', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        netflixScale: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.4)' },
        },
        netflixFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      aspectRatio: {
        '16/9': '16 / 9',
      },
    },
  },
  plugins: [],
};