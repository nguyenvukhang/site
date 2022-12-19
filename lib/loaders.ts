import { readFileSync } from 'fs'
import { resolve, parse } from 'path'
import { getFiles } from 'lib/get-files'
import matter from 'gray-matter'
import type { PhotoProps, PostProps } from 'lib/types'

/**
 * Gets the most recent `limit` posts and their metadata.
 */
export function getPosts(path: string, limit: number): PostProps[] {
  return getFiles(path)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const frontmatter = matter(readFileSync(filename, 'utf8'))
        .data as PostProps
      return { ...frontmatter, filename }
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
