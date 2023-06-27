import { GetStaticProps } from 'next'
import { resolve } from 'path'
import Image from 'next/image'
import { getPhotos } from 'lib/loaders'
import { getDate, parseDatedFile } from 'lib/util'
import { PhotoProps } from 'lib/types'

export const getStaticProps: GetStaticProps = async () => {
  const photos = getPhotos(resolve(process.cwd(), 'public/photos'))
  return { props: { photos } }
}

/**
 * One photo on the photos page.
 */
const Photo = (props: { filename: string; caption: string }) => {
  const { filename, caption } = props
  const { date } = parseDatedFile(filename)
  return (
    <div className="w-full mb-12">
      <div className="block w-full">
        <Image
          style={{ objectFit: 'cover', width: '100%' }}
          alt="photo"
          src={'/photos/' + props.filename}
          sizes="100vw"
          width={0}
          height={0}
        />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-lg">{caption}</h2>
        {date ? (
          <span className="text-sm text-gray-500">{getDate(date)}</span>
        ) : null}
      </div>
    </div>
  )
}

export default function Page(props: { photos: PhotoProps[] }) {
  return (
    <>
      {props.photos.map((p, i) => (
        <Photo key={i} filename={p.filename} caption={p.caption} />
      ))}
    </>
  )
}
