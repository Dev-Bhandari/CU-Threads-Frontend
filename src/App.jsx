import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import LoginPage from "./components/LoginPage";
import Verify from "./components/VerifyPage";
import Home from "./pages/Home";
import { useAuth } from "./utils/authContext";

function App() {
    const { user } = useAuth();
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </nav>
            <div>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route
                        exact
                        path="/login"
                        element={
                            !user ? (
                                <LoginPage />
                            ) : (
                                <Navigate replace to={"/"} />
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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
