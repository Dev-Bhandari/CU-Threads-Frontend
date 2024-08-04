import { useState } from "react";
import { Modal, Spinner } from "flowbite-react";
import { useModalContext } from "../utils/modalContext";
import { changeAvatar, changePassword } from "../utils/api/user.api";
import { useAuth } from "../utils/authContext";
import { useNavigate } from "react-router-dom";

const EditUserModal = () => {
    const [activeTab, setActiveTab] = useState("avatar");
    const [loading, setLoading] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const { setUserData, removeUserData } = useAuth();
    const {
        openEditUserModal,
        toggleEditUserModal,
        modalError,
        setModalError,
        resetOnLogout,
    } = useModalContext();
    const navigate = useNavigate();

    const handleAvatarChange = async () => {
        if (!avatarFile) {
            setModalError({ message: "Please select an image file." });
            return;
        }

        setLoading(true);
        setModalError({});

        try {
            const formData = new FormData();
            formData.append("avatar", avatarFile);

            const response = await changeAvatar(formData);
            setUserData(response.data);
            setAvatarFile(null);
            toggleEditUserModal();
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

    const handleLogout = async () => {
        try {
            resetOnLogout();
            removeUserData();
            navigate("/");
            await logoutUser();
        } catch (error) {
            console.log(error.response);
            throw error;
        }
    };

    const handlePasswordChange = async () => {
        const { oldPassword, newPassword, confirmPassword } = passwordData;

        if (
            oldPassword === "" ||
            newPassword === "" ||
            confirmPassword === ""
        ) {
            setModalError({ message: "Please fill out all fields." });
            return;
        }

        if (newPassword !== confirmPassword) {
            setModalError({ message: "Passwords do not match." });
            return;
        }

        if (
            oldPassword.length < 6 ||
            newPassword.length < 6 ||
            confirmPassword.length < 6
        ) {
            setModalError({
                message: "Password should be of minimum 6 characters.",
            });
            return;
        }
        setLoading(true);
        setModalError({});

        try {
            await changePassword(passwordData);
            toggleEditUserModal();
            handleLogout();
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
        setModalError({});
    };

    const handleCloseModal = () => {
        toggleEditUserModal();
        setPasswordData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setActiveTab("avatar");
    };

    return (
        <Modal
            dismissible
            show={openEditUserModal.user}
            size="lg"
            popup
            onClose={handleCloseModal}
        >
            <Modal.Header>
                <div className="flex justify-between w-full mb-10">
                    <button
                        onClick={() => handleTabSwitch("avatar")}
                        className={`px-4 py-2 text-lg ${
                            activeTab === "avatar"
                                ? "font-bold bg-slate-600 rounded-lg text-white"
                                : "font-normal "
                        }`}
                    >
                        Change Avatar
                    </button>
                    <button
                        onClick={() => handleTabSwitch("password")}
                        className={`px-4 py-2 text-lg ${
                            activeTab === "password"
                                ? "font-bold bg-slate-600 rounded-lg text-white"
                                : "font-normal"
                        }`}
                    >
                        Change Password
                    </button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    {activeTab === "avatar" && (
                        <div className="flex flex-col items-center">
                            <div className="mb-4">
                                {openEditUserModal.user && (
                                    <img
                                        src={openEditUserModal.user.avatar}
                                        alt="Current Avatar"
                                        className="w-32 h-32 rounded-full mb-2 object-cover"
                                    />
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setAvatarFile(e.target.files[0])
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
                                            Updating Avatar...
                                        </span>
                                    </span>
                                ) : (
                                    <button
                                        onClick={handleAvatarChange}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm text-nowrap px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Update Avatar
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
                        <div className="flex flex-col items-center my-2">
                            <input
                                type="password"
                                placeholder="Old Password"
                                value={passwordData.oldPassword}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        oldPassword: e.target.value,
                                    })
                                }
                                className="mb-4 p-2 border rounded-lg w-full max-w-sm"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={passwordData.newPassword}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        newPassword: e.target.value,
                                    })
                                }
                                className="mb-4 p-2 border rounded-lg w-full max-w-sm"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={passwordData.confirmPassword}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                className="mb-4 p-2 border rounded-lg w-full max-w-sm"
                            />
                            <div className="flex flex-row justify-between w-full max-w-sm items-center">
                                {loading ? (
                                    <span className="text-white bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center text-nowrap dark:bg-blue-600">
                                        <Spinner
                                            aria-label="Alternate spinner button example"
                                            size="sm"
                                        />
                                        <span className="pl-3">
                                            Updating Password...
                                        </span>
                                    </span>
                                ) : (
                                    <button
                                        onClick={handlePasswordChange}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm text-nowrap px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Update Password
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

export default EditUserModal;
