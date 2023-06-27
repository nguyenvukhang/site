import { SquareIcon, TelescopeIcon } from '@primer/octicons-react'

/**
 * A simple separator between sections.
 */
export const Separator = () => (
  <div className="flex justify-center my-8">
    <SquareIcon className="fill-gray-400" />
  </div>
)

/**
 * A flair icon to mark the bottom/end of the page.
 */
export const EndFlair = () => (
  <div className="flex justify-center mt-10 mb-32">
    <TelescopeIcon className="fill-gray-400" />
  </div>
)
