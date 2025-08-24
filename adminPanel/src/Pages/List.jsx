import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { currency } from '../App'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const getData = async () => {
    const response = await axios.get(backendUrl + '/api/product/list')
    if (response.data.success) {
      setList(response.data.products)
    }
    else {
      toast.error(response.data.message)
    }
  }

  const removeItem = async (_id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { _id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await getData()
      }
      else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className=''>
      <p className='mb-2'>All Products List</p>

      <div className='flex flex-col gap-2'>
        
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {list.map((items) => (
          <div
            key={items._id}
            className='grid grid-cols-2 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border text-sm rounded-md'
          >
            
            <img
              className='w-16 h-16 object-cover rounded'
              src={items.image?.[0]}
              alt={items.name}
            />

           
            <div className='flex flex-col md:flex-row md:items-center md:gap-2'>
              <p className='font-medium md:w-48'>{items.name}</p>
              <p className='text-gray-600 md:hidden'>Category: {items.category}</p>
              <p className='text-gray-600 md:hidden'>Price: {currency}{items.price}</p>
            </div>

            
            <p className='hidden md:block'>{items.category}</p>
            <p className='hidden md:block'>{currency}{items.price}</p>

           
            <div className='col-span-2 md:col-span-1 flex justify-end'>
              <p
                onClick={() => removeItem(items._id)}
                className='cursor-pointer text-lg text-center sm:mr-17 text-red-600 hover:scale-110 transition'
              >
                X
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
