/**
 * This exists primarily to set the favicon of the website
 */
import { Html, Head, Main, NextScript } from 'next/document'

const faviconData = [
  ['apple-touch-icon', '57x57', 'apple-icon-57x57.png'],
  ['apple-touch-icon', '60x60', 'apple-icon-60x60.png'],
  ['apple-touch-icon', '72x72', 'apple-icon-72x72.png'],
  ['apple-touch-icon', '76x76', 'apple-icon-76x76.png'],
  ['apple-touch-icon', '114x114', 'apple-icon-114x114.png'],
  ['apple-touch-icon', '120x120', 'apple-icon-120x120.png'],
  ['apple-touch-icon', '144x144', 'apple-icon-144x144.png'],
  ['apple-touch-icon', '152x152', 'apple-icon-152x152.png'],
  ['apple-touch-icon', '180x180', 'apple-icon-180x180.png'],
  ['apple-touch-icon', '192x192', 'apple-icon-192x192.png'],
  ['icon', '192x192', 'android-icon-192x192.png', 'image/png'],
  ['icon', '16x16', 'favicon-16x16.png', 'image/png'],
  ['icon', '32x32', 'favicon-32x32.png', 'image/png'],
  ['icon', '96x96', 'favicon-96x96.png', 'image/png'],
]

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {faviconData.map((d) => (
          <link
            key={d[2]}
            rel={d[0]}
            sizes={d[1]}
            href={`/favicon/${d[2]}`}
            type={d[3]}
          />
        ))}
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
