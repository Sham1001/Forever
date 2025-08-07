import { createContext, useEffect, useState } from "react";
import {products} from "../asset/frontend_assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext()

export const ContextProvider = ({children})=>{

    const [showSearch , setShowSearch] = useState(false)
    const [searchResult,setSearchResult] = useState('')
    const [cartItems, setCartItems] = useState({})

    const addToCart = (itemId,size)=>{
    
        if(!size){
            toast.error("Please select the size")
            return ''
        }

        let cartData = structuredClone(cartItems)

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1

            }
            else{
                cartData[itemId][size] = 1
            }
            
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)
    }

    
    const getCartCount = () =>{
        let cartCount = 0

        for (const items in cartItems){
            for(const item in cartItems[items]){
                try{
                if(cartItems[items][item] > 0){
                    cartCount += cartItems[items][item]
                }
            }
            catch (error){

            }
            }

        }
        return cartCount
    }

    const updateCartInfo = async(itemId,size,quantity)=>{
        let cartInfo = structuredClone(cartItems)

        cartInfo[itemId][size] = quantity
        setCartItems(cartInfo)
    }


    const getCartAmount = ()=>{
        let totalAmount = 0

        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items)
            for(const item in cartItems[items]){
                try{
                if(cartItems[items][item] > 0){
                    totalAmount += itemInfo.price * cartItems[items][item]
                }
            }
            catch(error){

            }
            }
        }
        return totalAmount
    }
    

    const curreny = '$'
    const delivery_fee =10

    const value={
        products,
        curreny,
        delivery_fee,
        showSearch,
        setShowSearch,
        searchResult,
        setSearchResult,
        addToCart,
        cartItems,
        getCartCount,
        updateCartInfo,
        getCartAmount
    }

   return(
    <ShopContext.Provider value={value}>
        {children}
    </ShopContext.Provider>
   )
}