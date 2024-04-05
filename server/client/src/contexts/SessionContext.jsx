import { createContext, useState } from "react";

export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
    const [ sessions, setSessions ] = useState([]);

    return (
        <SessionContext.Provider value={{ sessions, setSessions}}>
            {children}
        </SessionContext.Provider>
    );
};

export default SessionProvider;