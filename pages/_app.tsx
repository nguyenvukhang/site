import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { HomeLayout } from '../components/Layouts'
import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  // if (router.route.startsWith('/posts/')) {
  //   return (
  //     <BlogPostLayout router={router}>
  //       <Component {...pageProps} />
  //     </BlogPostLayout>
  //   )
  // }
  return (
    <HomeLayout router={router}>
      <Component {...pageProps} />
    </HomeLayout>
  )
}
