import { MainLayout } from '../layouts/all'
import { HTML } from '../types'

const Image = (props: HTML['img']) => {
  const { children, ...rest } = props
  return (
    <div class='my-12'>
      <img {...rest} />
      <p class='text-center'>{children}</p>
    </div>
  )
}

export default (_: { path: string }) => {
  return (
    <MainLayout>
      <Image src="/photos/2017-03-12-njcc.jpg">My closest race, ever.</Image>
      <Image src="/photos/2018-08-31-17S6F.jpg">
        My very jumbled-up class of 2018.
      </Image>
      <Image src="/photos/2019-12-24-golf.jpg">
        One of the best days wearing green.
      </Image>
      <Image src="/photos/2018-02-06-hcanoe.jpg">
        The canoeing team in 2018, my graudating year.
      </Image>
    </MainLayout>
  )
}
