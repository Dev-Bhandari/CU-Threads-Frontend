import { HiLogout, HiPencil } from "react-icons/hi";
import { useModalContext } from "../utils/modalContext";
import { useAuth } from "../utils/authContext";
import { logoutUser } from "../utils/api/user.api";
import { useNavigate } from "react-router-dom";

const UserCard = (props) => {
    const searchedUser = props.user;
    const { user, removeUserData } = useAuth();
    const { toggleEditUserModal, resetOnLogout } =
        useModalContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            logoutUser().then(() => {
                resetOnLogout();
                removeUserData();
                navigate("/");
            });
        } catch (error) {
            console.log(error.response);
            throw error;
        }
    };

    const handleEditUser = () => {
        toggleEditUserModal(user);
    };

    return (
        <div className="m-2 mb-8 bg-slate-300 md:w-[768px] w-[calc(100%-1rem)] rounded-lg overflow-hidden">
            <div className="flex sm:flex-row flex-col sm:justify-between justify-start sm:items-center items-start md:px-8 md:py-6 p-2">
                <div className="flex justify-center items-center">
                    <img
                        src={searchedUser.avatar}
                        alt="Thread Avatar"
                        className="w-20 h-20 rounded-full m-4 object-cover"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-700">
                            {searchedUser.username}
                        </h1>
                        <p className="text-lg text-gray-700">
                            {searchedUser.email}
                        </p>
                    </div>
                </div>
                <div>
                    {user && user.username === searchedUser.username && (
                        <div>
                            <button
                                onClick={handleEditUser}
                                className="m-2 rounded-full px-4 h-14 text-lg text-nowrap bg-slate-400 hover:bg-slate-500"
                            >
                                <HiPencil className="inline mr-2" />
                                <span className="px-1 text-nowrap">Edit</span>
                            </button>

                            <button
                                onClick={handleLogout}
                                className="rounded-full m-2 px-4 h-14 text-lg text-nowrap border-4 border-slate-100 bg-slate-200 hover:border-white"
                            >
                                <HiLogout className="inline mr-2" />
                                <span className="px-3 text-nowrap">
                                    Log Out
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserCard ;
