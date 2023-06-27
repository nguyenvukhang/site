import { SVG } from 'mathjax-full/js/output/svg.js'
import { visit, SKIP } from 'unist-util-visit'
import { mathjax } from 'mathjax-full/js/mathjax.js'
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js'
import { TeX } from 'mathjax-full/js/input/tex.js'
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js'
import { fromDom } from 'hast-util-from-dom'
import { toText } from 'hast-util-to-text'
import { JSDOM } from 'jsdom'
import { jsdomAdaptor } from 'mathjax-full/js/adaptors/jsdomAdaptor.js'

const adaptor = jsdomAdaptor(JSDOM)
RegisterHTMLHandler(adaptor)

export function createRenderer(options) {
  const input = new TeX({
    packages: options.packages || AllPackages,
    ...options.tex,
  })
  const mathDoc = mathjax.document('', {
    InputJax: input,
    OutputJax: new SVG(),
  })
  return (node, options) => {
    const domNode = fromDom(
      mathDoc.convert(toText(node, { whitespace: 'pre' }), options)
    )
    if (options.display) {
      domNode.children[0].properties.style = {
        display: 'inline-block',
        margin: '12px',
      }
    }
    node.children = [domNode]
  }
}

export const rehypeMathJax =
  (options = {}) =>
  (tree) => {
    const render = createRenderer(options)
    visit(tree, 'element', (node) => {
      const classes =
        node.properties && Array.isArray(node.properties.className)
          ? node.properties.className
          : []
      const inline = classes.includes('math-inline')
      const display = classes.includes('math-display')
      if (!inline && !display) return

      if (inline) {
        render(node, { display })
      } else {
        const mathNode = {
          type: 'element',
          tagName: 'div',
          properties: { style: { overflowX: 'auto' } },
          children: node.children,
        }
        render(mathNode, { display })
        node.children = [mathNode]
      }

      return SKIP
    })
  }
