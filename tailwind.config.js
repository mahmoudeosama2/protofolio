/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FD6F00',
        secondary: '#FD6F00',
        dark: {
          100: '#1a1a1a',
          200: '#161616',
          300: '#111111',
          400: '#0a0a0a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
