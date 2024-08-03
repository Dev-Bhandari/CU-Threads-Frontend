import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [openVerifyUserModal, setOpenVerifyUserModal] = useState(false);
    const [openCreatePostModal, setOpenCreatePostModal] = useState({
        threadName: null,
    });
    const [openCreateThreadModal, setOpenCreateThreadModal] = useState(false);
    const [openDeletePostModal, setOpenDeletePostModal] = useState({
        postId: null,
    });
    const [openSideBar, setOpenSideBar] = useState(false);

    const [loginError, setLoginError] = useState({});
    const [registerError, setRegisterError] = useState({});
    const [resendResponse, setResendResponse] = useState({});
    const [alertResponse, setAlertResponse] = useState({
        message: null,
    });

    const toggleLoginModal = () => {
        if (!openLoginModal) setAlertResponse({ message: null });
        setOpenLoginModal((prevState) => !prevState);
        setLoginError({});
    };

    const toggleRegisterModal = () => {
        setOpenRegisterModal((prevState) => !prevState);
        setRegisterError({});
    };

    const toggleVerifyUserModal = () => {
        setOpenVerifyUserModal((prevState) => !prevState);
        setResendResponse({});
    };

    const toggleCreatePostModal = (threadName) => {
        if (!openCreatePostModal.threadName) {
            setOpenCreatePostModal({ threadName: threadName });
        } else {
            setOpenCreatePostModal({ threadName: null });
        }
    };

    const toggleCreateThreadModal = () => {
        setOpenCreateThreadModal((prevState) => !prevState);
    };

    const toggleDeletePostModal = (postId) => {
        if (!openDeletePostModal.postId) {
            setOpenDeletePostModal({ postId: postId });
        } else {
            setOpenDeletePostModal({ postId: null });
        }
    };

    const toggleOpenSideBar = () => {
        setOpenSideBar((prevState) => !prevState);
    };
    const resetOnLogout = () => {
        setOpenLoginModal(false);
        setOpenRegisterModal(false);
        setOpenVerifyUserModal(false);
        setOpenCreatePostModal({ threadName: null });
        setOpenCreateThreadModal(false);
        setLoginError({});
        setRegisterError({});
    };
    return (
        <ModalContext.Provider
            value={{
                openLoginModal,
                toggleLoginModal,
                openRegisterModal,
                toggleRegisterModal,
                openVerifyUserModal,
                toggleVerifyUserModal,
                loginError,
                setLoginError,
                registerError,
                setRegisterError,
                resendResponse,
                setResendResponse,
                alertResponse,
                setAlertResponse,
                openCreatePostModal,
                toggleCreatePostModal,
                openCreateThreadModal,
                toggleCreateThreadModal,
                openDeletePostModal,
                toggleDeletePostModal,
                openSideBar,
                toggleOpenSideBar,
                resetOnLogout,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
