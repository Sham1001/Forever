import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../asset/frontend_assets/assets'
import RelatedPage from '../Component/RelatedPage'

const Product = () => {

const {products, curreny, addToCart} = useContext(ShopContext)
const {productId} = useParams()
const [productData,setProductData] = useState(false)
const [image,setImage] = useState('')
const [size,setSize] = useState('')

const fetchProduct=()=>{
    products.map((item,index)=>{
      if(productId === item._id){
        setProductData(item)
        setImage(item.image[0])
        // console.log(item)
        return null
        
      }
})
}

useEffect(()=>{
    fetchProduct()
},[productId,products])


  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
          {
             productData.image.map((item,index)=>(
              <img onClick={()=>setImage(item)} key={index} src={item} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="Product_image"  />
             ))
          }
        </div>
        <div className='w-full sm:w-[80%]'>
          <img className='w-full h-auto' src={image} alt="Main-Image" />
        </div>
        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
          <img src={assets.star_icon} className='w-3.5' alt="" />
          <img src={assets.star_icon} className='w-3.5' alt="" />
          <img src={assets.star_icon} className='w-3.5' alt="" />
          <img src={assets.star_icon} className='w-3.5' alt="" />
          <img src={assets.star_dull_icon} className='w-3.5' alt="" />
          <p className='ml-2'>(122)</p>
          </div>
         <p className='my-5 font-medium text-2xl'>{curreny}{productData.price}</p>
         <p className='text-gray-500 md:w-4/5'>{productData.description}</p>
         <div className='flex flex-col gap-4'>
         <p className='mt-10 mb-2'>Select Size</p>
         <div className='flex gap-2'>
          {
            productData.sizes.map((item,index)=>(
              <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''} `} key={index}>{item}</button>
            ))
          }
         </div>
         </div>

         <button className='mt-8 bg-black text-white px-8 py-3 text-sm active:bg-gray-700' onClick={()=>(addToCart(productData._id,size))}>ADD TO CART</button>
          <hr className="mt-8 mb-4 sm:m-4/5 border-gray-300" />

          <p className='text-gray-500 mb-1'>100% Original product.</p>
          <p className='text-gray-500 mb-1'>Cash on delivery is available on this product.</p>
          <p className='text-gray-500 mb-1'>Easy return and exchange policy within 7 days.</p>
        </div>
        
      </div>
      <div className='mt-35'>
      <div className='flex'>
        <p className='border px-3 py-5 text-sm'>Description</p>
        <p className='border px-3 py-5 text-sm'>Review(122)</p>
      </div>
      <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
        <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
      
        </p>
        <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
      </div>
      </div>

      <RelatedPage category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ): <div className='opacity-0'><h2>No info</h2></div>
}

export default Product