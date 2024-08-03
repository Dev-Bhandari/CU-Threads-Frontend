import { Avatar } from "flowbite-react";
import { useRef, useState } from "react";
import { useModalContext } from "../utils/modalContext";
import { useAuth } from "../utils/authContext";

const CommentCard = (props) => {
    const comment = props.comment;
    const addReply = props.addReply;
    const name = comment.creatorInfo[0].username;
    const avatar = comment.creatorInfo[0].avatar;
    const [replyText, setReplyText] = useState("");
    const [showReplyBox, setShowReplyBox] = useState(false);
    const inputEl = useRef(null);
    const { user } = useAuth();
    const { toggleLoginModal } = useModalContext();
    return (
        <div
            key={comment._id}
            className={"pl-8 mb-4 border-l-2 border-gray-300 text-gray-700"}
        >
            <div className="flex items-center mb-2">
                <Avatar img={avatar} rounded size="sm" />
                <h2 className="text-sm px-2 font-bold">u/{name}</h2>
            </div>
            <div className="mb-2">{comment.content}</div>
            {!showReplyBox && (
                <button
                    type="button"
                    className="mb-2 px-3 py-1 text-white bg-blue-500 rounded text-sm"
                    onClick={
                        user
                            ? () => {
                                  setShowReplyBox(true);
                                  inputEl.current.focus();
                              }
                            : toggleLoginModal
                    }
                >
                    Reply
                </button>
            )}
            {showReplyBox && (
                <>
                    <textarea
                        ref={inputEl}
                        onChange={(e) => setReplyText(e.target.value)}
                        value={replyText}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        placeholder="Write a reply..."
                        required
                    />
                    <div className="flex space-x-2 mb-2">
                        <button
                            type="button"
                            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                            onClick={() => {
                                setShowReplyBox(false);
                                setReplyText("");
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => {
                                addReply(comment._id, replyText);
                                setShowReplyBox(false);
                                setReplyText("");
                            }}
                        >
                            Save
                        </button>
                    </div>
                </>
            )}
            {comment.replies.length > 0 && (
                <div>
                    {comment.replies.map((childComment) => (
                        <CommentCard
                            key={childComment._id}
                            comment={childComment}
                            addReply={addReply}
                            parent={false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentCard;
