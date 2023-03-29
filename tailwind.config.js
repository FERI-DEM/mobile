/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-main": "#1C1B2D",
        "dark-element": "#292A3E",
        "tint": '#236BFE',
        "light-main": "#f5f5f5",
        "light-element": "#ffffff",
        "warning": "#FEC601",
      }
    },
  },
  plugins: [],
}
