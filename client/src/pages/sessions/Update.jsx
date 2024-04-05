import { useState } from "react"
import { useLocation } from "react-router-dom"

import Alert from "../../components/Alert"
import { updateSession } from "../../controllers/sessionsController"

const Update = () => {
    const { state } = useLocation();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [value, setValue] = useState("")
    const [history, setHistory] = useState(state?.session?.chatHistory ?? [])

    const surpriseOptions = [
        "Who won the latest Nobel Peace Prize?",
        "Where does pizza come from?",
        "How do you make pasta?",
    ]

    const surprise = () => {
        const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
        setValue(randomValue)
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const data = await updateSession(state.session._id, value);
            setHistory(oldHistory => [...oldHistory, {
                role: "user",
                parts: [{ text: value }]
            },
            {
                role: "model",
                parts: [{ text: data.text }]
            }
            ])
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
        setValue("");
    }

    const clear = () => {
        setValue("")
        setError("")
    }

    return (
        <section className="card">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <p className="my-4">What would you like to know?</p>
                    {loading && (<i className="fa-solid fa-spinner fa-spin text-3xl ml-2"></i>)}
                </div>
                <button
                    className="block bg-primary text-black rounded-md py-1 px-3 hover:scale-y-95"
                    onClick={surprise}>
                    Surprise me!
                </button>
            </div>
            <input
                type="text"
                value={value}
                className="input"
                placeholder={"Is Santa Clause real?"}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
            ></input>

            <button className="btn" onClick={handleUpdate}>Send</button>
            <button className="btn" onClick={clear}>Clear</button>
            {error && <Alert msg={error} />}

            {history.map((chatItem, index) => (
                <div key={index} className={`chat-item ${chatItem.role}`}>
                    <p>{chatItem.role} : {chatItem.parts.map(part => part.text).join(', ')}</p>
                </div>
            ))}

        </section>
    );
}

export default Update;