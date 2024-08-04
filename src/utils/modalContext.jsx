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
    const [openEditUserModal, setOpenEditUserModal] = useState({ user: null });
    const [openEditThreadModal, setOpenEditThreadModal] = useState({
        thread: null,
    });
    const [openSideBar, setOpenSideBar] = useState(false);

    const [loginError, setLoginError] = useState({});
    const [registerError, setRegisterError] = useState({});
    const [modalError, setModalError] = useState({});
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
        setModalError({});
    };

    const toggleCreateThreadModal = () => {
        setOpenCreateThreadModal((prevState) => !prevState);
        setModalError({});
    };

    const toggleDeletePostModal = (postId) => {
        if (!openDeletePostModal.postId) {
            setOpenDeletePostModal({ postId: postId });
        } else {
            setOpenDeletePostModal({ postId: null });
        }
        setModalError({});
    };

    const toggleEditUserModal = (user) => {
        if (!openEditUserModal.user) {
            setOpenEditUserModal({ user: user });
        } else {
            setOpenEditUserModal({ user: null });
        }
        setModalError({});
    };

    const toggleEditThreadModal = (thread) => {        
        if (!openEditThreadModal.thread) {
            setOpenEditThreadModal({ thread: thread });
        } else {
            setOpenEditThreadModal({ thread: null });
        }
        setModalError({});
    };

    const toggleOpenSideBar = () => {
        setOpenSideBar((prevState) => !prevState);
        setModalError({});
    };

    const resetOnLogout = () => {
        setOpenLoginModal(false);
        setOpenRegisterModal(false);
        setOpenVerifyUserModal(false);
        setOpenCreatePostModal({ threadName: null });
        setOpenCreateThreadModal(false);
        setLoginError({});
        setRegisterError({});
        setModalError({});
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
                modalError,
                setModalError,
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
                openEditUserModal,
                toggleEditUserModal,
                openEditThreadModal,
                toggleEditThreadModal,
                openSideBar,
                toggleOpenSideBar,
                resetOnLogout,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
