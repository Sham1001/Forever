import React, { useContext, useState, useEffect } from 'react'
import {ShopContext} from '../Context/ShopContext.jsx'
import Title from '../Component/Title.jsx'
import Collections from '../Component/Collections.jsx'
import Product from '../Pages/Product.jsx'

const LatestCollection = () => {

    const {products} = useContext(ShopContext)
    const [productInfo,setProductInfo] = useState([])
    console.log(products)

    useEffect(() => {
      setProductInfo(products.slice(0,10))
    }, [products])
    console.log(`the product info is :${productInfo}`)
  return (
    <div className='py-10 flex flex-col gap-6' >
      <div className='flex flex-col justify-center items-center'>
        <div className='text-cente text-3xl '>
          <Title text1={'LATEST'}  text2={'COLLECTION'}/>
        </div>
      <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium enim voluptatum accusantium dolores! Numquam, hic.</p>
       
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-3'>
      {
        productInfo.map((items,index)=>
          (
              <Collections key={index} id={items._id} name={items.name} price={items.price} image={items.image}/>
          )
        )
      }
      </div>
    </div>
  )
}

export default LatestCollection