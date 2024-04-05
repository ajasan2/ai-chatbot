import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { sessionRoutes } from './routes/sessionRoutes.js'
import { userRoutes } from './routes/userRoutes.js'

import path from 'path';
import { fileURLToPath } from 'url';

// Resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8000

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

// Add the API-endpoints and the router handlers
app.use('/api/sessions', sessionRoutes)
app.use('/api/users', userRoutes)

// Use the client app
app.use(express.static(path.join(__dirname, "/client/dist")))

// Render the client for any path
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { dbName: 'gemini_chatbot' })
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    })
    .catch((err) => console.log(err))
