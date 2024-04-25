import { useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import axios from "axios";

const Card = ({ formatedData }) => {
    // State to track vote status for each post
    const [voteStatus, setVoteStatus] = useState({});

    // Function to handle voting for a post
    const handleVote = async (postId, voteType) => {
        try {
            const response = await axios.post(`/api/v1/vote/post/${postId}/${voteType}`);
            // Update vote status for the clicked post based on response
            setVoteStatus(prevStatus => ({
                ...prevStatus,
                [postId]: response.data.data // Assuming response.data.data contains the vote status (upvote/downvote/None)
            }));
        } catch (error) {
            console.error(`Error while fetching the data ${error}`);
        }
    };

    return (
        <div className="mt-6">
            {formatedData.map((post) => (
                <div key={post.id} className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                            className={`flex items-center text-gray-500 mr-2 ${voteStatus[post.id] === 'upvote' ? 'text-blue-500' : ''}`}
                        >
                            <FaThumbsUp className="mr-1" />
                            {post.upvotes}
                        </button>
                        <button
                            onClick={() => handleVote(post.id, "downvote")}
                            className={`flex items-center text-gray-500 ${voteStatus[post.id] === 'downvote' ? 'text-blue-500' : ''}`}
                        >
                            <FaThumbsDown className="mr-1" />
                            {post.downvotes}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
