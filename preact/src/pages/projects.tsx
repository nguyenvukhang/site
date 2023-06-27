import { Sub, VStack } from '../layouts/all'
import { Header } from '../components/header'
import { EndFlair } from '../assets/icons'
import { projectData } from '../json'
import Prelude from '../../projects/prelude.mdx'
import { anchor } from '../types'

const projects = Object.values(
  import.meta.glob('../../projects/*.mdx', {
    eager: true,
  })
) as any[]

export default (_: { path: string }) => {
  return (
    <VStack>
      <Sub.Narrow>
        <Header />
        <Prelude />
      </Sub.Narrow>
      <div class="bg-slate-900 flex flex-col w-full items-center">
        <Sub.Narrow class="py-10">
          <h1 class="text-bg mt-0">Table of Contents</h1>
          <div class="grid grid-cols-2 font-medium">
            {projectData.filter(v => Boolean(v.title)).map((v) => {
              console.log(anchor(v.title))
              return (
                <a class="text-bg-dim" href={'#' + anchor(v.title)}>
                  {v.title}
                </a>
              )
            })}
          </div>
        </Sub.Narrow>
      </div>
      <Sub.Wide>
        {projects.map((v: any) => (
          <v.default />
        ))}
      </Sub.Wide>
      <EndFlair />
    </VStack>
  )
}
