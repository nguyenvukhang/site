import type { NextRouter } from 'next/router'
import { Header } from '../components/Header'

const VerticalContent = (props: JSX.IntrinsicElements['div']) => (
  <div className="flex flex-col max-w-full sm:max-w-2xl px-2 sm:px-5 md:px-10">{props.children}</div>
)

const HorizontalMiddle = (props: JSX.IntrinsicElements['div']) => (
  <div className="flex justify-center w-full">
    <VerticalContent>{props.children}</VerticalContent>
  </div>
)

/**
 * classic <div> tag props + a NextRouter
 */
type LayoutProps = JSX.IntrinsicElements['div'] & { router: NextRouter }

export const BlogPostLayout = (props: LayoutProps) => {
  return (
    <>
      <HorizontalMiddle>
        <Header router={props.router} />
        <div className="overflow-x-hidden">{props.children}</div>
      </HorizontalMiddle>
    </>
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
