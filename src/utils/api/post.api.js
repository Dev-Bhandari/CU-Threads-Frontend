import api from "./index.api";

const createPost = async (threadName, body) => {
    try {
        const response = await api.post(
            `/posts/create-post/${threadName}`,
            body
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while creating post:", error.response);
        throw error;
    }
};

const deletePost = async (postId) => {
    try {
        console.log(postId);
        const response = await api.delete(`/posts/delete-post/${postId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while deleting post:", error.response);
        throw error;
    }
};

const createUpVote = async (body) => {
    try {
        const response = await api.patch("/posts/create-upvote", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while creating upvote:", error.response);
        throw error;
    }
};
const deleteUpVote = async (body) => {
    try {
        const response = await api.patch("/posts/delete-upvote", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while deleting upvote:", error.response);
        throw error;
    }
};
const createDownVote = async (body) => {
    try {
        const response = await api.patch("/posts/create-downvote", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while creating downvote:", error.response);
        throw error;
    }
};
const deleteDownVote = async (body) => {
    try {
        const response = await api.patch("/posts/delete-downvote", body);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while deleting downvote:", error.response);
        throw error;
    }
};
const getPost = async (postId) => {
    try {
        const response = await api.get(`/posts/get-post/${postId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while fetching post:", error.response);
        throw error;
    }
};

const getAllPostsOfThread = async (threadName, lastId, sortBy) => {
    try {
        const response = await api.get(`/posts/get-allposts/${threadName}`, {
            params: { lastId: lastId, sortBy: sortBy },
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while fetching posts of a thread:", error.response);
        throw error;
    }
};
const getAllPosts = async (lastId) => {
    try {
        const response = await api.get("/posts/get-allposts", {
            params: { lastId: lastId },
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while fetching posts:", error.response);
        throw error;
    }
};

export {
    createPost,
    deletePost,
    createUpVote,
    deleteUpVote,
    createDownVote,
    deleteDownVote,
    getPost,
    getAllPostsOfThread,
    getAllPosts,
};
