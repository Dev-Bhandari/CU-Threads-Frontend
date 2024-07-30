import { useState } from "react";
import { HiHome, HiUser, HiViewBoards, HiX } from "react-icons/hi";
import { FaPlus, FaLinkedin } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { useModalContext } from "../utils/modalContext";
import { useAuth } from "../utils/authContext";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const {
        openSideBar,
        toggleOpenSideBar,
        toggleLoginModal,
        toggleCreateThreadModal,
    } = useModalContext();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/");
        toggleOpenSideBar();
    };

    const handleAllThreads = () => {
        navigate("/cu/all");
        toggleOpenSideBar();
    };

    const handleProfile = () => {
        if (user) {
            navigate("/u/" + user?.username);
            toggleOpenSideBar();
        } else toggleLoginModal();
    };
    const handleCreateNewThreads = () => {
        toggleOpenSideBar();
        if (user) {
            toggleCreateThreadModal();
        } else toggleLoginModal();
    };

    return (
        <>
            {openSideBar && (
                <div
                    className="fixed inset-0 bg-black opacity-50 xl:hidden z-20"
                    onClick={toggleOpenSideBar}
                ></div>
            )}

            <div
                className={`fixed top-14 left-0 z-30 h-screen w-[248px] bg-white dark:bg-gray-900 border-r-2 transform transition-transform duration-300 ease-in-out ${
                    openSideBar ? "translate-x-0" : "-translate-x-full"
                } xl:translate-x-0`}
            >
                <div className="px-2 flex flex-col h-full">
                    <button
                        onClick={toggleOpenSideBar}
                        className="absolute top-4 right-4 text-gray-700 dark:text-gray-200 xl:hidden"
                    >
                        <HiX size={24} />
                    </button>

                    <div className="flex-grow">
                        <div className="pb-4 border-b-2">
                            <div>
                                <a
                                    onClick={handleHome}
                                    className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                                >
                                    <HiHome className="mr-3" size={22} />
                                    <span className="font-medium">Home</span>
                                </a>
                            </div>
                            <div>
                                <a
                                    onClick={handleAllThreads}
                                    className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                                >
                                    <HiViewBoards className="mr-3" size={22} />
                                    <span className="font-medium">
                                        All Threads
                                    </span>
                                </a>
                            </div>
                            <div>
                                <a
                                    onClick={handleProfile}
                                    className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 cursor-pointer"
                                >
                                    <HiUser className="mr-3" size={22} />
                                    <span className="font-medium">Profile</span>
                                </a>
                            </div>
                        </div>

                        <div className="border-b-2 mb-2">
                            <div className="py-2">
                                <button
                                    onClick={handleCreateNewThreads}
                                    className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                                >
                                    <FaPlus className="mr-3" size={22} />
                                    <span className="font-medium">
                                        Create New Thread
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div>
                                <a
                                    href="https://github.com/Dev-Bhandari/CU-Threads"
                                    className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaCode className="mr-3" size={22} />
                                    <span className="font-medium">
                                        View Source Code
                                    </span>
                                </a>
                            </div>
                            <div>
                                <a
                                    href="https://www.linkedin.com/in/devbh/"
                                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaLinkedin className="mr-3" size={22} />
                                    <span className="font-medium">Contact</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
