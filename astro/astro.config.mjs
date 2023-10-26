import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import solid from '@astrojs/solid-js'
import tailwind from '@astrojs/tailwind'

const BLOG_CONTENT_DIR = 'content/blog'

function mdxDatePlugin() {
  return function (_, file) {
    /** @param {Date} d */
    const valid = (d) => d instanceof Date && !isNaN(d)

    if (file.path.includes(BLOG_CONTENT_DIR)) {
      const filenameDate = new Date(file.stem.split('-').slice(0, 3).join('-'))
      const metaDate = new Date(
        Date.parse(`${file.data.astro.frontmatter.pubDate} 00:00:00 GMT`),
      )
      if (!valid(filenameDate)) {
        throw new Error(`Bad date on blog file: ${file.path}`)
      } else if (!valid(metaDate)) {
        throw new Error(`Bad date in blog frontmatter: ${file.path}`)
      } else if (filenameDate.getTime() !== metaDate.getTime()) {
        throw new Error(`Filename doesn't match frontmatter date: ${file.path}`)
      }
    }
  }
}

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [mdxDatePlugin],
    shikiConfig: {
      theme: 'github-light',
    },
  },
  site: 'https://example.com',
  integrations: [
    solid(),
    mdx(),
    tailwind({
      config: { applyAstroPreset: false, applyBaseStyles: true },
    }),
  ],
})
