import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

const Home = () => {
    const navigate = useNavigate();
    const { user, isVerified, logout } = useAuth();
    const onButtonClick = () => {
        if (!user) {
            navigate("/login");
        } else if (!isVerified) {
            console.log(user);
            navigate("/verify");
        }
        logout;
    };

    return (
        <div className="mainContainer">
            <div className={"titleContainer"}>
                <div>Welcome!</div>
            </div>
            <div>This is the home page.</div>
            <div className={"buttonContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onButtonClick}
                    value={user ? "Log out" : "Log in"}
                />
                {user ? <div>User : {user.email}</div> : <div />}
            </div>
        </div>
    );
};

export default Home;
