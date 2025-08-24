import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"


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

}

const orderByStripe = async (req, res) => {

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

export { orderByCod, orderByRazorpay, orderByStripe, allOredr, userOrder, updateOrder }