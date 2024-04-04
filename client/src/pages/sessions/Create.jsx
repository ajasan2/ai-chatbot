import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../../components/Alert";
import { createSession } from "../../controllers/sessionsController";

const Create = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [value, setValue] = useState("");

    const surpriseOptions = [
        "Who won the latest Nobel Peace Prize?",
        "Where does pizza come from?",
        "How do you make pasta?",
    ];

    const surprise = () => {
        const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
        setValue(randomValue);
    };

    const clear = () => {
        setValue("");
        setError("");
    };

    const getResponse = async (e) => {
        e.preventDefault();

        try {
            const { newSession } = await createSession(value);
            navigate("/update", { state: { session: newSession } });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="card">
            <p>What would you like to know?
                <button className="btn" onClick={surprise}>Surprise me!</button>
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
        </section>
    );
};

export default Create;