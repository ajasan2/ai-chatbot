import User from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import 'dotenv/config.js'
import jwt from 'jsonwebtoken'

// Create JSON web token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_KEY, { expiresIn: '30d' })
}

const registerUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'Please enter all fields' })
    }

    const exist = await User.findOne({ email })
    if (exist) {
        return res.status(404).json({ error: 'User already exists' })
    }

    // Hash user password
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(password, salt)

    try {
        const user = await User.create({ email, password : hashed })
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'Please enter all fields' })
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ error: 'Incorrect email' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(404).json({ error: 'Incorrect password' })
    }

    try {
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export { registerUser, loginUser }