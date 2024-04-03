import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <header className="bg-indigo-500 text-white">
                <nav className="flex items-center justify-between p-4">
                    <Link title="Home" to="/" className="fa-solid fa-house-chimney nav-link"></Link>
                    <div className="flex items-center gap-2">
                        <Link title="Login" to="/login" className="fa-solid fa-right-to-bracket nav-link"></Link>
                        <Link title="Register" to="/register" className="fa-solid fa-user-plus nav-link"></Link>
                    </div>
                </nav>
            </header>
            <main className="p-4">
                <Outlet />
            </main>
        </>
    );
};

export default Layout