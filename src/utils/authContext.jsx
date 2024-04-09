import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const getUserData = () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUser(user);
        }
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
