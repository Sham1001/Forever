import jwt from "jsonwebtoken"


const adminCheck = async(req,res,next)=>{
    try{
        const {token} = req.headers
    if(!token){
        return res.json({success:false, message:"Only Admin cana do this activity"})
    }

    const decode_token = jwt.verify(token, process.env.JWT_SCREATE_KEY)

    if(decode_token !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
         return res.json({success:false, message:"Only Admin cana do this activity"})
    }

    next()
    }
    catch(error){
        res.json({success:false, message:error.message})
    }
    
}

export default adminCheck