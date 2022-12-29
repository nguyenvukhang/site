import * as plugin from './lib/mdx-plugins/index.js'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'

plugin.linkPosts(process.cwd())

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
            remarkPlugins: [plugin.parseFrontmatter, remarkGfm, remarkMath],
            rehypePlugins: [plugin.autolinkHeadings, plugin.rehypeMathJax],
          },
        },
      ].filter(Boolean),
    })
    return config
  },
  reactStrictMode: true,
  pageExtensions: ['tsx', 'mdx'],
}
