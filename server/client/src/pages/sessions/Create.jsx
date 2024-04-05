import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../../components/Alert";
import { createSession } from "../../controllers/sessionsController";

const Create = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
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

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { newSession } = await createSession(value);
            navigate("/update", { state: { session: newSession } });
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

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
            <button className="btn mb-4" onClick={handleCreate}>Send</button>
            <button className="btn" onClick={clear}>Clear</button>
            {error && <Alert msg={error} />}
        </section>
    );
};

export default Create;