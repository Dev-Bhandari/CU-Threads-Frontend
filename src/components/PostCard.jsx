import { Avatar } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import {
    BiDownvote,
    BiSolidDownvote,
    BiUpvote,
    BiSolidUpvote,
} from "react-icons/bi";
import { FaRegCommentAlt, FaTrash } from "react-icons/fa";
import { FaFlag } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import {
    createUpVote,
    deleteUpVote,
    createDownVote,
    deleteDownVote,
} from "../utils/api/post.api";
import { useModalContext } from "../utils/modalContext";
import { useAuth } from "../utils/authContext";
import { useNavigate } from "react-router-dom";

const PostCard = (props) => {
    const title = props.title;
    const post = props.post.length === 1 ? props.post[0] : props.post;
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [upVote, setUpVote] = useState(post.upVoted);
    const [downVote, setDownVote] = useState(post.downVoted);
    const [totalVotes, setTotalVotes] = useState(post.totalVotes);
    const { toggleLoginModal, setAlertResponse, toggleDeletePostModal } =
        useModalContext();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const videoRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };
    const handleDeletePost = () => {
        setIsMenuOpen(false);
        toggleDeletePostModal(post._id);
    };
    const handleReportPost = () => {
        setIsMenuOpen(false);
        setAlertResponse({
            message: "Post reported.",
        });
    };
    const handleUpVote = async () => {
        try {
            setLoading(true);
            const body = { postId: post._id.toString() };
            let response;
            if (!upVote) {
                response = await createUpVote(body);
            } else {
                response = await deleteUpVote(body);
            }
            setTotalVotes(response.data.totalVotes);
            if (downVote) setDownVote(!downVote);
            setUpVote(!upVote);
        } catch (error) {
            console.log("Something went wrong");
            console.error(error);
            if (error && !error.response.data.message)
                setAlertResponse({ message: "Something went wrong" });
            else setAlertResponse({ message: error.response.data.message });
        } finally {
            setLoading(false);
        }
    };

    const handleDownVote = async () => {
        try {
            setLoading(true);
            const body = { postId: post._id.toString() };
            let response;
            if (!downVote) {
                response = await createDownVote(body);
            } else {
                response = await deleteDownVote(body);
            }
            setTotalVotes(response.data.totalVotes);
            if (upVote) setUpVote(!upVote);
            setDownVote(!downVote);
        } catch (error) {
            console.log("Something went wrong");
            console.error(error);
            if (error && !error.response.data.message)
                setAlertResponse({ message: "Something went wrong" });
            else setAlertResponse({ message: error.response.data.message });
        } finally {
            setLoading(false);
        }
    };

    const handleTitle = () => {
        navigate(
            title === "user"
                ? `/u/${post.creatorInfo[0].username}`
                : `/cu/${post.threadInfo[0].name}`
        );
    };

    const handleSubtitle = () => {
        navigate(`/u/${post.creatorInfo[0].username}`);
    };

    const handlePost = () => {
        navigate(`/posts/${post._id}`);
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === post.mediaUrl.length - 1 ? 0 : prevSlide + 1
        );
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? post.mediaUrl.length - 1 : prevSlide - 1
        );
    };

    useEffect(() => {
        const videoElement = videoRef.current;

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoElement.play();
                } else {
                    videoElement.pause();
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5,
        });

        if (videoElement) {
            observer.observe(videoElement);
        }

        return () => {
            if (videoElement) {
                observer.unobserve(videoElement);
            }
        };
    }, []);

    return (
        <div
            key={post._id}
            className="m-2 mb-4 p-2 md:w-[768px] w-[calc(100%-1rem)] text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md"
        >
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                    {title === "thread" ? (
                        <button onClick={handleTitle}>
                            <Avatar
                                img={post.threadInfo[0].avatar}
                                rounded
                                size="sm"
                            />
                        </button>
                    ) : (
                        <button onClick={handleSubtitle}>
                            <Avatar
                                img={post.creatorInfo[0].avatar}
                                rounded
                                size="sm"
                            />
                        </button>
                    )}
                    <div className="flex flex-col items-start">
                        <button
                            className="text-gray-500 dark:text-white hover:text-gray-400 z-10"
                            onClick={handleTitle}
                        >
                            <h2 className="text-sm px-2 font-bold tracking-tight text-gray-600">
                                {title === "user"
                                    ? `u/${post.creatorInfo[0].username}`
                                    : `cu/${post.threadInfo[0].name}`}
                            </h2>
                        </button>
                        {title === "both" && (
                            <button
                                className="text-gray-500 dark:text-white hover:text-gray-400 z-10"
                                onClick={handleSubtitle}
                            >
                                <h2 className="text-sm px-2 font-bold tracking-tight">
                                    u/{post.creatorInfo[0].username}
                                </h2>
                            </button>
                        )}
                    </div>
                </div>
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 z-50"
                        onClick={toggleMenu}
                    ></div>
                )}
                <div className="relative">
                    <button
                        onClick={toggleMenu}
                        className="p-2 text-gray-700 hover:text-gray-700 dark:text-white hover:bg-slate-300 rounded-full"
                    >
                        <BsThreeDots size={20} />
                    </button>
                    {isMenuOpen && (
                        <div className="flex flex-col items-start absolute right-0 top-10 bg-white text-slate-700 border border-gray-200 dark:bg-gray-700 shadow-lg rounded-md z-50">
                            {user && post.creatorInfo[0]._id == user._id && (
                                <button
                                    onClick={
                                        user
                                            ? handleDeletePost
                                            : toggleLoginModal
                                    }
                                    className="w-full"
                                    disabled={loading}
                                >
                                    <div className="flex items-center p-3 hover:bg-slate-200 text-nowrap">
                                        <FaTrash />
                                        <span className="pl-2">
                                            Delete Post
                                        </span>
                                    </div>
                                </button>
                            )}
                            <button
                                onClick={
                                    user ? handleReportPost : toggleLoginModal
                                }
                                className="w-full"
                                disabled={loading}
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

            <h5 className="text-2xl px-4 font-bold tracking-tight text-gray-700 dark:text-white hover:text-gray-500">
                <button onClick={handlePost}>{post.title}</button>
            </h5>

            {post.mediaType === "image" && post.mediaUrl.length > 0 && (
                <div className="px-4 py-2 relative">
                    {post.mediaUrl.length === 1 ? (
                        <div className="w-full bg-slate-300 rounded-3xl">
                            <img
                                src={post.mediaUrl[0]}
                                alt={`Image`}
                                className="object-contain w-full max-h-128 rounded-3xl"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-slate-300 rounded-3xl relative overflow-hidden">
                            <div
                                className="flex items-center transition-transform duration-300"
                                style={{
                                    transform: `translateX(-${
                                        currentSlide * 100
                                    }%)`,
                                }}
                            >
                                {post.mediaUrl.map((media, index) => (
                                    <div
                                        key={index}
                                        className="w-full flex-shrink-0"
                                    >
                                        <img
                                            src={media}
                                            alt={`Image ${index}`}
                                            className="w-full max-h-128 object-contain"
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
                                onClick={handlePrev}
                            >
                                <IoIosArrowBack className="size-5" />
                            </button>
                            <button
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-600 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
                                onClick={handleNext}
                            >
                                <IoIosArrowForward className="size-5" />
                            </button>

                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {post.mediaUrl.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-3 h-3 rounded-full ${
                                            index === currentSlide
                                                ? "bg-white"
                                                : "bg-gray-400"
                                        }`}
                                        onClick={() => setCurrentSlide(index)}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {post.mediaType === "video" && (
                <div className="px-4 py-2">
                    <video
                        ref={videoRef}
                        src={post.mediaUrl}
                        className="max-h-128 w-full rounded-3xl border-2 border-gray-200"
                        controls
                        muted
                    ></video>
                </div>
            )}

            <p className="px-4 py-2 font-normal text-gray-700 dark:text-gray-400 whitespace-pre-line">
                {post.textContent}
            </p>

            <div className="flex px-2 py-2">
                <div className="flex items-center bg-slate-500 m-2 px-1 rounded-full text-white">
                    <button
                        disabled={loading}
                        onClick={user ? handleUpVote : toggleLoginModal}
                    >
                        {upVote ? (
                            <BiSolidUpvote className="mx-1 size-5 hover:fill-slate-700" />
                        ) : (
                            <BiUpvote className="mx-1 size-5 hover:fill-slate-700" />
                        )}
                    </button>
                    <p>{totalVotes}</p>
                    <button
                        disabled={loading}
                        onClick={user ? handleDownVote : toggleLoginModal}
                    >
                        {downVote ? (
                            <BiSolidDownvote className="mx-1 size-5 hover:fill-slate-700" />
                        ) : (
                            <BiDownvote className="mx-1 size-5 hover:fill-slate-700" />
                        )}
                    </button>
                </div>
                <button onClick={handlePost}>
                    <div className="flex items-center bg-slate-500 m-2 px-4 py-1 rounded-full text-white hover:bg-slate-600">
                        <FaRegCommentAlt className="me-1.5" />
                        <p>{post.totalComments}</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default PostCard;
