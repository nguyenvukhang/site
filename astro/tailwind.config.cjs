const colors = require('tailwindcss/colors')
const dt = require('tailwindcss/defaultConfig')
const df = dt.theme.fontSize

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xs: df.sm,
        sm: df.base,
        base: df.lg,
        lg: df.xl,
        xl: df['2xl'],
        '2xl': df['3xl'],
        '3xl': df['4xl'],
        '4xl': df['5xl'],
        '5xl': df['6xl'],
        '6xl': df['7xl'],
        '7xl': df['8xl'],
        '8xl': df['9xl'],
      },
      colors: {
        accent: colors.indigo,
        fg: colors.slate[800],
        'fg-dim': colors.slate[500],
      },
    },
  },
  plugins: [],
  corePlugins: { preflight: false },
}
