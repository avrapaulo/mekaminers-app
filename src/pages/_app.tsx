import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { MoralisProvider } from 'react-moralis'
import { Layout } from 'components/layout/index'
import 'styles/index.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APPLICATION_ID}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
    >
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </MoralisProvider>
  )
}

export default App
