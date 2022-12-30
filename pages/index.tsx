import { getFiles } from 'lib/get-files'
import { resolve, parse } from 'path'
import { getPosts } from 'lib/loaders'
import type { PostProps } from 'lib/types'
import Image from 'next/image'
import { Separator } from 'components/Separator'
import { Post } from 'components/Posts'
import Link from 'next/link'
import { FeaturedProjects } from 'components/FeaturedProjects'
import { fetchRepos, repositories, RepositoryProps } from 'lib/github'
import { GetServerSideProps } from 'next'

type PageProps = {
  photos: string[]
  posts: PostProps[]
  repoData: Record<string, RepositoryProps>
  time: string
}

/**
 * Fetch posts, post metadata, and photos
 */
export const getServerSideProps: GetServerSideProps<PageProps> = async () => ({
  props: {
    repoData: await fetchRepos(repositories),
    posts: getPosts(resolve(process.cwd(), 'posts'), 5),
    photos: getFiles(resolve(process.cwd(), 'public/photos'))
      .filter((x) => !x.endsWith('.json'))
      .map((x) => parse(x).base)
      .sort((a, b) => b.localeCompare(a)),
    time: new Date().toLocaleTimeString('en-sg', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
})

/**
 * Self introduction section.
 */
const About = (props: { time: string }) => {
  const github = <a href="https://github.com/nguyenvukhang">GitHub</a>
  const instagram = (
    <a href="https://www.instagram.com/nguyenvukhang_">Instagram</a>
  )
  // TODO: update cv and display this
  // const cv = () => <a href="https://read.cv/nguyenvukhang">CV</a>
  const P = (props: JSX.IntrinsicElements['p']) => (
    <p className="mb-2">{props.children}</p>
  )

  return (
    <>
      <P>An efficiency junkie who also happens to write code and do sports.</P>
      <P>
        Currently piecing together a degree at National University of Singapore,
        where it's {props.time}.
      </P>
      <P>
        I also hang out on {instagram} and {github}.
      </P>
    </>
  )
}

/**
 * One photo in the carousel
 */
const Photo = (props: { src: string }) => (
  <Link
    className="inline-block relative h-48 w-64 cursor-pointer"
    href="/photos"
  >
    <Image
      style={{ objectFit: 'cover', height: '100%' }}
      alt="photo"
      src={'/photos/' + props.src}
      width={700} // will be overridden by `style` prop
      height={475} // will be overridden by `style` prop
    />
  </Link>
)

/**
 * A very simple photo carousel that shows the most recent 5 photos.
 */
const Photos = (props: { photos: string[] }) => {
  return (
    <div className="flex overflow-x-scroll h-56 pt-1">
      <div className="flex flex-nowrap space-x-4">
        {props.photos.slice(0, 5).map((f, i) => (
          <Photo key={i} src={f} />
        ))}
      </div>
    </div>
  )
}

/**
 * List of blog post entries
 */
const Posts = (props: { posts: PostProps[] }) => {
  return (
    <div className="flex flex-col">
      {props.posts.map((post, i) => (
        <Post key={i} metadata={post} />
      ))}
    </div>
  )
}

const Header = (props: { href: string; children: string }) => (
  <div className="flex flex-row items-baseline space-x-4">
    <div className="mb-2 text-xl font-round text-gray-700">
      {props.children}
    </div>
    <Link className="text-sm" href={props.href}>
      All {props.children.toLowerCase()}
    </Link>
  </div>
)

export default function Page(props: PageProps) {
  return (
    <>
      <About time={props.time} />
      <Separator />
      <Header href="/projects">Projects</Header>
      <FeaturedProjects
        data={props.repoData}
        repoList={['nguyenvukhang/gitnu', 'nguyenvukhang/nvim-toggler']}
      />
      <Separator />
      <Header href="/photos">Photos</Header>
      <Photos photos={props.photos} />
      <Separator />
      <Header href="/posts">Posts</Header>
      <Posts posts={props.posts} />
    </>
  )
}
