import { NextRouter, useRouter } from 'next/router'
import { Header } from './Header'
import { Title, PublishedAt, Summary, Tags } from 'components/BlogComponents'
import { EndFlair } from './Separator'

/**
 * classic <div> tag props + a NextRouter
 */
type LayoutProps = JSX.IntrinsicElements['div'] & { router: NextRouter }
type PostProps = {
  title: string
  publishedAt: string
  summary: string
  tags: string[]
}
type BlogProps = JSX.IntrinsicElements['div'] & PostProps

/**
 * Unified blog post layout. Used in `next.config.js` to handle frontmatter
 */
export const BlogPostLayout = (props: BlogProps) => {
  const router = useRouter()
  return (
    <>
      <Title>{props.title}</Title>
      <PublishedAt>{props.publishedAt}</PublishedAt>
      <Summary>{props.summary}</Summary>
      <Tags router={router}>{props.tags}</Tags>
      <div className="overflow-x-hidden mt-4">{props.children}</div>
    </>
  )
}

/**
 * Centered, responsive layout
 */
export const MainLayout = (props: LayoutProps) => (
  <div className="flex justify-center w-full">
    <div className="flex flex-col w-full max-w-full sm:max-w-3xl px-8 sm:px-12 md:px-14">
      <Header router={props.router} />
      <div className="overflow-x-auto">{props.children}</div>
      <EndFlair />
    </div>
  </div>
)
