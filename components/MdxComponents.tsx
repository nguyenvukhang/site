import { Fragment } from 'react'
import NextImage from 'next/image'

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

export const Image = (props: { src: string; w?: number; h?: number }) => (
  <div className="flex justify-center mb-4">
    {props.w || props.h ? (
      <NextImage
        alt="image"
        src={props.src}
        width={props.w}
        height={props.h ? props.h : props.w ? props.w : undefined}
      />
    ) : (
      <NextImage
        alt="image"
        src={props.src}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
    )}
  </div>
)
