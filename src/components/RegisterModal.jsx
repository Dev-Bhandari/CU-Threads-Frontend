import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateRegisterForm } from "../utils/validation";
import { useAuth } from "../utils/authContext";
import { registerUser } from "../utils/api/user.api";
import { Modal, Spinner } from "flowbite-react";
import { useModalContext } from "../utils/modalContext";

const RegisterModal = () => {
    const { setUserData } = useAuth();
    const {
        openRegisterModal,
        toggleRegisterModal,
        toggleLoginModal,
        toggleVerifyUserModal,
        modalError,
        setmodalError,
        setAlertResponse,
    } = useModalContext();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

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
        const validationErrors = validateRegisterForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            console.log("Submitted:", formData);

            try {
                const response = await registerUser(formData);
                console.log(response);
                setUserData(response.data);
                if (response.data.isVerified) {
                    toggleRegisterModal();
                    navigate("/home");
                } else {
                    toggleRegisterModal();
                    toggleVerifyUserModal();
                }
            } catch (error) {
                console.log("Something went wrong");
                console.log(error);
                if (error && !error.response.data.message)
                    setAlertResponse({ message: "Something went wrong" });
                if (!error.response.data.success) {
                    const errorMessage = error.response.data;
                    console.log(errorMessage);
                    setmodalError(errorMessage);
                }
            } finally {
                setLoading(false);
            }
        } else {
            setmodalError(validationErrors);
        }
    };

    return (
        <Modal
            dismissible
            show={openRegisterModal}
            size="lg"
            popup
            onClose={toggleRegisterModal}
        >
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6">
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
                        <div className="flex justify-between">
                            <div className=" mb-5 text-red-700 text-sm">
                                {modalError.username ? (
                                    <p className="error">
                                        {modalError.username}
                                    </p>
                                ) : modalError.email ? (
                                    <p className="error">
                                        {modalError.email}
                                    </p>
                                ) : modalError.password ? (
                                    <p className="error">
                                        {modalError.password}
                                    </p>
                                ) : modalError._generic ? (
                                    <p className="error">
                                        {modalError._generic}
                                    </p>
                                ) : modalError ? (
                                    <p className="error">
                                        {modalError.message}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        {loading ? (
                            <span className=" text-white bg-blue-700 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600  ">
                                <Spinner
                                    aria-label="Alternate spinner button example"
                                    size="sm"
                                />
                                <span className="pl-3">Signing Up...</span>
                            </span>
                        ) : (
                            <button
                                type="submit"
                                className=" text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                            >
                                Sign Up
                            </button>
                        )}
                    </form>
                    <p className="max-w-max mx-auto p-4">
                        Already a member?
                        <button
                            onClick={() => {
                                toggleRegisterModal();
                                toggleLoginModal();
                            }}
                            className="text-blue-700"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default RegisterModal;
