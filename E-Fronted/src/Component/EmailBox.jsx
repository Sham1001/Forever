import React from 'react'

const EmailBox = () => {
    const onSubmitHandler = (e)=>{
        e.preventDefault()
    }
  return (
    <div className='flex flex-col gap-9 pb-5 items-center'>
        <div>
        <p className='text-3xl text-gray-700 text-center pb-2 '>Subscribe to get <span className='text-red-800'>20%</span> OFF</p>
        <p className='text-center text-gray-800'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, dicta!</p>
        </div>
        <form onSubmit={onSubmitHandler} className='border rounded-2xl items-center flex w-full sm:w-1/2 gap-4 mx-auto pl-3 '>
            <input className='sm:flex-1 w-full outline-none py-3 px-4' type="email" placeholder='Enter Your Email' required/>
            <button  className='bg-black text-white px-10 py-4 rounded-2xl ' type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default EmailBox