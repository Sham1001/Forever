import React, { useContext, useState } from 'react'
import Title from '../Component/Title.jsx'
import CartTotal from '../Component/CartTotal.jsx'
import { assets } from '../asset/frontend_assets/assets.js'
import { ShopContext } from '../Context/ShopContext.jsx'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')
  const {navigate} = useContext(ShopContext)

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-18  min-h-[80vh]'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
      <div>
        <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
      </div>
     
      <div className='flex gap-3'>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
      </div>
      <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
      <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
      <div className='flex gap-2'>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
      </div>
      <div className='flex gap-2'>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
      </div>
      <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      
      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-[80]'>
         <CartTotal/>
        </div>
        <div className='mt-20'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
              <img className='h-4 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
              <img className='h-4 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className='text-gray-400 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button onClick={()=>navigate('/Order')} className='bg-black text-white px-16 py-3 text-sm active:bg-gray-700'>Place Order</button>
          </div>
        </div>
     </div>
    </div>
  )
}

export default PlaceOrder