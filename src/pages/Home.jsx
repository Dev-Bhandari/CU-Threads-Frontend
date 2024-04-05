import { useAuth } from "../utils/authContext";
import userAPI from "../utils/api";

const Home = () => {
    const { user } = useAuth();
    const getUser = async () => {
        const resp = await userAPI.getUser();
        console.log(resp.data.data);
    };

    return (
        <div className="flex-col justify-center items-center">
            <div className="max-w-max mx-auto">
                Welcome! This is the home page.
            </div>
            <div className="max-w-max mx-auto p-4">
                {user ? <div>User : {user.email}</div> : <div />}
            </div>
            <button onClick={getUser}>Get User</button>
        </div>
    );
};

export default Home;
