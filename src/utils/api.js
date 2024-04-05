import axios from "axios";
import { API_ENDPOINT } from "../config/server.config";

// const baseURL = "http://localhost:3000/api/v1";
const baseURL = `${API_ENDPOINT}/api/v1`; // Update with your backend URL

const api = axios.create({
    baseURL,
    withCredentials: true,
});

// Define API functions for calling backend routes
const userAPI = {
    loginUser: async (body) => {
        try {
            const response = await api.post(`/users/login`, body);
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
    // Add more API functions for other routes as needed
};

export default userAPI;
