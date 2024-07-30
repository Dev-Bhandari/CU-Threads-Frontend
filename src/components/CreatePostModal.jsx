import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePostForm } from "../utils/validation";
import { createPost } from "../utils/api/post.api";
import { useModalContext } from "../utils/modalContext";
import { Modal, Spinner } from "flowbite-react";

const CreatePostModal = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        openCreatePostModal,
        toggleCreatePostModal,
        loginError,
        setLoginError,
        setAlertResponse,
    } = useModalContext();

    const [formData, setFormData] = useState({
        title: "",
        textContent: "",
        media: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "media") {
            const images = [];
            const videos = [];
            let tooManyImages = false;
            let multipleVideos = false;
            let mixedMedia = false;

            Array.from(files).forEach((file) => {
                if (file.type.startsWith("image/")) {
                    images.push(file);
                } else if (file.type.startsWith("video/")) {
                    videos.push(file);
                }
            });

            if (images.length > 10) {
                tooManyImages = true;
            }

            if (videos.length > 1) {
                multipleVideos = true;
            }

            if (images.length > 0 && videos.length > 0) {
                mixedMedia = true;
            }

            if (tooManyImages || multipleVideos || mixedMedia) {
                let errorMessage;

                if (tooManyImages) {
                    errorMessage = "Cannot upload more than 10 images.\n";
                }

                if (multipleVideos) {
                    errorMessage = "Cannot upload more than 1 video.\n";
                }

                if (mixedMedia) {
                    errorMessage =
                        "You cannot upload images and video together.\n";
                }

                setLoginError({ media: errorMessage });
                return;
            }

            setFormData((prevState) => ({
                ...prevState,
                media: files,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validatePostForm(formData);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);

            const data = new FormData();

            data.append("title", formData.title);
            data.append("textContent", formData.textContent);

            if (formData.media) {
                Array.from(formData.media).forEach((file) => {
                    data.append("media", file);
                });
            }

            console.log(formData);

            try {
                const response = await createPost(
                    openCreatePostModal.threadName,
                    data
                );

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
            setLoginError(validationErrors);
        }
    };

    return (
        <Modal
            dismissible
            show={openCreatePostModal.threadName}
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
                            htmlFor="textContent"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Content:
                        </label>
                        <textarea
                            id="textContent"
                            name="textContent"
                            maxLength={1000}
                            className=" h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Text (optional)"
                            value={formData.textContent}
                            onChange={handleChange}
                            required
                        />
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
                                <span className="pl-3">Creating Post...</span>
                            </span>
                        ) : (
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                Create Post
                            </button>
                        )}
                        <div className=" text-red-700 text-sm">
                            {loginError.title ? (
                                <p className="error">{loginError.title}</p>
                            ) : loginError.textContent ? (
                                <p className="error">
                                    {loginError.textContent}
                                </p>
                            ) : loginError.media ? (
                                <p className="error">{loginError.media}</p>
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
