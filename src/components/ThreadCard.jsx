import { useState } from "react";
import { createMember, deleteMember } from "../utils/api/thread.api";
import { useAuth } from "../utils/authContext";
import { useModalContext } from "../utils/modalContext";
import { useNavigate } from "react-router-dom";
import { HiPencil } from "react-icons/hi";

const ThreadCard = (props) => {
    const thread = props.thread;
    const isAllThreadsPage = props.isAllThreadsPage;
    const { user } = useAuth();
    const [joined, setJoined] = useState(thread.joined);
    const [loading, setLoading] = useState(false);
    const {
        toggleLoginModal,
        setAlertResponse,
        toggleCreatePostModal,
        toggleEditThreadModal,
    } = useModalContext();
    const navigate = useNavigate();

    const handleJoin = async () => {
        try {
            setLoading(true);
            let response;
            if (joined) {
                response = await deleteMember(thread.name);
                thread.totalMembers--;
            } else {
                response = await createMember(thread.name);
                thread.totalMembers++;
            }
            console.log(response.data);
            setJoined(response.data.joined);
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

    const handleCreatePost = () => {
        if (!joined && !thread.owner)
            setAlertResponse({ message: "Join the thread to create posts" });
        else toggleCreatePostModal(thread.name);
    };

    const handleEditThread = () => {
        toggleEditThreadModal(thread);
    };

    return (
        <div className="m-2 mb-8 bg-slate-300  md:w-[768px] w-[calc(100%-1rem)] rounded-lg overflow-hidden">
            <img
                src={thread.banner}
                alt="Thread Banner"
                className=" w-full h-[125px] object-cover"
            />
            <div className="relative flex sm:flex-row flex-col sm:justify-between justify-start sm:items-center items-start md:px-8 md:py-6 p-2">
                <div className="flex justify-center items-center">
                    <img
                        src={thread.avatar}
                        alt="Thread Avatar"
                        className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                        <h1 className=" text-3xl font-bold text-gray-700">
                            {isAllThreadsPage ? (
                                <button
                                    onClick={() => {
                                        navigate(`/cu/${thread.name}`);
                                    }}
                                    className="hover:text-gray-500"
                                >
                                    cu/{thread.name}
                                </button>
                            ) : (
                                `cu/${thread.name}`
                            )}
                        </h1>
                        <p className="text-lg text-gray-700">
                            {thread.description}
                        </p>
                        <p className=" text-md text-gray-700">
                            Members: {thread.totalMembers}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row">
                    {!isAllThreadsPage && (
                        <button
                            onClick={user ? handleCreatePost : toggleLoginModal}
                            className=" rounded-full m-2 px-4 h-14 text-lg text-nowrap border-4 border-slate-100 bg-slate-200 hover:border-white"
                        >
                            + Create Post
                        </button>
                    )}
                    {!thread.owner && (
                        <button
                            onClick={user ? handleJoin : toggleLoginModal}
                            disabled={loading}
                            className="m-2 rounded-full px-4 h-14 text-lg text-nowrap bg-slate-400 hover:bg-slate-500"
                        >
                            {joined ? "Joined" : "+ Join"}
                        </button>
                    )}
                </div>
                {!isAllThreadsPage && thread.owner && (
                    <button
                        onClick={handleEditThread}
                        className=" absolute right-0 top-0 m-2 rounded-full p-2 text-lg text-nowrap bg-slate-400 hover:bg-slate-500"
                    >
                        <HiPencil />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ThreadCard;
