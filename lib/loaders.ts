import { readFileSync } from 'fs'
import { resolve, parse } from 'path'
import { getFiles } from 'lib/get-files'
import { parseDatedFile, getDate } from 'lib/util'
import matter from 'gray-matter'
import type { PhotoProps, PostProps } from 'lib/types'

/**
 * Gets the most recent `limit` posts and their metadata.
 */
export function getPosts(path: string, limit?: number): PostProps[] {
  return getFiles(path)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({
      frontmatter: matter(readFileSync(f, 'utf8')).data as PostProps,
      ...parseDatedFile(f),
    }))
    .filter(
      (f) => process.env['NODE_ENV'] !== 'production' || !f.frontmatter.draft
    )
    .sort((a, b) => dateComp(b.date, a.date))
    .map(({ date, file, frontmatter }) => {
      const result = {
        ...frontmatter,
        filename: file,
        publishedAt: getDate(date),
      }
      return result
    })
    .slice(0, limit ? limit : undefined)
}

/**
 * Gets the most recent `limit` photos and their metadata.
 */
export function getPhotos(path: string, limit?: number): PhotoProps[] {
  const meta: Record<string, string> = JSON.parse(
    readFileSync(resolve(path, 'meta.json'), 'utf8')
  )
  return getFiles(path)
    .filter((f) => f.endsWith('.png') || f.endsWith('.jpg'))
    .map((f) => parse(f).base)
    .sort((a, b) => b.localeCompare(a))
    .map((f) => {
      if (!meta[f]) throw new Error(`Photo ${f} has no caption.`)
      return { filename: f, caption: meta[f] }
    })
    .slice(0, limit ? limit : undefined)
}

/**
 * Compare two dates for sorting
 */
function dateComp(d1: Date, d2: Date) {
  const [t1, t2] = [d1.getTime(), d2.getTime()]
  if (t1 === t2) return 0
  return t1 < t2 ? -1 : 1
}
