const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*',
  ],
  theme: {
    extend: {
      fontFamily: {
        round: ['Readex', ...fontFamily.sans],
      },
      colors: { accent: colors.blue },
    },
  },
  plugins: [],
}
