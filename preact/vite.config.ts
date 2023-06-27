import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { loadMdx, postcss } from './src/vite-plugins'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    postcss(), 
    loadMdx({
      blog: { layout: 'BlogPostLayout' },
      projects: { layout: 'ProjectPostLayout' },
    }),
    preact(),
  ],
})
