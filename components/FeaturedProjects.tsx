import type { RepositoryProps } from 'lib/github'
import Link from 'next/link'

/**
 * One project entry in a grid/stack of Featured Projects.
 */
const Project = (props: { repo: RepositoryProps }) => {
  const { repo } = props

  return (
    <Link
      className="text-gray-800 hover:no-underline"
      href={`/projects#${repo.name}`}
    >
      <div className="border border-1 border-gray-200 hover:border-accent-300 rounded-lg bg-gray-50 hover:bg-gray-100 px-3 pt-2 pb-3">
        <div className="flex flex-row items-center font-round">
          <span className="text-lg mr-1">{repo.name}</span>
          <span className="text-sm text-gray-500">
            {repo.language.toLowerCase()}
          </span>
        </div>
        <div className="text-sm line-clamp-2">{repo.description}</div>
      </div>
    </Link>
  )
}

/**
 * A grid/stack display of featured projects.
 */
export const FeaturedProjects = (props: {
  data: Record<string, RepositoryProps>
  repoList: string[]
}) => {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 w-full gap-4">
      {props.repoList.map((repo) => (
        <Project repo={props.data[repo]} key={repo} />
      ))}
    </div>
  )
}
