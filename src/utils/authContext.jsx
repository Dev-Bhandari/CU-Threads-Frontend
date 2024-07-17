import { createContext, useContext, useEffect, useState } from "react";
import { useModalContext } from "./modalContext";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Call getUserData when AuthProvider mounts
        getUserData();
    }, []);

    const getUserData = () => {
        console.log(user);
        console.log("Get user Data called");
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const storedUserParsed = JSON.parse(storedUser);
            setUser(storedUserParsed);
            console.log(storedUserParsed);
        }
        console.log(user);
    };
    const setUserData = (user) => {
        // Perform login and Register logic
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };

    const removeUserData = () => {
        // Perform logout logic
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
