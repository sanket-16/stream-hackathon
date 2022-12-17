/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      serif: ['Segoe UI', 'Roboto', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
    },
      colors: {
        'background':'#343434',
        'primary':'#3861FB',
        'secondary':'#494949',
        'white':'#FFFFFF'
      }
    },
  },
  plugins: [],
}