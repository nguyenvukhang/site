import { lstatSync, readFileSync, readdirSync, writeFileSync } from 'fs'
import { join, resolve, relative, extname, basename } from 'path'
import matter from 'gray-matter'

const PROJECT_ROOT = process.cwd()
const root = (...d) => join(PROJECT_ROOT, ...d)
const BLOG_DIR = root('blog')
const PROJECTS_DIR = root('projects')

/** Gets all files recursively under a specified directory */
const getAllFiles = (root) => {
  const allFiles = [],
    ls = (cwd) =>
      readdirSync(cwd).forEach((file) => {
        const fp = resolve(cwd, file)
        if (lstatSync(fp).isDirectory()) ls(resolve(cwd, file))
        else allFiles.push(fp)
      })
  ls(root)
  return allFiles.filter((entry) => entry !== root)
}

const getAllMdx = (root) => getAllFiles(root).filter((v) => v.endsWith('.mdx'))

const stripExtension = (s) => s.slice(0, -extname(s).length)

function parseMdx(mdxFile) {
  const { data } = matter(readFileSync(mdxFile, 'utf8'))
  data.importPath = stripExtension(relative(PROJECT_ROOT, mdxFile))
  data.slug = '/' + data.importPath
  data.publishedAt = new Date(
    basename(data.slug).split('-').slice(0, 3).join('-')
  )
  return data
}

const projectMeta = getAllMdx(PROJECTS_DIR).map(parseMdx)
writeFileSync(join(PROJECTS_DIR, 'meta.json'), JSON.stringify(projectMeta))

const blogMeta = getAllMdx(BLOG_DIR).map(parseMdx)
writeFileSync(join(BLOG_DIR, 'meta.json'), JSON.stringify(blogMeta))
