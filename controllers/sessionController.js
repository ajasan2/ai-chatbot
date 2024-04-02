import mongoose from 'mongoose'
import { GoogleGenerativeAI } from '@google/generative-ai'
import Session from '../models/SessionModel.js'
import User from '../models/UserModel.js'

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

const addSession = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const newSession = await Session.create({ userId: user._id, chatHistory: [] })
        res.status(200).json({ newSession })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getSession = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.sessionId)) {
        return res.status(400).json({ error: 'Invalid session ID' })
    }

    const session = await Session.findOne({ _id: req.params.sessionId, userId: req.user._id })
    if (!session) {
        return res.status(404).json({ error: 'Session not found' })
    }

    try {
        res.status(200).json({ session })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getUserSessions = async (req, res) => {
    const user = await User.findById(req.user._id)

    try {
        const userSessions = await Session.find({ userId: user._id})
        res.status(200).json({ userSessions })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// Modify function depending on state maintained in App.js
const updateSession = async (req, res) => {
    const { sessionId, chatHistory } = req.body

    if (!sessionId || !chatHistory) {
        return res.status(400).json({ error: 'Invalid request' })
    }
    else if (!mongoose.Types.ObjectId.isValid(req.params.sessionId)) {
        return res.status(400).json({ error: 'Invalid session ID' })
    }

    const session = await Session.findOne({ _id: req.params.sessionId, userId: req.user._id })
    if (!session) {
        return res.status(404).json({ error: 'Session not found' })
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
        const chat = model.startChat({
            history: req.body.history
        })
        const result = await chat.sendMessage(req.body.message)
        const response = await result.response
        const text = response.text()

        session.chatHistory.push({
            role: 'user',
            parts: [{ text: message }]
        }, {
            role: 'model',
            parts: [{ text }]
        })

        await session.save()
        res.status(200).json({ text })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteSession = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.sessionId)) {
        return res.status(400).json({ error: 'Invalid session ID' })
    }

    const session = await Session.findOne({ _id: req.params.sessionId, userId: req.user._id })
    if (!session) {
        return res.status(404).json({ error: 'Session not found' })
    }

    try {
        await session.deleteOne()
        res.status(200).json({ message: 'Session was deleted' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


export { addSession, getSession, getUserSessions, updateSession, deleteSession }