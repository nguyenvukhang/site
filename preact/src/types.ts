import type { StateUpdater } from 'preact/hooks'
import type { JSX } from 'preact/jsx-runtime'

export type HTML = JSX.IntrinsicElements

export type State<T> = [T, StateUpdater<T>]

export type BlogFrontmatter = {
  title: string
  publishedAt: Date
  summary: string
  tags: string[]
  draft?: boolean
  slug?: string
  importPath: string
}

export type ProjectFrontmatter = {
  title: string
  summary: string
  tags: string[]
  draft?: boolean
  slug?: string
  repo: string
  importPath: string
}

/**
 * Converts a date to a standard form used across the site.
 */
export const prettyDate = (date: Date) =>
  date.toLocaleDateString('en-sg', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

export const classes = (...x: string[]) => x.join(' ')

/**
 * Anchorifies a string to be a scroll anchor
 */
export const anchor = (v: string) => v.replace(/ /g, '-').toLowerCase()
