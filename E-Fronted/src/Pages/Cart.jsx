import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Component/Title.jsx'
import { assets } from '../asset/frontend_assets/assets.js'
import CartTotal from '../Component/CartTotal.jsx'

const Cart = () => {

  const {products, cartItems, curreny, updateCartInfo, getCartAmount,delivery_fee, navigate} = useContext(ShopContext)

  const [cartData, setChartData] =  useState([])

  useEffect(()=>{
    if(products.length > 0){
      const tempData = []
    
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item]>0){
          tempData.push({
            id:items,
            size:item,
            quantity:cartItems[items][item]
          })
        }
      }
    }
    setChartData(tempData)
    }
    // console.log(tempData)
  },[cartItems,products])


  return (
    <div className=' pt-14 relative'>
      <div className="text-2xl mb-4">
        <Title  text1={'Your'} text2={'Cart'}/>
     </div>
     <div>
      {
        cartData.map((items,index)=>{
          const productData = products.find(product=>items.id === product._id)
          return(
            
              <div key={index} className='flex justify-between p-4 border-t border-b text-gray-300 grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="Product_img" />
                </div>
               
                
                    <p className='text-xs sm:text-lg font-medium text-gray-900'>{productData.name}</p>
                
                <div className='flex items-center gap-5 mt-2'>
                  <p className='text-gray-900'>{curreny}{productData.price}</p>
                  <p className='text-gray-900 px-2 sm:px-3 sm:py-1 border bg-slate-50'>{items.size}</p>
                </div>
               
                {/*The value from input filled are always in string so we have to change the value to the formate that we need or if we need strong only then we dont need to do anything . */}
                <input className='text-gray-900 border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateCartInfo(items.id,items.size,Number(e.target.value))} defaultValue={items.quantity} />
               <img onClick={()=>updateCartInfo(items.id,items.size,0)} className='w-7 cursor-pointer' src={assets.bin_icon} alt='Delete_button' />
              </div>
  
            
          )
        })
      }
     </div>
     <div className='relative sm:left-[63%] mt-10 '>
     <CartTotal/>
     </div>
     <div className='w-[20%] h-10 bg-black text-white text-center justify-center flex mt-5 relative left-[80%] mb-40'>
        <button onClick={()=>navigate('/placeorder')} className='active:bg-gray-700 w-full '>
            Proceed To Check Out
        </button>
     </div>
    </div>
  )
}

export default Cart