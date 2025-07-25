/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gov-blue': '#00008B',
        'gov-orange': '#FF6B00',
      },
    },
  },
  plugins: [],
} 