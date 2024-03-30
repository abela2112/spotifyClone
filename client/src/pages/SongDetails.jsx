import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setActiveSong } from "../redux/features/playerSlice";
import { DetailsHeader } from "../components"
import { useGetSongDetailsQuery } from "../redux/services/shazamCoreApi";
const SongDetails = () => {
    const { songid } = useParams()
    const { activeSong, isPlaying } = useSelector(state => state.player)
    const { data, isFetching } = useGetSongDetailsQuery({ songid })
    const songData = data?.data
    return (
        <div className="flex flex-col">
            <DetailsHeader songData={songData} />
            <div className="mb-10">
                <h2 className="text-white text-xl font-bold">Lyrics:</h2>
            </div>
            <div className="mt-5" >
                {songData?.lyrics ? (<p>{songData?.lyrics}</p>) : (<p>sorry ! there is no lyrics for this music</p>)}
            </div>
        </div >
    )
};

export default SongDetails;
