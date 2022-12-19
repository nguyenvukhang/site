import { GetStaticProps } from 'next'
import { resolve, } from 'path'
import Image from 'next/image'
import { getPhotos } from 'lib/loaders'
import { PhotoProps } from 'lib/types'

// get DD Mmm YYYY from a date object
function getDate(d: Date) {
  return d.toLocaleDateString('en-sg', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const Photo = (props: { filename: string; caption?: string }) => {
  const { filename, caption } = props
  const date = new Date(filename.split('-').slice(0, 3).join('-'))
  return (
    <div className="w-full mb-12">
      <div className="block w-full">
        <Image
          style={{ objectFit: 'cover', width: '100vw' }}
          alt="photo"
          src={'/photos/' + props.filename}
          width={700} // will be overridden by `style` prop
          height={475} // will be overridden by `style` prop
        />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-lg">{caption ? caption : 'A cool photo.'}</h2>
        {date ? (
          <span className="text-sm text-gray-500">{getDate(date)}</span>
        ) : null}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const dir = resolve(process.cwd(), 'public/photos')
  return { props: { photos: getPhotos(dir, 100) } }
}

export default function Photos(props: { photos: PhotoProps[] }) {
  return (
    <div className="mb-24">
      {props.photos.map((p, i) => (
        <Photo key={i} filename={p.filename} caption={p.caption} />
      ))}
    </div>
  )
}
