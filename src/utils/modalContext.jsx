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
    const [jwtExpired, setJwtExpired] = useState(false);
    const [openExtendSessionModal, setOpenExtendSessionModal] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false);
    const [modalError, setModalError] = useState({});
    const [resendResponse, setResendResponse] = useState({});
    const [alertResponse, setAlertResponse] = useState({
        message: null,
    });

    const toggleLoginModal = () => {
        if (!openLoginModal) setAlertResponse({ message: null });
        setOpenLoginModal((prevState) => !prevState);
        setModalError({});
    };

    const toggleRegisterModal = () => {
        setOpenRegisterModal((prevState) => !prevState);
        setModalError({});
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

    const toggleExtendSessionModal = () => {
        setOpenExtendSessionModal((prevState) => !prevState);
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
        setOpenEditUserModal({ user: null });
        setOpenEditThreadModal({
            thread: null,
        });
        setOpenExtendSessionModal(false);
        setOpenSideBar(false);
        setModalError({});
        setModalError({});
        setModalError({});
        setResendResponse({});
        setAlertResponse({
            message: null,
        });
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
                jwtExpired,
                setJwtExpired,
                openExtendSessionModal,
                toggleExtendSessionModal,
                openSideBar,
                toggleOpenSideBar,
                resetOnLogout,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
