import { useAuth } from "../utils/authContext";
import { HiLogout, HiInformationCircle } from "react-icons/hi";
import { logoutUser } from "../utils/api/user.api";
import { useModalContext } from "../utils/modalContext";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
    const { user, removeUserData } = useAuth();
    const { toggleLoginModal, alertResponse, setAlertResponse, resetOnLogout } =
        useModalContext();
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            resetOnLogout();
            removeUserData();
            await logoutUser();
            navigate(0);
        } catch (error) {
            console.log(error.response);
            throw error;
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <>
            <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30">
                <div className="px-4">
                    <div className="flex justify-between items-center h-14">
                        <a href="/" className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-700 dark:text-white">
                                CU Threads
                            </span>
                        </a>
                        <div className="flex items-center space-x-4">
                            {user?.isVerified ? (
                                <div className="relative">
                                    <button
                                        className="flex items-center space-x-2 text-gray-700 dark:text-white focus:outline-none"
                                        id="user-menu"
                                        aria-haspopup="true"
                                        onClick={toggleDropdown}
                                    >
                                        <img
                                            src={user?.avatar}
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                    </button>
                                    {/* Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <div
                                            className="absolute -right-2 mt-3 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu"
                                        >
                                            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-600">
                                                <span className="block text-sm text-center text-gray-700 dark:text-white">
                                                    <div className="flex items-center justify-start">
                                                        <FaUser className="mr-2" />
                                                        <div className="px-3">
                                                            u/{user?.username}
                                                        </div>
                                                    </div>
                                                </span>
                                            </div>
                                            {/* Commented Out Menu Items */}
                                            {/* <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                                                role="menuitem"
                                            >
                                                <HiCog className="inline mr-2" />
                                                Settings
                                            </a>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                                                role="menuitem"
                                            >
                                                <HiCurrencyDollar className="inline mr-2" />
                                                Earnings
                                            </a>
                                            <div className="border-t border-gray-100 dark:border-gray-600"></div> */}
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                                                onClick={handleLogout}
                                                role="menuitem"
                                            >
                                                <HiLogout className="inline mr-2" />
                                                <span className="px-3">
                                                    Log Out
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                                    onClick={toggleLoginModal}
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Alert */}
            {alertResponse.message && (
                <div className="fixed top-16 inset-x-0 z-50 flex justify-center">
                    <div className="max-w-md w-full">
                        <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <strong className="font-bold">Info alert! </strong>
                            <span className="block sm:inline">
                                {alertResponse.message}
                            </span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <button
                                    className="text-red-700 hover:text-red-500"
                                    onClick={() =>
                                        setAlertResponse({ message: null })
                                    }
                                >
                                    <svg
                                        className="fill-current h-6 w-6"
                                        role="button"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <title>Close</title>
                                        <path d="M14.348 5.652a1 1 0 0 0-1.414 0L10 8.586 7.066 5.652a1 1 0 0 0-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 1 0 1.414 1.414L10 11.414l2.934 2.934a1 1 0 0 0 1.414-1.414L11.414 10l2.934-2.934a1 1 0 0 0 0-1.414z" />
                                    </svg>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
