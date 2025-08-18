import React from 'react'
import { useState } from 'react'
import {backendUrl} from '../App.jsx'
import axios from 'axios'
import { resolvePath } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const prevent=async(e)=>{
       try{
         e.preventDefault()
        // console.log(email)
        // console.log(password)
        const response = await axios.post(backendUrl + '/api/user/admin/login',{email,password})
        console.log(response)
        if(response.data.success){
            setToken(response.data.token)
        }
        else{
            toast.error(response.data.message)
        }
       }
       catch(error){
        console.log(error)
        toast.error(error.message)
       }
    }

  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='w75 h-75 p-7 shadow-md'>
        <form className='' onSubmit={prevent} >
            
            <p className='text-2xl font-bold'>Admin Panel</p>
            <div className='space-y-3 mt-3'>
            <div className='space-y-1'>
                <p className='text-gray-500'>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border py-1 px-3 rounded' type="email" placeholder='Email adress...' required />
            </div>

            <div className='space-y-1'>
                <p className='text-gray-500'>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border py-1 px-3 rounded' type="password" placeholder='Password...' required />
            </div>
            </div>

            <button className='mt-3 w-60 rounded flex items-center justify-center h-10 bg-black text-white cursor-pointer'>Login</button>

            
           
        </form>
         </div>
    </div>
  )
}

export default Login