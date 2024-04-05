import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isVerified, setIsVerified] = useState(false);

    const login = (user) => {
        // Perform login logic
        setUser(user);
    };

    const logout = () => {
        // Perform logout logic
        localStorage.removeItem("user");
        setUser(null);
        setIsVerified(false); // Reset isVerified state on logout
    };

    const emailVerified = () => {
        // Perform email verification logic
        setIsVerified(true); // Set isVerified to true after email verification
    };

    return (
        <AuthContext.Provider
            value={{ user, isVerified, login, logout, emailVerified }}
        >
            {children}
        </AuthContext.Provider>
    );
};
