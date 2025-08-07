import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'


const Collections = ({image,name,id,price}) => {
    const {curreny} = useContext(ShopContext)
  return (
    <Link to={`/product/${id}`} className='cursor-pointer'>
        <div className='overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="Product_img" />
        </div>
        <p className='text-sm text-gray-500  py-2'>{name}</p>
        <p className='text-sm text-gray-500 font-bold pb-2'>{curreny}{price}</p>
    </Link>
  )
}

export default Collections