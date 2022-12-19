import { SquareIcon } from '@primer/octicons-react'
import type { GetStaticProps } from 'next'
import { getFiles } from 'lib/get-files'
import { resolve, parse } from 'path'
import { getPostMetadata } from 'lib/posts'
import type { NextRouter } from 'next/router'
import type { Frontmatter } from 'lib/types'
import { useRouter } from 'next/router'
import Image from 'next/image'

/**
 * Fetch posts, post metadata, and photos
 */
export const getStaticProps: GetStaticProps = async (): Promise<{
  props: { posts: Frontmatter[]; photos: string[] }
}> => ({
  props: {
    posts: getPostMetadata(resolve(process.cwd(), 'posts'), 5),
    photos: getFiles(resolve(process.cwd(), 'public/photos'))
      .filter((x) => !x.endsWith('.json'))
      .map((x) => parse(x).base)
      .reverse(),
  },
})

/**
 * One blog post entry displayed on the home page.
 */
const Post = (props: { router: NextRouter; metadata: Frontmatter }) => {
  return (
    <div
      className="cursor-pointer py-1.5 group"
      onClick={() =>
        props.router.push('/posts/' + parse(props.metadata.filename).name)
      }
    >
      <div className="group-hover:underline truncate">
        {props.metadata.title}
      </div>
      <div className="text-sm text-gray-500 truncate">
        <span className="tabular-nums">{props.metadata.publishedAt}</span>
        <span className="text-gray-300 mx-2">|</span>
        <span>{props.metadata.summary}</span>
      </div>
    </div>
  )
}

/**
 * List of blog post entries
 */
const Posts = (props: { router: NextRouter; posts: Frontmatter[] }) => {
  return (
    <div className="flex flex-col">
      {props.posts.map((post, i) => (
        <Post key={i} metadata={post} router={props.router} />
      ))}
    </div>
  )
}

/**
 * One photo in the carousel
 */
const Photo = (props: { src: string; router: NextRouter }) => (
  <div
    className="inline-block relative h-48 w-64 cursor-pointer"
    onClick={() => props.router.push('/photos')}
  >
    <Image
      style={{ objectFit: 'cover', height: '100%' }}
      alt="photo"
      src={'/photos/' + props.src}
      width={700} // will be overridden by `style` prop
      height={475} // will be overridden by `style` prop
    />
  </div>
)
/**
 * A very simple photo carousel that shows the most recent 5 photos.
 */
const Photos = (props: { router: NextRouter; photos: string[] }) => {
  return (
    <div className="flex overflow-x-scroll h-56 pt-1">
      <div className="flex flex-nowrap space-x-4">
        {props.photos.slice(0, 5).map((f, i) => (
          <Photo key={i} src={f} router={props.router} />
        ))}
      </div>
    </div>
  )
}

/**
 * A simple separator for `Sections` on the home page
 */
const Separator = () => (
  <div className="flex justify-center my-8">
    <SquareIcon className="fill-gray-400" />
  </div>
)

/**
 * List of sections in the home page. Turns a list of Elements into
 * `<Separator/>`-separated elements.
 */
const Sections = (props: { children: JSX.Element[] }) => {
  const result: JSX.Element[] = []
  props.children.forEach((c, i) => {
    result.push({ ...c, key: i })
    // is not the last
    if (i < props.children.length - 1) {
      result.push(<Separator />)
    }
  })
  result.push()
  return <>{result}</>
}

export default function Home(props: {
  photos: string[]
  posts: Frontmatter[]
}) {
  const router = useRouter()
  const H1 = (p: { children: string }) => (
    <div className="mb-2 text-lg font-medium text-gray-700">{p.children}</div>
  )
  return (
    <Sections>
      <>
        <div className="flex flex-row items-baseline space-x-4">
          <H1>Photos</H1>
          <a className="text-sm" onClick={() => router.push('/photos')}>
            All photos
          </a>
        </div>
        <Photos router={router} photos={props.photos} />
      </>
      <>
        <H1>Posts</H1>
        <Posts router={router} posts={props.posts} />
      </>
      <div className="text-gray-700">Nguyễn Vũ Khang</div>
    </Sections>
  )
}
