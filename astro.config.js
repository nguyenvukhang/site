import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import solid from "@astrojs/solid-js"
import tailwindcss from "@tailwindcss/vite"
import githubLight from "./src/styles/github-light.json"
// import githubLight from "./src/styles/gruvbox-dark-hard.json"

const ARTICLES_CONTENT_DIR = "content/articles"

function mdxCheckFilenameDate() {
  return function (_, file) {
    /** @type string */
    if (file.path.includes(ARTICLES_CONTENT_DIR)) {
      const filenameDate = file.stem.split("-").slice(0, 3).join("-")
      const metaDate = file.data.astro.frontmatter.pubDate
      if (filenameDate !== metaDate) {
        throw new Error(`Filename doesn't match frontmatter date: ${file.path}`)
      }
    }
  }
}

// has to match tailwind's "bg-fg4".
githubLight.colors["editor.background"] = "var(--color-fg4)"

// https://astro.build/config
export default defineConfig({
  server: { port: 3000 },
  markdown: {
    remarkPlugins: [mdxCheckFilenameDate],
    shikiConfig: { theme: githubLight, wrap: false },
  },
  vite: {
    plugins: [
      tailwindcss({
        config: { applyAstroPreset: false, applyBaseStyles: true },
      }),
    ],
  },
  site: "https://nguyenvukhang.com/",
  integrations: [solid(), mdx()],
})
