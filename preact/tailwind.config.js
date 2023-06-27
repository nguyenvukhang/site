const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        round: ['Readex', ...fontFamily.sans],
      },
      colors: {
        accent: colors.rose,
        fg: colors.slate[800],
        'fg-dim': colors.slate[500],
        bg: colors.white,
        'bg-dim': colors.slate[200],
      },
    },
  },
  plugins: [],
}
