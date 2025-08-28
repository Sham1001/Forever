import React, { useContext, useEffect, useState } from 'react'
import Title from '../Component/Title'
import { ShopContext } from '../Context/ShopContext'
import {toast} from "react-toastify"
import axios, { all } from 'axios'

const Orders = () => {
  const { curreny, backendUrl, token } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const getOredrData = async()=>{
    try{
      if(token){
        const response = await axios.post(backendUrl + '/api/order/userOrder',{},{headers:{token}})
        if(response.data.success){
          const allOrder = []
          response.data.order.map(order=>{
            order.items.map((item)=>{
              item['status'] = order.status
              item['payment'] = order.payment
              item['method'] = order.method
              item['date'] = order.date
              allOrder.push(item)
            })
          })
          // console.log(allOrder)
          setOrderData(allOrder.reverse())
        }
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getOredrData()
  },[token])

  return (
    <div className="mt-10 px-4 sm:px-8 lg:px-16">
      {/* Page Title */}
      <div className="mb-6">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orderData.map((items, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Product Info */}
            <div className="flex gap-4 flex-1">
              <img
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                src={items.image[0]}
                alt={items.name}
              />

              <div className="flex flex-col justify-center text-gray-700">
                <p className="font-medium text-base">{items.name}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                  <p>{curreny}{items.price}</p>
                  <p>Quantity:{items.quantity}</p>
                  <p>Size: {items.size}</p>
                </div>
                <p className="text-sm">
                  Date: <span className="text-gray-500">{new Date(items.date).toDateString()}</span>
                </p>
                <p className="text-sm">
                  Payment: <span className="text-gray-500">{items.method}</span>
                </p>

                {/* Order Status - aligned with details on mobile */}
                <div className="flex items-center gap-2 text-green-600 text-sm mt-2 sm:hidden">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  {items.status}
                </div>
              </div>
            </div>

            {/* Order Status - desktop view */}
            <div className="hidden sm:flex items-center gap-2 text-green-600 text-sm">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              {items.status}
            </div>

            {/* Track Order Button */}
            <div className="flex justify-start sm:justify-end w-full sm:w-auto">
              <button onClick={getOredrData} className='px-4 py-1 border  border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition'>
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
