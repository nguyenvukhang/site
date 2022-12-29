import { Fragment } from 'react'

export const Kbd = (props: { children: string }) => {
  const nospace = props.children.replace(/ /g, '')
  const parts = nospace.includes('+') ? nospace.split('+') : [nospace]
  const style = {
    background: 'rgb(220, 220, 220)',
    color: 'rgb(10, 10, 10)',
    fontWeight: 600,
    fontSize: 'smaller',
    borderRadius: '4px',
    boxShadow: '0 3px rgb(189, 189, 189)',
    padding: '1px 3px 0',
  }
  return (
    <>
      <kbd style={style}>{parts.shift()}</kbd>
      {parts.map((d: string, i: number) => (
        <Fragment key={i}>
          <span style={{ margin: '0 0.2ch' }}>+</span>
          <kbd style={style}>{d}</kbd>
        </Fragment>
      ))}
    </>
  )
}
