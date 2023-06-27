import { rmSync, writeFileSync } from 'fs'
import * as plugin from './lib/mdx-plugins/index.js'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

plugin.linkPosts(process.cwd())

writeFileSync(
  'postcss.config.cjs',
  'module.exports={plugins:{tailwindcss:{},autoprefixer:{}}}'
)

process.on('exit', () => rmSync('postcss.config.cjs', { force: true }))

export default {
  webpack: (config, options) => {
    // Install markdown plugins
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [plugin.parseFrontmatter, remarkGfm, remarkMath],
            rehypePlugins: [
              plugin.autolinkHeadings,
              plugin.rehypeMathJax,
              rehypeHighlight,
            ],
          },
        },
      ].filter(Boolean),
    })

    // use Preact instead of React
    if (!options.dev && !options.isServer) {
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
  reactStrictMode: true,
  pageExtensions: ['tsx', 'mdx', 'ts'],
}
