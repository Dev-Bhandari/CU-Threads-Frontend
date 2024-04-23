import { Avatar, Card, Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import {
    BiDownvote,
    BiSolidDownvote,
    BiUpvote,
    BiSolidUpvote,
} from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
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
    const post = props.postData;
    let name, avatar;
    console.log("Props: ", props);
    if (!post.threadInfo) {
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
        // Reset upVote and downVote states when component unmounts
        console.log("Home Page");
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

    const handleThread = () => {
        navigate(post.threadInfo ? `/cu/${name}` : `/u/${name}`);
    };

    return (
        <div key={post._id}>
            <Card className="mb-4 min-w-128 w-[900px] hover:bg-slate-100 text-left">
                <div className="flex">
                    <button
                        className=" text-gray-500 dark:text-white hover:text-gray-400"
                        onClick={handleThread}
                    >
                        <div className="flex items-center px-2">
                            <Avatar img={avatar} rounded size="sm"></Avatar>
                            <h2 className=" text-sm px-2 font-bold tracking-tight">
                                {post.threadInfo ? `cu/${name}` : `u/${name}`}
                            </h2>
                        </div>
                    </button>
                </div>
                <h5 className=" text-2xl px-2 font-bold tracking-tight text-gray-700 dark:text-white">
                    {post.title}
                </h5>
                {post.mediaType === "image" && (
                    <div className="h-128 px-2">
                        {post.mediaUrl.length == 1 ? (
                            <img
                                src={post.mediaUrl[0]}
                                alt={`Image`}
                                className="object-cover w-full h-full rounded-3xl"
                            />
                        ) : (
                            <Carousel
                                slide={false}
                                className="bg-slate-300 rounded-3xl"
                            >
                                {post.mediaUrl.map((media, index) => (
                                    <div key={index}>
                                        <img
                                            src={media}
                                            alt={`Image ${index}`}
                                            className="w-full h-full"
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        )}
                    </div>
                )}
                {post.mediaType === "video" && (
                    <div className="h-128 px-2">
                        <video
                            src={post.mediaUrl}
                            className="w-full h-full rounded-3xl"
                            controls
                        ></video>
                    </div>
                )}
                <p className="px-2 font-normal text-gray-700 dark:text-gray-400">
                    {post.textContent}
                </p>
                <div className="flex">
                    <div className=" flex items-center bg-slate-500 m-2 px-1 rounded-full text-white">
                        <button
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
                            onClick={user ? handleDownVote : toggleLoginModal}
                        >
                            {downVote ? (
                                <BiSolidDownvote className="mx-1 size-5 hover:fill-slate-700" />
                            ) : (
                                <BiDownvote className="mx-1 size-5 hover:fill-slate-700" />
                            )}
                        </button>
                    </div>
                    <button>
                        <div className=" flex items-center bg-slate-500 m-2 px-4 py-1 rounded-full text-white hover:bg-slate-600">
                            <FaRegCommentAlt className="me-1.5" />
                            <p>{post.totalComments}</p>
                        </div>
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default PostCard;
