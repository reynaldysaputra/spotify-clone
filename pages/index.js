import Head from 'next/head'
import Sidebar from '../components/sidebar'

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Sidebar */}
        <Sidebar/>
        {/* Center */}
      </main>

      {/* Player */}
    </div>
  )
}
