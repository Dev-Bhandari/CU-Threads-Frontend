import api from "./index.api";

const registerUser = async (body) => {
    try {
        const response = await api.post("/users/register", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while user signup:", error.response);
        throw error;
    }
};

const loginUser = async (body) => {
    try {
        const response = await api.post("/users/login", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while user login:", error.response);
        throw error;
    }
};

const forgotPassword = async (body) => {
    try {
        const response = await api.post("/users/forgot-password", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while reseting password:", error.response);
        throw error;
    }
};

const logoutUser = async () => {
    try {
        const response = await api.post("/users/logout");
        console.log(response);
    } catch (error) {
        console.error("Error while user logout:", error.response);
        throw error;
    }
};

const refreshToken = async () => {
    try {
        const response = await api.post("/users/refresh-token");
        console.log(response);
    } catch (error) {
        console.error("Error while extending session:", error.response);
        throw error;
    }
};

const verifyEmail = async (emailToken) => {
    try {
        const response = await api.post("users/verify-email", null, {
            params: { emailToken },
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(
            "Error while verifying user email token:",
            error.response
        );
        console.log(error);
        throw error;
    }
};

const verifyForgotPasswordEmail = async (emailToken, body) => {
    try {
        const response = await api.post("users/verify-forgot-password", body, {
            params: { emailToken },
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(
            "Error while verifying user email token:",
            error.response
        );
        console.log(error);
        throw error;
    }
};

const changeAvatar = async (body) => {
    try {
        const response = await api.patch("/users/change-avatar", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while user changing avatar:", error.response);
        throw error;
    }
};

const changePassword = async (body) => {
    try {
        const response = await api.post("/users/change-password", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while user changing password:", error.response);
        throw error;
    }
};
const getCurrentUser = async () => {
    try {
        const response = await api.get("users/get-current-user");
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error while fetching current user:", error.response);
        throw error;
    }
};

const getOneUser = async (username) => {
    try {
        const response = await api.get(`users/get-one-user/${username}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while fetching current user:", error.response);
        throw error;
    }
};

const getNewLink = async (body) => {
    try {
        const response = await api.post("users/get-new-link", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while fetching new link:", error.response);
        throw error;
    }
};

export {
    registerUser,
    loginUser,
    forgotPassword,
    logoutUser,
    refreshToken,
    verifyEmail,
    verifyForgotPasswordEmail,
    changeAvatar,
    changePassword,
    getCurrentUser,
    getOneUser,
    getNewLink,
};
