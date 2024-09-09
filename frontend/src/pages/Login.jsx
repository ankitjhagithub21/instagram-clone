import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { setIsLoggedIn } from '../redux/slices/authSlice'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())
    const url = `${import.meta.env.VITE_SERVER_URL}/api/auth/login`
    setLoading(true)
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      })
      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        dispatch(dispatch(setIsLoggedIn(true)))
        navigate("/")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Something went wrong.")
      console.log(error)
    } finally {
      setLoading(false)
    }

  }
  return (
    <section className='h-screen w-full flex items-center justify-center p-5'>

      <div className='lg:w-1/3 md:w-1/2 w-full bg-white custom-shadow rounded-lg p-5'>
        <h2 className='text-center mb-5 text-3xl font-bold font-serif'>Instagram</h2>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>

          <input type="email" placeholder='Enter your email' name='email' className='border-2 rounded-lg p-2' required />
          <div className='relative'>
            <input type={showPassword ? 'text' : 'password'} placeholder='Enter your password' name='password' className='border-2 w-full rounded-lg p-2' required />
            <button type='button' className='absolute top-3.5 text-gray-700 right-2' onClick={() => setShowPassword(!showPassword)}>
              {
                showPassword ? <FaEyeSlash /> : <FaEye />
              }
            </button>
          </div>

          <button type='submit' disabled={loading} className={` ${loading ? 'bg-indigo-300' : 'bg-indigo-500 hover:bg-indigo-600'} text-white p-2 rounded-lg`}>
            {
              loading ? 'Processing...' :'Login'
            }
          </button>
        </form>
        <Link to={"/forgot-password"} className='mt-3 inline-block  text-blue-500 underline'>Forgot Password</Link>
        <div className='text-center  text-gray-600'>
          
          <p className='mt-3'>Or</p>
          <p>Don't have an account ? <Link to={"/register"} className='text-indigo-500 hover:text-underline'>Register</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
