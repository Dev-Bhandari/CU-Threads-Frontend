import React from "react";
import { HiHome, HiUser, HiViewBoards } from "react-icons/hi";
import { FaPlus, FaLinkedin } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { BiBuoy } from "react-icons/bi";
import { useModalContext } from "../utils/modalContext";
import { useAuth } from "../utils/authContext";

const SideBar = () => {
    const { toggleLoginModal, toggleCreateThreadModal } = useModalContext();
    const { user } = useAuth();

    return (
        <div className="px-4 pt-4 max-2xl:hidden fixed  h-screen w-72 top-14 bg-white dark:bg-gray-900 border-r-2">
            <div className="flex flex-col h-full">
                <div className="flex-grow">
                    <div className="pb-4 border-b-2">
                        <div>
                            <a
                                href="/home"
                                className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                            >
                                <HiHome className="mr-3" size={22} />
                                <span className="font-medium">Home</span>
                            </a>
                        </div>
                        <div>
                            <a
                                href="/cu/all"
                                className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                            >
                                <HiViewBoards className="mr-3" size={22} />
                                <span className="font-medium">All Threads</span>
                            </a>
                        </div>
                        <div>
                            <a
                                href="#"
                                className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                            >
                                <HiUser className="mr-3" size={22} />
                                <span className="font-medium">Profile</span>
                            </a>
                        </div>
                    </div>

                    <div className="border-b-2">
                        <div className="py-2">
                            <button
                                onClick={
                                    user
                                        ? toggleCreateThreadModal
                                        : toggleLoginModal
                                }
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
                        {/* <div>
                            <a
                                href="#"
                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                            >
                                <BiBuoy className="mr-3" size={22} />
                                <span className="font-medium">Help</span>
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
