import { fetchRepos, RepositoryProps } from 'lib/github'
import { GetServerSideProps } from 'next'
import githubColors from 'lib/github-colors.json'
import {
  RepoForkedIcon,
  StarIcon,
  MarkGithubIcon,
} from '@primer/octicons-react'
import Gitnu from 'projects/gitnu.mdx'
import NvimToggler from 'projects/nvim-toggler.mdx'
import { ReactElement } from 'react'
import { Separator } from 'components/Separator'
import Link from 'next/link'

type ProjectPageProps = { repoData: Record<string, RepositoryProps> }

/**
 * List of repositories to fetch in `getServerSideProps`
 */
const repositories = [
  'nguyenvukhang/uni',
  'nguyenvukhang/site',
  'nguyenvukhang/gitnu',
  'nguyenvukhang/nvim-toggler',
]

/**
 * fetch repository data on server side
 */
export const getServerSideProps: GetServerSideProps<ProjectPageProps> = () =>
  fetchRepos(repositories).then((repoData) => ({ props: { repoData } }))

/**
 * Display a repository's language and its color.
 */
function RepoLanguage(props: { repo: RepositoryProps }) {
  const language = props.repo.language as keyof typeof githubColors
  const colorData = githubColors[language]
  if (!colorData) throw new Error(`${language} language not supported.`)
  return (
    <div className="flex flex-row items-center">
      <div
        style={{ backgroundColor: colorData.color || 'white' }}
        className="h-2.5 w-2.5 rounded-full"
      />
      <span className="ml-2 line-clamp-1">{language}</span>
    </div>
  )
}

/**
 * Display a repository's fork count
 */
function RepoForks(props: { repo: RepositoryProps }) {
  return (
    <div className="flex items-center mx-1">
      <RepoForkedIcon className="fill-gray-600 mr-1" size={14} />
      <span>{props.repo.forks_count}</span>
    </div>
  )
}

/**
 * Display a repository's start count
 */
function RepoStars(props: { repo: RepositoryProps }) {
  return (
    <div className="flex items-center mx-1">
      <StarIcon className="fill-gray-600 mr-1" size={14} />
      <span>{props.repo.stargazers_count}</span>
    </div>
  )
}

/**
 * Display a repository's start count
 */
function RepoLink(props: { repo: RepositoryProps }) {
  return (
    <div className="flex items-center mx-1">
      <MarkGithubIcon className="fill-gray-600 mr-1" size={14} />
      <Link href={props.repo.html_url}>GitHub</Link>
    </div>
  )
}

/**
 * One project display entry
 */
function Project(props: {
  data: Record<string, RepositoryProps>
  githubRepo: string
  title: string
  mdx: (props: any) => ReactElement
}) {
  const Mdx = props.mdx
  const repo = props.data[props.githubRepo]
  if (!repo) throw new Error(`Data for ${props.githubRepo} is not fetched.`)
  console.log(repo)

  const Github = (
    <div className="flex flex-row text-gray-600 mb-4 space-x-4">
      <RepoLanguage repo={repo} />
      <RepoForks repo={repo} />
      <RepoStars repo={repo} />
      <RepoLink repo={repo} />
    </div>
  )

  return <Mdx github={Github} title={props.title} />
}

export default function Page(props: ProjectPageProps) {
  const project = (
    githubRepo: string,
    title: string,
    mdx: (props: any) => ReactElement
  ) => (
    <Project
      githubRepo={githubRepo}
      title={title}
      mdx={mdx}
      data={props.repoData}
    />
  )
  return (
    <div>
      {project('nguyenvukhang/gitnu', 'Gitnu', Gitnu)}
      <Separator />
      {project('nguyenvukhang/nvim-toggler', 'Nvim Toggler', NvimToggler)}
    </div>
  )
}
