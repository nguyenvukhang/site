import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Header } from '../components/Header'
import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  console.log(router.route)

  if (router.route === '/meme') {
    return (
      <div style={{ backgroundColor: 'red', margin: '100px' }}>
        <Component {...pageProps} />
      </div>
    )
  }
  return (
    <div>
      <Header router={router} />
      <Component {...pageProps} />
    </div>
  )
}
