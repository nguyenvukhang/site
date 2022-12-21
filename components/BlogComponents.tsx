import { NextRouter } from 'next/router'

export const Title = (props: { children: string }) => {
  return <h1 className="text-2xl font-round text-gray-700">{props.children}</h1>
}

export const PublishedAt = (props: { children: string }) => {
  return <div className="text-gray-500 text-sm mb-1">{props.children}</div>
}

export const Summary = (props: { children: string }) => {
  return <div className="text-sm mb-2">{props.children}</div>
}

type OnClick = () => void

const Tag = (props: { children: string; onClick: OnClick }) => (
  <span
    className="text-sm bg-accent-100 px-1.5 pb-0.5 rounded-lg cursor-pointer"
    onClick={props.onClick}
  >
    {props.children}
  </span>
)

export const Tags = (props: { children: string[]; router: NextRouter }) => (
  <div className="space-x-2">
    {props.children.map((tag, idx) => (
      <Tag
        onClick={() =>
          props.router.push({
            pathname: '/posts',
            query: { tag },
          })
        }
        key={idx}
      >
        {tag}
      </Tag>
    ))}
  </div>
)
