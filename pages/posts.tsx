import { GetStaticProps } from 'next'
import { resolve } from 'path'
import { getPosts } from 'lib/loaders'
import { PostProps } from 'lib/types'
import { PostWithTags } from 'components/Posts'
import { useRouter } from 'next/router'
import { SearchBar } from 'components/SearchBar'
import { useState } from 'react'
import { TagFilterList } from 'components/Tags'
import { EndFlair } from 'components/Separator'

type StaticProps = {
  posts: PostProps[]
  tags: Record<string, boolean>
  tagOrder: string[]
}

/**
 * Fetch all posts, tags, and order them by decreasing frequency.
 */
export const getStaticProps: GetStaticProps<StaticProps> = () => {
  // get every last post
  const posts = getPosts(resolve(process.cwd(), 'posts'), 0)

  // count the occurrence of each tag
  const tags = posts.reduce(
    (a, p) =>
      p.tags.reduce((a, t) => ({ ...a, [t]: isNaN(a[t]) ? 1 : a[t] + 1 }), a),
    {} as Record<string, number>
  )

  // sort tags by decreasing frequency
  const entries = Object.entries(tags)
  entries.sort((a, b) => b[1] - a[1])

  return {
    props: {
      posts,
      tags: entries.reduce((a, t) => ({ ...a, [t[0]]: false }), {}),
      tagOrder: entries.map((v) => v[0]),
    },
  }
}

/**
 * Case-insensitive substring search.
 */
const match = (query: string, hay: string) =>
  hay.toLowerCase().includes(query.toLowerCase())

export default function Posts(props: StaticProps) {
  const router = useRouter()

  // search query
  const [query, setQuery] = useState('')

  // Use the router's query param to set the initial active tag
  // This is for clicking on a post's tag and coming to this page with a filter
  // already on
  if (router.query.tag) props.tags[router.query.tag as string] = true
  const [tags, setTags] = useState(props.tags)

  // tag actions
  const toggleTag = (tag: string) => setTags({ ...tags, [tag]: !tags[tag] })
  const resetTags = () => {
    setTags(props.tagOrder.reduce((a, k) => ({ ...a, [k]: false }), {}))
  }
  return (
    <div className="flex flex-col">
      <SearchBar setQuery={setQuery} />
      <TagFilterList toggle={toggleTag} reset={resetTags} tags={tags} />
      {props.posts
        .filter((post) =>
          Object.entries(tags).every(
            ([tag, active]) => !active || post.tags.includes(tag)
          )
        )
        .filter(
          (post) =>
            match(query, post.summary) ||
            match(query, post.title) ||
            post.tags.some((t) => match(query, t))
        )
        .map((post, i) => (
          <PostWithTags key={i} metadata={post} router={router} />
        ))}
      <EndFlair />
    </div>
  )
}
