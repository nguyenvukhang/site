import { TelescopeIcon } from '@primer/octicons-react'
import type { NextRouter } from 'next/router'
import { Breadcrumb } from './Breadcrumb'

const Name = (p: { className?: string }) => (
  <span className={`font-round text-[1.125em] text-gray-500 ${p.className}`}>
    Nguyễn Vũ Khang
  </span>
)

/**
 * Header component for every page. Displays the home version for the
 * root route, and a version with a back button for every other route
 */
export const Header = (props: { router: NextRouter }) => {
  const { router } = props
  // root page header
  const RootHeader = () => (
    <div className="flex flex-row mt-12 mb-10">
      <TelescopeIcon size={32} className="fill-gray-400 mr-4" />
      <Name className="text-[1.2em] text-gray-700" />
    </div>
  )
  // non-root header (has a back button to navigate home)
  const NonRootHeader = () => (
    <div className="mt-10 mb-4 flex flex-col">
      <Breadcrumb router={router} />
    </div>
  )
  return router.route === '/' ? <RootHeader /> : <NonRootHeader />
}
