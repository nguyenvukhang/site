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
 * Container for vertical content. Content divs are stacked vertically.
 * Responseive horizontal padding is handled here.
 */
const VerticalContent = (props: JSX.IntrinsicElements['div']) => (
  <div className="flex flex-col w-full max-w-full sm:max-w-2xl px-8 sm:px-12 md:px-14">
    {props.children}
  </div>
)

/**
 * Container that centers its children horizontally.
 */
const HorizontalMiddle = (props: JSX.IntrinsicElements['div']) => (
  <div className="flex justify-center w-full">
    <VerticalContent>{props.children}</VerticalContent>
  </div>
)

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
      <EndFlair />
    </>
  )
}

/**
 * Centered, responsive layout
 */
export const MainLayout = (props: LayoutProps) => (
  <HorizontalMiddle>
    <Header router={props.router} />
    {props.children}
  </HorizontalMiddle>
)
