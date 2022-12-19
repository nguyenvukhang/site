import type { NextRouter } from 'next/router'
import { Header } from './Header'
import { Title, PublishedAt, Summary, Tags } from '@components/BlogComponents'

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
  <div className="flex flex-col w-full max-w-full sm:max-w-2xl px-3 sm:px-5 md:px-10">
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
  return (
    <HorizontalMiddle>
      <Title>{props.title}</Title>
      <PublishedAt>{props.publishedAt}</PublishedAt>
      <Summary>{props.summary}</Summary>
      <Tags>{props.tags}</Tags>
      <div className="overflow-x-hidden my-4">{props.children}</div>
    </HorizontalMiddle>
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
