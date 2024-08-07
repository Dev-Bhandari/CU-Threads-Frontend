import { useRef, useState } from "react";
import { useModalContext } from "../utils/modalContext";
import { useAuth } from "../utils/authContext";
import { BsThreeDots } from "react-icons/bs";
import { FaFlag, FaTrash } from "react-icons/fa";
import { deleteComment } from "../utils/api/comment.api";
import { useNavigate } from "react-router-dom";

const CommentCard = (props) => {
    const comment = props.comment;
    const addReply = props.addReply;
    const name = comment.creatorInfo[0].username;
    const avatar = comment.creatorInfo[0].avatar;
    const [replyText, setReplyText] = useState("");
    const [showReplyBox, setShowReplyBox] = useState(false);
    const inputEl = useRef(null);
    const { user } = useAuth();
    const { toggleLoginModal, setAlertResponse } = useModalContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsMenuOpen((prev) => !prev);
    };

    const handleDeleteComment = async (e) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        try {
            setLoading(true);
            console.log("Delete comment", comment._id);
            await deleteComment(comment._id);
            navigate(0);
        } catch (error) {
            console.error("Error deleting post:", error);
            setAlertResponse({ message: "Failed to delete comment." });
        } finally {
            setLoading(false);
        }
    };

    const handleReportPost = (e) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        setAlertResponse({
            message: "Comment reported.",
        });
    };
    return (
        <div
            key={comment._id}
            className={"pl-8 mb-4 border-l-2 border-gray-300 text-gray-700"}
        >
            <div className="flex items-center mb-2">
                <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                />
                <h2 className="text-sm px-2 font-bold">u/{name}</h2>
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 z-40"
                        onClick={toggleMenu}
                    ></div>
                )}
                <div className="relative z-40">
                    <button
                        onClick={toggleMenu}
                        className="p-2 text-gray-700 hover:text-gray-700 dark:text-white hover:bg-slate-300 rounded-full"
                    >
                        <BsThreeDots size={20} />
                    </button>
                    {isMenuOpen && (
                        <div className="flex flex-col items-start absolute right-0 top-10 bg-white text-slate-700 border border-gray-200 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-md shadow-md z-40">
                            <button
                                onClick={
                                    user
                                        ? handleDeleteComment
                                        : toggleLoginModal
                                }
                                className="w-full"
                                disabled={loading}
                            >
                                <div className="flex items-center p-3 hover:bg-slate-200 text-nowrap">
                                    <FaTrash />
                                    <span className="pl-2">Delete</span>
                                </div>
                            </button>
                            <button
                                onClick={
                                    user ? handleReportPost : toggleLoginModal
                                }
                                className="w-full"
                            >
                                <div className="flex items-center p-3 hover:bg-slate-200 text-nowrap">
                                    <FaFlag />
                                    <span className="pl-2">Report</span>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="mb-2">{comment.content}</div>
            {!showReplyBox && (
                <button
                    type="button"
                    className="mb-2 px-3 py-1 text-white bg-blue-500 rounded text-sm"
                    onClick={
                        user
                            ? () => {
                                  setShowReplyBox(true);
                                  inputEl.current.focus();
                              }
                            : toggleLoginModal
                    }
                >
                    Reply
                </button>
            )}
            {showReplyBox && (
                <>
                    <textarea
                        ref={inputEl}
                        onChange={(e) => setReplyText(e.target.value)}
                        value={replyText}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        placeholder="Write a reply..."
                        required
                    />
                    <div className="flex space-x-2 mb-2">
                        <button
                            type="button"
                            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => {
                                setShowReplyBox(false);
                                setReplyText("");
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => {
                                addReply(comment._id, replyText);
                                setShowReplyBox(false);
                                setReplyText("");
                            }}
                        >
                            Save
                        </button>
                    </div>
                </>
            )}
            {comment.replies.length > 0 && (
                <div>
                    {comment.replies.map((childComment) => (
                        <CommentCard
                            key={childComment._id}
                            comment={childComment}
                            addReply={addReply}
                            parent={false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentCard;
