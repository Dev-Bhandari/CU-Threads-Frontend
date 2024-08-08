import { getAllPosts } from "../utils/api/post.api";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, Spinner } from "flowbite-react";
import PostCard from "../components/PostCard";
import { useModalContext } from "../utils/modalContext";
import { useAuth } from "../utils/authContext";

const HomePage = () => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [lastFieldId, setLastFieldId] = useState("");
    const [hasNext, setHasNext] = useState(false);
    const {
        jwtExpired,
        setJwtExpired,
        setAlertResponse,
        openExtendSessionModal,
        toggleExtendSessionModal,
    } = useModalContext();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const spinnerDelay = 3000;
        let spinnerTimeout;
        try {
            spinnerTimeout = setTimeout(() => {
                setLoading(true);
            }, spinnerDelay);
            console.log("Calling more posts");
            const res = await getAllPosts(lastFieldId);
            const newPosts = res.data.posts || [];
            if (newPosts.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
                setLastFieldId(res.data.lastSortedFieldId);
                setHasNext(res.data.hasNextPage);
                console.log(hasNext);
            }
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
        <div className="flex justify-center ">
            {loading ? (
                <Spinner
                    aria-label="Alternate spinner button example"
                    size="md"
                />
            ) : (
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchPosts}
                    hasMore={hasNext}
                    loader={
                        jwtExpired ? (
                            sessionExpired()
                        ) : (
                            <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                                <p>Loading more posts...</p>
                            </Card>
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
                                    <p>No posts yet. Why not break the ice?</p>
                                </Card>
                            ))
                        )
                    }
                    scrollThreshold={0.8}
                >
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} title={"thread"} />
                    ))}
                </InfiniteScroll>
            )}
        </div>
    );
};

export default HomePage;
