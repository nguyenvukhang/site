import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import solid from '@astrojs/solid-js'
import tailwindcss from '@tailwindcss/vite'

const ARTICLES_CONTENT_DIR = 'content/articles'

function mdxDatePlugin() {
  return function (_, file) {
    /** @type string */
    if (file.path.includes(ARTICLES_CONTENT_DIR)) {
      const filenameDate = file.stem.split('-').slice(0, 3).join('-')
      const metaDate = file.data.astro.frontmatter.pubDate
      if (filenameDate !== metaDate) {
        throw new Error(`Filename doesn't match frontmatter date: ${file.path}`)
      }
    }
  }
}

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
  },
  markdown: {
    remarkPlugins: [mdxDatePlugin],
    shikiConfig: { theme: 'github-light' },
  },
  vite: {
    plugins: [
      tailwindcss({
        config: { applyAstroPreset: false, applyBaseStyles: true },
      }),
    ],
  },
  site: 'https://example.com',
  integrations: [solid(), mdx()],
})
