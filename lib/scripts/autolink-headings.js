const isHeader = (s) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(s)

/**
 * Extracts an id from a heading title.
 */
function getId(child) {
  console.log(child)
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
module.exports = () => (tree) => {
  tree.children
    .filter((c) => isHeader(c.tagName))
    .forEach((child) => (child.properties.id = getId(child)))
}
