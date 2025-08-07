import React, { useContext, useState, useEffect } from 'react'
import Title from '../Component/Title.jsx'
import Collections from './Collections'
import {ShopContext} from '../Context/ShopContext.jsx'


const RelatedPage = ({category,subCategory}) => {
const {products} = useContext(ShopContext)
const [related,setRelated] = useState([])


useEffect(()=>{
    if(products.length > 0){
        let productCopy = products.slice()
        // console.log(productCopy)
        productCopy = productCopy.filter(item=>category === item.category)
        productCopy = productCopy.filter(item=> subCategory === item.subCategory)
        setRelated(productCopy.slice(0,5))
        // console.log(productCopy)
    }
},[])

  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'PRODUCT'}/>
        </div>
        <div className='grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
            {related.map((item,index)=>(
                <Collections key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
            ))}
        </div>
    </div>

  )
}

export default RelatedPage