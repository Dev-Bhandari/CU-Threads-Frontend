import axios from "axios";
import { getToken } from "./auth"; // Import the getToken function
import { useAuth } from "./authContext"; // Import the useAuth hook

const baseURL = "https://cu-threads-api.vercel.app/api/v1"; // Update with your backend URL

const api = axios.create({
    baseURL,
    withCredentials: true,
});

// Add interceptor to attach authorization token to each request
// api.interceptors.request.use((config) => {
//     const { user } = useAuth(); // Get user information from AuthContext
//     const token = getToken();
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

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

    // Add more API functions for other routes as needed
};

export default userAPI;
