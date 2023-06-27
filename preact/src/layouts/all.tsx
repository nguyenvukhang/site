import { Header } from '../components/header'
import { EndFlair } from '../assets/icons'
import { BlogFrontmatter, HTML, anchor, prettyDate } from '../types'
import { PublishedAt, Title } from '../components/blog-components'

export const VStack = (props: HTML['div']) => (
  <div class="flex flex-col items-center w-full">{props.children}</div>
)

/**
 * To be wrapped in `VStack`
 */
export const Sub = {
  Narrow: (p: HTML['div']) => (
    <div class={`w-full sm:max-w-[52rem] px-8 sm:px-12 md:px-14 ${p.class}`}>
      <div class="overflow-x-auto">{p.children}</div>
    </div>
  ),
  Wide: (p: HTML['div']) => (
    <div class={`w-full sm:max-w-[72rem] px-8 sm:px-12 md:px-14 ${p.class}`}>
      <div class="overflow-x-auto min-h-[50vh]">{p.children}</div>
    </div>
  ),
}

/**
 * Centered, responsive layout
 */
export const MainLayout = (props: HTML['div']) => (
  <VStack>
    <Sub.Narrow>
      <Header />
      <div class="overflow-x-auto min-h-[50vh]">{props.children}</div>
      <EndFlair />
    </Sub.Narrow>
  </VStack>
)

/**
 * Unified blog post layout. Used in `vite.config.ts` to handle frontmatter
 */
export const BlogPostLayout = (
  props: HTML['div'] & { meta: BlogFrontmatter }
) => {
  const title = props.meta.title
  const publishedAt = new Date(props.meta.publishedAt)

  return (
    <MainLayout>
      <div class="my-12">
        <Title class="mb-4">{title}</Title>
        <PublishedAt>{prettyDate(publishedAt)}</PublishedAt>
      </div>
      <div class="overflow-x-hidden mt-4">{props.children}</div>
    </MainLayout>
  )
}

/**
 * Unified project post layout. Used in `vite.config.ts` to handle frontmatter
 */
export const ProjectPostLayout = (
  props: HTML['div'] & { meta: BlogFrontmatter }
) => {
  const { title, tags } = props.meta
  return (
    <>
      <h1 id={anchor(title)}>{title}</h1>
      <div>{tags.join(', ')}</div>
      <div class="overflow-x-auto pb-10">{props.children}</div>
    </>
  )
}
