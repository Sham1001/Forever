import React from 'react'
import { assets } from '../asset/frontend_assets/assets'
import Title from '../Component/Title'
import EmailBox from '../Component/EmailBox.jsx'

const Contact = () => {
  return (
    <div className='space-y-[120px] '>
      <div className='mt-[80px]'>
        <div className='text-center'>
          <Title text1={'CONTACT'} text2={'US'}/>
        </div>
        <div className='flex flex-col sm:flex-row justify-center mx-20 mt-10 mb-20 gap-[2px] sm:gap-[40px]'>
           <img className='w-full sm:w-2/4' src={assets.contact_img} alt="" />
           <div className='flex flex-col my-[90px] gap-7'>
            <p className='text-gray-600 text-2xl font-bold'>Our Store</p>

            <div>
              <p>54709 Willms Station</p>
              <p>Suite 350, Washington, USA</p>
            </div>

            <div>
              <p>Tel: (415) 555-0132</p>
              <p>Email: admin@forever.com</p>
            </div>

            <b className='text-gray-600 text-2xl font-bold'>Careers at Forever</b>

            <p>Learn more about our teams and job openings.</p>
            <div className=''>
            <button className='border w-30 h-10 justify-center items-center flex bg-black text-white cursor-pointer active:bg-gray-700'>Explore Job</button>
            </div>
           </div>
      </div>
      </div>
     
        <EmailBox/>
      
    </div>
  )
}

export default Contact