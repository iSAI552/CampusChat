/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { commentIdAtom } from "../store/atoms/commentId";
import { useSetRecoilState } from "recoil";
import { postIdAtom } from "../store/atoms/postId";

const CommentsCard = ({ comment }) => {
    const [voteStatus, setVoteStatus] = useState({});
    const setCommentId = useSetRecoilState(commentIdAtom);
    const setPostId = useSetRecoilState(postIdAtom)

    const handleVote = async (commentId, voteType) => {
        try {
            const response = await axios.post(
                `/api/v1/vote/comment/${commentId}/${voteType}`
            );
            setVoteStatus((prevStatus) => ({
                ...prevStatus,
                [commentId]: response.data.data,
            }));
        } catch (error) {
            console.error(`Error while fetching the data ${error}`);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            await axios.delete(`/api/v1/comment/${commentId}`);
            window.location.reload();
        } catch (error) {
            console.log(`Error while fetching the data ${error}`);
        }
    };

    return (
        <div className="mt-6">
            {comment ? (
                <div
                    key={comment._id}
                    className="bg-gray-100 p-6 rounded-lg shadow-md mb-4 flex flex-col"
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <p className="text-gray-700">{comment.content}</p>
                    </div>
                    <div className="mt-4 text-xs text-gray-400 flex justify-between">
                        <p>Created At: {comment.createdAt.substring(0, 10)}</p>
                        <p>Updated At: {comment.updatedAt.substring(0, 10)}</p>
                    </div>
                    <div className="flex mt-4">
                        <button
                            onClick={() => handleVote(comment._id, "upvote")}
                            className={`flex items-center text-gray-500 mr-2 ${voteStatus[comment._id] === "upvote" ? "text-blue-700" : ""}`}
                        >
                            <FaThumbsUp className="mr-1" />
                            {comment.upvotes}
                        </button>
                        <button
                            onClick={() => handleVote(comment._id, "downvote")}
                            className={`flex items-center text-gray-500 ${voteStatus[comment._id] === "downvote" ? "text-blue-700" : ""}`}
                        >
                            <FaThumbsDown className="mr-1" />
                            {comment.downvotes}
                        </button>
                        <button
                            onClick={() => handleDelete(comment._id)}
                            className="flex items-center text-red-400 justify-end ml-auto"
                        >
                            <FaTrash className="mr-1" />
                        </button>
                        <Link
                            to={`/updatecomment`}
                            onClick={() => setCommentId(comment._id)}
                            className="flex items-center text-gray-500 justify-end ml-auto"
                        >
                            <FaEdit className="mr-1" />
                        </Link>
                        <Link
                            to={`/getpostcomment`}
                            onClick={() => {
                                setCommentId(comment._id)
                                setPostId(comment.post_id)
                            }}
                            className="text-gray-500 justify-end ml-auto text-xs"
                        >
                            Reply
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4 flex flex-col">
                    <p className="text-gray-700">No comments yet.</p>
                </div>
            )}
        </div>
    );
};

export default CommentsCard;
