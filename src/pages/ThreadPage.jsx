import { getOneThread } from "../utils/api/thread.api";
import { getAllPostsOfThread } from "../utils/api/post.api";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, Spinner } from "flowbite-react";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import ThreadCard from "../components/ThreadCard";
import { useAuth } from "../utils/authContext";
import { useModalContext } from "../utils/modalContext";

const ThreadPage = () => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [thread, setThread] = useState(null);
    const [posts, setPosts] = useState([]);
    const [lastFieldId, setLastFieldId] = useState("");
    const [hasNext, setHasNext] = useState(false);
    const { threadName } = useParams();
    const {
        jwtExpired,
        setJwtExpired,
        setAlertResponse,
        openExtendSessionModal,
        toggleExtendSessionModal,
    } = useModalContext();
    console.log(threadName);

    const fetchThread = async () => {
        const spinnerDelay = 3000;
        let spinnerTimeout;
        try {
            spinnerTimeout = setTimeout(() => {
                setLoading(true);
            }, spinnerDelay);

            console.log("Calling thread data "+threadName);
            const res = await getOneThread(threadName);
            const newThread = res.data;
            console.log(newThread);
            setThread(newThread);
        } catch (error) {
            console.log("Error fetching posts:", error);
            if (error.response.data.message == "jwt expired") {
                setJwtExpired(true);
                toggleExtendSessionModal();
            }
        } finally {
            setLoaded(true);
            clearTimeout(spinnerTimeout);
            setLoading(false);
        }
    };

    const fetchPosts = async () => {
        try {
            console.log("Calling more posts");
            const res = await getAllPostsOfThread(threadName, lastFieldId);
            const newPosts = res.data.posts || [];
            console.log(newPosts);
            if (newPosts.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
                setLastFieldId(res.data.lastSortedFieldId);
                setHasNext(res.data.hasNextPage);
                console.log(res.data.hasNextPage);
            }
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchThread();
        fetchPosts();
    }, [threadName]);

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
            {loading ? (
                <Spinner
                    aria-label="Alternate spinner button example"
                    size="md"
                />
            ) : (
                <>
                    {thread && (
                        <ThreadCard thread={thread} isAllThreadsPage={false} />
                    )}
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={fetchPosts}
                        hasMore={hasNext}
                        loader={
                            jwtExpired ? (
                                sessionExpired()
                            ) : (
                                <p>Loading more posts...</p>
                            )
                        }
                        endMessage={
                            posts.length != 0 ? (
                                <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                                    <p>Refresh to see new posts</p>
                                </Card>
                            ) : (
                                loaded &&
                                (jwtExpired ? (
                                    sessionExpired()
                                ) : (
                                    <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                                        <p>
                                            No posts yet. Why not break the ice?
                                        </p>
                                    </Card>
                                ))
                            )
                        }
                        scrollThreshold={0.8}
                    >
                        {posts.map((post) => (
                            <PostCard
                                key={post._id}
                                post={post}
                                title={"user"}
                            />
                        ))}
                    </InfiniteScroll>
                </>
            )}
        </div>
    );
};

export default ThreadPage;
