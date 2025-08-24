import {orderByCod,orderByRazorpay,orderByStripe,allOredr,userOrder,updateOrder} from '../controllers/orderController.js'
import express from 'express'
import userAuth from '../middlewares/auth.js'
import adminCheck from '../middlewares/adminAuth.js'

const orderRoute = express.Router()

orderRoute.post('/cod',userAuth,orderByCod)
orderRoute.post('/razorpay',userAuth,orderByRazorpay)
orderRoute.post('/stripe',userAuth,orderByStripe)
orderRoute.post('/userOrder',userAuth,userOrder)
orderRoute.post('/allOredr',adminCheck,allOredr)
orderRoute.post('/update',adminCheck,updateOrder)

export default orderRoute
