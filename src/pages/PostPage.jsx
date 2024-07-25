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

const PostPage = () => {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const { postId } = useParams();
    const { setLoginError } = useModalContext();
    const inputEl = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [postId]);

    const fetchPost = async () => {
        try {
            console.log(`Calling post data for postId ${postId}`);
            const res = await getPost(postId);
            const post = res.data;
            console.log(post);
            setPost(post);
            if (postContainerRef.current && comments.length === 0) {
                postContainerRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        } catch (error) {
            console.log("Error fetching posts:", error);
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
            // Send form data to server for authentication
            console.log("Submitted:", formData);
            try {
                const response = await createComment(formData);
                console.log(response);
                navigate(0);
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

    useEffect(() => {
        // Ensure the page starts at the top when navigating to this page
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center mr-56 ">
            {post && (
                <>
                    <PostCard key={post._id} post={post} title={"thread"} />
                    <Card className="w-[850px] mb-4">
                        {!showCommentBox && (
                            <button
                                type="button"
                                className="mb-2 px-4 py-2 flex items-center text-slate-500 font-bold text-left rounded-3xl border-2 border-slate-500 hover:border-slate-400 hover:text-slate-400"
                                onClick={() => {
                                    setShowCommentBox(true);
                                    // This is to make the ref available
                                    inputEl.current.focus();
                                }}
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
                                    <div>
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
            )}
        </div>
    );
};
export default PostPage;
