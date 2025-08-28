// import { currency } from "../../adminPanel/src/App.jsx"
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'
import razorpay from "razorpay"

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_KEY
})

const stripe = new Stripe(process.env.STRIPE_SCREATE_KEY)
const currency = 'inr'
const deliveryCharge = 10


const orderByCod = async (req, res) => {
    try {
        const { address, items, amount, userId } = req.body

        const orderData = {
            address,
            amount,
            items,
            userId,
            method: 'COD',
            payment: 'false',
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: 'Order Added' })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const orderByRazorpay = async (req, res) => {
    try {
        const { address, items, amount, userId } = req.body


        const orderData = {
            address,
            amount,
            items,
            userId,
            method: 'Razorpay',
            payment: 'false',
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const option = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()

        }

        await razorpayInstance.orders.create(option, (error, order) => {
            if (error) {
                console.log(error)
                return res.json({ success: false, message: error })
            }
            res.json({ success: true, order })
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const razorpayVerify = async (req,res) => {
    const { userId, razorpay_order_id } = req.body

    try {
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        console.log(orderInfo)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true, message: "Payment is Success" })
        }
        else {
            await orderModel.findByIdAndDelete(orderInfo.receipt)
            res.json({ success: false, message: "Payment failed" })
           
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const orderByStripe = async (req, res) => {


    try {
        const { address, items, amount, userId } = req.body
        const { origin } = req.headers

        const orderData = {
            address,
            amount,
            items,
            userId,
            method: 'Stripe',
            payment: 'false',
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity

        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

const verfyStripe = async (req, res) => {
    try {
        const { orderId, success, userId } = req.body

        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const allOredr = async (req, res) => {
    try {
        const order = await orderModel.find({})
        res.json({ success: true, order })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const userOrder = async (req, res) => {

    try {
        const { userId } = req.body

        const order = await orderModel.find({ userId })
        res.json({ success: true, order })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

const updateOrder = async (req, res) => {

    try {
        const { orderId, status } = req.body

        const staus = await orderModel.findByIdAndUpdate(orderId, { status })

        res.json({ success: true, message: "Status updated" })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { orderByCod, orderByRazorpay, orderByStripe, allOredr, userOrder, updateOrder, verfyStripe, razorpayVerify }