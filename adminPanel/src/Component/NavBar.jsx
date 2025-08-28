import React from 'react'
import { assets } from '../asset/admin_assets/assets.js'


// import { set } from 'mongoose'
const NavBar = ({setToken}) => {
  return (
    <div className='flex justify-between sm:mx-[70px] mx-[20px] text-center sm:mt-[15px] mt-[10px] items-center'>
        <img className='sm:w-[150px] w-[80px] cursor-pointer' src={assets.logo} alt="" />
        <div className='flex sm:gap-10 gap-3'>
        <button onClick={()=>window.location.href = import.meta.env.VITE_FRONTED_URL} className='sm:text-lg text-sm bg-gray-700 sm:w-[100px] w-[80px] sm:h-[40px] h-[30px] text-white rounded-2xl cursor-pointer'>Main</button>
        <button onClick={()=>setToken('')} className='sm:text-lg text-sm bg-gray-700 sm:w-[100px] w-[80px] sm:h-[40px] h-[30px] text-white rounded-2xl cursor-pointer'>Logout</button>
        </div>
    </div>

  )
}

export default NavBar