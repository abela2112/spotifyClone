import { Loader, SongCard, Error } from "../components";
import { genres } from '../assets/constants'
import { useGetSongsByGenreQuery } from "../redux/services/shazamCoreApi";
import { useSelector } from "react-redux";
const Discover = () => {
    const { data, isFetching, error } = (useGetSongsByGenreQuery())
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    console.log(data)
    if (isFetching) {
        return <Loader title={'loading songs ...'} />
    }
    // if (error) {
    //     return <Error />
    // }
    return (
        <div className="flex flex-col">
            <div className="w-full flex flex-col justify-between items-center sm:flex-row mt-4 mb-10">
                <h2 className="text-3xl text-white text-left font-bold">Discover</h2>
                <select className="bg-black text-gray-300 rounded-md sm:mt-0 mt-5 p-3 outline-none text-sm"
                    value={""}
                    onChange={(e) => { }}>
                    {genres.length > 0 && genres.map((genre) => (<option key={genre.value} value={genre.value}>{genre.title}</option >))}
                </select>
            </div>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, i) => (
                    <SongCard key={song?._id} i={i} song={song} activeSong={activeSong} isPlaying={isPlaying} />
                ))}
            </div>
        </div>
    )
}




export default Discover;
