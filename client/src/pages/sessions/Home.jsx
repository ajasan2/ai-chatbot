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
    const [deleteCount, setDeleteCount] = useState(0);

    const handleDelete = async (e, _id) => {
        e.stopPropagation();

        if (confirm("Confirm delete?")) {
            try {
                const data = await deleteSession(_id);
                setSuccess(data.message);
                setDeleteCount(deleteCount + 1);
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

            {error && <Alert msg={error} />}
            {success && <Success key={deleteCount} msg={success} />}
            
            {user.sessions && user.sessions.map(session => (
                <div
                    key={session._id}
                    className="hover:bg-primary bg-neutral mb-4 p-2 rounded cursor-pointer session-card flex items-center"
                >
                    <Link
                        to={"/update"}
                        state={{ session }}
                        className="flex-1"
                    >
                        <Session session={session} />
                    </Link>
                    <button
                        className="ml-2 fa-solid fa-trash-can nav-link text-red-500 hover:bg-red-200"
                        title="Delete"
                        onClick={(e) => handleDelete(e, session._id)}
                    ></button>
                </div>
            ))}
            {loading && (<i className="text-6xl fa-solid fa-spinner fa-spin text-3xl text-center block mt-8"></i>)}
        </section>
    );
};

export default Home;