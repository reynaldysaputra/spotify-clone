import Head from 'next/head'
import Center from '../components/center'
import Sidebar from '../components/sidebar'

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex'>
        {/* Sidebar */}
        <Sidebar/>
        {/* Center */}
        <Center/>
      </main>

      {/* Player */}
    </div>
  )
}
