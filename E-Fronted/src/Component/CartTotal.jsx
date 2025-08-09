import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Component/Title.jsx'

const CartTotal = () => {
  const { curreny, getCartAmount, delivery_fee } = useContext(ShopContext)

  return (
    <div className="w-full sm:w-[480px] bg-white p-4 rounded-lg shadow">
      <Title text1={'Cart'} text2={'Total'} />

      <div className="mt-3 flex justify-between">
        <p>Subtotal</p>
        <p>{curreny}{getCartAmount()}.00</p>
      </div>
      <hr className="text-gray-300 my-2" />

      <div className="flex justify-between">
        <p>Shipping Fee</p>
        <p>{curreny}{delivery_fee}.00</p>
      </div>
      <hr className="text-gray-300 my-2" />

      <div className="flex justify-between font-bold">
        <p>Total</p>
        <p>{curreny}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</p>
      </div>
    </div>
  )
}

export default CartTotal
