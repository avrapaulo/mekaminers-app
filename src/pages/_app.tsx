import { useEffect } from 'react'
import { AppProps } from 'next/app'
import Script from 'next/script'
import { MoralisProvider } from 'react-moralis'
import { RecoilRoot } from 'recoil'
import { useRouter } from 'next/router'
import { GA_ID, pageview } from 'lib/ga'
import { Layout } from 'components/layout'
import 'styles/index.css'
import { Toaster } from 'react-hot-toast'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const { active } = router.query

  useEffect(() => {
    const handleRouteChange = url => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script
        id="GTMscript"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="GTM"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `
        }}
      />
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APPLICATION_ID}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      >
        <RecoilRoot>
          <Toaster position="top-right" reverseOrder={false} />
          <Layout>
            <Component {...pageProps} />
            {/* {active ? (
              <Component {...pageProps} />
            ) : (
              <div className="uppercase flex justify-center items-center h-screen -mt-16 lg:-mt-28 text-white font-bold -z-10">
                <img alt="" width="500" height="100" src="/ops.png" />
              </div>
            )} */}
          </Layout>
        </RecoilRoot>
      </MoralisProvider>
    </>
  )
}

export default App
