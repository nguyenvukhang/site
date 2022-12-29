import { mkdirSync, symlinkSync, readdirSync, rmSync } from 'fs'
import { resolve } from 'path'

/**
 * Symlinks posts and removes dates from the original titles for cleaner URLs
 */
export const linkPosts = (root) => {
  const src = resolve(root, 'posts')
  const dst = resolve(root, 'pages/posts')
  rmSync(dst, { recursive: true, force: true })
  mkdirSync(dst, { recursive: true })
  readdirSync(src)
    .filter((f) => f.endsWith('.mdx'))
    .forEach((p) => {
      if (p.split('-').slice(0, 3).some(isNaN)) {
        throw new Error(
          `Posts should have YYYY-MM-DD as a prefix.\nFile: ${resolve(src, p)}`
        )
      }
      try {
        symlinkSync(
          resolve(src, p),
          resolve(dst, p.split('-').slice(3).join('-'))
        )
      } catch (e) {
        if (e.code !== 'EEXIST') {
          throw e
        }
      }
    })
}
