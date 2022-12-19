const parseFrontmatter = require('./lib/scripts/frontmatter')
const linkPosts = require('./lib/scripts/link-posts')

linkPosts(process.cwd())

const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
  options: { remarkPlugins: [parseFrontmatter] },
})

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ['tsx', 'mdx'],
})
