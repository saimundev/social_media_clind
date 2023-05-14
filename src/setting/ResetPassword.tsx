import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useResetPsswordMutation } from '../store/services/authApi';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const [email,setEmail] =useState('');
  const [error,setError] =useState("")
  const [emailData,{isLoading,error:err,isSuccess}] = useResetPsswordMutation();
  const navigate = useNavigate();

  useEffect(()=>{
    err && toast.error((err as any)?.data?.message)
  },[err])

  useEffect(()=>{
    if(isSuccess){
      navigate("/setting/password")
    }
  },[isSuccess])

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    if(!email) {
      setError("Email is required");
    }

    emailData({email:email})
  }


  return (
    <div className='flex justify-center mt-10'>
      <div className="w-1/2">
      <div className="">
        <h1 className='text-2xl font-medium mb-2 dark:text-gray-300'>Need To Reset Your Password?</h1>
        <p className='text-sm text-gray-500 font-medium mb-1 dark:text-gray-400'>Enter Your Email And Varifayed Your Email. And Change Your Password</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Enter Your Email...' className='w-full dark:bg-gray-700 dark:border-gray-600 p-2 rounded border border-gray-300 outline-none' name="" id="" />
        {error && <span className='text-red-500'>{error}</span> }
        </div>
        <button disabled={isLoading}  className='bg-green-500 dark:bg-gray-700 text-white rounded px-8 py-2 block mt-4'>{isLoading ? "Pending...":"Submit"}</button>
      </form>
      </div>
    </div>
  )
}

export default ResetPassword