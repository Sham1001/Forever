import React, { useContext } from 'react'
import Title from '../Component/Title'
import { ShopContext } from '../Context/ShopContext'

const Orders = () => {
  const { products, curreny } = useContext(ShopContext)

  return (
    <div className="mt-10 px-4 sm:px-8 lg:px-16">
      {/* Page Title */}
      <div className="mb-6">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {products.slice(0, 4).map((items, index) => (
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
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className="text-sm">
                  Date: <span className="text-gray-500">Mon July 11 2025</span>
                </p>
                <p className="text-sm">
                  Payment: <span className="text-gray-500">COD</span>
                </p>

                {/* Order Status - aligned with details on mobile */}
                <div className="flex items-center gap-2 text-green-600 text-sm mt-2 sm:hidden">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Order Placed
                </div>
              </div>
            </div>

            {/* Order Status - desktop view */}
            <div className="hidden sm:flex items-center gap-2 text-green-600 text-sm">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              Order Placed
            </div>

            {/* Track Order Button */}
            <div className="flex justify-start sm:justify-end w-full sm:w-auto">
              <button className="px-4 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition">
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
