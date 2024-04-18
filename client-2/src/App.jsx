
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { Home, Login } from './pages';
import { Dashboard } from './pages/dashboard';
import { app } from './config/firebase.config';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion'
import { validateUser } from './api/fetchApi'
import { useDispatch } from 'react-redux'
import { setLogOut, setLogin } from './state'


const App = () => {
  const firebaseAuth = getAuth(app)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [Auth, setAuth] = useState(false || window.localStorage.getItem('auth') === "true");
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          validateUser(token).then((user) => {

            dispatch(setLogin(user))
          });
          navigate('/home')

        })
      }
      else {
        setAuth(false);
        dispatch(setLogOut())
        window.localStorage.setItem("auth", "false")

      }
    })
  }, []);

  return (
    <AnimatePresence mode='wait'>
      <div className='flex h-auto min-w-[680px] justify-center items-center bg-primary'>
        <Routes>

          <Route index element={<Login setAuth={setAuth} />} />
          <Route path='/home' element={Auth ? <Home /> : <Navigate to='/' />} />
          <Route path='/dashboard/*' element={Auth && <Dashboard />} />

        </Routes>

      </div>
    </AnimatePresence>
  );
};

export default App;
