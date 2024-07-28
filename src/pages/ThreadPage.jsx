import { useAuth } from "../utils/authContext";
import { getOneThread } from "../utils/api/thread.api";
import { getAllPostsOfThread } from "../utils/api/post.api";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "flowbite-react";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import ThreadCard from "../components/ThreadCard";

const ThreadPage = () => {
    const [thread, setThread] = useState(null);
    const [posts, setPosts] = useState([]);
    const [lastFieldId, setLastFieldId] = useState("");
    const [hasNext, setHasNext] = useState(false);
    const { threadName } = useParams();
    console.log(threadName);

    useEffect(() => {
        fetchThread();
        fetchPosts();
    }, [threadName]);

    const fetchThread = async () => {
        try {
            console.log("Calling thread data");
            const res = await getOneThread(threadName);
            const newThread = res.data;
            console.log(newThread);
            setThread(newThread);
        } catch (error) {
            console.log("Error fetching posts:", error);
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

    return (
        <div className="flex flex-col items-center justify-center">
            {thread && <ThreadCard thread={thread} isAllThreadsPage={false} />}
            <InfiniteScroll
            className="w-screen flex flex-col items-center justify-center"
                dataLength={posts.length}
                next={fetchPosts}
                hasMore={hasNext}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                        <p>Refresh to see new posts</p>
                    </Card>
                }
                scrollThreshold={0.9}
            >
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} title={"user"} />
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default ThreadPage;
