import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import PlayPause from './PlayPause'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import 'swiper/css'
import 'swiper/css/free-mode'
import { useDispatch, useSelector } from 'react-redux'
import { useGetSongsByGenreQuery, useGetTopChartsQuery } from '../redux/services/shazamCoreApi'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { SongDetails } from '../pages'

const TopPlay = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const { data } = useGetSongsByGenreQuery()
  console.log(data)
  const divRef = useRef(null)
  const topPlay = data?.data?.slice(0, 5)
  const handlePlayClick = (song, i) => {
    console.log('handlePlayClick');
    dispatch(setActiveSong({ song, i }));
    dispatch(playPause(true));
  }
  const handlePauseClick = () => {
    console.log('handlePauseClick');
    dispatch(playPause(false))
  }
  //to bigin from the everytime the page loads
  useEffect(() => {

  })
  const TopChartCard = ({ song, i, isPlaying, activeSong, handlePause, handlePlay }) => (
    <div className='w-full flex flex-row justify-between items-center bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2'>
      <h3 className='text-base text-white font-bold mr-3'>{i + 1}</h3>
      <div className='flex flex-row items-center flex-1'>
        <img src={`http://localhost:5000/${song?.img}`} alt={song.name} className='w-20 h-20 object-contain rounded-lg' />
        <div className='flex flex-col mx-3 item-center'>
          <Link to={`/songs/${song?._id}`}>
            <p className='text-xl font-bold text-white'>title</p>
          </Link>

          <Link to={'/artists'}>
            <p className='text-base text-gray-300 mt-1'>subtitle</p>
          </Link>
        </div>
      </div>
      <PlayPause song={song} isPlaying={isPlaying} activeSong={activeSong} handlePause={handlePause} handlePlay={handlePlay} />
    </div>
  )
  return (
    <div className="max-w-full xl:max-w-[500px] xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 flex flex-col" >
      <div className='w-full flex flex-col'>
        <div className='flex flex-row justify-between items-center gap-4'>
          <h2 className='text-2xl text-white font-bold'>Top Charts</h2>
          <Link to={'/top-charts'}><p className='text-base text-gray-300 cursor-pointer'>see more</p></Link>

        </div>
        <div className='flex flex-col mt-4 gap-1'>
          {topPlay?.map((song, i) => (
            <TopChartCard key={i} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} handlePause={handlePauseClick} handlePlay={() => handlePlayClick(song, i)} />
          ))}
        </div>

      </div>

      <div className='w-full flex flex-col mt-8'>
        <div className='flex flex-row justify-between items-center gap-4'>
          <h2 className='text-2xl text-white font-bold'>Top Artists</h2>
          <Link to={'/top-artists'}><p className='text-base text-gray-300 cursor-pointer'>see more</p></Link>

        </div>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={15}
          freeMode
          className='mt-4'
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}

        >
          {topPlay?.map((song, i) => (
            <SwiperSlide key={i}
              className='shadow-lg rounded-full animate-slideright'
              style={{ width: '25%', height: 'auto' }}>
              <Link to={'/'}>

                <img src={`http://localhost:5000/${song?.img}`} alt={song?.name} className='rounded-full w-full object-cover' />
              </Link>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </div>
  );

}
export default TopPlay;
