import blogJson from '../blog/meta.json'
import projectJson from '../projects/meta.json'
import type { BlogFrontmatter, ProjectFrontmatter } from './types'

blogJson.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt))

export const blogData = blogJson.map((v: any) => {
  v.publishedAt = new Date(v.publishedAt)
  return v
}) as BlogFrontmatter[]

// projects at the front of this array get priority
const sort = ['gitnu', 'nvim-toggler']
sort.reverse()
projectJson.sort(
  (a, b) => sort.indexOf(b.repo || '') - sort.indexOf(a.repo || '')
)

export const projectData = projectJson as ProjectFrontmatter[]
