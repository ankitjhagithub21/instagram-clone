import React from 'react'
import toast from "react-hot-toast"
import {useDispatch} from "react-redux"
import { setIsLoggedIn, setUser } from '../redux/slices/authSlice'
import useFetchAuthUser from '../hooks/useFetchAuthUser'
import Sidebar from '../components/Sidebar'
import {Routes,Route} from "react-router-dom"
import Feed from '../components/Feed'
import Profile from '../components/Profile'
const Home = () => {
  useFetchAuthUser()
  const dispatch = useDispatch()
  const handleLogout = async() =>{
    const url = `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`
    try{
      const res = await fetch(url,{
        credentials:'include'
      })
      const data = await res.json()
      if(data.success){
        toast.success(data.message)
        dispatch(setIsLoggedIn(false))
        dispatch(setUser(null))
          
      }else{
        toast.error(data.message)
      }
    }catch(error){
      
      console.log(error)
    }
  }
  return (
    <main className='h-screen w-full flex'>
      <Sidebar handleLogout={handleLogout}/>
     <div className='md:w-[50%] p-3 w-full overflow-y-scroll'>
     <Routes>
        <Route path='/' element={<Feed/>}/>
        <Route path='/:username' element={<Profile/>}/>
      </Routes>
     </div>
    </main>
  )
}

export default Home
