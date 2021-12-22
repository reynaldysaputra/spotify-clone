import { useSelector } from "react-redux";
import Song from "./song";

function Songs() {
  const {playlist} = useSelector(state => state.playlist);

  return(
    <div className="px-8 pb-28 flex flex-col space-y-1 text-white">
      {playlist?.tracks?.items.map((track, index) => (
        <Song key={track.track.id} track={track} order={index} />
      ))}
    </div>
  )
}

export default Songs;