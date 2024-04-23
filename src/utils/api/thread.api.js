import api from "./index.api";

const verifyMember = async (threadName) => {
    try {
        const response = await api.post(`/threads/verify-member/${threadName}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while user login:", error.response);
        throw error;
    }
};

const createMember = async (threadName) => {
    try {
        const response = await api.post(`/threads/create-member/${threadName}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while user login:", error.response);
        throw error;
    }
};

const deleteMember = async (threadName) => {
    try {
        const response = await api.post(`/threads/delete-member/${threadName}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while user login:", error.response);
        throw error;
    }
};

const getOneThread = async (threadName) => {
    try {
        const response = await api.get(`/threads/get-onethread/${threadName}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while user login:", error.response);
        throw error;
    }
};

const getAllThreads = async () => {
    try {
        const response = await api.get("/threads/get-allthreads");
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while user login:", error.response);
        throw error;
    }
};

export {
    verifyMember,
    createMember,
    deleteMember,
    getOneThread,
    getAllThreads,
};
