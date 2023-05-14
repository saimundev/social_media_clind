import React, { useEffect, useState } from 'react'
import { useForgetPasswordEmailMutation } from '../../store/services/authApi';
import { toast } from 'react-hot-toast';

const Forgaten = () => {
  const [email,setEmail] =useState("");
  const [sendEmail,{isLoading,isSuccess,error}] = useForgetPasswordEmailMutation();

  useEffect(()=>{
    error && toast.error((error as any).data.message)
  },[error])

  const handleSubmit =async (e:React.FormEvent)=>{
    e.preventDefault();
    if(!email) return toast.error("Email is required");
    const data = {
      email:email
    }
    await sendEmail(data);
  }
  return (
    <div className='flex justify-center mt-10'>
    <div className="w-1/3">
    <div className="">
      <h1 className='text-2xl font-medium mb-4 dark:text-gray-300'>Need To Forget  Your Password?</h1>
      <p className='text-sm text-gray-500 font-medium mb-2 dark:text-gray-400'>Enter Your Email And Varifayed Your Email. And Change Your Password</p>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="">
        <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Enter Your Email...' className='w-full dark:bg-gray-700 dark:border-gray-600 p-2 rounded border border-gray-300 outline-none' name="" id="" />
      </div>
      {isSuccess && <div className="text-green-500 text-md font-medium">Email send successfull. Varefay your email as soon as possible</div> }
      <button disabled={isLoading}   className='bg-green-500 dark:bg-gray-700 text-white rounded px-8 py-2 block mt-4'>{isLoading ? "Pending...":"Submit"}</button>
    </form>
    </div>
  </div>
  )
}

export default Forgaten