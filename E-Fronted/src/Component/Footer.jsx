import React from 'react'
import {assets} from '../asset/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:flex-row gap-20 sm:gap-90 pt-40 pb-10 '>
            <div className='flex flex-col gap-5 '>
            <img className='w-42' src={assets.logo} alt="" />
            <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque alias optio sapiente natus accusamus soluta velit voluptatum nesciunt necessitatibus placeat?</p>
            </div>
            <div className='flex flex-col sm:flex-row sm:gap-20 gap-20 '>
                <div className='flex flex-col gap-5'>
            <p className='text-3xl '>Company</p>
                <ul className='text-sm text-gray-600 flex flex-col gap-1'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                   
                </ul>
                 </div>
                 <div className='flex flex-col gap-5 ' >
            
                    <p className='text-3xl'>GET IN TOUCH</p>
                    <ul className='text-sm text-gray-600 flex flex-col gap-2'>
                        <li>+1-000-000-0000</li>
                        <li>StyleIt@gmail.com</li>
                        <li>Insta:StyleIt01</li>
                    </ul>
            
           </div>
            </div>
        </div>
        <hr className='text-gray-400' />
        <p className='text-center text-sm py-5'>Copyright 2024@ FashionBox - All Right Reserved. </p>
        
    </div>
  )
}

export default Footer