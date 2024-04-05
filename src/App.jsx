import "./App.css";
import "flowbite";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import LoginPage from "./components/LoginPage";
import Verify from "./components/VerifyPage";
import Home from "./pages/Home";
import { useAuth } from "./utils/authContext";
import Header from "./components/common/header";
import { useEffect } from "react";

function App() {
    const { user, login } = useAuth();

    useEffect(() => {
        // Set initial user data from local storage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            login(user);
        }
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <Router>
            <Header />
            <main className="p-8 relative">
                <Routes>
                    <Route exact path="/home" element={<Home />} />
                    <Route
                        exact
                        path="/"
                        element={<Navigate replace to={"/home"} />}
                    />

                    <Route
                        exact
                        path="/login"
                        element={
                            !user ? (
                                <LoginPage />
                            ) : (
                                <Navigate replace to={"/home"} />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/register"
                        element={
                            !user ? <Register /> : <Navigate replace to={"/"} />
                        }
                    />
                    <Route exact path="/verify" element={<Verify />} />
                    {/* <Route
                        exact
                        path="/logout"
                        action={logout}
                        element={<Navigate replace to={"/"} />}
                    /> */}
                </Routes>
            </main>
        </Router>
    );
}

export default App;
