import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import useSpotify from "./useSpotify";

function useSongInfo() {
  const [songInfo, setSonginfo] = useState(null);
  const spotifyApi = useSpotify();
  const { currentTrackIdSong } = useSelector(state => state.song);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if(currentTrackIdSong !== ''){
        const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackIdSong}`, {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
          }
        }).then(res => res.json())

        setSonginfo(trackInfo);
      }
    }

    fetchSongInfo();
  }, [currentTrackIdSong])

  return songInfo;
}

export default useSongInfo;