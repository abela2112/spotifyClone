import { useParams } from "react-router-dom";
import { SongCard } from "../components";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const { searchTerm } = useParams()
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">show results for <span className="font-black">{searchTerm}</span></h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {/* <SongCard/> */}
      </div>
    </div>
  );
}

export default Search;
