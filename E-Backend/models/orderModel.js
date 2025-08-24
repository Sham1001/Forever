import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    address:{
        type:Object,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    method:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'Oder placed'
    },
    payment:{
        type:Boolean,
        required:true,
        default:false
    },
    date:{
        type:Number,
        required:true
    }
})

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema)

export default orderModel