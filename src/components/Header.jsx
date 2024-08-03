import { useAuth } from "../utils/authContext";
import { useModalContext } from "../utils/modalContext";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
const Header = () => {
    const [loaded, setLoaded] = useState(false);
    const { user } = useAuth();
    const {
        toggleOpenSideBar,
        toggleLoginModal,
        alertResponse,
        setAlertResponse,
    } = useModalContext();
    useEffect(() => {
        setLoaded(true);
    }, [user]);
    return (
        <>
            <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
                <div className="px-4">
                    <div className="flex justify-between items-center h-14">
                        <div className="inline-flex">
                            <button
                                onClick={toggleOpenSideBar}
                                className="pr-4 text-gray-700 dark:text-gray-200 xl:hidden"
                            >
                                <RxHamburgerMenu size={30} />
                            </button>
                            <a href="/" className="flex items-center">
                                <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-700 dark:text-white">
                                    CU Threads
                                </span>
                            </a>
                        </div>
                        {loaded && (
                            <div className="flex items-center space-x-4">
                                {user?.isVerified ? (
                                    <div className="relative">
                                        <img
                                            src={user?.avatar}
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full space-x-2"
                                        />
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
                        )}
                    </div>
                </div>
            </nav>

            {alertResponse.message && (
                <div className="fixed top-16 inset-x-0 z-40 flex justify-center">
                    <div className="max-w-md w-full">
                        <div
                            className="flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <div>
                                <strong className="font-bold pr-2">
                                    Alert!
                                </strong>
                                <span className="block sm:inline">
                                    {alertResponse.message}
                                </span>
                            </div>
                            <button
                                className="text-red-700 hover:text-red-500"
                                onClick={() =>
                                    setAlertResponse({ message: null })
                                }
                            >
                                <IoClose size={25} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
