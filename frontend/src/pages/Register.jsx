import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa"
const Register = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())
    const url = `${import.meta.env.VITE_SERVER_URL}/api/auth/register`
    setLoading(true)
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      })
      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        navigate("/login")
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
          <input type="text" placeholder='Enter your name' name='fullName' className='border-2 rounded-lg p-2' required />
          <input type="email" placeholder='Enter your email' name='email' className='border-2 rounded-lg p-2' required />
          <input type="text" placeholder='Enter your username' name='username' className='border-2 rounded-lg p-2' required />
          <div className='relative'>
            <input type={showPassword ? 'text' : 'password'} placeholder='Enter your password' name='password' className='border-2 w-full rounded-lg p-2' required />
            <button type='button' className='absolute top-3 text-gray-700 right-2' onClick={() => setShowPassword(!showPassword)}>
              {
                showPassword ? <FaEyeSlash /> : <FaEye />
              }
            </button>
          </div>
          <button type='submit' disabled={loading} className={` ${loading ? 'bg-indigo-300' : 'bg-indigo-500 hover:bg-indigo-600'} text-white p-2 rounded-lg`}>
            {
              loading ? 'Processing...' : 'Register'
            }
          </button>
        </form>
        <div className='text-center  text-gray-600'>
          <p className='mt-3'>Or</p>
          <p>Already have an account ? <Link to={"/login"} className='text-indigo-500 hover:underline'>Log in</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register
