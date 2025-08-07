import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Component/Title.jsx'
import { assets } from '../asset/frontend_assets/assets.js'

const CartTotal = () => {

  const {products, cartItems, curreny, updateCartInfo, getCartAmount,delivery_fee} = useContext(ShopContext)
  
  return (
    <div className=' w-[29%] relative left-[71%] mt-7 '>
          <div>
          <Title text1={'Cart'} text2={'Total'}/>
          </div>
          <div className='mt-3 flex justify-between'>
          <p>Subtotal</p>
          <p>{curreny}{getCartAmount()}.00</p>
          </div>
          <hr className='text-gray-300' />
          <div className='flex justify-between mt-2'>
          <p>Shipping Fee</p>
          <p>{curreny}{delivery_fee}</p>
          </div>
          <hr className='text-gray-300' />
          <div className='flex justify-between mt-2'>
          <b>Total</b>
          <p>{curreny}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee} </p>
          </div>
          <div className='w-[54%] h-10 bg-black text-white text-center justify-center flex mt-5 relative left-[46%]'>
            <button>
              Proceed To Check Out
            </button>
          </div>
         </div>
  )
}

export default CartTotal