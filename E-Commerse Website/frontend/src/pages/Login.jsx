import  { useState } from 'react'

const Login = () => {
    const [email,setemail]=useState("");
    const [password,setPassword]=useState()
  return (
    <div className='flex'>
      <div className='w-full md:w-1/2 flex-col justify-center items-center p-8 md:p-12'>
        <form className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
            <div className='flex justify-center mb-6'>
                <h2 className='text-xl font-medium'>Rabbit</h2>
            </div>
            <h2 className='text-2xl font-bold text-center mb-6'>Hey there!👋🏻</h2>
            <p className='text-center md-6'>
                Enter your username and password to login
            </p>
            <div className='md-4'>
                <label className='block text-sm font-semibold mb-2'>Email</label>
                <input type="email" value={email} onClick={(e)=>setemail(e.target.value)} className='w-full p-2 border rounded' placeholder='Enter your email address' />
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-semibold mb-2'>password</label>
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className='w-full p-2 border rounded' placeholder='Enter your password' />
            </div>
            <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default Login
