import { combineReducers } from "redux";
import PlaylistReducers from "./playlist/playlistReducers";
import songReducers from "./song/songReducers";

export const allReducer = combineReducers({
  playlist: PlaylistReducers,
  song: songReducers
})