import { useEffect, useRef, useState } from "react";
import PostCard from "../components/PostCard";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../utils/api/post.api";
import { createComment, getAllComments } from "../utils/api/comment.api";
import CommentCard from "../components/CommentCard";
import { Card, Spinner } from "flowbite-react";
import { validateCommentForm } from "../utils/validation";
import { useModalContext } from "../utils/modalContext";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../utils/authContext";

const PostPage = () => {
    const [loadingPage, setLoadingPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const { postId } = useParams();
    const { user } = useAuth();
    const {
        jwtExpired,
        setJwtExpired,
        setModalError,
        toggleLoginModal,
        toggleExtendSessionModal,
        alertResponse,
        setAlertResponse,
    } = useModalContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [postId]);

    const fetchPost = async () => {
        const spinnerDelay = 3000;
        let spinnerTimeout;
        try {
            spinnerTimeout = setTimeout(() => {
                setLoadingPage(true);
            }, spinnerDelay);

            console.log(`Calling post data for postId ${postId}`);
            const res = await getPost(postId);
            const post = res.data;
            console.log(post);
            setPost(post);
        } catch (error) {
            console.log("Error fetching posts:", error);
            if (error.response.data.message == "jwt expired") {
                setJwtExpired(true);
                toggleExtendSessionModal();
            }
        } finally {
            clearTimeout(spinnerTimeout);
            setLoadingPage(false);
        }
    };
    const fetchComments = async () => {
        try {
            console.log(`Calling comments for postId ${postId}`);
            const res = await getAllComments(postId);
            const comments = res.data;
            console.log("Comments : ");
            console.log(comments);
            setComments(comments);
        } catch (error) {
            console.log("Error fetching posts:", error);
            if (error.response.data.message == "jwt expired") {
                setJwtExpired(true);
                toggleExtendSessionModal();
            }
        }
    };

    const [formData, setFormData] = useState({
        parentCommentId: null,
        content: "",
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
        const validationErrors = validateCommentForm(formData);
        console.log(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            formData.postId = postId;
            console.log("Submitted:", formData);
            try {
                const response = await createComment(formData);
                console.log(response);
                navigate(0);
            } catch (error) {
                console.log("Something went wrong");
                console.log(error);
                if (error && !error.response.data.message)
                    setAlertResponse({ message: "Something went wrong" });
                if (!error.response.data.success) {
                    const errorMessage = error.response.data.message;
                    console.log(errorMessage);
                    setAlertResponse({ message: errorMessage });
                }
                console.log(alertResponse);
            } finally {
                setLoading(false);
            }
        } else {
            console.log(validationErrors);
            setAlertResponse(validationErrors);
        }
    };

    const addReply = (commentId, replyText) => {
        console.log(commentId);
        console.log(replyText);
        setFormData({
            parentCommentId: commentId,
            content: replyText,
        });
    };

    useEffect(() => {
        if (formData.content !== "") {
            handleSubmit(new Event("submit"));
        }
    }, [formData.parentCommentId]);

    const sessionExpired = () => {
        return (
            <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                <div className="flex justify-center items-center">
                    <p className="p-2 ">Your session is expired!</p>
                    <button
                        className=" text-white bg-blue-700 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                        onClick={toggleExtendSessionModal}
                    >
                        Extend Session
                    </button>
                </div>
            </Card>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {loadingPage ? (
                <Spinner
                    aria-label="Alternate spinner button example"
                    size="md"
                />
            ) : jwtExpired ? (
                sessionExpired()
            ) : (
                post && (
                    <>
                        <PostCard key={post._id} post={post} title={"both"} />
                        <Card className="md:w-[768px] w-[calc(100%-1rem)] mb-4">
                            {!showCommentBox && (
                                <button
                                    type="button"
                                    className="mb-2 px-4 py-2 flex items-center text-slate-500 font-bold text-left rounded-3xl border-2 border-slate-500 hover:border-slate-400 hover:text-slate-400"
                                    onClick={
                                        user
                                            ? () => {
                                                  setShowCommentBox(true);
                                              }
                                            : toggleLoginModal
                                    }
                                >
                                    <FaPlus></FaPlus>
                                    <div className="px-2">Add a comment</div>
                                </button>
                            )}
                            {showCommentBox && (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-5">
                                        <textarea
                                            id="content"
                                            name="content"
                                            maxLength={500}
                                            className="h-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Write a Comment"
                                            value={formData.content}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {loading ? (
                                        <span className=" text-white bg-blue-700 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600  ">
                                            <Spinner
                                                aria-label="Alternate spinner button example"
                                                size="sm"
                                            />
                                            <span className="pl-3">
                                                Commenting...
                                            </span>
                                        </span>
                                    ) : (
                                        <div className="flex">
                                            <button
                                                type="button"
                                                className="mr-2  bg-gray-300  hover:bg-gray-400 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white"
                                                onClick={() => {
                                                    setShowCommentBox(false);
                                                    setFormData({
                                                        parentCommentId: null,
                                                        content: "",
                                                    });
                                                }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="mx-2 text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    )}
                                </form>
                            )}
                            <div>
                                {comments.map((comment) => (
                                    <CommentCard
                                        key={comment._id}
                                        comment={comment}
                                        addReply={addReply}
                                    />
                                ))}
                            </div>
                        </Card>
                    </>
                )
            )}
        </div>
    );
};
export default PostPage;
