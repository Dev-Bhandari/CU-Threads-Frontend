import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateCreatePostForm } from "../utils/validation";
import { useAuth } from "../utils/authContext";
import { createPost } from "../utils/api/post.api";
import { useModalContext } from "../utils/modalContext";
import { Modal, Spinner } from "flowbite-react";

const CreatePostModal = () => {
    const navigate = useNavigate();
    const { setUserData } = useAuth();
    const [loading, setLoading] = useState(false);
    const {
        openCreatePostModal,
        toggleCreatePostModal,
        toggleVerifyUserModal,
        loginError,
        setLoginError,
        alertResponse,
        setAlertResponse,
    } = useModalContext();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        media: "",
    });

    const [charCount, setCharCount] = useState(0); // State for character count

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "content") {
            // Update character count for content textarea
            setCharCount(value.length);
        }
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateCreatePostForm(formData);
        console.log(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            // Send form data to server for authentication
            console.log("Submitted:", formData);

            try {
                const response = await createPost(formData);
                console.log(response);

                setUserData(response.data);
                if (response.data.isVerified) {
                    toggleCreatePostModal();
                    // Reload page on successful login
                    navigate(0);
                } else {
                    toggleCreatePostModal();
                    toggleVerifyUserModal();
                }
            } catch (error) {
                // Handle Api error
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
                setLoading(false);
            }
        } else {
            // Handle validation errors
            console.log(validationErrors);
            setLoginError(validationErrors);
        }
    };

    return (
        <Modal
            dismissible
            show={openCreatePostModal}
            size="2xl"
            popup
            onClose={toggleCreatePostModal}
        >
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center text-2xl font-semibold dark:text-white mb-4">
                        Create a post
                    </h2>
                    <div className="mb-5">
                        <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Add a Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="content"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Content:
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            maxLength={150}
                            className=" h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Text (optional)"
                            value={formData.content}
                            onChange={handleChange}
                        />
                        <div className="pt-1 text-sm text-gray-500">
                            Characters left: {150 - charCount}
                        </div>
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="media"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Image/Video:
                        </label>
                        <input
                            multiple
                            type="file"
                            id="media"
                            name="media"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            accept="image/*, video/*"
                            value={formData.media}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-between mt-8 mb-4">
                        {loading ? (
                            <span className=" text-white bg-blue-700 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600  ">
                                <Spinner
                                    aria-label="Alternate spinner button example"
                                    size="sm"
                                />
                                <span className="pl-3">Creating Post...</span>
                            </span>
                        ) : (
                            <button
                                type="submit"
                                className=" text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                            >
                                Create Post
                            </button>
                        )}
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
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default CreatePostModal;
