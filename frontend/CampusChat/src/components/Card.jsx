/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
// import { commentIdAtom } from "../store/atoms/commentId";
import { postIdAtom } from "../store/atoms/postId";
import { useSetRecoilState } from "recoil";

const Card = ({ formatedData }) => {
    // State to track vote status for each post
    const [voteStatus, setVoteStatus] = useState({});
    // const setCommentId = useSetRecoilState(commentIdAtom);
    const setPostId = useSetRecoilState(postIdAtom);

    useEffect(() => {
        axios.get("/api/v1/vote/upvoted-posts").then((response) => {
            const voteStatus = {};
            response.data.data.forEach((post) => {
                voteStatus[post.postId] = "upvote";
            });
            setVoteStatus(voteStatus);
        });

        axios.get("/api/v1/vote/downvoted-posts").then((response) => {
            const voteStatus = {};
            response.data.data.forEach((post) => {
                voteStatus[post.postId] = "downvote";
            });
            setVoteStatus((prevStatus) => ({
                ...prevStatus,
                ...voteStatus,
            }));
        });
    }, []);

    // Function to handle voting for a post
    const handleVote = async (postId, voteType) => {
        try {
            const response = await axios.post(
                `/api/v1/vote/post/${postId}/${voteType}`
            );
            // Update vote status for the clicked post based on response
            setVoteStatus((prevStatus) => ({
                ...prevStatus,
                [postId]: response.data.data, // Assuming response.data.data contains the vote status (upvote/downvote/None)
            }));
        } catch (error) {
            console.error(`Error while fetching the data ${error}`);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`/api/v1/post/${postId}`);
            window.location.reload();
        } catch (error) {
            console.log(`Error while fetching the data ${error}`);
        }
    };

    return (
        <div className="mt-6">
            {formatedData.map((post) => (
                <div
                    key={post.id}
                    className="bg-gray-100 p-6 rounded-lg shadow-md mb-4 flex flex-col"
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                        {post.username && (
                            <p className="mt-2 text-sm text-gray-500">
                                Posted by: {post.username}
                            </p>
                        )}
                    </div>
                    <p className="text-gray-700">{post.content}</p>
                    <div className="mt-4 text-xs text-gray-400 flex justify-between">
                        <p>Created At: {post.createdAt.substring(0, 10)}</p>
                        <p>Updated At: {post.updatedAt.substring(0, 10)}</p>
                    </div>
                    <div className="flex mt-4">
                        <button
                            onClick={() => handleVote(post.id, "upvote")}
                            className={`flex items-center text-gray-500 mr-2 ${voteStatus[post.id] === "upvote" ? "text-blue-700" : ""}`}
                        >
                            <FaThumbsUp className="mr-1" />
                            {post.upvotes}
                        </button>
                        <button
                            onClick={() => handleVote(post.id, "downvote")}
                            className={`flex items-center text-gray-500 ${voteStatus[post.id] === "downvote" ? "text-blue-700" : ""}`}
                        >
                            <FaThumbsDown className="mr-1" />
                            {post.downvotes}
                        </button>
                        {!post.username && (
                            <Link
                                to={`/updatepost?postId=${post.id}`}
                                onClick={() => setPostId(post.id)}
                                className="flex items-center text-gray-500 justify-end ml-auto"
                            >
                                <FaEdit className="mr-1" />
                            </Link>
                        )}
                        {!post.username && (
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="flex items-center text-red-400 justify-end ml-auto"
                            >
                                <FaTrash className="mr-1" />
                            </button>
                        )}
                        {post.username && (
                            <Link
                                to={`/getpostcomment`}
                                onClick={() => (
                                    setPostId(post.id))}
                                className="text-gray-500 justify-end ml-auto text-xs"
                            >
                                Comments
                            </Link>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
