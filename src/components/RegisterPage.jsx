import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../utils/validation";
import { useAuth } from "../utils/authContext";
import userAPI from "../utils/api";
import AlertToast from "./Alert";

const RegisterPage = () => {
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
            let user;
            try {
                user = await userAPI.registerUSer(formData);
                console.log(user);
                // Store user data in local storage
                // localStorage.setItem("user", JSON.stringify(user.data));
                // Redirect to home page on successful login
                // login(user?.data);
                // Redirect to home page on successful login
                navigate("/home");
            } catch (error) {
                console.log("Something went wrong");
                console.log(error.response);
                if (!error.response.data.success)
                    AlertToast(error.response.data.message);
            }
        } else {
            // Handle validation errors
            setErrors(validationErrors);
        }
    };

    return (
        <div className="py-4">
            <h2 className="max-w-sm mx-auto text-center text-2xl font-semibold whitespace-nowrap dark:text-white py-4">
                Sign Up
            </h2>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="abc@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="********"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className=" mb-5 text-red-700 text-sm">
                    {errors.username ? (
                        <p className="error">{errors.username}</p>
                    ) : errors.email ? (
                        <p className="error">{errors.email}</p>
                    ) : errors.password ? (
                        <p className="error">{errors.password}</p>
                    ) : errors._generic ? (
                        <p className="error">{errors._generic}</p>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Sign Up
                </button>
            </form>
            <p className="max-w-max mx-auto p-4">
                Already a member?{" "}
                <a href="/login" className="text-blue-700">
                    Login
                </a>
            </p>
        </div>
    );
};

export default RegisterPage;
