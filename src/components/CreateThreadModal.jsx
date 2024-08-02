import { Modal, Spinner } from "flowbite-react";
import { useModalContext } from "../utils/modalContext";
import { useState } from "react";
import { validateThreadForm } from "../utils/validation";
import { createThread } from "../utils/api/thread.api";
import { useNavigate } from "react-router-dom";

const CreateThreadModal = () => {
    const navigate = useNavigate();
    const {
        openCreateThreadModal,
        toggleCreateThreadModal,
        loginError,
        setLoginError,
        setAlertResponse,
    } = useModalContext();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
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

        console.log(formData);
        const validationErrors = validateThreadForm(formData);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);

            try {
                const response = await createThread(formData);

                navigate(0);
            } catch (error) {
                console.log("Error:", error);

                if (error && !error.response?.data?.message)
                    setAlertResponse({ message: "Something went wrong" });

                if (!error.response?.data?.success) {
                    const errorMessage = error.response.data;
                    setLoginError(errorMessage);
                }
            } finally {
                setLoading(false);
            }
        } else {
            console.log(validationErrors);
            setLoginError(validationErrors);
        }
    };

    return (
        <Modal
            dismissible
            show={openCreateThreadModal}
            size="2xl"
            popup
            onClose={toggleCreateThreadModal}
        >
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center text-2xl font-semibold dark:text-white mb-4">
                        Create New Thread
                    </h2>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Add a Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Description (optional):
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            maxLength={200}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Add a Description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center justify-between mt-8 mb-4">
                        {loading ? (
                            <span className="text-white bg-blue-700 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600">
                                <Spinner
                                    aria-label="Alternate spinner button example"
                                    size="sm"
                                />
                                <span className="pl-3">Creating Thread...</span>
                            </span>
                        ) : (
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                Create Thread
                            </button>
                        )}
                        <div className=" text-red-700 text-sm">
                            {loginError.name ? (
                                <p className="error">{loginError.name}</p>
                            ) : loginError.description ? (
                                <p className="error">{loginError.description}</p>
                            ) : loginError._generic ? (
                                <p className="error">{loginError._generic}</p>
                            ) : loginError ? (
                                <p className="error">{loginError.message}</p>
                            ) : null}
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateThreadModal;
