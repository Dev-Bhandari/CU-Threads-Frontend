import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import { getPost } from "../utils/api/post.api";
import { getAllComments } from "../utils/api/comment.api";

const PostPage = () => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const { postId } = useParams();
    console.log(postId);

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [postId]);

    const fetchPost = async () => {
        try {
            console.log(`Calling post data for postId ${postId}`);
            const res = await getPost(postId);
            const post = res.data;
            console.log(post);
            setPost(post);
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };
    const fetchComments = async () => {
        try {
            console.log(`Calling comments for postId ${postId}`);
            const res = await getAllComments(postId);
            const comments = res.data;
            console.log(comments);
            setComments(comments);
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center mr-56 ">
            {post && <PostCard postData={post} title={"user"} />}
        </div>
    );
};

export default PostPage;
