import { GET_SONG_ID, PLAYING_SONG } from "..";

const initialState= {
  currentTrackIdSong: '',
  isPlayingSong: false
}

function songReducers(state = initialState, {currentTrackIdSong, isPlayingSong, type}) {
  switch (type) {
    case GET_SONG_ID:
      return{
        ...state,
        currentTrackIdSong
      }
    case PLAYING_SONG:
      return{
        ...state,
        isPlayingSong: isPlayingSong
      }
    default: return state
  } 
}

export default songReducers;