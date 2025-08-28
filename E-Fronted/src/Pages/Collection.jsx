import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../Context/ShopContext'
import { assets } from '../asset/frontend_assets/assets'
// import Title from '../Component/Title'
import Collections from '../Component/Collections'
import SearchBar from '../Component/SearchBar.jsx'

const Collection = () => {
  const [isHidden,setIsHidden] = useState(false)
  const [collectionInfo,setCollectionInfo] = useState([])
  const [category,setCategory] = useState([])
  const [subCategory,setSubCategory] = useState([])
  const [sortType,setSortType] = useState('Relavent')

  const {products,curreny,searchResult} = useContext(ShopContext)


  const toggleCategory = (e)=>{
      if(category.includes(e.target.value)){
        setCategory(prev=>prev.filter(items=> items !== e.target.value))
      }

      else{
        setCategory(prev=>[...prev,e.target.value])
      }
      
  }

  const toggleSubCategory = (e)=>{
      if(subCategory.includes(e.target.value)){
        setSubCategory(prev=>prev.filter(items=> items !== e.target.value))
      }

      else{
        setSubCategory(prev=>[...prev,e.target.value])
      }
      
  }

  const applyFilter = () => {
    let productCopy = products.slice()

    if(searchResult){
      productCopy = productCopy.filter(items=> items.name.toLowerCase().includes(searchResult.toLowerCase()))
    }
    if(category.length > 0){
      productCopy = productCopy.filter(items=> category.includes(items.category))
    }
    if(subCategory.length > 0){
      productCopy = productCopy.filter(items=> subCategory.includes(items.subCategory))
    }
    setCollectionInfo(productCopy)
  
  }

  const sortCollection = ()=>{
    let sortCollectionCopy = collectionInfo.slice()

    switch(sortType){
      case 'Low-High':
        setCollectionInfo(sortCollectionCopy.sort((a,b)=>(a.price - b.price)))
        break

      case 'High-Low':
        setCollectionInfo(sortCollectionCopy.sort((a,b)=>(b.price - a.price)))
        break

      default :
        applyFilter()
        break

    }
    
      
        
  }

  useEffect(()=>{
    applyFilter()
  },[category,subCategory,searchResult,products])

  // useEffect(()=>{
  //   setCollectionInfo(products)
  // },[])

  useEffect(()=>{
    sortCollection()
    // console.log(setSortType)
  },[sortType])



  

  return (
    <>

    <SearchBar/>
    
    <div className='flex flex-col sm:flex-row gap-20 pt-10'>
      <div className=''>
        <div onClick={()=>setIsHidden(!isHidden)} className={`flex  gap-2 ${isHidden ? 'gap-3' : ''} `}>
        <p className='pb-6 text-lg'>FILTERS</p>
         <img className={`h-5 w-2 pt-2 sm:hidden ${isHidden ? 'rotate-90 ' : ''}   `}  src={assets.dropdown_icon} alt="" />
         </div>
       
        <div className={`flex flex-col ${isHidden ? '' : 'hidden'} sm:block sm:space-y-5 gap-6`}>
         
        <div className='border py-4 px-5 w-60 border-gray-400 rounded-2xl'>
          
          <p className='pb-2 text-sm font-medium'>CATEGORY</p>
          <div className=' space-y-3 text-sm '>
          <p className=' text-gray-600 flex gap-2'>
            <input onClick={toggleCategory}  type="checkbox" value={'Men'} />Men
          </p>
          <p className=' text-gray-600 flex gap-2' >
            <input onClick={toggleCategory} type="checkbox" value={'Women'} />Women
          </p>
          <p className=' text-gray-600 flex gap-2'>
            <input onClick={toggleCategory} type="checkbox" value={'Kids'} />Kids
          </p>
          </div>
        </div>
         <div className='border py-4 px-5 w-60 border-gray-400 rounded-2xl'>
          
          <p className='pb-2 text-sm font-medium'>TYPE</p>
          <div className=' space-y-3 text-sm '>
          <p className=' text-gray-600 flex gap-2'>
            <input onClick={toggleSubCategory}  type="checkbox" value={'Topwear'} />Topwear
          </p>
          <p className=' text-gray-600 flex gap-2' >
            <input onClick={toggleSubCategory} type="checkbox" value={'Bottomwear'} />Bottomwear
          </p>
          <p className=' text-gray-600 flex gap-2'>
            <input onClick={toggleSubCategory} type="checkbox" value={'Winterwear'} />Winterwear
          </p>
          </div>
        </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row justify-between sm:gap-133'>
        <div className='inline-flex items-center mb-2 gap-2'>
          <p className='sm:text-2xl text-lg   text-gray-400'> ALL<span className='sm:font-medium ml-2 text-gray-700'>COLLECTION</span></p>
          <p className='w-8 sm:w-11 h-[1px] sm:h-[2px] bg-gray-700'></p>
        </div>
        <select onChange={(e)=>setSortType(e.target.value)} className='border text-sm text-gray-700 rounded-2xl px-2'>
          <option value="Relavent">Sort by:Relavent</option>
          <option value="Low-High">Sort by:Low-High</option>
          <option value="High-Low">Sort by:High-Low</option>
        </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3  space-y-4'>
          {
            collectionInfo.map((items,index)=>(
              <Collections key={index} name={items.name} id={items._id} price={items.price} image={items.image} />
            ))
          }
        </div>
     </div>
    </div>
    
    </>
  )
}

export default Collection