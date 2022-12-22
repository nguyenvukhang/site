import { linkPosts } from './lib/scripts/link-posts.js'
import { autolinkHeadings } from './lib/scripts/autolink-headings.js'
import { parseFrontmatter } from './lib/scripts/frontmatter.js'
import remarkGfm from 'remark-gfm'

linkPosts(process.cwd())

export default {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            providerImportSource: '@mdx-js/react',
            remarkPlugins: [parseFrontmatter, remarkGfm],
            rehypePlugins: [autolinkHeadings],
          },
        },
      ].filter(Boolean),
    })
    return config
  },
  reactStrictMode: true,
  pageExtensions: ['tsx', 'mdx'],
}
