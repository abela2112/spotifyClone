import React, { useState } from 'react'
import moment from 'moment'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUsers, getAllUsers, userRoleUpdate } from '../api/fetchApi'
import { setAllUsers, updateUser } from '../state'
import { MdDelete } from 'react-icons/md'
import { TiUserDelete } from 'react-icons/ti'
updateUser
const UserCard = ({ data }) => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.user);
    const updateUserRole = async (token, userId, role) => {

        userRoleUpdate(token, userId, role).then((data) => {
            dispatch(updateUser(data));
            setIsUserRoleUpdate(false)

        })
    }
    const deleteUser = (token, userId) => {
        deleteUsers(token, userId).then((data) => {
            console.log(data)
            getAllUsers(token).then((users) => {
                dispatch(setAllUsers(users))
            })
        });
    }
    const createdAt = moment(new Date(data.date)).format('MMMM Do YYYY')
    const [isUserRoleUpdate, setIsUserRoleUpdate] = useState(false)
    const { user } = useSelector((state) => state.user)
    return (
        <motion.div className='relative w-full flex items-center justify-between py-4 bg-lightOverlay cursor-pointer
         hover:bg-card hover:shadow-md'>
            {data?._id !== user?._id && <motion.div className='absolute left-4 w-8 h-8 flex items-center justify-center bg-gray-200 p-4' onClick={() => deleteUser(token, data._id)}>
                <div><MdDelete className='text-xl text-red-400 hover:text-red-500' /></div>
            </motion.div>}
            <div className='w-275 min-w-[160px] flex items-center justify-center'>
                <img src={data?.picture} alt="user image" className='w-10 h-10 rounded-md min-w-[40px] shadow-md object-cover ' />
            </div>
            <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>{data?.name}</p>
            <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>{data.email}</p>
            <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>{data.email_verified ? "verified" : "not verified"}</p>
            <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>{createdAt}</p>
            <div className='relative w-275 min-w-[160px] flex justify-center items-center gap-6'>
                <p className='text-sm text-textColor font-semibold  text-center'>{data.isAdmin ? 'admin' : 'member'}</p>
                {data?._id !== user?._id &&
                    (<>
                        <motion.button whileTap={{ scale: 0.75 }} className='bg-purple-200 px-2 text-center text-[10px] hover:shadow-md
                         ' onClick={() => setIsUserRoleUpdate(true)}>{data.isAdmin ? "member" : "admin"}
                        </motion.button>
                        {isUserRoleUpdate && (<motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className='absolute z-10 top-6 p-4 left-4 flex flex-col gap-6 items-center justify-between bg-white'>
                            <p className='text-textColor text-center '>Are you sure, do you want this person as <span>{data.isAdmin ? "member" : "Admin"}</span></p>
                            <div className='flex items-center gap-2 '>
                                <motion.button whileTap={{ scale: 0.75 }} className='px-3 py-1 bg-blue-300 hover:shadow-md rounded-md mr-2 outline-none ' onClick={() => updateUserRole(token, data?._id, data?.isAdmin ? "member" : "Admin")}>Yes</motion.button>
                                <motion.button whileTap={{ scale: 0.75 }} className='px-3 py-1 bg-gray-400 hover:shadow-md rounded-md outline-none ' onClick={() => setIsUserRoleUpdate(false)}>No</motion.button>
                            </div>
                        </motion.div>)}
                    </>)}
            </div>

        </motion.div>
    )
}

export default UserCard