/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lightBg: '#ffffff',
        darkBg: '#273444',
        lightTextColor: '#000000',
        darkTextColor: '#ffffff'
      }
    },
  },
  plugins: [],
}

