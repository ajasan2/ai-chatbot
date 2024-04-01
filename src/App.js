import { useState } from 'react'

function App() {
    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const [history, setHistory] = useState([])

    const surpriseOptions = [
        "Who won the latest Nobel Peace Prize?",
        "Where does pizza come from?",
        "How do you make pasta?",
    ]

    const surprise = () => {
        const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
        setValue(randomValue)
    }

    const getResponse = async () => {
        if (!value) {
            setError("Please enter a question.")
            return
        }
        try {
            const options = {
                method: "POST",
                body: JSON.stringify({
                    history: history,
                    message: value
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const response = await fetch("http://localhost:8000/gemini", options)
            const data = await response.text()
            console.log(data)
            setHistory(oldHistory => [...oldHistory, {
                role: "user",
                parts: [{ text: value }]
            },
            {
                role: "model",
                parts: [{ text: data }]
            }
            ])
            setValue("")
        } catch (error) {
            console.error(error)
            setError("Something went wrong. Please try again later.")
        }
    }

    const clear = () => {
        setValue("")
        setError("")
        setHistory([])
    }

    return (
        <div className="App">
            <p>What would you like to know?
                <button className="surprise" onClick={surprise} disabled={!history}>Surprise me!</button>
            </p>
            <div className="input-container">
                <input
                    value={value}
                    placeholder={"Is Santa Clause real?"}
                    onChange={(e) => setValue(e.target.value)}
                ></input>
                {!error && <button onClick={getResponse}>Ask me</button>}
                {error && <button onClick={clear}>Clear</button>}
            </div>
            {error && <p>{error}</p>}
            <div className="search-result">
                {history.map((chatItem, index) => <div key={index}>
                    <p className="answer">{chatItem.role} : {chatItem.parts.map(part => part.text).join(', ')}</p>
                </div>)}

            </div>
        </div>
    );
}

export default App;
