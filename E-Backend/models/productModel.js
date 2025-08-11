import mongoose, { Schema } from 'mongoose'

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:Array,
        requiredrequired:true
    },
    sizes:{
        type:Array,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    bestseller:{
        type:Boolean,
        required:true
    }

})

// export const Product = mongoose.model('Product',productSchema)

const productModels = mongoose.models.product || mongoose.model('product',productSchema)

export default productModels