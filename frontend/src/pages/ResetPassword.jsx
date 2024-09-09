import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('')
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!password===confirmPassword){
      return toast.error("Password and confirm password does not match")
    }
    const url = `${import.meta.env.VITE_SERVER_URL}/api/auth/reset-password/${token}`
    try {
      
      const res = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({password})
      }) 
      const data = await res.json()
      
      if(data.success){
        toast.success(data.message)
        navigate('/login');
      }else{
        toast.error(data.message)
      }
    
    } catch (error) {
      toast.error('Error resetting password');
    }
  };

  return (
  <section className='h-screen w-full flex items-center justify-center p-5'>
    <div className='lg:w-1/3 md:w-1/2 w-full p-5 rounded-lg bg-white custom-shadow'>
    <h2 className='font-bold text-center mb-5 text-2xl'>Reset Password</h2>
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter new password"
        className='border-2 rounded-lg p-2'
        required
      />
       <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm password"
        className='border-2 rounded-lg p-2'
        required
      />
      <button type="submit" className='rounded-lg p-2 bg-indigo-500 text-white'>Reset Password</button>
    </form>
    </div>
  </section>
  );
};

export default ResetPassword;
