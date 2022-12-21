import type { GetStaticProps } from 'next'
import { getFiles } from 'lib/get-files'
import { resolve, parse } from 'path'
import { getPosts } from 'lib/loaders'
import type { NextRouter } from 'next/router'
import type { PostProps } from 'lib/types'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { EndFlair, Separator } from '@components/Separator'

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
 * One blog post entry displayed on the home page.
 */
const Post = (props: { router: NextRouter; metadata: PostProps }) => {
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

const About = () => {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    const t = setTimeout(() => setDate(new Date()), 1000)
    return () => clearTimeout(t)
  })
  const github = () => <a href="https://github.com/nguyenvukhang">GitHub</a>
  const instagram = () => (
    <a href="https://www.instagram.com/nguyenvukhang_">Instagram</a>
  )
  const cv = () => <a href="https://read.cv/nguyenvukhang">CV</a>
  const time = (d: Date) =>
    d.toLocaleTimeString('en-sg', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

  return (
    <>
      <p>An efficiency junkie who also happens to write code and do sports.</p>
      <p>
        Currently piecing together a degree at National University of Singapore,
        where it's {time(date)}.
      </p>
      <p>
        I also hang out on {instagram()} and {github()}. Here's my {cv()}.
      </p>
    </>
  )
}

export default function Home(props: { photos: string[]; posts: PostProps[] }) {
  const router = useRouter()
  const H1 = (p: { children: string }) => (
    <div className="mb-2 text-lg font-medium text-gray-700">{p.children}</div>
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
      <H1>Posts</H1>
      <Posts router={router} posts={props.posts} />
      <EndFlair />
    </>
  )
}
