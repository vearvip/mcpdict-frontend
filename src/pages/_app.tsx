import type { AppProps } from 'next/app' 
import Layout from '~/src/layout'
import '~/src/styles/globals.less' 
 

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
    <Component {...pageProps} />
  </Layout> 
}

export default MyApp
