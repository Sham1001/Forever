import mongoose from "mongoose"

const mongodbConnect = async()=>{

    try{
        mongoose.connection.on('connected',()=>{
        console.log("MogoDB is connected")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
    }

    catch (error)
    {
        console.log('Connection to mongoDB failed:',error)
    }
    
}

export default mongodbConnect