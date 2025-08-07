import React, { useContext, useEffect } from 'react'
import { assets } from '../asset/frontend_assets/assets'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'

const SearchBar = () => {

    // useEffect(() => {
    //     console.log(`The result is , ${searchResult}`)
    // }, [])

    const { showSearch, setShowSearch, searchResult, setSearchResult,products } = useContext(ShopContext)

    const searchFillter=()=>{
        searchCopy = products
    }

    return showSearch ? (
        <div className='py-6 bg-gray-100 flex justify-center gap-3 items-center '>

            <div className='flex border w-3/4 sm:w-1/2 py-2 justify-between rounded-3xl items-center bg-white '>
                <input onChange={(e) => setSearchResult(e.target.value)} value={searchResult} className=' rounded-2xl outline-none px-4 w-full ' type="email" placeholder='search....' />
              
                <img className='h-5 w-auto pr-5 ' src={assets.search_icon} alt="" />
                
            </div>
            <img onClick={() => setShowSearch(false)} className='h-4' src={assets.cross_icon} alt="" />


        </div>
    ) : null
}

export default SearchBar