import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePostForm } from "../utils/validation";
import { createPost } from "../utils/api/post.api";
import { useModalContext } from "../utils/modalContext";
import { Modal, Spinner } from "flowbite-react";
import { FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa";

const CreatePostModal = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        openCreatePostModal,
        toggleCreatePostModal,
        modalError,
        setModalError,
        setAlertResponse,
    } = useModalContext();

    const [formData, setFormData] = useState({
        title: "",
        textContent: "",
        media: [],
    });

    const handleCloseModal = () => {
        toggleCreatePostModal();
        setFormData({
            title: "",
            textContent: "",
            media: [],
        });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "media") {
            const newFiles = Array.from(files);
            const currentFiles = [...formData.media];
            const updatedFiles = currentFiles.concat(newFiles);

            const images = [];
            const videos = [];
            let tooManyImages = false;
            let multipleVideos = false;
            let mixedMedia = false;

            updatedFiles.forEach((file) => {
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
                let errorMessage = "";

                if (tooManyImages) {
                    errorMessage += "Cannot upload more than 10 images.\n";
                }

                if (multipleVideos) {
                    errorMessage += "Cannot upload more than 1 video.\n";
                }

                if (mixedMedia) {
                    errorMessage +=
                        "You cannot upload images and video together.\n";
                }

                setModalError({ media: errorMessage });
                return;
            }

            setFormData((prevState) => ({
                ...prevState,
                media: updatedFiles,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const moveFile = (index, direction) => {
        const newMedia = [...formData.media];
        const targetIndex = index + direction;

        if (targetIndex >= 0 && targetIndex < newMedia.length) {
            [newMedia[index], newMedia[targetIndex]] = [
                newMedia[targetIndex],
                newMedia[index],
            ];

            setFormData((prevState) => ({
                ...prevState,
                media: newMedia,
            }));
        }
    };

    const removeFile = (index) => {
        const newMedia = formData.media.filter((_, i) => i !== index);
        setFormData((prevState) => ({
            ...prevState,
            media: newMedia,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validatePostForm(formData);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);

            const data = new FormData();

            data.append("title", formData.title);
            data.append("textContent", formData.textContent);

            formData.media.forEach((file) => {
                data.append("media", file);
            });

            console.log(formData);

            try {
                const response = await createPost(
                    openCreatePostModal.threadName,
                    data
                );

                navigate(0);
            } catch (error) {
                console.log("Error:", error);

                if (error && !error.response?.data?.message) {
                    setAlertResponse({ message: "Something went wrong" });
                }

                if (!error.response?.data?.success) {
                    const errorMessage = error.response.data;
                    setModalError(errorMessage);
                }
            } finally {
                setLoading(false);
            }
        } else {
            setModalError(validationErrors);
        }
    };

    return (
        <Modal
            show={openCreatePostModal.threadName}
            size="2xl"
            popup
            onClose={handleCloseModal}
        >
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center text-2xl font-semibold dark:text-white mb-4">
                        Create a Post
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
                            className="h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Add content"
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
                    {formData.media.length > 0 && (
                        <div className="mb-5">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Selected Files:
                            </h3>
                            <ul className="space-y-3">
                                {formData.media.map((file, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md dark:bg-gray-800"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 flex justify-center items-center bg-gray-100 rounded-lg dark:bg-gray-700">
                                                {file.type.startsWith(
                                                    "image/"
                                                ) ? (
                                                    <img
                                                        src={URL.createObjectURL(
                                                            file
                                                        )}
                                                        alt="preview"
                                                        className="w-10 h-10 object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <span className="text-xs text-gray-500 dark:text-gray-300">
                                                        Video
                                                    </span>
                                                )}
                                            </div>
                                            <span
                                                className="text-sm text-gray-900 dark:text-gray-100 truncate max-w-[150px] hover:text-clip"
                                                title={file.name}
                                            >
                                                {file.name}
                                            </span>
                                        </div>
                                        <div className="flex space-x-3">
                                            <button
                                                type="button"
                                                className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
                                                onClick={() =>
                                                    moveFile(index, -1)
                                                }
                                                disabled={index === 0}
                                            >
                                                <FaArrowUp />
                                            </button>
                                            <button
                                                type="button"
                                                className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
                                                onClick={() =>
                                                    moveFile(index, 1)
                                                }
                                                disabled={
                                                    index ===
                                                    formData.media.length - 1
                                                }
                                            >
                                                <FaArrowDown />
                                            </button>
                                            <button
                                                type="button"
                                                className="text-xs text-red-500 hover:text-red-700 transition-colors"
                                                onClick={() =>
                                                    removeFile(index)
                                                }
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
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
                        <div className="pl-2 text-red-700 text-sm">
                            {modalError.title ? (
                                <p className="error">{modalError.title}</p>
                            ) : modalError.textContent ? (
                                <p className="error">
                                    {modalError.textContent}
                                </p>
                            ) : modalError.media ? (
                                <p className="error">{modalError.media}</p>
                            ) : modalError._generic ? (
                                <p className="error">{modalError._generic}</p>
                            ) : modalError ? (
                                <p className="error">{modalError.message}</p>
                            ) : null}
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default CreatePostModal;
