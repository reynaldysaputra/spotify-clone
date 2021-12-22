import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { spotifyApi } from "../libs/spotify";
import { getPlaylistUser } from "../states/playlist/playlistActions";
import Songs from "./songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
]

function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const {playlistId, playlist} = useSelector(state => state.playlist);
  const dispatch = useDispatch();

  useEffect(() => {
    setColor(shuffle(colors).pop());
    spotifyApi
      .getPlaylist(playlistId)
      .then(data => {
        dispatch(getPlaylistUser(data.body))
      })
      .catch(error => console.log("Something when wrong!", error))
  }, [playlistId, spotifyApi])

  return(
    <div className="flex-grow relative overflow-y-scroll h-screen scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full pl-1 pr-2" onClick={signOut}>
          <img 
            className="w-10 h-10 rounded-full" 
            src={session?.user.image !== undefined ? session.user.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png'} 
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section className={`flex items-end text-white w-full space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8`}>
        <img src={playlist.images?.[0] !== undefined ? playlist.images[0].url : 'https://balancecure.video/styles/WeTube/theme/images/playlist-default.jpg'} className="w-44 h-44 shadow-2xl" />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs/>
      </div>
    </div>
  )
}

export default Center;