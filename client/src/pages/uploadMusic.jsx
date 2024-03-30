import React, { useState } from 'react'
import axios from 'axios'
const UploadMusic = () => {
    const [name, setName] = useState('')
    const [img, setImage] = useState('')
    const [song, setSong] = useState('')
    const uploadMusic = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('name', name)
        formData.set('song', song[0])
        formData.set('img', img[0])

        console.log(formData)
        const { data } = await axios.post('http://localhost:5000/api/song/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        console.log(data)
    }
    return (
        <div className='flex flex-col p-4'>
            <form onSubmit={uploadMusic}>
                <div className=''>
                    <label>Name</label>
                    <input type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className=''>
                    <label>image</label>
                    <input type="file" placeholder='image' onChange={(e) => setImage(e.target.files)} />
                </div>
                <div className=''>
                    <label>song</label>
                    <input type="file" placeholder='name' onChange={(e) => setSong(e.target.files)} />
                </div>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default UploadMusic