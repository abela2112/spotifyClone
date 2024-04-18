import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { app } from '../config/firebase.config'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { validateUser } from '../api/fetchApi'
import { useDispatch } from 'react-redux'
import { setLogOut, setLogin } from '../state'
import { LoginBg } from '../assets/video'
const Login = ({ setAuth }) => {
    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            if (userCred) {

                firebaseAuth.onAuthStateChanged((userCred) => {
                    if (userCred) {
                        userCred.getIdToken().then((token) => {
                            validateUser(token).then((user) => {
                                dispatch(setLogin(user))
                                navigate('/home')
                            })
                        })
                        setAuth(true);
                        window.localStorage.setItem('auth', "true")
                        navigate('/home', { replace: true })
                    }
                    else {
                        setAuth(false)
                        dispatch(setLogOut())
                        window.localStorage.setItem('auth', 'false')
                    }
                })
            }

        })
    }
    useEffect(() => {
        if (window.localStorage.getItem('auth') === 'true') {
            navigate('/home', { replace: true })
        }
    }, [])
    return (
        <div className='relative w-screen h-screen'>
            <video src={LoginBg}
                type="video/mp4"
                muted
                autoPlay
                loop
                className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-darkOverlay flex justify-center p-4 items-center'>
                <div className='w-full md:w-375 flex p-4 flex-col justify-center items-center bg-lightOverlay backdrop-blur-md shadow-2xl rounded-md'>
                    <div className='flex gap-2 justify-center items-center bg-cardOverlay px-4 py-2 rounded-md hover:bg-card hover:shadow-md cursor-pointer duration-100 transition-all' onClick={loginWithGoogle}>
                        <FcGoogle className='text-xl' />
                        sign with google
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login