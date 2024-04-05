import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/app.css'
import UserProvider from './contexts/UserContext.jsx'
import SessionProvider from './contexts/SessionContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserProvider>
            <SessionProvider>
                <App />
            </SessionProvider>
        </UserProvider>
    </React.StrictMode>,
)
