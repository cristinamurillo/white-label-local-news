import '@/styles/preflight.css'

import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="https://unpkg.com/feather-icons" />
      <Script id="load-feather-icons">
        {'feather.replace()'}
      </Script>
    </>
  )
}
