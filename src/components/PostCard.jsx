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
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");
    const videoRef = useRef(null);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsMenuOpen((prev) => !prev);
    };

    const handleDeletePost = (e) => {
        e.stopPropagation();
        if (user) {
            toggleDeletePostModal(post._id);
        } else toggleLoginModal();
        setIsMenuOpen(false);
    };

    const handleReportPost = (e) => {
        e.stopPropagation();
        if (user) {
            setAlertResponse({
                message: "Post reported.",
            });
        } else toggleLoginModal();
        setIsMenuOpen(false);
    };

    const handleUpVote = async (e) => {
        e.stopPropagation();
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

    const handleDownVote = async (e) => {
        e.stopPropagation();
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

    const handleTitle = (e) => {
        e.stopPropagation();
        navigate(
            title === "user"
                ? `/u/${post.creatorInfo[0].username}`
                : `/cu/${post.threadInfo[0].name}`
        );
    };

    const handleSubtitle = (e) => {
        e.stopPropagation();
        navigate(`/u/${post.creatorInfo[0].username}`);
    };

    const handlePost = () => {
        navigate(`/posts/${post._id}`);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentSlide((prevSlide) =>
            prevSlide === post.mediaUrl.length - 1 ? 0 : prevSlide + 1
        );
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? post.mediaUrl.length - 1 : prevSlide - 1
        );
    };

    const handleFullScreen = (e, url) => {
        e.stopPropagation();
        setFullScreenImage(url);
        setIsFullScreen(true);
        document.body.style.overflow = "hidden";
    };

    const handleCloseFullScreen = (e) => {
        e.stopPropagation();
        setIsFullScreen(false);
        document.body.style.overflow = "auto";
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

    const preventVideoClickPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            key={post._id}
            className={`flex flex-col m-2 mb-4 p-2 md:w-[768px] w-[calc(100%-1rem)] text-left bg-white  dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md ${
                title != "both" && "hover:bg-slate-100 cursor-pointer"
            }`}
            onClick={() => {
                title != "both" && handlePost();
            }}
        >
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                    {title === "thread" ? (
                        <button onClick={handleTitle}>
                            <img
                                src={post.threadInfo[0].avatar}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        </button>
                    ) : (
                        <button onClick={handleSubtitle}>
                            <img
                                src={post.creatorInfo[0].avatar}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        </button>
                    )}
                    <div className="flex flex-col items-start">
                        <button
                            className="text-gray-600 dark:text-white hover:text-gray-500 z-10"
                            onClick={handleTitle}
                        >
                            <h2 className="text-sm px-2 font-bold tracking-tight">
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
                            {user && post.creatorInfo[0]._id == user._id && (
                                <button
                                    onClick={handleDeletePost}
                                    className="w-full"
                                    disabled={loading}
                                >
                                    <div className="flex items-center p-3 hover:bg-slate-200 text-nowrap">
                                        <FaTrash />
                                        <span className="pl-2">Delete</span>
                                    </div>
                                </button>
                            )}
                            <button
                                onClick={handleReportPost}
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

            <h5 className="text-2xl px-4 font-bold text-gray-700">
                {post.title}
            </h5>

            {post.mediaType === "image" && post.mediaUrl.length > 0 && (
                <div className="px-4 py-2 relative">
                    {post.mediaUrl.length === 1 ? (
                        <div className="w-full bg-slate-300 rounded-3xl border-2 border-gray-200">
                            <img
                                src={post.mediaUrl[0]}
                                alt={`Image`}
                                loading="lazy"
                                className="object-contain w-full max-h-128 rounded-3xl cursor-pointer"
                                onClick={(e) =>
                                    handleFullScreen(e, post.mediaUrl[0])
                                }
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-slate-300 rounded-3xl relative overflow-hidden border-2 border-gray-200">
                            <div
                                className="flex items-center transition-transform duration-500"
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
                                            loading="lazy"
                                            className="w-full max-h-128 object-contain cursor-pointer"
                                            onClick={(e) =>
                                                handleFullScreen(e, media)
                                            }
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentSlide(index);
                                        }}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {post.mediaType === "video" && (
                <div className="mx-4 my-2 border-2 rounded-3xl border-gray-200">
                    <video
                        ref={videoRef}
                        src={post.mediaUrl}
                        loading="lazy"
                        className="max-h-128 w-full rounded-3xl "
                        controls
                        muted
                        onClick={preventVideoClickPropagation}
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
                        onClick={(e) => {
                            e.stopPropagation();
                            user ? handleUpVote(e) : toggleLoginModal(e);
                        }}
                    >
                        {user && upVote ? (
                            <BiSolidUpvote className="mx-1 size-5 hover:fill-slate-700" />
                        ) : (
                            <BiUpvote className="mx-1 size-5 hover:fill-slate-700" />
                        )}
                    </button>
                    <p>{totalVotes}</p>
                    <button
                        disabled={loading}
                        onClick={(e) => {
                            e.stopPropagation();
                            user ? handleDownVote(e) : toggleLoginModal(e);
                        }}
                    >
                        {user && downVote ? (
                            <BiSolidDownvote className="mx-1 size-5 hover:fill-slate-700" />
                        ) : (
                            <BiDownvote className="mx-1 size-5 hover:fill-slate-700" />
                        )}
                    </button>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handlePost(e);
                    }}
                >
                    <div className="flex items-center bg-slate-500 m-2 px-4 py-1 rounded-full text-white hover:bg-slate-600">
                        <FaRegCommentAlt className="me-1.5" />
                        <p>{post.totalComments}</p>
                    </div>
                </button>
            </div>

            {isFullScreen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
                    onClick={handleCloseFullScreen}
                >
                    <img
                        src={fullScreenImage}
                        alt="Full-Screen Image"
                        className="object-contain max-w-full max-h-full rounded-lg"
                    />
                </div>
            )}
        </div>
    );
};

export default PostCard;
