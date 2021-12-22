import { useDispatch } from "react-redux";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../libs/time";
import { getIdSong, playingSong } from "../states/song/songActions";

function Song({track, order}) {
  const dispatch = useDispatch();
  const spotifyApi = useSpotify();

  const playSong = () => {
    dispatch(getIdSong(track.track.id));
    dispatch(playingSong(true));
    spotifyApi.play({
      uris: track.track.uri,
    })
    console.log(track)
  }

  return(
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 cursor-pointer rounded-lg" onClick={playSong}>
      <div className="flex items-center space-x-4">
        <p>{order + 1}.</p>
        <img src={track.track.album.images[0].url} className="w-10 h-10"  />
        <div>
          <p className="text-white w-36 lg:w-64 truncate">{track.track.name}</p>
          <p>{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song;