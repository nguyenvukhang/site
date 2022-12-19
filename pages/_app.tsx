import { MainLayout } from '@components/Layouts'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
      <MainLayout router={router}>
        <Component {...pageProps} />
      </MainLayout>
  )
}
