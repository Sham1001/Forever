import React, { useContext, useEffect, useState } from 'react'
import Title from '../Component/Title.jsx'
import { ShopContext } from '../Context/ShopContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const {backendUrl,token,setToken,navigate}  = useContext(ShopContext)
  const [currentState, setCurrentState] = useState('Login')
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  
  const handleSubmit = async(e)=>{
      try{
        e.preventDefault()
      if(currentState === 'Sign Up'){
        const  response = await axios.post(backendUrl+'/api/user/register',{name,email,password})
        // console.log(response)
        if(response.data.success){
         
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          toast.success("Register successfully")
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response = await axios.post(backendUrl + '/api/user/login', {email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
      }
      catch(error){
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(()=>{
      if(token){
        navigate('/')
      }
  },[token])
  
  return (
    <div className="h-screen flex justify-center items-center">
      
      <form onSubmit={handleSubmit} className='p-10 gap-6 flex flex-col bg-gray-300 rounded-2xl w-10/12 sm:w-2/5'>
        <div className='flex gap-2 justify-center items-center'>
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
        </div>
        <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-4'>
           {currentState === 'Sign Up' ? <input onChange={(e)=>setName(e.target.value)} value={name} className='border py-2 px-2' type="text" placeholder='Name' required/> : ''}
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border py-2 px-2' type="email" placeholder='Email Address' required/>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border py-2 px-2' type="password" placeholder='Password' required/>
        </div>
          <div className='flex justify-between'>
            <p className='cursor-pointer'>Forget your Password?</p>
           {
            currentState === 'Login'
            ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
            : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login here</p>
           }
          </div>
        
        </div>
        <div className='flex justify-center items-center'>
        <button className='border w-30 h-10 text-center justify-center items-center flex bg-black text-white cursor-pointer active:bg-gray-700'>{currentState==='Login' ? 'Sign In' : 'Sign Up'}</button>
        </div>
      </form>
    </div>
  )
}

export default Login