import api from "./index.api";

const createComment = async ( body) => {
    try {
        const response = await api.post("/comments/create-comment", body);
        const comment = response.data;
        console.log(comment);
        return comment;
    } catch (error) {
        console.error("Error while creating comment:", error.response);
        throw error;
    }
};

const getAllComments = async (postId) => {
    try {
        const response = await api.get(`/comments/get-allcomments/${postId}`);
        const comments = response.data;
        console.log(comments);
        return comments;
    } catch (error) {
        console.error("Error while fetching comments:", error.response);
        throw error;
    }
};

export { createComment, getAllComments };
