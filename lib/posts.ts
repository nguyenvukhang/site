import { readFileSync } from 'fs'
import { getFiles } from 'lib/get-files'
import matter from 'gray-matter'
import type { Frontmatter } from 'lib/types'

/**
 * Gets the most recent `limit` posts and their metadata.
 */
export function getPostMetadata(path: string, limit: number): Frontmatter[] {
  return getFiles(path)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const frontmatter = matter(readFileSync(filename, 'utf8'))
        .data as Frontmatter
      return { ...frontmatter, filename }
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit)
}
