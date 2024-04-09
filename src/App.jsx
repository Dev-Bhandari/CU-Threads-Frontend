import "./App.css";
import "flowbite";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import VerifyUserModal from "./components/VerifyUserModal";
import VerifyEmail from "./components/VerifyEmail";
import Home from "./pages/Home";
import { useAuth } from "./utils/authContext";
import Header from "./components/common/header";
import { useEffect } from "react";

function App() {
    const { getUserData } = useAuth();

    useEffect(() => getUserData, []); // Empty dependency array ensures the effect runs only once

    return (
        <Router>
            <Header />
            <LoginModal />
            <RegisterModal />
            <VerifyUserModal />
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
                        path="/verify-email"
                        element={<VerifyEmail />}
                    />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
