const matter = require('gray-matter')
const { Parser } = require('acorn')
const jsx = require('acorn-jsx')
const parser = Parser.extend(jsx())
const node = (js) => ({
  type: 'mdxjsEsm',
  data: {
    estree: parser.parse(js, { sourceType: 'module', ecmaVersion: 2020 }),
  },
})
const { parse } = require('path')

/**
 * a simple plugin to parse frontmatter from .mdx files
 */
module.exports = () => (tree, file) => {
  // extract frontmatter
  const { data: frontmatter } = matter(file.value)
  const filepath = parse(file.path).base
  const date = new Date(filepath.split('-').slice(0, 3).join('-'))
  frontmatter.publishedAt = date.toLocaleDateString('en-sg', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  // remove frontmatter from the .mdx file so it doesn't show up
  if (tree.children[0].type === 'thematicBreak') {
    const i = tree.children.findIndex((t) => t.type !== 'thematicBreak')
    if (i !== -1) tree.children.splice(0, i + 1)
  }
  // import the layout
  tree.children.unshift(
    node('import { BlogPostLayout as L } from "components/Layouts"')
  )
  // insert the frontmatter as JSX into the mdx file
  tree.children.push(node(`const frontmatter = ${JSON.stringify(frontmatter)}`))
  // re-read the JSX and send it to the layout component
  tree.children.push(
    node('export default ({children}) => <L {...frontmatter}>{children}</L>')
  )
}
