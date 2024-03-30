import { useDispatch } from 'react-redux'
import PlayPause from './PlayPause';
import { Link } from 'react-router-dom'
import { playPause, setActiveSong } from '../redux/features/playerSlice';
const SongCard = ({ song, isPlaying, activeSong, i }) => {
  console.log(song);
  const dispatch = useDispatch()
  const handlePlayClick = () => {
    console.log('handlePlayClick');
    dispatch(setActiveSong({ song, i }));
    dispatch(playPause(true));
  }
  const handlePauseClick = () => {
    console.log('handlePauseClick');
    dispatch(playPause(false))
  }
  return (
    <div className="flex flex-col bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup w-[250px] rounded-lg cursor-pointer p-4">
      <div className='relative h-56 w-full group'>
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 ${activeSong === song?.name ? "bg-black flex bg-opacity-70" : "hidden"} group-hover:flex`}>
          <PlayPause
            song={song}
            activeSong={activeSong}
            isPlaying={isPlaying}
            handlePlay={handlePlayClick}
            handlePause={handlePauseClick} />
        </div>
        <img src={`http://localhost:5000/${song?.img}`} alt="song cover" />
      </div>
      <div className='mt-4 flex flex-col'>
        <p className='font-semibold text-lg truncate text-white '>
          <Link to={`/songs/${song?._id}`}>title</Link>
        </p>
        <p className='font-semibold text-sm truncate text-gray-300 mt-1 '>
          <Link to={`/songs/${song?._id}`}>sub title</Link>
        </p>
      </div>
    </div>
  )
}

export default SongCard;
