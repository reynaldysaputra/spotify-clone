import { combineReducers } from "redux";
import PlaylistReducers from "./playlist/playlistReducers";

export const allReducer = combineReducers({
  playlist: PlaylistReducers
})