import { readFileSync } from 'fs'
import { resolve, parse } from 'path'
import { getFiles } from 'lib/get-files'
import matter from 'gray-matter'
import type { PhotoProps, PostProps, DatedFile } from 'lib/types'

/**
 * Parses a filename which is `YYYY-MM-DD-some-file-name.ext`
 * into two separate parts
 */
export function parseDatedFile(v: string): DatedFile {
  const f = parse(v).base
  const parts = f.split('-')
  const date = new Date(parts.slice(0, 3).join('-'))
  return { date, file: parts.slice(3).join('-') }
}

/**
 * get DD Mmm YYYY from a date object
 */
function getDate(d: Date) {
  return d.toLocaleDateString('en-sg', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function dateComp(d1: Date, d2: Date) {
  const [t1, t2] = [d1.getTime(), d2.getTime()]
  if (t1 === t2) return 0
  return t1 < t2 ? -1 : 1
}

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
    .map((f) => ({ filename: f, caption: meta[f] }))
    .slice(0, limit ? limit : undefined)
}
