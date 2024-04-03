import express from 'express'
import { addSession, getSession, getUserSessions, updateSession, deleteSession } from '../controllers/sessionController.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

// Create a new session
router.post('/', auth, addSession)

// Read all user sessions
router.get('/user', auth, getUserSessions)

// Read a session
router.get('/:sessionId', auth, getSession)

// Update a session
router.put('/:sessionId', auth, updateSession)

// Delete a session
router.delete('/:sessionId', auth, deleteSession)

export { router as sessionRoutes }