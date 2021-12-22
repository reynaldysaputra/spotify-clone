import { GET_SONG_ID, PLAYING_SONG } from ".."

export const getIdSong = (payload) => {
  return{
    type: GET_SONG_ID,
    currentTrackIdSong: payload
  }
}

export const playingSong = (payload) => {
  return{
    type: PLAYING_SONG,
    isPlayingSong: payload
  }
}