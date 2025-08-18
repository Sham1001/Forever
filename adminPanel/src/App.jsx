import React, { useEffect } from 'react'
import NavBar from './Component/NavBar.jsx'
import SideBar from './Component/SideBar.jsx'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Add from './Pages/Add.jsx'
import List from './Pages/List.jsx'
import Order from './Pages/Order.jsx'
import Login from './Pages/Login.jsx'
import { ToastContainer, toast } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {


  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  useEffect(
  ()=>{
    localStorage.setItem('token',token)
  }
  ,[token])


  return (
    <div>
      <ToastContainer />
      {token === "" ? <Login setToken={setToken}/> :
        <>
          <NavBar setToken={setToken}/>
          <hr className='mt-[10px] text-gray-300' />
          <div className='flex'>
            <SideBar />
            <hr />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/order' element={<Order token={token} />} />
              </Routes>

            </div>
          </div>
        </>
      }

    </div>
  )
}

export default App