import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export const ShopContext = createContext()

export const ContextProvider = ({ children }) => {

    const [showSearch, setShowSearch] = useState(false)
    const [searchResult, setSearchResult] = useState('')
    const [cartItems, setCartItems] = useState({})
    const [products, setProduct] = useState([])
    const [token, setToken] = useState('')
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const getProductData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                console.log(response)
                setProduct(response.data.products)
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        getProductData()
    }, [])



    const addToCart = async (itemId, size) => {

        try {
            if (token) {
                const response = await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
                if (!response.data.success) {
                     toast.success(response.data.message)
                    
                    
                }
                
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }

        if (!size) {
            toast.error("Please select the size")
            return ''
        }

        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1

            }
            else {
                cartData[itemId][size] = 1
            }

        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)
        
        // console.log(cartData)


    }

    const getCartData = async(token)=>{
        try{
            
                const response = await axios.post(backendUrl+ "/api/cart/get", {}, {headers:{token}})
                if(response.data.success){
                    setCartItems(response.data.cartData)
                }
                
            
        }
        catch(error){
             console.log(error)
             toast.error(error.message)
        }
    }


    const getCartCount =  () => {
        let cartCount = 0

        // try {
        //     if (token) {
        //         let respon = await axios.post(backendUrl + '/api/cart/get', { header: { token } })
        //         if (respon.data.success) {
        //             setCartItems(respon.data)
        //             for (const items in cartItems) {
        //                 for (const item in cartItems[items]) {
        //                     try {
        //                         if (cartItems[items][item] > 0) {
        //                             cartCount += cartItems[items][item]
        //                         }
        //                     }
        //                     catch (error) {
        //                         console.log(error)
        //                     }
        //                 }

        //             }
        //             return cartCount
        //         }

        //     }

        // }
        // catch (error) {

        // }

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        cartCount += cartItems[items][item]
                    }
                }
                catch (error) {
                    console.log(error)
                }
            }

        }
        return cartCount
    }

    const updateCartInfo = async (itemId, size, quantity) => {

        try{
            if(token){
                const response = await axios.post(backendUrl +"/api/cart/update" ,{itemId,size,quantity},{headers:{token}})
                console.log(response)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }

        let cartInfo = structuredClone(cartItems)

        cartInfo[itemId][size] = quantity
        setCartItems(cartInfo)

        
    }


    const getCartAmount = () => {
        let totalAmount = 0

        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                }
                catch (error) {

                }
            }
        }
        return totalAmount
    }

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getCartData(localStorage.getItem('token'))
        }
    })


    const curreny = '$'
    const delivery_fee = 10

    const value = {
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
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
        setCartItems
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}