import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [openVerifyUserModal, setOpenVerifyUserModal] = useState(false);

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
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
