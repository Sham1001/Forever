import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Component/Title.jsx'
import { assets } from '../asset/frontend_assets/assets.js'

const CartTotal = () => {

  const {products, cartItems, curreny, updateCartInfo, getCartAmount,delivery_fee} = useContext(ShopContext)
  
  return (
    <div className=' w-[39%] relative left-[61%] mt-20 '>
          <div>
          <Title text1={'Cart'} text2={'Total'}/>
          </div>
          <div className='mt-3 flex justify-between'>
          <p>Subtotal</p>
          <p>{curreny}{getCartAmount()}.00</p>
          </div>
          <hr className='text-gray-300' />
          <div className='flex justify-between mt-3 '>
          <p>Shipping Fee</p>
          <p>{curreny}{delivery_fee}.00</p>
          </div>
          <hr className='text-gray-300' />
          <div className='flex justify-between mt-3 text-center'>
          <b>Total</b>
          <b>{curreny}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00 </b>
          </div>
          
         </div>
  )
}

export default CartTotal