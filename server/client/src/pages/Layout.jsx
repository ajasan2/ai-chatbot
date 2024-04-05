import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'

import { UserContext } from '../contexts/UserContext';

const Layout = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        if (confirm("Confirm logout?")) {
            setUser({ email: null, sessions: [] });
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            navigate("/login");
        }
    }

    return (
        <>
            <header className="bg-base text-neutral">
                <nav className="flex items-center justify-between p-4 max-w-screen-lg mx-auto">
                    <Link title="Home" to="/" className="fa-solid fa-house-chimney nav-link"></Link>
                    <span className="site-title">Gemini AI Chatbot</span>
                    {user.email ? (
                        <div className="flex items-center gap-2">
                            <Link title="Start a new session" to="/create" className="fa-solid fa-plus nav-link"></Link>
                            <button title="Logout" onClick={handleLogout} className="fa-solid fa-right-from-bracket nav-link"></button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link title="Login" to="/login" className="fa-solid fa-right-to-bracket nav-link"></Link>
                            <Link title="Register" to="/register" className="fa-solid fa-user-plus nav-link"></Link>
                        </div>

                    )}
                </nav>
            </header>
            <main className="p-4">
                <Outlet />
            </main>
        </>
    );
};

export default Layout