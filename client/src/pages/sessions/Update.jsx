import { useState } from "react"
import { useLocation } from "react-router-dom"

import Alert from "../../components/Alert"
import { updateSession } from "../../controllers/sessionsController"

const Update = () => {
    const { state } = useLocation();

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

    const getResponse = async (e) => {
        e.preventDefault();

        try {
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
            setValue("");
        } catch (error) {
            setError(error.message);
        }
    }

    const clear = () => {
        setValue("")
        setError("")
    }

    return (
        <section className="card">
            <p>What would you like to know?
                <button className="btn" onClick={surprise} disabled={history}>Surprise me!</button>
            </p>
            <div className="input-container">
                <input
                    type="text"
                    value={value}
                    className="input"
                    placeholder={"Is Santa Clause real?"}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                ></input>
                {!error && <button className="btn" onClick={getResponse}>Send</button>}
                {error && <button className="btn" onClick={clear}>Clear</button>}
            </div>

            {error && <Alert msg={error} />}

            <div className="search-result">
                {history.map((chatItem, index) => (
                    <div key={index}>
                        <p>{chatItem.role} : {chatItem.parts.map(part => part.text).join(', ')}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Update;