const colors = require('tailwindcss/colors')

const WHITE = '#FFFFFF'
const ACCENT = '#4A79EE'
const MAIN = '#000000'

function midpoint(x, y, r = 0.5) {
  const hex = (x) => {
    x = Math.round(x).toString(16)
    return x.length == 1 ? '0' + x : x
  }
  const R = (x) => parseInt(x.substring(1, 3), 16)
  const G = (x) => parseInt(x.substring(3, 5), 16)
  const B = (x) => parseInt(x.substring(5, 7), 16)
  const m = (C) => hex((C(x) * r + C(y)) * (1.0 - r))
  return `#${m(R)}${m(G)}${m(B)}`
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      fg0: MAIN,
      fg1: midpoint(MAIN, WHITE, 0.5),
      fg2: midpoint(MAIN, WHITE, 0.2),
      fg3: midpoint(MAIN, WHITE, 0.075),
      ac0: ACCENT,
      ac1: midpoint(ACCENT, WHITE, 0.5),
      ac2: midpoint(ACCENT, WHITE, 0.2),
      ac3: midpoint(ACCENT, WHITE, 0.075),
      selection: colors.amber[200],
      neutral: colors.neutral,
    },
  },
  corePlugins: { preflight: false },
}
