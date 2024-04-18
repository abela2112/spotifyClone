import React, { useState } from 'react'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import { Logo } from '../assets/img'
import { useSelector, useDispatch } from 'react-redux'
import { isActiveStyle, isNotActiveStyle } from '../utils/style'
import { FaCrown } from 'react-icons/fa'
import { setLogOut } from '../state'
import { getAuth } from 'firebase/auth'
import { app } from '../config/firebase.config'
import { motion } from 'framer-motion'

const Header = () => {
    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isMenu, setIsMenu] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const signOut = () => {
        const firebaseAuth = getAuth(app)
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem('auth', 'false')
            dispatch(setLogOut())

        })
        setRedirect(true)

    }
    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (

        <header className='flex items-center w-full p-4 md:py-2 md:px-6'>
            <NavLink to={'/'}>
                <img src={Logo} alt='logo' className='w-16' />
            </NavLink>
            <ul className='flex items-center justify-center ml-7 gap-2'>
                <li className='text-lg mx-5'><NavLink to={'/home'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>Home</NavLink></li>
                <li className='text-lg mx-5'><NavLink to={'/musics'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>Music</NavLink></li>
                <li className='text-lg mx-5'><NavLink to={'/premium'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>Premium</NavLink></li>
                <li className='text-lg mx-5'><NavLink to={'/contactus'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>contact Us</NavLink></li>

            </ul>
            <div onMouseEnter={() => setIsMenu(true)}
                onMouseLeave={() => setIsMenu(false)}
                className='flex item-center ml-auto cursor-pointer gap-4'>
                <img src={user?.picture} className='object-cover w-12 min-w-[44px] rounded-full shadow-lg' alt="" referrerPolicy='no-referrer' />
                <div className="flex flex-col">
                    <p className="text-textColor text-lg hover:text-headingColor font-semibold">{user?.name}</p>
                    <p className="flex text-xs text-gray-500 font-normal items-center gap-2">
                        premium member.<FaCrown className='text-yellow-500 -m-1 text-sm' />
                    </p>
                </div>
                {isMenu && <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className='absolute top-16 right-5 gap-3 p-4 w-275 bg-card rounded-lg z-10 backdrop-blur-sm shadow-lg flex flex-col'>
                    <NavLink>
                        <p className='text-textColor text-base hover:font-semibold duration-150 transition-all ease-in-out '>Profile</p>
                    </NavLink>
                    <NavLink>
                        <p className='text-textColor text-base hover:font-semibold duration-150 transition-all ease-in-out '>My Favorites</p>
                    </NavLink>
                    <hr />
                    {user?.isAdmin && <> <NavLink to={'/dashboard/home'}>
                        <p className='text-textColor text-base hover:font-semibold duration-150 transition-all ease-in-out '>Dashboard</p>
                    </NavLink>
                        <hr /></>
                    }
                    <NavLink>
                        <p className='text-textColor text-base hover:font-semibold duration-150 transition-all ease-in-out ' onClick={signOut}>Sign Out</p>
                    </NavLink>
                </motion.div>}
            </div>

        </header>
    )
}

export default Header