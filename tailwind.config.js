/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        market: {
          bg: '#F0F7FF',
          orange: '#0066FF',
          pink: '#0052CC',
          yellow: '#38BDF8',
          cyan: '#00D4FF',
          lime: '#60A5FA',
          purple: '#1E40AF',
        }
      },
      boxShadow: {
        'market': '0 10px 25px -5px rgba(0, 102, 255, 0.15), 0 8px 10px -6px rgba(0, 102, 255, 0.1)',
        'market-hover': '0 20px 25px -5px rgba(0, 82, 204, 0.25), 0 8px 10px -6px rgba(0, 82, 204, 0.1)',
      }
    },
  },
  plugins: [],
}