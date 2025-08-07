import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex items-center mb-2 gap-2'>
        <p className='text-4xl  text-gray-400'> {text1}<span className='font-medium ml-2 text-gray-700'>{text2}</span></p>
        <p className='w-8 sm:w-11 h-[1px] sm:h-[2px] bg-gray-700'></p>
    </div>
  )
}

export default Title