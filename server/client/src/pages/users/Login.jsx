import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from "../../components/Alert";
import { loginUser } from '../../controllers/usersController';
import { UserContext } from '../../contexts/UserContext';

const Login = () => {
    const { setUser } = useContext(UserContext)
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Navigate hook
    const navigate = useNavigate();

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            await loginUser(email, password);
            setUser({ email, session: [] });
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="card">
            <h1 className="title">Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email address"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button className="btn">Login</button>
            </form>

            {error && <Alert msg={error} />}
        </section>
    );
};

export default Login;