import mongoose from 'mongoose'


const ChatHistorySchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    parts: [{
        text: {
            type: String,
            required: true,
        }
    }]
}, { timestamps: true })


const SessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    chatHistory: [ChatHistorySchema]
}, { timestamps: true })


const Session = mongoose.model("Session", SessionSchema)


export default Session;