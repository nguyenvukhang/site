import { rmSync, writeFileSync } from 'fs'
import { loadMdx } from './loadMdx'

function postcss() {
  const config = 'export default{plugins:{tailwindcss:{},autoprefixer:{}}}'
  return {
    name: 'tailwind',
    buildStart: () => writeFileSync('postcss.config.js', config),
    buildEnd: () => rmSync('postcss.config.js', { force: true }),
  }
}

export { loadMdx, postcss }
