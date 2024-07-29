import { useEffect, useState } from "react";
import { useModalContext } from "../utils/modalContext";
import { useNavigate, useParams } from "react-router-dom";
import { getOneUser } from "../utils/api/user.api";
import UserCard from "../components/UserCard";

const UserPage = () => {
    const [loading, setLoading] = useState(false);
    const { username } = useParams();
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            console.log("Calling User data");
            const res = await getOneUser(username);
            const user = res.data;
            console.log(user);
            setUser(user);
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };

    const fetchPosts = async () => {
        const spinnerDelay = 3000;
        let spinnerTimeout;
        try {
            spinnerTimeout = setTimeout(() => {
                setLoading(true);
            }, spinnerDelay);
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
        } finally {
            clearTimeout(spinnerTimeout);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [username]);

    return loading ? (
        <Spinner aria-label="Alternate spinner button example" size="md" />
    ) : (
        <div className="flex flex-col items-center justify-center">
            {user && <UserCard user={user} />}
        </div>
    );
};

export default UserPage;
