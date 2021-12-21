import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  LogoutIcon
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';

function Sidebar(params) {
  const { data: session } = useSession();
  const [playlist, setPlaylist] = useState([]);
  const spotifyApi = useSpotify();
  
  useEffect(() => {
    if(spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists().then(data => {
        setPlaylist(data.body.items);
      })
    }
  }, [session, spotifyApi])

  return (
    <div className='text-gray-500 text-sm p-5 border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide'>
      <div className='space-y-4'>
        {console.log(playlist)}
        <button className='flex items-center space-x-2 hover:text-white' onClick={() => signOut()}>
          <LogoutIcon className='w-5 h-5' />
          <p>Log out</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='w-5 h-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='w-5 h-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <LibraryIcon className='w-5 h-5' />
          <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />

        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='w-5 h-5' />
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className='w-5 h-5' />
          <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='w-5 h-5' />
          <p>Your Episodes</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />

        {/* Playlists.... */}
        {playlist.map(playlists => (
          <p className='cursor-pointer hover:text-white' key={playlists.id}>
            {playlists.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar;