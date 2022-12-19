export const Title = (props: { children: string }) => {
  return <h1 className="text-2xl">{props.children}</h1>
}

export const PublishedAt = (props: { children: string }) => {
  return <div className="text-gray-500 text-sm">{props.children}</div>
}

export const Summary = (props: { children: string }) => {
  return <div className="text-sm mb-1">{props.children}</div>
}

const Tag = (props: { children: string }) => (
  <span
    className="text-sm bg-accent-100 px-1.5 pb-0.5 rounded-lg cursor-pointer"
    onClick={() => alert('TODO: go to search page')}
  >
    {props.children}
  </span>
)

export const Tags = (props: { children: string[] }) => (
  <div className="space-x-2">
    {props.children.map((tag, idx) => (
      <Tag key={idx}>{tag}</Tag>
    ))}
  </div>
)
