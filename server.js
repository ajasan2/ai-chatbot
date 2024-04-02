import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { sessionRoutes } from './routes/sessionRoutes.js'
import { userRoutes } from './routes/userRoutes.js'

const PORT = 8000

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use('/api/sessions', sessionRoutes)
app.use('/api/users', userRoutes)

mongoose.connect("mongodb://localhost:27017", { dbName: 'gemini_chatbot'})
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    })
    .catch((err) => console.log(err))
