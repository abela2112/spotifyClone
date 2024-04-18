import React from 'react'
import { Header } from '../../component'
import { NavLink, Route, Routes } from 'react-router-dom'
import { IoHome } from 'react-icons/io5'
import DashBoardHome from './DashBoardHome'
import { isActiveStyle, isNotActiveStyle } from '../../utils/style'
import DashboardUsers from './DashboardUsers'
import DashboardSongs from './DashboardSongs'
import DashboardNewSong from './dashboardNewSong'

const Dashboard = () => {
    return (
        <div className='w-full h-auto flex flex-col bg-primary justify-center items-center'>
            <Header />
            <div className='w-[60%] flex bg-transparent items-center p-4 my-2 justify-evenly'>
                <NavLink to={'/dashboard/home'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
                    <IoHome className='text-2xl' />
                </NavLink>
                <NavLink to={'/dashboard/users'}  >
                    <p className='text-xl'>Users</p>
                </NavLink>
                <NavLink to={'/dashboard/songs'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
                    <p className='text-xl'>Songs</p>
                </NavLink>
                <NavLink to={'/dashboard/artists'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
                    <p className='text-xl'>Artist</p>
                </NavLink>
                <NavLink to={'/dashboard/albums'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
                    <p className='text-xl'>Albums</p>
                </NavLink>
            </div>
            <div className='my-4 w-full p-4'>
                <Routes>
                    <Route path='/home' element={<DashBoardHome />} />
                    <Route path='/users' element={<DashboardUsers />} />
                    <Route path='/songs' element={<DashboardSongs />} />
                    <Route path='/newSong' element={<DashboardNewSong />} />
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard