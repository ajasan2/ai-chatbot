import mongoose from 'mongoose'
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai'

import Session from '../models/SessionModel.js'

const createSession = async (req, res) => {
    try {
        const model = configureGenerativeModel(
            process.env.API_KEY, 
            'gemini-pro', 
            HarmBlockThreshold.BLOCK_ONLY_HIGH);

        const prompt = req.body.message
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        const chatHistory = [{
            role: 'user',
            parts: [{ text: prompt }]
        }, {
            role: 'model',
            parts: [{ text }]
        }]

        const newSession = await Session.create({ userId: req.user._id, chatHistory });
        res.status(200).json({ newSession })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getSession = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.sessionId)) {
        return res.status(400).json({ error: 'Invalid session ID' })
    }

    try {
        const session = await Session.findOne({ _id: req.params.sessionId, userId: req.user._id })
        res.status(200).json({ session })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getSessions = async (req, res) => {
    try {
        const userSessions = await Session.find({ userId: req.user._id }).sort({ createdAt: "desc" })
        res.status(200).json({ userSessions })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// Modify function depending on state maintained in App.js
const updateSession = async (req, res) => {
    const sessionId = req.params.sessionId;

    if (!sessionId) {
        return res.status(400).json({ error: 'Invalid request' })
    }
    else if (!mongoose.Types.ObjectId.isValid(sessionId)) {
        return res.status(400).json({ error: 'Invalid session ID' })
    }

    const session = await Session.findOne({ _id: sessionId, userId: req.user._id })
    if (!session) {
        return res.status(404).json({ error: 'Session not found' })
    }

    try {
        // Convert chat history to the format required by the API
        let formattedChatHistory = session.chatHistory.map(chat => {
            return {
                role: chat.role,
                parts: chat.parts.map(part => {
                    return { text: part.text }
                })
            }
        });

        const model = configureGenerativeModel(
            process.env.API_KEY, 
            'gemini-pro', 
            HarmBlockThreshold.BLOCK_ONLY_HIGH);
            
        const chat = model.startChat({
            history: formattedChatHistory
        })
        const result = await chat.sendMessage(req.body.message)
        const response = await result.response
        const text = response.text()

        session.chatHistory.push({
            role: 'user',
            parts: [{ text: req.body.message }]
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

    try {
        const session = await Session.findOne({ _id: req.params.sessionId, userId: req.user._id })
        await session.deleteOne()
        res.status(200).json({ message: 'Session was deleted' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const configureGenerativeModel = (apiKey, modelName, safetyThreshold) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: safetyThreshold
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: safetyThreshold
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: safetyThreshold
        },
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: safetyThreshold
        },
    ];

    return genAI.getGenerativeModel({
        model: modelName,
        safetySettings: safetySettings
    });
};


export { createSession, getSession, getSessions, updateSession, deleteSession }