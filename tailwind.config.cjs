const colors = require('tailwindcss/colors')

const WHITE = '#FFFFFF'
const ACCENT = '#4A79EE'
const MAIN = '#000000'

function midpoint(x, y) {
  const hex = (x) => {
    x = Math.round(x).toString(16)
    return x.length == 1 ? '0' + x : x
  }
  const R = (x) => parseInt(x.substring(1, 3), 16)
  const G = (x) => parseInt(x.substring(3, 5), 16)
  const B = (x) => parseInt(x.substring(5, 7), 16)
  const m = (C) => hex((C(x) + C(y)) / 2)
  return `#${m(R)}${m(G)}${m(B)}`
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    colors: {
      fg0: MAIN,
      fg1: midpoint(MAIN, WHITE),
      ac0: ACCENT,
      ac1: midpoint(ACCENT, WHITE),
      selection: colors.amber[200],
      neutral: colors.neutral,
    },
  },
  plugins: [],
  corePlugins: { preflight: false },
}
