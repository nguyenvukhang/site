type OnClickTag = (s: string) => void

/**
 * One display tag in the list of posts.
 */
export const Tag = (props: {
  children: string
  onClick?: OnClickTag
  active: boolean
}) => {
  const tag = props.children
  const onClick = props.onClick ? props.onClick : () => {}
  const buttonCss = props.onClick ? 'cursor-pointer' : ''
  return (
    <span
      onClick={() => onClick(tag)}
      className={`select-none inline-block text-xs whitespace-nowrap ${
        props.active ? 'bg-accent-100' : 'bg-gray-100'
      } rounded-md px-1 pb-[1px] ${buttonCss}`}
    >
      {tag}
    </span>
  )
}

/**
 * The tag filter list that is used to filter posts by tags.
 */
export const TagFilterList = (props: {
  toggle: OnClickTag
  reset: OnClickTag
  tags: Record<string, boolean>
}) => {
  return (
    <div className="mb-2">
      {Object.keys(props.tags).map((tag, i) => (
        <span key={i} className="mr-2">
          <Tag onClick={props.toggle} active={props.tags[tag]}>
            {tag}
          </Tag>
        </span>
      ))}
      <span key={-1} className="mr-2">
        <Tag onClick={props.reset} active={true}>
          clear
        </Tag>
      </span>
    </div>
  )
}
