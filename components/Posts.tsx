import { Tag } from 'components/Tags'
import { PostProps } from 'lib/types'
import { parse } from 'path'
import { NextRouter } from 'next/router'

/**
 * One blog post entry displayed on the home page.
 */
export const Post = (props: { router: NextRouter; metadata: PostProps }) => {
  const {
    metadata: { filename, publishedAt, summary },
  } = props
  return (
    <div
      className="cursor-pointer py-1.5 group"
      onClick={() => props.router.push('/posts/' + parse(filename).name)}
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
    </div>
  )
}

/**
 * One blog post entry displayed on the home page.
 */
export const PostWithTags = (props: {
  router: NextRouter
  metadata: PostProps
}) => {
  const {
    metadata: { filename, publishedAt, summary },
  } = props
  return (
    <div
      className="cursor-pointer py-1.5 group"
      onClick={() => props.router.push('/posts/' + parse(filename).name)}
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
    </div>
  )
}
