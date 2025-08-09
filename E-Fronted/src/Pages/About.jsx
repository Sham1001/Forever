import React from 'react'
import Title from '../Component/Title.jsx'
import { assets } from '../asset/frontend_assets/assets.js'
import EmailBox from '../Component/EmailBox.jsx'

const About = () => {
  return (
    <div className='mt-[60px]'>
      <div className=''>
        <div className='flex justify-center'>
          <Title text1={'ABOUT'} text2={'US'}/>
        </div>
        <div className='flex flex-col sm:flex-row justify-around gap-[60px] m-10'>
          <img className='w-full sm:w-2/5' src={assets.about_img} alt="" />
          <div className='flex flex-col gap-7 py-5'>
            <p className='text-lg text-gray-600'>
                Forever was born out of a passion for innovation and a desire to revolutionize 
                the way people shop online. Our journey began with a simple idea: to provide a 
                platform where customers can easily discover, explore, and purchase a wide range
                 of products from the comfort of their homes.
            </p>
            <p className='text-lg text-gray-600'>
              Since our inception, we've worked tirelessly to curate a diverse selection of high-quality
               products that cater to every taste and preference. From fashion and beauty to electronics 
               and home essentials, we offer an extensive collection sourced from trusted brands and 
               suppliers.
            </p>
            <b className='text-lg'>
              Our Mission
            </b>
            <p className='text-lg text-gray-600'>
              Our mission at Forever is to empower customers with choice, convenience, and confidence. 
              We're dedicated to providing a seamless shopping experience that exceeds expectations, 
              from browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>
      <div className='mt-[100px]'>
        <div>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>
        <div className='flex flex-col sm:flex-row border justify-around mt-6 text-gray-300'>
          <div className='sm:p-20 px-20 py-5 gap-6 border-b sm:border-0' >
          <b className='text-black'>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='sm:p-20 px-20 py-5  border-b sm:border-l'>
          <b className='text-black'>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='sm:p-20 px-20 py-5 border-b sm:border-l'>
          <b className='text-black'>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
        </div>
      </div>

      <div  className='mt-[120px]'>
      <EmailBox/>
      </div>

    </div>
  )
}

export default About