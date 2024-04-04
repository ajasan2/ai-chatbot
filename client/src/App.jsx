import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './pages/Layout'
import Login from './pages/users/Login'
import Register from './pages/users/Register'
import Home from './pages/sessions/Home'
import Create from './pages/sessions/Create'
import Update from './pages/sessions/Update'
import AuthRoutes from './routes/AuthRoutes'
import GuestRoutes from './routes/GuestRoutes'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route element={<GuestRoutes />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>

                    <Route element={<AuthRoutes />}>
                        <Route path="create" element={<Create />} />
                        <Route path="update" element={<Update />} />
                    </Route>

                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App