import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { deleteSession, getSessions } from "../../controllers/sessionsController";
import { UserContext } from "../../contexts/UserContext";
import Session from "../../components/Session";
import Alert from "../../components/Alert";
import Success from "../../components/Success";

const Home = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (!user.email) {
            navigate("/login");
        }

        setTimeout(async () => {
            const { userSessions } = await getSessions();
            setUser(prevUser => ({ ...prevUser, sessions: userSessions }));
            setLoading(false);
        }, 1000);
    }, []);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleDelete = async (e, _id) => {
        e.stopPropagation();

        if (confirm("Confirm delete?")) {
            try {
                const data = await deleteSession(_id);
                setSuccess(data.message);
            } catch (error) {
                setError(error.message);
            }

            const newSessions = user.sessions.filter(session => session._id !== _id);
            setUser({ ...user, sessions: newSessions });
        }
    }

    return (
        <section className="card">
            <p>{user.email}</p>
            <h1 className="title">Sessions</h1>

            {loading && (<i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>)}
            {success && <Success msg={success} />}
            {error && <Alert msg={error} />}

            {user.sessions && user.sessions.map(session => (
                <div
                    key={session._id}
                    className="p-2 bg-white hover:bg-gray-200 transition-colors duration-200 rounded cursor-pointer"
                >
                    <Link
                        to={"/update"}
                        state={{ session }}
                    >
                        <Session session={session}>
                            <div className="flex items-center gap-2">
                                <button
                                    className="fa-solid fa-trash-can nav-link text-red-500 hover:bg-red-200"
                                    title="Delete"
                                    onClick={(e) => handleDelete(e, session._id)}
                                ></button>
                            </div>
                        </Session>
                    </Link>
                </div>
            ))}
        </section>
    );
};

export default Home;