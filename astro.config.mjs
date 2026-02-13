import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import solid from '@astrojs/solid-js'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'

const ARTICLES_CONTENT_DIR = 'content/articles'

function mdxDatePlugin() {
  return function (_, file) {
    /** @param {Date} d */
    const valid = (d) => d instanceof Date && !isNaN(d)

    /** @type string */
    const path = file.path

    if (path.includes(ARTICLES_CONTENT_DIR)) {
      const filenameDate = new Date(file.stem.split('-').slice(0, 3).join('-'))
      const metaDate = new Date(
        Date.parse(`${file.data.astro.frontmatter.pubDate} 00:00:00 GMT`),
      )
      if (!valid(filenameDate)) {
        throw new Error(`Bad date on article: ${file.path}`)
      } else if (!valid(metaDate)) {
        throw new Error(`Bad date in article frontmatter: ${file.path}`)
      } else if (filenameDate.getTime() !== metaDate.getTime()) {
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
  integrations: [solid(), mdx(), icon()],
})
