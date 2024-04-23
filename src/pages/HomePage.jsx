import { useAuth } from "../utils/authContext";
import { getAllPosts } from "../utils/api/post.api";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card } from "flowbite-react";
import PostCard from "../components/PostCard";

const HomePage = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [lastFieldId, setLastFieldId] = useState("");
    const [hasNext, setHasNext] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
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
        }
    };

    return (
        <div className="flex flex-col items-center mr-56 ">
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchPosts}
                hasMore={hasNext}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <Card className="text-center">
                        <p>Refresh to see new posts</p>
                    </Card>
                }
                scrollThreshold={0.7}
            >
                {posts.map((post) => (
                    <PostCard key={post._id} postData={post} />
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default HomePage;
