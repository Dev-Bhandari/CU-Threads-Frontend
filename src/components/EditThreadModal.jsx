import { useState } from "react";
import { Modal, Spinner } from "flowbite-react";
import { useModalContext } from "../utils/modalContext";
import {
    changeDescription,
    changeAvatar,
    changeBanner,
} from "../utils/api/thread.api";
import { useNavigate } from "react-router-dom";

const EditThreadModal = () => {
    const [activeTab, setActiveTab] = useState("avatar");
    const [loading, setLoading] = useState(false);
    const [inputFile, setInputFile] = useState(null);
    const [formData, setformData] = useState({
        description: "",
    });
    const {
        openEditThreadModal,
        toggleEditThreadModal,
        modalError,
        setModalError,
    } = useModalContext();
    const navigate = useNavigate();

    const handleFileChange = async (type) => {
        if (!inputFile) {
            setModalError({ message: "Please select an image file." });
            return;
        }

        setLoading(true);
        setModalError({});

        try {
            const formData = new FormData();
            formData.append(type == "avatar" ? "avatar" : "banner", inputFile);
            console.log(openEditThreadModal.thread.name);

            type == "avatar"
                ? await changeAvatar(openEditThreadModal.thread.name, formData)
                : await changeBanner(openEditThreadModal.thread.name, formData);
            toggleEditThreadModal();
            setInputFile(null);
            navigate(0);
        } catch (error) {
            console.log("Error:", error);

            if (error && !error.response?.data?.message) {
                setModalError({ message: "Something went wrong" });
            }

            if (!error.response?.data?.success) {
                const errorMessage = error.response.data;
                setModalError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDescriptionChange = async () => {
        const { description } = formData;

        if (description === "") {
            setModalError({ message: "Please fill out the description." });
            return;
        }

        if (description.length > 200) {
            setModalError({
                message:
                    "Thread description cannot be more than 200 characters.",
            });
            return;
        }
        setLoading(true);
        setModalError({});

        try {
            await changeDescription(openEditThreadModal.thread.name, formData);
            navigate(0);
            toggleEditThreadModal();
        } catch (error) {
            console.log("Error:", error);

            if (error && !error.response?.data?.message) {
                setModalError({ message: "Something went wrong" });
            }

            if (!error.response?.data?.success) {
                const errorMessage = error.response.data;
                setModalError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        setInputFile(null);
        setModalError({});
    };

    const handleCloseModal = () => {
        toggleEditThreadModal();
        setformData({
            description: "",
        });
        setActiveTab("avatar");
    };

    return (
        <Modal
            dismissible
            show={openEditThreadModal.thread}
            size="xl"
            popup
            onClose={handleCloseModal}
        >
            <Modal.Header>
                <div className="flex justify-between w-full mb-4 ">
                    <button
                        onClick={() => handleTabSwitch("avatar")}
                        className={`px-4 py-2 text-base ${
                            activeTab === "avatar"
                                ? "font-bold bg-slate-600 rounded-lg text-white"
                                : "font-normal "
                        }`}
                    >
                        Change Avatar
                    </button>
                    <button
                        onClick={() => handleTabSwitch("banner")}
                        className={`px-4 py-2 text-base ${
                            activeTab === "banner"
                                ? "font-bold bg-slate-600 rounded-lg text-white"
                                : "font-normal"
                        }`}
                    >
                        Change Banner
                    </button>
                    <button
                        onClick={() => handleTabSwitch("password")}
                        className={`px-4 py-2 text-base ${
                            activeTab === "password"
                                ? "font-bold bg-slate-600 rounded-lg text-white"
                                : "font-normal"
                        }`}
                    >
                        Change Description
                    </button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {activeTab === "avatar" && (
                        <div className="flex flex-col items-center">
                            <div className="mb-4">
                                {openEditThreadModal.thread && (
                                    <img
                                        src={openEditThreadModal.thread.avatar}
                                        alt="Current avatar"
                                        className="w-32 h-32 rounded-full mb-2 object-cover"
                                    />
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setInputFile(e.target.files[0])
                                }
                                className="mb-4 rounded-lg border border-gray-300 w-full"
                            />
                            <div className="flex justify-between w-full items-center">
                                {loading ? (
                                    <span className="text-white bg-blue-700 focus:outline-none font-medium rounded-lg text-sm text-nowrap px-5 py-3 text-center dark:bg-blue-600">
                                        <Spinner
                                            aria-label="Alternate spinner button example"
                                            size="sm"
                                        />
                                        <span className="pl-3">
                                            Updating avatar...
                                        </span>
                                    </span>
                                ) : (
                                    <button
                                        onClick={() =>
                                            handleFileChange("avatar")
                                        }
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm text-nowrap px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Update avatar
                                    </button>
                                )}
                                {modalError.message && (
                                    <p className="text-red-600 text-center">
                                        {modalError.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                    {activeTab === "banner" && (
                        <div className="flex flex-col items-center">
                            <div className="mb-4">
                                {openEditThreadModal.thread && (
                                    <img
                                        src={openEditThreadModal.thread.banner}
                                        alt="Current banner"
                                        className="w-72 h-32 mb-2 rounded-lg object-cover"
                                    />
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setInputFile(e.target.files[0])
                                }
                                className="mb-4 rounded-lg border border-gray-300 w-full"
                            />
                            <div className="flex justify-between w-full items-center">
                                {loading ? (
                                    <span className="text-white bg-blue-700 focus:outline-none font-medium rounded-lg text-sm text-nowrap px-5 py-3 text-center dark:bg-blue-600">
                                        <Spinner
                                            aria-label="Alternate spinner button example"
                                            size="sm"
                                        />
                                        <span className="pl-3">
                                            Updating banner...
                                        </span>
                                    </span>
                                ) : (
                                    <button
                                        onClick={() =>
                                            handleFileChange("banner")
                                        }
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm text-nowrap px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Update banner
                                    </button>
                                )}
                                {modalError.message && (
                                    <p className="text-red-600 text-center">
                                        {modalError.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                    {activeTab === "password" && (
                        <div className="flex flex-col items-center mb-2">
                            <label
                                htmlFor="email"
                                className="mb-2 text-sm w-full max-w-sm font-medium text-gray-900 dark:text-white"
                            >
                                Description:
                            </label>
                            <textarea
                                type="text"
                                id="description"
                                name="description"
                                maxLength={200}
                                className="h-24 mb-2 w-full max-w-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Add a Description"
                                value={formData.description}
                                onChange={(e) =>
                                    setformData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                            />
                            <div className="flex flex-row justify-between w-full max-w-sm items-center">
                                {loading ? (
                                    <span className="text-white bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center text-nowrap dark:bg-blue-600">
                                        <Spinner
                                            aria-label="Alternate spinner button example"
                                            size="sm"
                                        />
                                        <span className="pl-3">
                                            Updating Description...
                                        </span>
                                    </span>
                                ) : (
                                    <button
                                        onClick={handleDescriptionChange}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm text-nowrap px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Update Description
                                    </button>
                                )}
                                {modalError.message && (
                                    <p className="text-red-600 text-center ml-2">
                                        {modalError.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EditThreadModal;
