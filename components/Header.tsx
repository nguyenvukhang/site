import { TelescopeIcon } from '@primer/octicons-react'
import { NextRouter } from 'next/router'
import { BackButton } from './BackButton'

const Name = (p: { className?: string }) => (
  <span className={`text-[1.125em] text-gray-500 ${p.className}`}>
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
    <div className="flex flex-col mt-12 mb-10">
      <TelescopeIcon size={32} className="fill-gray-400" />
      <div className="h-2" />
      <Name className="text-[1.2em] text-gray-900" />
    </div>
  )
  // non-root header (has a back button to navigate home)
  const NonRootHeader = () => (
    <div className="mt-12 mb-6 flex items-center">
      <BackButton onClick={() => router.replace('/')} />
      <div className="w-4" />
      <Name />
    </div>
  )
  return router.route === '/' ? <RootHeader /> : <NonRootHeader />
}
