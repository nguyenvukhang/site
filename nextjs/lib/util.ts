import type { DatedFile } from 'lib/types'
import { parse } from 'path'

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
export function getDate(d: Date) {
  return d.toLocaleDateString('en-sg', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
