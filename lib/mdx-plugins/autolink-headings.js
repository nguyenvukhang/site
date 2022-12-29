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
function getId(child) {
  for (let i = 0; i < child.children.length; i++) {
    const subchild = child.children[i]
    if (subchild.type === 'text' && subchild.value) {
      return subchild.value.toLowerCase().replace(/ /g, '-')
    }
  }
  return 'no-id'
}

/**
 * a simple plugin to parse frontmatter from .mdx files
 */
export const autolinkHeadings = () => (tree) => {
  tree.children
    .filter((c) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(c.tagName))
    .forEach((child) => {
      child.children.push({
        type: 'element',
        tagName: 'a',
        properties: { id: getId(child), class: 'anchor', style },
      })
    })
}
