import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import solid from "@astrojs/solid-js"
import tailwindcss from "@tailwindcss/vite"
import githubLight from "./src/styles/github-light.json"

// has to match tailwind's "bg-fg4".
githubLight.colors["editor.background"] = "var(--color-fg4)"

// https://astro.build/config
export default defineConfig({
  server: { port: 3000 },
  markdown: {
    remarkPlugins: [],
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
