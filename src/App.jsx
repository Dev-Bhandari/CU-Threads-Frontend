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
import HomePage from "./pages/HomePage";
import SideBar from "./components/SideBar";
import ThreadPage from "./pages/ThreadPage";
import AllThreadsPage from "./pages/AllThreadsPage";
import CreatePostModal from "./components/CreatePostModal";
import PostPage from "./pages/PostPage";
import CreateThreadModal from "./components/CreateThreadModal";
import UserPage from "./pages/UserPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import VerifyForgotPasswordPage from "./pages/VerifyForgotPasswordPage";
import DeletePostModal from "./components/DeletePostModal";
import EditUserModal from "./components/EditUserModal";
import EditThreadModal from "./components/EditThreadModal";
import ExtendSessionModal from "./components/ExtendSessionModal";
import { Analytics } from "@vercel/analytics/next"

function App() {
    return (
        <Router>
            <Analytics/>
            <Header />
            <LoginModal />
            <RegisterModal />
            <VerifyUserModal />
            <CreatePostModal />
            <CreateThreadModal />
            <DeletePostModal />
            <EditUserModal />
            <EditThreadModal />
            <ExtendSessionModal />
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
                            element={<VerifyEmailPage />}
                        />
                        <Route
                            exact
                            path="/forgot-password"
                            element={<VerifyForgotPasswordPage />}
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
