import {orderByCod,orderByRazorpay,orderByStripe,allOredr,userOrder,updateOrder,verfyStripe,razorpayVerify} from '../controllers/orderController.js'
import express from 'express'
import userAuth from '../middlewares/auth.js'
import adminCheck from '../middlewares/adminAuth.js'

const orderRoute = express.Router()

orderRoute.post('/cod',userAuth,orderByCod)
orderRoute.post('/razorpay',userAuth,orderByRazorpay)
orderRoute.post('/Razorverify',userAuth,razorpayVerify)
orderRoute.post('/stripe',userAuth,orderByStripe)
orderRoute.post('/userOrder',userAuth,userOrder)
orderRoute.post('/allOredr',adminCheck,allOredr)
orderRoute.post('/update',adminCheck,updateOrder)
orderRoute.post('/verify',userAuth,verfyStripe)

export default orderRoute
