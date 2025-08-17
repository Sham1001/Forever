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


userSchema.statics.isPasswordStrong = (password)=>{
    const minLength = 8
    const capitalWord = /[A-Z]/.test(password)
    const smallWord = /[a-z]/.test(password)
    const hasNum = /\d/.test(password)
    const specialChar =  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)

    return(
        password.length >= minLength &&
        capitalWord &&
        smallWord &&
        hasNum &&
        specialChar
    )

}

userSchema.statics.strongPasswordFeedback = function (password){
    const feedback = []
    if(password.length < 8) feedback.push("Password must be at least 8 characters long.")
    if(!/[A-Z]/.test(password)) feedback.push("Password must have at least one upper letter")
    if(!/[a-z]/.test(password)) feedback.push("Password must contain at least one lowercase letter.")
    if (!/\d/.test(password)) feedback.push("Password must contain at least one number.");
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) feedback.push("Password must contain at least one special character.");

    return feedback.length === 0 ? "Password is strong" : feedback.join(", ")
}



const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel