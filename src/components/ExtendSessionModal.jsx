import { Modal, Spinner } from "flowbite-react";
import { useModalContext } from "../utils/modalContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";
import { logoutUser, refreshToken } from "../utils/api/user.api";

const ExtendSessionModal = () => {
    const [loading, setLoading] = useState(false);
    const { removeUserData } = useAuth();

    const {
        jwtExpired,
        setJwtExpired,
        setAlertResponse,
        openExtendSessionModal,
        toggleExtendSessionModal,
        resetOnLogout,
    } = useModalContext();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            logoutUser();
            setJwtExpired(false);
            resetOnLogout();
            removeUserData();
        } catch (error) {
            console.log(error.response);
            throw error;
        }
    };
    const handleExtendSession = async () => {
        try {
            setLoading(true);
            await refreshToken();
            setJwtExpired(false);
            toggleExtendSessionModal();
            navigate(0);
        } catch (error) {
            console.error("Failed to extend session:", error);
            if (
                error.response.data.message == "jwt expired" ||
                error.response.data.message == "invalid token"
            ) {
                handleLogout();
                setAlertResponse({
                    message: "Your session is expired, Please login again.",
                });
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <Modal
            show={openExtendSessionModal}
            size="lg"
            popup
            onClose={toggleExtendSessionModal}
        >
            <Modal.Header />
            <Modal.Body>
                <h2 className="text-center text-xl font-semibold dark:text-white mb-1">
                    Session Expired!
                </h2>
                <p className="p-4">
                    Extend your session to continue browsing CU Threads.
                </p>
                <div>
                    <button
                        className="m-2 bg-gray-300 hover:bg-gray-200 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                    {loading ? (
                        <button className="m-2 text-white bg-blue-700 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
                            <Spinner
                                aria-label="Alternate spinner button example"
                                size="sm"
                            />
                            <span className="pl-3">Extending Session...</span>
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="m-2 text-white bg-blue-700 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                            onClick={handleExtendSession}
                        >
                            Extend Session
                        </button>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ExtendSessionModal;
