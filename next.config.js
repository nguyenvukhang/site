const matter = require('gray-matter')
const { Parser } = require('acorn')
const jsx = require('acorn-jsx')
const jsxParser = Parser.extend(jsx())

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: { remarkPlugins: [parseFrontmatter] },
})

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ['tsx', 'mdx'],
})

/**
 * a simple plugin to parse frontmatter from .mdx files
 */
function parseFrontmatter() {
  return (tree, file) => {
    // import the layout
    tree.children.unshift({
      type: 'mdxjsEsm',
      data: {
        estree: jsxParser.parse(
          'import { BlogPostLayout } from "../components/Layouts"',
          {
            sourceType: 'module',
            ecmaVersion: 2020,
          }
        ),
      },
    })
    // insert the frontmatter as JSX into the mdx file
    const { data: frontmatter } = matter(file.value)
    tree.children.push({
      type: 'mdxjsEsm',
      data: {
        estree: jsxParser.parse(
          `const frontmatter = ${JSON.stringify(frontmatter)}`,
          { sourceType: 'module', ecmaVersion: 2020 }
        ),
      },
    })
    // re-read the JSX and send it to the layout component
    tree.children.push({
      type: 'mdxjsEsm',
      data: {
        estree: jsxParser.parse(
          'export default ({children}) => <BlogPostLayout {...frontmatter}>{children}</BlogPostLayout>',
          { sourceType: 'module', ecmaVersion: 2020 }
        ),
      },
    })
  }
}
