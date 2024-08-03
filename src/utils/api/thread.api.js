import api from "./index.api";

const createThread = async (body) => {
    try {
        const resposne = await api.post("/threads/create-thread", body);
        console.log(resposne);
        return resposne.data;
    } catch (error) {
        console.error("Error while creating thread:", error.response);
        throw error;
    }
};

const verifyMember = async (threadName) => {
    try {
        const response = await api.post(`/threads/verify-member/${threadName}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while verifying member:", error.response);
        throw error;
    }
};

const createMember = async (threadName) => {
    try {
        const response = await api.post(`/threads/create-member/${threadName}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while creating member:", error.response);
        throw error;
    }
};

const deleteMember = async (threadName) => {
    try {
        const response = await api.delete(
            `/threads/delete-member/${threadName}`
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while deleting member:", error.response);
        throw error;
    }
};

const getOneThread = async (threadName) => {
    try {
        const response = await api.get(`/threads/get-onethread/${threadName}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while fetching thread:", error.response);
        throw error;
    }
};

const getAllThreads = async () => {
    try {
        const response = await api.get("/threads/get-allthreads");
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while fetching threads:", error.response);
        throw error;
    }
};

export {
    createThread,
    verifyMember,
    createMember,
    deleteMember,
    getOneThread,
    getAllThreads,
};
