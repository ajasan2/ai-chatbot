import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

const auth = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token not found' })
    }

    // Extract the token from "Bearer token" string
    const token = authorization.split(" ")[1]

    try {
        const { _id } = jwt.verify(token, process.env.JWT_KEY)
        req.user = await User.findById(_id).select("_id")
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' })
        }
        next()
    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
}

export default auth