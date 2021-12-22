import { GET_SONG_ID, PLAYING_SONG } from ".."

export const getIdSong = ({currentTrackIdSong}) => {
  return{
    type: GET_SONG_ID,
    currentTrackIdSong
  }
}

export const playingSong = ({isPlayingSong}) => {
  return{
    type: PLAYING_SONG,
    isPlayingSong
  }
}