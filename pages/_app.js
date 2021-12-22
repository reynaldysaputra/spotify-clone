import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { MyStore } from '../states/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <Provider store={MyStore}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  )
}

export default MyApp;
