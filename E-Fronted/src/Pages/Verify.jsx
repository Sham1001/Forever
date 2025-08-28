import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from "axios"
import {toast} from 'react-toastify'
import { useEffect } from 'react'

const Verify = () => {

    const {token,navigate,setCartItems,backendUrl} = useContext(ShopContext)
    const [searchParams,setSerachParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPAyment = async()=>{
        try {
            if(!token){
                return null
            }

            const response = await axios.post(backendUrl + "/api/order/verify", {success, orderId}, {headers:{token}})
            if(response.data.success){
                setCartItems({})
                navigate('/order')
            }
            else{
                navigate('/cart')
        }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        verifyPAyment()
    },[token])

  return (
   <div className="flex items-center justify-center h-screen text-lg font-semibold">
      Verifying your payment...
    </div>
  )
}

export default Verify