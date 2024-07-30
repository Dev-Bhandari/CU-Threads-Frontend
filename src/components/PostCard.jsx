import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
    BiDownvote,
    BiSolidDownvote,
    BiUpvote,
    BiSolidUpvote,
} from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
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
    let name, avatar;
    console.log("Props: ", props);
    console.log(post);
    if (title == "user") {
        name = post.creatorInfo[0].username;
        avatar = post.creatorInfo[0].avatar;
    } else {
        name = post.threadInfo[0].name;
        avatar = post.threadInfo[0].avatar;
    }
    const { user } = useAuth();
    const [upVote, setUpVote] = useState(post.upVoted);
    const [downVote, setDownVote] = useState(post.downVoted);
    const [totalVotes, setTotalVotes] = useState(post.totalVotes);
    const { toggleLoginModal, setAlertResponse } = useModalContext();
    const navigate = useNavigate();
    useEffect(() => {
        return () => {
            setUpVote(false);
            setDownVote(false);
        };
    }, []);

    const handleUpVote = async () => {
        try {
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
        }
    };
    const handleDownVote = async () => {
        try {
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
        }
    };

    const handleTitle = () => {
        navigate(title == "user" ? `/u/${name}` : `/cu/${name}`);
    };

    const handleSubtitle = () => {
        navigate(`/u/${post.creatorInfo[0].username}`);
    };

    const handlePost = () => {
        navigate(`/posts/${post._id}`);
    };

    const [currentSlide, setCurrentSlide] = useState(0);

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

    return (
        <div
            key={post._id}
            className="m-2 mb-4 md:w-[768px] w-[calc(100%-1rem)] hover:bg-slate-100 text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md"
        >
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                    {title == "thread" ? (
                        <button onClick={handleTitle}>
                            <Avatar img={post.threadInfo[0].avatar} rounded size="sm" />
                        </button>
                    ) : (
                        <button onClick={handleSubtitle}>
                            <Avatar img={post.creatorInfo[0].avatar} rounded size="sm" />
                        </button>
                    )}
                    <div className="flex flex-col items-start">
                        <button
                            className="text-gray-500 dark:text-white hover:text-gray-400 z-10"
                            onClick={handleTitle}
                        >
                            <h2 className="text-sm px-2 font-bold tracking-tight text-gray-600">
                                {title == "user"
                                    ? `u/${post.creatorInfo[0].username}`
                                    : `cu/${post.threadInfo[0].name}`}
                            </h2>
                        </button>
                        {title == "both" && (
                            <h2 className="text-sm px-2 font-bold tracking-tight">
                                u/{post.creatorInfo[0].username}
                            </h2>
                        )}
                    </div>
                </div>
            </div>

            <h5 className="text-2xl px-4 font-bold tracking-tight text-gray-700 dark:text-white hover:text-gray-500">
                <button onClick={handlePost}>{post.title}</button>
            </h5>

            {post.mediaType === "image" && post.mediaUrl.length > 0 && (
                <div className="h-3/5 px-4 py-2 relative">
                    {post.mediaUrl.length === 1 ? (
                        <div className="w-full h-full bg-slate-300 rounded-3xl">
                            <img
                                src={post.mediaUrl[0]}
                                alt={`Image`}
                                className="object-contain w-full h-full rounded-3xl"
                            />
                        </div>
                    ) : (
                        <div className="carousel w-full h-full bg-slate-300 rounded-3xl relative overflow-hidden">
                            <div
                                className="carousel-inner flex transition-transform duration-300"
                                style={{
                                    transform: `translateX(-${
                                        currentSlide * 100
                                    }%)`,
                                }}
                            >
                                {post.mediaUrl.map((media, index) => (
                                    <div
                                        key={index}
                                        className="carousel-item w-full flex-shrink-0"
                                    >
                                        <img
                                            src={media}
                                            alt={`Image ${index}`}
                                            className="w-full h-full object-contain rounded-3xl"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Carousel Controls */}
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

                            {/* Carousel Indicators */}
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
                <div className="h-128 px-4 py-2">
                    <video
                        src={post.mediaUrl}
                        className="w-full h-full rounded-3xl"
                        controls
                    ></video>
                </div>
            )}

            <p className="px-4 py-2 font-normal text-gray-700 dark:text-gray-400">
                {post.textContent}
            </p>

            <div className="flex px-4 py-2">
                <div className="flex items-center bg-slate-500 m-2 px-1 rounded-full text-white">
                    <button onClick={user ? handleUpVote : toggleLoginModal}>
                        {upVote ? (
                            <BiSolidUpvote className="mx-1 size-5 hover:fill-slate-700" />
                        ) : (
                            <BiUpvote className="mx-1 size-5 hover:fill-slate-700" />
                        )}
                    </button>
                    <p>{totalVotes}</p>
                    <button onClick={user ? handleDownVote : toggleLoginModal}>
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
