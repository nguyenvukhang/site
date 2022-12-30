import type { GetStaticProps } from 'next'
import { getFiles } from 'lib/get-files'
import { resolve, parse } from 'path'
import { getPosts } from 'lib/loaders'
import type { NextRouter } from 'next/router'
import type { PostProps } from 'lib/types'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Separator } from 'components/Separator'
import { Post } from 'components/Posts'

/**
 * Fetch posts, post metadata, and photos
 */
export const getStaticProps: GetStaticProps = () => ({
  props: {
    posts: getPosts(resolve(process.cwd(), 'posts'), 5),
    photos: getFiles(resolve(process.cwd(), 'public/photos'))
      .filter((x) => !x.endsWith('.json'))
      .map((x) => parse(x).base)
      .sort((a, b) => b.localeCompare(a)),
  },
})

/**
 * List of blog post entries
 */
const Posts = (props: { router: NextRouter; posts: PostProps[] }) => {
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
 * Live-updating time.
 */
const Time = () => {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    const t = setTimeout(() => setDate(new Date()), 1000)
    return () => clearTimeout(t)
  })
  return (
    <span className="tabular-nums">
      {date.toLocaleTimeString('en-sg', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })}
    </span>
  )
}

const About = () => {
  const github = () => <a href="https://github.com/nguyenvukhang">GitHub</a>
  const instagram = () => (
    <a href="https://www.instagram.com/nguyenvukhang_">Instagram</a>
  )
  // TODO: update cv and display this
  // const cv = () => <a href="https://read.cv/nguyenvukhang">CV</a>
  const P = (props: JSX.IntrinsicElements['p']) => (
    <p className="my-1">{props.children}</p>
  )

  return (
    <>
      <P>An efficiency junkie who also happens to write code and do sports.</P>
      <P>
        Currently piecing together a degree at National University of Singapore,
        where it's <Time />.
      </P>
      <P>
        I also hang out on {instagram()} and {github()}.
      </P>
    </>
  )
}

export default function Home(props: { photos: string[]; posts: PostProps[] }) {
  const router = useRouter()
  const H1 = (p: { children: string }) => (
    <div className="mb-2 text-xl font-round text-gray-700">{p.children}</div>
  )

  return (
    <>
      <About />
      <Separator />
      <div className="flex flex-row items-baseline space-x-4">
        <H1>Photos</H1>
        <a className="text-sm" onClick={() => router.push('/photos')}>
          All photos
        </a>
      </div>
      <Photos router={router} photos={props.photos} />
      <Separator />
      <div className="flex flex-row items-baseline space-x-4">
        <H1>Recent posts</H1>
        <a className="text-sm" onClick={() => router.push('/posts')}>
          All posts
        </a>
      </div>
      <Posts router={router} posts={props.posts} />
    </>
  )
}
