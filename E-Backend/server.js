import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongodbConnect from './config/mongoDB.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'

//App config

const app = express()
const port = process.env.PORT || 4000
mongodbConnect()
connectCloudinary()

//Middleware 

// app.use(express.json()) → Reads the incoming JSON data and changes it into a normal JavaScript object so you can easily use it with req.body.
app.use(express.json())
// app.use(cors()) → Lets your server accept requests from other websites or apps (different domains). Without this, browsers block such requests for security reasons.
app.use(cors())



//api endpoint

app.get('/',(req,res)=>{res.send("This is working")})
app.use('/api/user', userRouter)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRoute)
// app.use('api/admin', userRouter)



app.listen(port,()=>console.log('Server is worling on :' +port))