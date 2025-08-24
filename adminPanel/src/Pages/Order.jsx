import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App.jsx'
import { assets } from '../asset/admin_assets/assets.js'
import { toast } from 'react-toastify'

const Order = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchData = async () => {
    try {
      if (token) {
        const response = await axios.post(
          backendUrl + '/api/order/allOredr',
          {},
          { headers: { token } }
        )
        if (response.data.success) {
          setOrders(response.data.order)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const changeHandler = async (e, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/update', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchData()
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000) 
    return () => clearInterval(interval)
  }, [token])

  return (
    <div className="p-4">
      <p className="text-xl font-bold mb-4">Orders</p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 grid grid-cols-2 gap-4"
          >
            {/* Left Column */}
            <div className="col-span-2 flex items-center gap-3 border-b pb-2">
              <img
                src={assets.parcel_icon}
                alt=""
                className="w-10 h-10 object-contain"
              />
              <p className="font-semibold text-gray-800">
                {currency}
                {order.amount}
              </p>
            </div>

            {/* Items */}
            <div className="col-span-2">
              <p className="font-medium mb-1">Items:</p>
              <div className="text-sm text-gray-700 grid gap-1">
                {order.items.map((item, index) => (
                  <p key={index}>
                    {item.name} x {item.quantity}{' '}
                    <span className="text-xs text-gray-500">{item.size}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="col-span-2 border-t pt-2">
              <p className="font-medium mb-1">Shipping Address:</p>
              <div className="text-sm text-gray-700">
                <p>
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{' '}
                  {order.address.country} - {order.address.zipcode}
                </p>
                <p>{order.phone}</p>
              </div>
            </div>

            {/* Order Info */}
            <div className="col-span-1 text-sm text-gray-700">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.method}</p>
            </div>
            <div className="col-span-1 text-sm text-gray-700">
              <p>
                Payment:{' '}
                {order.payment === true ? (
                  <span className="text-green-600">Delivered</span>
                ) : (
                  <span className="text-red-600">Pending</span>
                )}
              </p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Status Dropdown */}
            <div className="col-span-2">
              <select onChange={(e) => changeHandler(e, order._id)} value={order.status} className="w-full border rounded-md px-2 py-1 text-sm">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
