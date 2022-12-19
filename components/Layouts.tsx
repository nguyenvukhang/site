import type { NextRouter } from 'next/router'
import { Header } from '../components/Header'

/**
 * classic <div> tag props + a NextRouter
 */
type LayoutProps = JSX.IntrinsicElements['div'] & { router: NextRouter }

export const BlogPostLayout = (props: LayoutProps) => {
  return (
    <div>
      <Header router={props.router} />
      {props.children}
    </div>
  )
}

export const HomeLayout = (props: LayoutProps) => {
  return (
    <div>
      <Header router={props.router} />
      {props.children}
    </div>
  )
}
