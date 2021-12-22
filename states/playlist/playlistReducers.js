import { GET_PLAYLIST, GET_PLAYLIST_ID } from "..";

const initialState= {
  playlistId: "6y5rmN4SL0aff7gzc9UwHl",
  playlist: ""
}

function PlaylistReducers(state = initialState, {type, playlistId, playlist}) {
  switch (type) {
    case GET_PLAYLIST_ID:
      return{
        ...state,
        playlistId
      }
    case GET_PLAYLIST:
      return{
        ...state,
        playlist
      }
    default: return state      
  }
}

export default PlaylistReducers;