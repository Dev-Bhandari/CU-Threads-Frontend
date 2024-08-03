import { getAllPosts } from "../utils/api/post.api";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, Spinner } from "flowbite-react";
import PostCard from "../components/PostCard";

const HomePage = () => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [lastFieldId, setLastFieldId] = useState("");
    const [hasNext, setHasNext] = useState(false);

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
        } finally {
            setLoaded(true);
            clearTimeout(spinnerTimeout);
            setLoading(false);
        }
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
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        posts.length != 0 ? (
                            <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                                <p>Refresh to see new posts</p>
                            </Card>
                        ) : (
                            loaded && (
                                <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                                    <p>No posts yet. Why not break the ice?</p>
                                </Card>
                            )
                        )
                    }
                    scrollThreshold={0.7}
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
