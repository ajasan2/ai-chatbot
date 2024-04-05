import express from 'express'
import { createSession, getSession, getSessions, updateSession, deleteSession } from '../controllers/sessionController.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

// Create a new session
router.post('/', auth, createSession)

// Read all user sessions
router.get('/user', auth, getSessions)

// Read a session
router.get('/:sessionId', auth, getSession)

// Update a session
router.put('/:sessionId', auth, updateSession)

// Delete a session
router.delete('/:sessionId', auth, deleteSession)

export { router as sessionRoutes }