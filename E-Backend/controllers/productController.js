import multer from "multer"
import {v2 as cloudinary} from 'cloudinary'
import { json } from "express"
import productModels from "../models/productModel.js"


const productAdd = async(req,res)=>{
    try{
        const {name,price,description,category,subCategory,sizes,bestseller} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        // console.log(name,price,description,category,subCategory,size,bestseller)
        // console.log(image1,image2,image3,image4)

        const images = [image1,image2,image3,image4].filter((item)=>item !== undefined)

        let imageUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:"image"})
                return result.secure_url
            })
        )

        // console.log(name,price,description,category,subCategory,size,bestseller)
        // console.log(imageUrl)

        const productData = {
            name,
            description,
            image:imageUrl,
            sizes:JSON.parse(sizes),
            price:Number(price),
            category,
            subCategory,
            date:Date.now(),
            bestseller:bestseller === 'true' ? true : false

        }

        console.log(productData)

        const product = new productModels(productData)
        await product.save()

        res.json({success:true, message:"product uploaded successfully"})

    }
    catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}

const productRemove = async(req,res)=>{
    try{
        await productModels.findByIdAndDelete(req.body._id)
        res.json({success:true, message:"Product deleted successfully"})
    }
    catch(error){
        res.json({successs:false, message:error.message})
    }
}

const listProduct = async(req,res)=>{
    try{
        const products = await productModels.find({})
        res.json({success:true, products})
    }
    catch(error){
        res.json({success:false, message:error.message})
    }
    
}


const singleProduct = async(req,res)=>{
   try{
     const {id} = req.body
     const singleProd = await productModels.findById(id)
     res.json({success:true, singleProd})
   }
   catch(error){
     res.json({success:false, message:error.message})
   }
}

export {productAdd,productRemove,listProduct,singleProduct}