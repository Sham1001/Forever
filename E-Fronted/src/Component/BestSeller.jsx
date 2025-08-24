import React,{useContext, useEffect, useState} from 'react'
import { products } from '../asset/frontend_assets/assets'
import {ShopContext} from '../Context/ShopContext'
import Title from '../Component/Title'
import Collections from './Collections'

const BestSeller = () => {
  const [beatProductInfo,setBestProductInfo] = useState([])
  const {products} = useContext(ShopContext)
  console.log(`the bestseller info is : ${beatProductInfo}`)
  useEffect(()=>{
       setBestProductInfo(products.filter(items=>items.bestseller).slice(0,5))
      // const productInfo = products.filter(items=>items.bestseller)
      // setBestProductInfo(productInfo.slice(0,5))
       
  },[products])
  return (
    <div className='space-y-8'>
      <div className='text-center'>
        <Title text1={'BEST'} text2={'SELLER'}/>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, odio.</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10'>
       { beatProductInfo.map((items,index)=>(
          <Collections key={index} name={items.name} id={items._id} image={items.image} price={items.price} />
       )) }
      </div>
        
    </div>
  )
  
}

export default BestSeller