import React from 'react'
import { motion } from 'framer-motion'
import { Logo } from '../assets/img'
import { IoTrash } from 'react-icons/io5'
const SongCard = ({ data }) => {
    // const bg_Color = bgColor[parseInt(Math.random() * bgColor.length)]

    return (
        <motion.div className={`relative px-2 py-4 w-40 gap-3 min-w-210 rounded-lg shadow-md flex flex-col justify-center items-center  bg-gray-100 hover:bg-card`}>
            <div className='w-40 min-w-[160px] h-40 min-h-[160px] overflow-hidden drop-shadow-lg rounded-lg relative'>
                <motion.img src={data?.picture}
                    whileHover={{ scale: 1.05 }}
                    className='w-full h-full object-cover rounded-lg' alt="song.jpg" />
                <p className='text-base text-headingColor font-semibold my-2'>{data?.name.length > 30 ? data.name.slice(0, 25) : data.name}
                    <span className='block text-gray-400 text-sm my-1'>{data?.artist?.name}</span>
                </p>
            </div>
            <div className='absolute w-full bottom-2 left-2 flex items-center justify-between'>
                <motion.i whileTap={{ scale: 0.75 }} className='text-base text-red-400 hover:text-red-600 drop-shadow-md'><IoTrash />
                </motion.i>
            </div>
        </motion.div>
    )
}

export default SongCard