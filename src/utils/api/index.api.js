import axios from "axios";
import { API_ENDPOINT } from "../../config/server.config";

const baseURL = "http://localhost:3000/api/v1";
// const baseURL = `${API_ENDPOINT}/api/v1`;

const api = axios.create({
    baseURL,
    withCredentials: true,
});

export default api;
