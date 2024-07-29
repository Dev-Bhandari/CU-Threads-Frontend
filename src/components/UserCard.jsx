import { HiLogout, HiInformationCircle } from "react-icons/hi";
import { useModalContext } from "../utils/modalContext";
import { useAuth } from "../utils/authContext";
import { logoutUser } from "../utils/api/user.api";
import { useNavigate } from "react-router-dom";

const UserCard = (props) => {
    const searchedUser = props.user;
    const { user, removeUserData } = useAuth();
    const { resetOnLogout } = useModalContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            resetOnLogout();
            removeUserData();
            await logoutUser();
            navigate("/");
        } catch (error) {
            console.log(error.response);
            throw error;
        }
    };
    return (
        <div className=" m-2 mb-8 bg-slate-300  md:w-[768px] w-[calc(100%-1rem)] rounded-lg overflow-hidden">
            <div className=" flex sm:flex-row flex-col sm:justify-between justify-start sm:items-center items-start md:px-8 md:py-6 p-2">
                <div className="flex justify-center items-center">
                    <img
                        src={searchedUser.avatar}
                        alt="Thread Avatar"
                        className="w-20 h-20 rounded-full m-4"
                    />
                    <div>
                        <h1 className=" text-3xl font-bold text-gray-700">
                            {searchedUser.username}
                        </h1>
                        <p className="text-lg text-gray-700">
                            {searchedUser.email}
                        </p>
                    </div>
                </div>
                <div>
                    {user && user.username === searchedUser.username && (
                        <button
                            onClick={handleLogout}
                            className=" rounded-full m-2 px-4 h-14 text-lg text-nowrap border-4 border-slate-100 bg-slate-200 hover:border-white"
                        >
                            <HiLogout className="inline mr-2" />
                            <span className="px-3 text-nowrap">Log Out</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserCard;
