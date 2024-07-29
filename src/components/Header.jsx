import { useAuth } from "../utils/authContext";
import { useModalContext } from "../utils/modalContext";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
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
            <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30">
                <div className="px-4">
                    <div className="flex justify-between items-center h-14">
                        <div className="inline-flex">
                            {/* Toggle Button for Sidebar */}
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
