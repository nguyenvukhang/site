import matter from 'gray-matter'
import { Parser } from 'acorn'
import jsx from 'acorn-jsx'
import { parse } from 'path'
const parser = Parser.extend(jsx())
const node = (js) => ({
  type: 'mdxjsEsm',
  data: {
    estree: parser.parse(js, { sourceType: 'module', ecmaVersion: 2020 }),
  },
})

/**
 * a simple plugin to parse frontmatter from .mdx files, and wrap the .mdx
 * file with a blog layount
 *
 * Only operates on files that contain frontmatter
 */
export const parseFrontmatter = () => (tree, file) => {
  // extract frontmatter
  const { data: frontmatter } = matter(file.value)

  // skip processing if no frontmatter is found
  if (Object.keys(frontmatter).length === 0) return

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

  // insert the frontmatter as JSX into the md file
  tree.children.push(node(`const frontmatter = ${JSON.stringify(frontmatter)}`))

  // re-read the JSX and send it to the layout component
  tree.children.push(
    node('export default ({children}) => <L {...frontmatter}>{children}</L>')
  )
}
