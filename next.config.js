const parseFrontmatter = require('./lib/scripts/frontmatter')
const autolinkHeadings = require('./lib/scripts/autolink-headings')
const linkPosts = require('./lib/scripts/link-posts')

linkPosts(process.cwd())

const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [parseFrontmatter],
    rehypePlugins: [autolinkHeadings],
  },
})

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ['tsx', 'mdx'],
})
