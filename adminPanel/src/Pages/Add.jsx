import React, { useState } from 'react'
import { assets } from '../asset/admin_assets/assets'
import {backendUrl} from '../App.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState("Topwear")
  const [price, setPrice] = useState('')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const submitHandler = async(e)=>{
    e.preventDefault()
    
    try{

      const formData = new FormData()

      formData.append('name',name)
      formData.append('description',description)
      formData.append('category',category)
      formData.append('subCategory',subCategory)
      formData.append('price',price)
      formData.append('bestseller',bestseller)
      formData.append('sizes',JSON.stringify(sizes))

      image1 && formData.append('image1',image1)
      image2 && formData.append('image2',image2)
      image3 && formData.append('image3',image3)
      image4 && formData.append('image4',image4)

      console.log(formData)

      const response = await axios.post(backendUrl + '/api/product/add',formData,{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        setImage1('')
        setImage2('')
        setImage3('')
        setImage4('')
        setName('')
        setDescription('')
        setPrice('')

      }
      else{
        toast.error(response.data.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }

    
  }


  // console.log(size)
  return (
    <form onSubmit={submitHandler} className='flex flex-col gap-5 p-4'>
      <div>
        <p>Upload Image</p>
        <div className='flex flex-wrap gap-2'>
          <label htmlFor="image1">
            <img className='w-24 sm:w-28 md:w-32 mt-3' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} hidden id='image1' type="file" />
          </label>
          <label htmlFor="image2">
            <img className='w-24 sm:w-28 md:w-32 mt-3' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} hidden id='image2' type="file" />
          </label>
          <label htmlFor="image3">
            <img className='w-24 sm:w-28 md:w-32 mt-3' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} hidden id='image3' type="file" />
          </label>
          <label htmlFor="image4">
            <img className='w-24 sm:w-28 md:w-32 mt-3' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} hidden id='image4' type="file" />
          </label>
        </div>
      </div>

      <div className='mt-4 w-full'>
        <p>Product name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='border w-full p-2 rounded mt-1' type="text" placeholder='Type here' required/>
      </div>

      <div className='mt-4 w-full'>
        <p>Product description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='border w-full p-2 rounded mt-1' placeholder='Write content here' required/>
      </div>
      
      <div className='flex flex-col sm:flex-row gap-5 mt-5'>

        <div className='flex-1'>
          <p>Product category</p>
          <select onChange={(e)=>setCategory(e.target.value)} className='mt-2 border p-2 rounded w-full'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className='flex-1'>
          <p>Sub category</p>
          <select onChange={(e)=>setSubCategory(e.target.value)} className='mt-2 border p-2 rounded w-full'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className='flex-1'>
          <p>Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} className='mt-2 py-2 px-2 border rounded w-full sm:max-w-[120px]' type="Number" placeholder='25'/>
        </div>

      </div>

      <div className='mt-4'>
        <p>Product size</p>
        <div className='flex flex-wrap gap-3 mt-2'>
          <div onClick={()=>setSizes(prev=>prev.includes('S') ? prev.filter(item=> item!=='S') : [...prev,"S"])} className={`${sizes.includes('S') ? 'bg-green-300' :' bg-gray-300'}  px-3 py-1 rounded`}>
            <p >S</p>
            </div>
          <div onClick={()=>setSizes(prev=>prev.includes('M') ? prev.filter(item=> item!=='M') : [...prev,"M"])} className={`${sizes.includes('M') ? 'bg-green-300' :' bg-gray-300'}  px-3 py-1 rounded`}>
            <p>M</p>
            </div>
          <div onClick={()=>setSizes(prev=>prev.includes('L') ? prev.filter(item=> item!=='L') : [...prev,"L"])} className={`${sizes.includes('L') ? 'bg-green-300' :' bg-gray-300'}  px-3 py-1 rounded`}>
            <p>L</p>
            </div>
          <div onClick={()=>setSizes(prev=>prev.includes('XL') ? prev.filter(item=> item!=='XL') : [...prev,"XL"])} className={`${sizes.includes('XL') ? 'bg-green-300' :' bg-gray-300'}  px-3 py-1 rounded`}>
            <p>XL</p>
            </div>
          <div onClick={()=>setSizes(prev=>prev.includes('XXL') ? prev.filter(item=> item!=='XXL') : [...prev,"XXL"])} className={`${sizes.includes('XXL') ? 'bg-green-300' :' bg-gray-300'}  px-3 py-1 rounded`}>
            <p>XXL</p>
            </div>
        </div>
      </div>

      <div className='mt-5 flex items-center gap-2'>
        <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label htmlFor="bestseller">bestseller</label>
      </div>

      <div>
        <button className='py-2 px-6 bg-black text-white rounded w-full sm:w-auto'>ADD</button>
      </div>
    </form>
  )
}

export default Add
