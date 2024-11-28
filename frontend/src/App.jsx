import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import {useAuthStore} from './store/useAuthStore'
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  }, [checkAuth]);

  console.log({authUser});
  if(isCheckingAuth && !authUser){
    return <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
  }
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login" />}></Route>
          <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to = '/' />}></Route>
          <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to = '/'/>}></Route>
          <Route path='/settings' element={<SettingsPage/>}></Route>
          <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login" />}></Route>

        </Routes>


      <div><Toaster/></div>
      </div>

      
    </>
  )
}

export default App
