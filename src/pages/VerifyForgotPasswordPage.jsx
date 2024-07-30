import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyForgotPasswordEmail } from "../utils/api/user.api";
import { useModalContext } from "../utils/modalContext";
import { validateVerifyForgotPasswordForm } from "../utils/validation";
import { Spinner } from "flowbite-react";

function VerifyForgotPasswordPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("emailToken");
    const [loading, setLoading] = useState(false);
    const { loginError, setLoginError, alertResponse, setAlertResponse } =
        useModalContext();

    const [formData, setFormData] = useState({
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateVerifyForgotPasswordForm(formData);
        console.log(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            console.log("Submitted:", formData);

            try {
                const response = await verifyForgotPasswordEmail(
                    token,
                    formData
                );
                console.log(response);
            } catch (error) {
                console.log("Something went wrong");
                console.log(error);
                if (error && !error.response.data.message)
                    setAlertResponse({ message: "Something went wrong" });
                if (!error.response.data.success) {
                    const errorMessage = error.response.data;
                    console.log(errorMessage);
                    setLoginError(errorMessage);
                }
                console.log(alertResponse);
            } finally {
                navigate("/");
                setLoading(false);
            }
        } else {
            console.log(validationErrors);
            setLoginError(validationErrors);
        }
    };

    return (
        <div className="space-y-6">
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <h2 className="max-w-sm mx-auto text-center text-2xl font-semibold whitespace-nowrap dark:text-white py-4">
                    Change Password
                </h2>
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
                    />
                </div>
                <div className="flex justify-between">
                    <div className=" mb-5 text-red-700 text-sm">
                        {loginError.email ? (
                            <p className="error">{loginError.email}</p>
                        ) : loginError.password ? (
                            <p className="error">{loginError.password}</p>
                        ) : loginError._generic ? (
                            <p className="error">{loginError._generic}</p>
                        ) : loginError ? (
                            <p className="error">{loginError.message}</p>
                        ) : null}
                    </div>
                </div>
                {loading ? (
                    <span className=" text-white bg-blue-700 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600  ">
                        <Spinner
                            aria-label="Alternate spinner button example"
                            size="sm"
                        />
                        <span className="pl-3">Changing Password...</span>
                    </span>
                ) : (
                    <button
                        type="submit"
                        className=" text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                    >
                        Change Password
                    </button>
                )}
            </form>
        </div>
    );
}

export default VerifyForgotPasswordPage;
