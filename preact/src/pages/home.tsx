import { MainLayout } from '../layouts/all'
import { getCurrentUrl } from 'preact-router'

export function Home({ path }: any) {
  return (
    <MainLayout>
      <h1>{path}</h1>
      <div>current url is [{getCurrentUrl()}]</div>
    </MainLayout>
  )
}
