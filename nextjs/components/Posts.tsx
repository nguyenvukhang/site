import { Tag } from 'components/Tags'
import { PostProps } from 'lib/types'
import { parse } from 'path'
import Link from 'next/link'

/**
 * One blog post entry displayed on the home page.
 */
export const Post = (props: { metadata: PostProps }) => {
  const {
    metadata: { filename, publishedAt, summary },
  } = props
  return (
    <Link
      className="cursor-pointer py-1.5 group"
      href={'/posts/' + parse(filename).name}
    >
      <div className="group-hover:underline truncate font-round font text-gray-800">
        {props.metadata.title}
      </div>
      <div className="text-sm text-gray-500 truncate">
        <span className="tabular-nums border-r-2 border-r-gray-200 pr-2 mr-2">
          {publishedAt}
        </span>
        <span>{summary}</span>
      </div>
    </Link>
  )
}

/**
 * One blog post entry displayed on the page of all posts.
 */
export const PostWithTags = (props: { metadata: PostProps }) => {
  const {
    metadata: { filename, publishedAt, summary },
  } = props
  return (
    <Link
      className="cursor-pointer py-1.5 group"
      href={'/posts/' + parse(filename).name}
    >
      <div className="flex flex-row w-full truncate">
        <div className="group-hover:underline font-round text-gray-800 mr-4">
          {props.metadata.title}
        </div>
        <div className="space-x-2 align-middle">
          {props.metadata.tags.map((t, i) => (
            <Tag active key={i}>
              {t}
            </Tag>
          ))}
        </div>
      </div>
      <div className="text-sm text-gray-500 truncate">
        <span className="tabular-nums border-r-2 border-r-gray-200 pr-2 mr-2">
          {publishedAt}
        </span>
        <span>{summary}</span>
      </div>
    </Link>
  )
}
