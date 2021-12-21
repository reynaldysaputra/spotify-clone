import { GET_PLAYLIST, GET_PLAYLIST_ID } from "..";

export function getPlaylistId(payload) {
  return{
    type: GET_PLAYLIST_ID,
    playlistId: payload
  }
}

export function getPlaylist(payload) {
  return{
    type: GET_PLAYLIST,
    playlist: payload
  }
}