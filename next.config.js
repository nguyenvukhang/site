import * as plugin from './lib/mdx-plugins/index.js'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import { rmSync, writeFileSync } from 'fs'

plugin.linkPosts(process.cwd())

writeFileSync(
  'postcss.config.cjs',
  'module.exports={plugins:{tailwindcss:{},autoprefixer:{}}}'
)

process.on('exit', () => rmSync('postcss.config.cjs'))

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
