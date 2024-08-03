import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneUser } from "../utils/api/user.api";
import UserCard from "../components/UserCard";
import { Spinner } from "flowbite-react";

const UserPage = () => {
    const [loading, setLoading] = useState(false);
    const { username } = useParams();
    const [user, setUser] = useState(null);

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
            clearTimeout(spinnerTimeout);

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [username]);

    return (
        <div className="flex flex-col items-center justify-center">
            {loading ? (
                <Spinner
                    aria-label="Alternate spinner button example"
                    size="md"
                />
            ) : (
                user && <UserCard user={user} />
            )}
        </div>
    );
};

export default UserPage;
