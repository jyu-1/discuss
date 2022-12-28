import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userInfo) => {
            setUser(userInfo);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
