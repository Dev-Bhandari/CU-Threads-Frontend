import api from "./index.api";

const registerUser = async (body) => {
    try {
        const response = await api.post("/users/register", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while user login:", error.response);
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
const logoutUser = async () => {
    try {
        const response = await api.post("/users/logout");
        console.log(response);
    } catch (error) {
        console.error("Error while user login:", error.response);
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
        console.error("Error while user login:", error.response);
        console.log(error);
        throw error;
    }
};

const getCurrentUser = async () => {
    try {
        const response = await api.get("users/get-current-user");
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error while user login:", error.response);
        throw error;
    }
};

const getOneUser = async (username) => {
    try {
        const response = await api.get(`users/get-one-user/${username}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while user login:", error.response);
        throw error;
    }
};

const getNewLink = async (body) => {
    try {
        const response = await api.post("users/get-new-link", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while user login:", error.response);
        throw error;
    }
};

export {
    registerUser,
    loginUser,
    logoutUser,
    verifyEmail,
    getCurrentUser,
    getOneUser,
    getNewLink,
};
