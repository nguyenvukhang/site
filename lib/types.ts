export type PostProps = {
  filename: string
  title: string
  publishedAt: string
  tags: string[]
  summary: string
  draft?: boolean
}

export type PhotoProps = {
  filename: string
  caption: string
}

export type DatedFile = {
  date: Date
  file: string
}
