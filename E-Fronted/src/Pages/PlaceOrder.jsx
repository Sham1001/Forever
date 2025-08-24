import React, { useContext, useState } from 'react'
import Title from '../Component/Title.jsx'
import CartTotal from '../Component/CartTotal.jsx'
import { assets, products } from '../asset/frontend_assets/assets.js'
import { ShopContext } from '../Context/ShopContext.jsx'
import axios from 'axios'
import {toast} from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })
  const { navigate, cartItems, setCartItems, token, delivery_fee, getCartAmount, products, backendUrl } = useContext(ShopContext)

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData((data) => ({ ...data, [name]: value }))
  }

  const submitHandler = async(e) => {
    e.preventDefault()

    try {

      const orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itesmInfo = structuredClone(products.find((product) => product._id === items))
            if (itesmInfo) {
              itesmInfo.size = item,
                itesmInfo.quantity = cartItems[items][item]
              orderItems.push(itesmInfo)
            }
          }

        }
      }

      const setOredr = {
        address:formData,
        items:orderItems,
        amount:getCartAmount()+delivery_fee
      }

      switch(method){

        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/cod',setOredr,{headers:{token}})
          if(response.data.success){
            setCartItems({})
            navigate('/Order')
          }
          else{
            toast.error(response.data.message)
          }

          break

        default:
          break

      }
    }
    catch (error) {
        console.log(error)
        toast.error(error.message)
    }
    // console.log(orderItems)
  }

  return (
    <form onSubmit={submitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-18  min-h-[80vh]'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' required />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' required />
        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' required />
        <input onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' required />
        <div className='flex gap-2'>
          <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' required />
          <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' required />
        </div>
        <div className='flex gap-2'>
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' required />
          <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' required />
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' required />

      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-[80]'>
          <CartTotal />
        </div>
        <div className='mt-20'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
              <img className='h-4 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
              <img className='h-4 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className='text-gray-400 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm active:bg-gray-700'>Place Order</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder