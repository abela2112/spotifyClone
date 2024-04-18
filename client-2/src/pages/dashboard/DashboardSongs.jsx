import React, { useEffect, useState } from 'react'
import { IoAdd, IoPause, IoPlay, IoTrash } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { AiOutlineClear } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSongs } from '../../api/fetchApi'
import { setAllSongs } from '../../state'
import SongCard from '../../component/SongCard'

const DashboardSongs = () => {
    const [filterSongs, setFilterSongs] = useState("")
    // const [isFocus, setIsFocus] = useState(false)
    const dispatch = useDispatch()
    const { allSongs } = useSelector((state) => state.user)
    useEffect(() => {
        if (!allSongs) {
            getAllSongs(token).then((allSongs) => {
                dispatch(setAllSongs(allSongs))
            })
        }
    }, [allSongs, dispatch])
    return (
        <div className='flex flex-col items-center w-full justify-center p-4'>
            <div className='flex justify-center items-center gap-20'>
                <NavLink className='flex justify-center items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer' to={'/dashbord/newSong'}>
                    <IoAdd />
                </NavLink>
                <div>
                    <input type="text" placeholder='search Here ...'
                        className={`w-52 px-4 py-2 border outline-none rounded-md border-gray-300 focus:border-gray-500 focus:shadow-md bg-transparent duration-150 ease-in-out transition-all`}
                        value={filterSongs}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={(e) => setFilterSongs(e.target.value)} /></div>
                <i><AiOutlineClear /></i>
            </div>
            <div className='w-full p-4 rounded-md border border-gray-300 relative mt-4'>
                <div className='absolute top-4 left-4'>
                    <p className='text-sm'>count:
                        <span className='text-sm font-semibold text-textColor'>{allSongs?.length}</span>
                    </p>
                </div>
                <div className='flex w-full flex-wrap justify-evenly items-center gap-3'>
                    {/* {allSongs.length > 0 && allSongs.map((data) => (
                        <SongCard data={data} />

                    ))} */}
                    <SongCard />
                </div>
            </div>
        </div>
    )
}

export default DashboardSongs