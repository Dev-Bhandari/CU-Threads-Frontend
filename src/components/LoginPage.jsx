import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../utils/validation";
import { useAuth } from "../utils/authContext";
import userAPI from "../utils/api";

const LoginPage = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateLoginForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Send form data to server for authentication
            console.log("Submitted:", formData);
            await userAPI.loginUser(formData);
            // Redirect to home page on successful login
            login(formData);
            navigate("/");
        } else {
            // Handle validation errors
            setErrors(validationErrors);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {errors.username ? (
                    <p className="error">{errors.username}</p>
                ) : errors.email ? (
                    <p className="error">{errors.email}</p>
                ) : errors.password ? (
                    <p className="error">{errors.password}</p>
                ) : errors._generic ? (
                    <p className="error">{errors._generic}</p>
                ) : null}

                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <a href="Register"></a>
            </p>
        </div>
    );
};

export default LoginPage;
