import { Modal, Spinner } from "flowbite-react";
import { useModalContext } from "../utils/modalContext";
import { useState } from "react";
import { deletePost } from "../utils/api/post.api";
import { useNavigate } from "react-router-dom";

const DeletePostModal = () => {
    const [loading, setLoading] = useState(false);
    const { setAlertResponse, openDeletePostModal, toggleDeletePostModal } =
        useModalContext();
    const navigate = useNavigate();

    const handleDeletePost = async () => {
        try {
            setLoading(true);
            console.log("Delete post", openDeletePostModal.postId);
            await deletePost(openDeletePostModal.postId);
            toggleDeletePostModal();
            navigate("/");
        } catch (error) {
            console.error("Error deleting post:", error);
            setAlertResponse({ message: "Failed to delete post." });
        } finally {
            setLoading(false);
        }
    };
    return (
        <Modal
            dismissible
            show={openDeletePostModal.postId}
            size="lg"
            popup
            onClose={toggleDeletePostModal}
        >
            <Modal.Header />
            <Modal.Body>
                <h2 className="text-center text-2xl font-semibold dark:text-white mb-1">
                    Delete Post?
                </h2>
                <p className="p-4">
                    Once you delete this post, it can’t be restored.
                </p>
                <div>
                    <button
                        className="m-2 bg-gray-300 hover:bg-gray-200 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                        onClick={toggleDeletePostModal}
                    >
                        Cancel
                    </button>
                    {loading ? (
                        <button className="m-2 text-white bg-blue-700 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
                            <Spinner
                                aria-label="Alternate spinner button example"
                                size="sm"
                            />
                            <span className="pl-3">Deleting Post...</span>
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="m-2 text-white bg-blue-700 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                            onClick={handleDeletePost}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default DeletePostModal;
