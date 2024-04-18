import React, { useEffect } from 'react'
import Card from '../../component/card'
import { useSelector, useDispatch } from 'react-redux'
import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from '../../api/fetchApi'
import { setAllAlbum, setAllArtist, setAllSongs, setAllUsers } from '../../state'
import { FaUsers } from 'react-icons/fa'
import { GiLoveSong, GiMusicalNotes } from 'react-icons/gi'
import { RiUserStarFill } from 'react-icons/ri'
const DashBoardHome = () => {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.user)

    const { allUsers, allSongs, allAlbums, allArtists } = useSelector(state => state.user)
    useEffect(() => {
        if (!allUsers) {
            getAllUsers(token).then(users => dispatch(setAllUsers(users)))
        }
        if (!allSongs) {
            getAllSongs(token).then(songs => dispatch(setAllSongs(songs)))
        }
        if (!allAlbums) {
            getAllAlbums(token).then(albums => dispatch(setAllAlbum(albums)))
        }
        if (!allArtists) {
            getAllArtists(token).then(artists => dispatch(setAllArtist(artists)))
        }

    }, [])
    return (

        <div className='w-full p-6 flex flex-wrap items-center justify-evenly'>
            <Card icon={<FaUsers className='text-3xl text-textColor' />} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0} />
            <Card icon={<GiLoveSong className='text-3xl text-textColor' />} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0} />

            <Card icon={<RiUserStarFill className='text-3xl text-textColor' />} name={"Artists"} count={allArtists?.length > 0 ? allArtists?.length : 0} />

            <Card icon={<GiMusicalNotes className='text-3xl text-textColor' />} name={"Albums"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} />

        </div>
    )
}

export default DashBoardHome