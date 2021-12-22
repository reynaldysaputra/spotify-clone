import { HeartIcon, VolumeUpIcon  } from "@heroicons/react/outline";
import { RewindIcon, SwitchHorizontalIcon, FastForwardIcon, PauseIcon, ReplyIcon, PlayIcon } from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { getIdSong, playingSong } from "../states/song/songActions";

function Player(params) {
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [volume, setVolume]= useState(50);
  const { currentTrackIdSong, isPlayingSong } = useSelector(state => state.song);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if(!songInfo){
      spotifyApi.getMyCurrentPlaybackState().then(data => {
        dispatch(getIdSong(data.body?.item?.id));

        spotifyApi.getMyCurrentPlaybackState().then(data => {
          dispatch(playingSong(data.body?.is_playing));
        })
      })
    }
  }

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then(data => {
      if(data.body.is_playing) {
        spotifyApi.pause();
        dispatch(playingSong(false));
      }else {
        spotifyApi.play();
        dispatch(playingSong(true));
      }
    }).catch(error => alert('No songs can be played, please activate your premium account to access songs'))
  }

  useEffect(() => {
    if(spotifyApi.getAccessToken() && !currentTrackIdSong){
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdSong, session])

  useEffect(() => {
    if(volume > 0 && volume < 100){
      debounceAdjustVolume(volume);
    }
  }, [volume])

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      if(songInfo !== null){
        spotifyApi.setVolume(volume)
        .catch(error => {})
      }
    }, 500, [])
  )

  return(
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img 
          className="hidden md:inline h-10 w-10"
          src={!songInfo ? songInfo?.album.images?.[0]?.url : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/No_music.svg/1200px-No_music.svg.png'}
          alt="" 
        />
        <div>
          <h3>{!songInfo ? songInfo?.name : 'No Music'}</h3>
          <p>{!songInfo ? songInfo?.artists?.[0]?.name : 'No Artists'}</p>
        </div>
      </div>
      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {isPlayingSong ? <PauseIcon className="button" onClick={handlePlayPause}/> : <PlayIcon className="button" onClick={handlePlayPause}/>}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>
      {/* Right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeUpIcon className="button" />
        <input 
          type="range" 
          value={volume} 
          min={0} 
          max={100} 
          className="w-14 md:w-20"
          onChange={e => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  )
}

export default Player;