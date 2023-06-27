/**
 * Use this to control offset from top edge of the screen after jump
 */
const OFFSET = '-2em'
const style = {
  display: 'block',
  position: 'relative',
  visibility: 'hidden',
  top: OFFSET,
}

/**
 * Extracts an id from a heading title.
 */
function getId(node) {
  for (let i = 0; i < node.children.length; i++) {
    const subchild = node.children[i]
    if (subchild.type === 'text' && subchild.value) {
      return subchild.value.toLowerCase().replace(/ /g, '-')
    }
  }
  return 'no-id'
}

function link(node) {
  if (node.children) node.children.forEach(link)
  if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) return
  node.children.push({
    type: 'element',
    tagName: 'a',
    properties: { id: getId(node), class: 'anchor', style },
  })
}

/**
 * a simple plugin to parse frontmatter from .mdx files
 */
export const autolinkHeadings = () => (tree) => link(tree)
