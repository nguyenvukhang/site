import { NextRouter } from 'next/router'
import NextLink from 'next/link'
import { dirname, basename } from 'path'
import { Fragment } from 'react'

/**
 * Makes a route href path into a presentatble state
 */
const prettyRoute = (s: string) => basename(s).replace(/-/g, ' ')

const Link = (props: { route: string }) => (
  <NextLink href={props.route} className="text-gray-600">
    {props.route === '/' ? 'home' : prettyRoute(props.route)}
  </NextLink>
)

/**
 * Path/breadcrumb separator
 */
const Separator = (props: { left?: boolean; right?: boolean }) => (
  <span
    style={{
      marginRight: props.right ? '3px' : 0,
      marginLeft: props.left ? '3px' : 0,
    }}
    className="text-gray-300"
  >
    /
  </span>
)

export const Breadcrumb = (props: { router: NextRouter }) => {
  const routes: string[] = [dirname(props.router.route)]
  while (routes[routes.length - 1] !== '/')
    routes.push(dirname(routes[routes.length - 1]))
  routes.reverse()
  return (
    <div>
      <Separator right />
      {routes.map((route, i) => {
        return (
          <Fragment key={i}>
            <Link route={route} />
            <Separator left right />
          </Fragment>
        )
      })}
      <span className="text-gray-400">{prettyRoute(props.router.route)}</span>
    </div>
  )
}
