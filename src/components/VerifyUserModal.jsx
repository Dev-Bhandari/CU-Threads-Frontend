import { Modal } from "flowbite-react";
import { useModalContext } from "../utils/modalContext";
import userAPI from "../utils/api";
import { useAuth } from "../utils/authContext";

const VerifyUserModal = () => {
    const { user } = useAuth();
    const {
        openVerifyUserModal,
        toggleVerifyUserModal,
        resendResponse,
        setResendResponse,
    } = useModalContext();

    const handleResendVerficationEmail = async () => {
        try {
            const apiResponse = await userAPI.getNewLink({ userId: user?._id });
            setResendResponse(apiResponse);
        } catch (error) {
            console.log("Something went wrong");
            console.log(error.response);
        }
    };
    return (
        <Modal
            show={openVerifyUserModal}
            dismissible
            onClose={toggleVerifyUserModal}
        >
            <Modal.Header>Verify your email address</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Thanks for joining CU Threads! Before getting started,
                        please verify your email address by clicking on the link
                        we just emailed to you.
                        <br />
                        <br />
                        If you do not receive the email within the next 5
                        minutes, use the button given below to get a new
                        verification email.
                    </p>
                </div>
            </Modal.Body>
            <div className="flex justify-between items-center text-center rounded-b border-gray-200 p-6 dark:border-gray-600 border-t">
                <button
                    onClick={handleResendVerficationEmail}
                    className=" text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                >
                    Resend Verification Email
                </button>
                {resendResponse.success ? (
                    <p
                        className={
                            " mb-5 text-green-700 text-sm mx-4 align-middle"
                        }
                    >
                        {resendResponse.message}
                    </p>
                ) : (
                    <p
                        className={
                            " mb-5 text-red-700 text-sm mx-4 align-middle"
                        }
                    >
                        {resendResponse.message}
                    </p>
                )}
            </div>
        </Modal>
    );
};
export default VerifyUserModal;
