import axios from "axios";
import { API_ENDPOINT } from "../config/server.config";

// const baseURL = "http://localhost:3000/api/v1";
const baseURL = `${API_ENDPOINT}/api/v1`;

const api = axios.create({
    baseURL,
    withCredentials: true,
});

// Define API functions for calling backend routes
const userAPI = {
    registerUser: async (body) => {
        try {
            const response = await api.post("/users/register", body);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error("Error while user login:", error.response);
            throw error;
        }
    },
    loginUser: async (body) => {
        try {
            const response = await api.post("/users/login", body);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error("Error while user login:", error.response);
            throw error;
        }
    },
    logoutUser: async () => {
        try {
            const response = await api.post("/users/logout");
            console.log(response);
        } catch (error) {
            console.error("Error while user login:", error.response);
            throw error;
        }
    },
    getUser: async () => {
        try {
            const response = await api.get("users/get-current-user");
            console.log(response);
            return response;
        } catch (error) {
            console.error("Error while user login:", error.response);
            throw error;
        }
    },

    verifyEmail: async (emailToken) => {
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
    },

    getNewLink: async (body) => {
        try {
            const response = await api.post("users/get-new-link", body);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error("Error while user login:", error.response);
            throw error;
        }
    },
    // Add more API functions for other routes as needed
};

const threadAPI = {
    getOneThread: async (body) => {
        try {
            const response = await api.get("threads/get-onethread", body);
            console.log(response);
        } catch (error) {
            console.error("Error while user login:", error.response);
            throw error;
        }
    },
    getAllThreads: async () => {
        try {
            const response = await api.get("threads/get-allthreads");
            console.log(response);
        } catch (error) {
            console.error("Error while user login:", error.response);
            throw error;
        }
    },
};
export default userAPI;
