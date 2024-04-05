import { useAuth } from "../utils/authContext";

const Home = () => {
    const { user } = useAuth();
    return (
        <div className="flex-col justify-center items-center">
            <div className="max-w-max mx-auto">
                Welcome! This is the home page.
            </div>
            <div className="max-w-max mx-auto p-4">
                {user ? <div>User : {user.email}</div> : <div />}
            </div>
        </div>
    );
};

export default Home;
