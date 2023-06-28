import { MainLayout } from '../layouts/all'
import { blogData } from '../json'
import { BlogFrontmatter } from '../types'
import { route } from 'preact-router'

/**
 * Card for one blog post
 */
const Card = (props: BlogFrontmatter) => {
  return (
    <div class="cursor-pointer" onClick={() => route(props.slug || '/')}>
      <h2 class="mb-0 font-medium">{props.title}</h2>
      <p class="text-sm text-fg2 font-serif">{props.summary}</p>
    </div>
  )
}

export default (_: { path: string }) => {
  return (
    <MainLayout>
      {blogData.map((v) => (
        <Card {...v} />
      ))}
    </MainLayout>
  )
}
