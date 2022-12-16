/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background':'#131313',
        'primary':'#1565FF',
        'secondary':'#494949',
        'white':'#FFFFFF'
      }
    },
  },
  plugins: [],
}