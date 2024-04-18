import React from 'react'
import { bgColor } from '../utils/style'
const Card = ({ icon, name, count }) => {
    const bg_Color = bgColor[parseInt(Math.random() * bgColor.length)]

    return (
        <div style={{ background: `${bg_Color}` }} className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md`}>
            {icon}
            <p className='text-xl text-textColor font-semibold'>{name}</p>
            <p className='text-xl text-textColor'>{count}</p>
        </div>
    )
}

export default Card