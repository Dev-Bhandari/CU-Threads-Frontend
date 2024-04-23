import "./App.css";
import "flowbite";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import VerifyUserModal from "./components/VerifyUserModal";
import VerifyEmail from "./components/VerifyEmail";
import HomePage from "./pages/HomePage";
import { useAuth } from "./utils/authContext";
import SideBar from "./components/SideBar";
import ThreadPage from "./pages/ThreadPage";
import AllThreadsPage from "./pages/AllThreadsPage";
import CreatePostModal from "./components/CreatePostModal";

function App() {
    return (
        <Router>
            <Header />
            <LoginModal />
            <RegisterModal />
            <VerifyUserModal />
            <CreatePostModal />
            <main className="flex flex-row">
                <SideBar />
                <div className="flex-grow my-4">
                    <Routes>
                        <Route exact path="/home" element={<HomePage />} />
                        <Route
                            exact
                            path="/"
                            element={<Navigate replace to={"/home"} />}
                        />
                        <Route
                            exact
                            path="/cu/all"
                            element={<AllThreadsPage />}
                        />
                        <Route
                            exact
                            path="/verify-email"
                            element={<VerifyEmail />}
                        />
                        <Route
                            exact
                            path="/cu/:threadName"
                            element={<ThreadPage />}
                        />
                    </Routes>
                </div>
            </main>
        </Router>
    );
}

export default App;
