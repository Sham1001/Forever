import React from 'react'
import { assets } from '../asset/frontend_assets/assets'

const ExchangePolice = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around  text-center gap-12 sm:gap-2 py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div >
            <img className='w-12 m-auto mb-5' src={assets.exchange_icon} alt="Exchange_Police" />
            <p>Easy Exchange</p>
            <p>We give hassle free exchange police</p>
        </div>
         <div>
            <img className='w-12 m-auto mb-5' src={assets.quality_icon} alt="Exchange_Police" />
            <p>7 days return policy</p>
            <p>We provide 7 days return policy</p>
        </div>
         <div>
            <img className='w-12 m-auto mb-5' src={assets.support_img} alt="Exchange_Police" />
            <p>Best Customer Support</p>
            <p>We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default ExchangePolice