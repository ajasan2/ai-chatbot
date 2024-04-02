import express from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getSession, addSession, updateSession, deleteSession } from '../controllers/sessionController.js'

const router = express.Router()

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

// Create a new session
router.post('/', addSession)

// Read a session
router.get('/:sessionId', getSession)

// Update a session
router.put('/:sessionId', updateSession)

// Delete a session
router.delete('/:sessionId', deleteSession)

export { router as sessionRoutes }