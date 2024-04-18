import React from 'react'
import { useSelector } from 'react-redux'
import UserCard from '../../component/UserCard'

const DashboardUsers = () => {
    const { allUsers } = useSelector((state) => state.user)
    return (
        <div className='w-full p-4 flex flex-col justify-center items-center'>
            <div className='relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 rounded-md border border-gray-300'>
                <div className="absolute top-4 left-4">
                    <p className='text-xl font-semibold'>
                        Count :<span className='text-sm font-bold text-textColor'>{allUsers?.length}</span>
                    </p>
                </div>

                {/**table data  */}
                <div className='w-full min-w-[750px] flex justify-between items-center mb-2'>
                    <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Image</p>
                    <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Name</p>
                    <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Email</p>
                    <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Verified</p>
                    <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Created</p>
                    <p className='text-sm text-textColor font-semibold w-275 min-w-[160px] text-center'>Role</p>
                </div>
                {allUsers && allUsers.map((data, i) => (
                    <UserCard data={data} key={i} />
                ))}
            </div>
        </div>
    )
}

export default DashboardUsers