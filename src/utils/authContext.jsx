import { createContext, useContext, useEffect, useState } from "react";
import { useModalContext } from "./modalContext";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const storedUserParsed = JSON.parse(storedUser);
            setUser(storedUserParsed);
            console.log(storedUserParsed);
        }
    };
    const setUserData = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };

    const removeUserData = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                getUserData,
                setUserData,
                removeUserData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
