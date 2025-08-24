import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const userAuth = async (req, res, next) => {
    const { token } = req.headers

    if (!token) {
        return res.json({ success: false, message: "Only logined user can perform this action" })
    }

    try {
        const decode_token = jwt.verify(token, process.env.JWT_SCREATE_KEY)

        if (!decode_token) {
            return res.json({ success: false, message: "Only logined user can perform this action" })
        }

        req.body.userId = decode_token.id
        next() 
    }
    catch (error) {
        console.log(error)
        res.json({ succcess: false, message: error.message })
    }
}

export default userAuth