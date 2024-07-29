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
import PostPage from "./pages/PostPage";
import CreateThreadModal from "./components/CreateThreadModal";
import UserPage from "./pages/UserPage";

function App() {
    return (
        <Router>
            <Header />
            <LoginModal />
            <RegisterModal />
            <VerifyUserModal />
            <CreatePostModal />
            <CreateThreadModal />
            <main className="flex flex-row">
                <SideBar />
                <div className="flex-grow my-4">
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route
                            exact
                            path="/home"
                            element={<Navigate replace to={"/"} />}
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
                        <Route
                            exact
                            path="/posts/:postId"
                            element={<PostPage />}
                        />
                        <Route
                            exact
                            path="/u/:username"
                            element={<UserPage />}
                        />
                    </Routes>
                </div>
            </main>
        </Router>
    );
}

export default App;
