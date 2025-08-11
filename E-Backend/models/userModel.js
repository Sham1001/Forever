import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartItems:{
        type:Object,
        default:{}
    }
},
{minimize:false})

//MongoDb will also treat value which is empty like default:{} as a undefine value and not include in dataBase , so to prevent it we use 
//minimize:false with this mongoDb will include the data which is empty in start or by default 

const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel