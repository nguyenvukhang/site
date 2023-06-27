import { mkdirSync, symlinkSync, readdirSync, rmSync, readFileSync } from 'fs'
import matter from 'gray-matter'
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
    .filter(
      // only show draft entries on non-production builds
      (f) =>
        process.env['NODE_ENV'] !== 'production' ||
        !matter(readFileSync(resolve(src, f), 'utf8')).data.draft
    )
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
        if (e.code !== 'EEXIST') throw e
      }
    })
}
