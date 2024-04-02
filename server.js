import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { sessionRoutes } from './routes/sessionRoutes.js'
import mongoose from 'mongoose'

const PORT = 8000

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use('/api/sessions', sessionRoutes)

mongoose.connect("mongodb://localhost:27017", { dbName: 'gemini_chatbot'})
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    })
    .catch((err) => console.log(err))
