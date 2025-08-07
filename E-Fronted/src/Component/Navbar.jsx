import React, { useContext, useState } from 'react'
import { NavLink,Link } from 'react-router-dom'
import {assets} from '../asset/frontend_assets/assets'
import {ShopContext} from '../Context/ShopContext'



const Navbar = () => {

    const [active , setActive] = useState(false)

    const {showSearch,setShowSearch,getCartCount} = useContext(ShopContext)
  return (
    <div>
    <nav className='flex justify-between py-6 items-center font-medium '>
    <Link to={'/'}>
        <img className='w-36' src={assets.logo} alt="Site_Logo" />
    </Link>


    <ul className='hidden sm:flex gap-5 text-sm text-gray-700  '>
    <NavLink to='/' className='flex flex-col  gap-1'>
        <p>HOME</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
    </NavLink>
     <NavLink to='/collection' className='flex flex-col items-center gap-1'>
        <p>COLLECTION</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
    </NavLink>
     <NavLink to='/about' className='flex flex-col items-center gap-1'>
        <p>ABOUT</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
    </NavLink>
     <NavLink to='/contact' className='flex flex-col items-center gap-1'>
        <p>CONTACT</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
    </NavLink>
    <NavLink to='/login'>
        <button className='border-1 rounded-2xl cursor-pointer'><p className='px-2 font-medium text-center'>Admin Panel</p></button>
        
    </NavLink>
    </ul>

    <div className='flex items-center gap-6 '>
        <Link to='/collection'>
       <img onClick={()=> setShowSearch(prev=>!prev)} className='w-5'src={assets.search_icon} alt="search_icon" />
       </Link>
         <div className='group relative '>
           <img className='w-5' src={assets.profile_icon} alt="" />
           <div className='group-hover:block hidden right-0 pt-4 absolute dropdown-menu'>
                <div className='flex flex-col gap-2 py-3 w-36 bg-slate-100 text-gray-500 rounded'>
                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                    <p className='cursor-pointer hover:text-black'>My Order</p>
                    <p className='cursor-pointer hover:text-black'>Logout</p>

                </div>
           </div>
         </div>
         <Link to='/cart' className='relative'>
            <img className='w-5 min-w-5 cursor-pointer' src={assets.cart_icon} alt="cart_icon" />
            
            <p className='absolute right-[-5px] bottom-[-5px] text-sm text-center rounded-full w-4 bg-black text-white leading-4 aspect-square text-[8px]'>{getCartCount()}</p>
            
         </Link>
          <img className='w-6 sm:hidden' onClick={()=>setActive(true)} src={assets.menu_icon} alt="" />
    </div>
      

       <div className={`absolute top-0 right-0 bottom-0 ${active ? 'w-full' : 'w-0' } overflow-hidden bg-white transition-all`}>
        <div className='flex flex-col  text-center'>
            <div onClick={()=>setActive(false)} className='flex gap-5 items-center px-4 py-4'>
                <img className='h-5 rotate-180' src={assets.dropdown_icon} alt="" />
                <p className='text-gray-400 text-lg'>Back</p>
            </div>
            <div className='space-y-3 flex flex-col '>
                <NavLink onClick={()=>setActive(false)} to='/' className='py-2 cursor-pointer border'>HOME</NavLink>
                <NavLink onClick={()=>setActive(false)} to='/collection' className='py-2 cursor-pointer border'>COLLECTION</NavLink>
                <NavLink onClick={()=>setActive(false)} to='/about' className='py-2 cursor-pointer border'>ABOUT</NavLink>
                <NavLink onClick={()=>setActive(false)} to='contact' className='py-2 cursor-pointer border'>CONTACT</NavLink>
            </div>
        </div>

       </div>
       
       
    </nav>
    <hr className='text-gray-400' />
    </div>
    
    
  )
  
}
// console.log(active)

export default Navbar