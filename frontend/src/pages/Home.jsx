import React from 'react'
import toast from "react-hot-toast"
import {useDispatch} from "react-redux"
import { setIsLoggedIn, setUser } from '../redux/slices/authSlice'
import useFetchAuthUser from '../hooks/useFetchAuthUser'
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
    <div className='container p-5 mx-auto flex justify-between items-center'>
     <h1 className="text-2xl font-bold ">
      Instagram
    </h1>
    <button className='bg-red-500 text-white rounded-lg px-4 py-2' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
