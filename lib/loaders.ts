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

// get DD Mmm YYYY from a date object
export function getDate(d: Date) {
  return d.toLocaleDateString('en-sg', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Gets the most recent `limit` posts and their metadata.
 */
export function getPosts(path: string, limit: number): PostProps[] {
  return getFiles(path)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const { date, file } = parseDatedFile(filename)
      const frontmatter = matter(readFileSync(filename, 'utf8'))
        .data as PostProps
      const result = {
        ...frontmatter,
        filename: file,
        publishedAt: getDate(date),
      }
      return result
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit)
}

/**
 * Gets the most recent `limit` photos and their metadata.
 */
export function getPhotos(path: string, limit: number): PhotoProps[] {
  const meta: Record<string, string> = JSON.parse(
    readFileSync(resolve(path, 'meta.json'), 'utf8')
  )
  return getFiles(path)
    .filter((f) => f.endsWith('.png') || f.endsWith('.jpg'))
    .map((f) => parse(f).base)
    .sort((a, b) => b.localeCompare(a))
    .slice(0, limit)
    .map((filename) => {
      return { filename, caption: meta[filename] }
    })
}
