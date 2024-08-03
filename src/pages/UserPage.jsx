import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneUser } from "../utils/api/user.api";
import UserCard from "../components/UserCard";
import { Card, Spinner } from "flowbite-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllPostsOfUser } from "../utils/api/post.api";
import PostCard from "../components/PostCard";

const UserPage = () => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [lastFieldId, setLastFieldId] = useState("");
    const [hasNext, setHasNext] = useState(false);

    const fetchUser = async () => {
        const spinnerDelay = 3000;
        let spinnerTimeout;
        try {
            spinnerTimeout = setTimeout(() => {
                setLoading(true);
            }, spinnerDelay);
            console.log("Calling User data");
            const res = await getOneUser(username);
            const user = res.data;
            console.log(user);
            setUser(user);
        } catch (error) {
            console.log("Error fetching user:", error);
        } finally {
            setLoaded(true);
            clearTimeout(spinnerTimeout);
            setLoading(false);
        }
    };

    const fetchPosts = async () => {
        try {
            console.log("Calling more posts");
            const res = await getAllPostsOfUser(username, lastFieldId);
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
        fetchUser();
        fetchPosts();
    }, [username]);

    return (
        <div className="flex flex-col items-center justify-center">
            {loading ? (
                <Spinner
                    aria-label="Alternate spinner button example"
                    size="md"
                />
            ) : (
                <>
                    {user && <UserCard user={user} />}
                    <InfiniteScroll
                        className="flex flex-col items-center justify-center"
                        dataLength={posts.length}
                        next={fetchPosts}
                        hasMore={hasNext}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            user && posts.length != 0 ? (
                                <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                                    <p>Refresh to see new posts</p>
                                </Card>
                            ) : (
                                loaded && (
                                    <Card className="text-center md:w-[768px] w-[calc(100%-1rem)] m-1">
                                        <p>
                                            No posts yet. Why not break the ice?
                                        </p>
                                    </Card>
                                )
                            )
                        }
                        scrollThreshold={0.7}
                    >
                        {posts.map((post) => (
                            <PostCard
                                key={post._id}
                                post={post}
                                title={"thread"}
                            />
                        ))}
                    </InfiniteScroll>
                </>
            )}
        </div>
    );
};

export default UserPage;
