import {getProviders, signIn} from 'next-auth/react';

function Login({ providers }) {
  return(
    <div className='flex flex-col items-center justify-center bg-black w-full min-h-screen'>
      <img src="https://links.papareact.com/9xl" className="w-52 mb-5"/>
      {console.log(providers)}
      {Object.values(providers).map(provider => (
        <div key={provider.name} onClick={() => signIn(provider.id, {callbackUrl: '/'})}>
          <button className='bg-[#18D860] p-5 rounded-xl text-white'>Login with {provider.name}</button>
        </div>
      ))}
    </div>
  )
}

export default Login;

export async function getServerSideProps(){
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  }
}