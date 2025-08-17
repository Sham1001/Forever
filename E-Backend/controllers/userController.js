import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"


const createToken = (id)=>{
        return jwt.sign({id},process.env.JWT_SCREATE_KEY)
}
const userRegister = async(req,res)=>{
        try{const {name,email,password} = req.body

        let user = await userModel.findOne({email})

        if(user){
           return res.json({success:false, message:"This email already exists,Use other one"})
        }

        if(!validator.isEmail(email)){
              return  res.json({success:false, message:'The email is invalid'})
        }

        

        if(!userModel.isPasswordStrong(password)){
                const feedback = await userModel.strongPasswordFeedback(password)
                return res.json({success:false, message:feedback})
        }

        // if(password.length < 8){
        //         res.json({success:false, message:"The password is too short"})
        // }

        const hashed = await bcrypt.hash(password,10)

        const newUser = new userModel({
                name,
                email,
                password:hashed
        })
        
        const userSave = await  newUser.save()

        const token = createToken(userSave._id)

        res.json({success:true, token})
        }

        catch(error)
        {
           console.log(error)
           res.json({success:false, message:error.message})
        }
        



}

const userLogin = async(req,res)=>{

        try{
                const {email, password} = req.body

        const isEmail = await userModel.findOne({email})

        if(!isEmail){
                return res.json({success:false, message:"User does't exist"})
        }

        const checkPassword = await bcrypt.compare(password,isEmail.password)

        if(!checkPassword){
                return res.json({success:false, message:"Password doesnt match"})
        }

        const token =  createToken(isEmail._id)

        res.json({success:true, token})
        }
        catch(error){
                console.log("Login failed")
                res.json({success:false, message:error.message})
        }

}

const adminLogin = async(req,res)=>{
        try{
                const {email, password} = req.body
                if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
                        const token = jwt.sign(email+password,process.env.JWT_SCREATE_KEY)
                        res.json({success:true, token})
        }
                else{
                        res.json({success:false, message:"Wrong email or password"})
        }
        }
        catch(error){
                res.json({success:false, message:error.message})
        }
}

export {userRegister, userLogin, adminLogin}