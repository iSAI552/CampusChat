import {  useState } from "react";
import axios from "axios";
import Container from "../../components/Container";

function GetAllPostsPage() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formatedData, setFormatedData] = useState([]);


    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/v1/post/getAllPosts`);
            if (response.data.success) {
                const temp = response.data.data.map((post) => ({
                    id: post._id,
                    title: post.title,
                    content: post.content,
                    username: post.username,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt,
                    upvotes: post.upvotes,
                    downvotes: post.downvotes,
                    groupId: post.groupId,
                    tags: post.tags,
                }));
                setFormatedData(temp);
            }
        } catch (error) {
            setError(`Error while fetching the data ${error}`);
        }
        setLoading(false);
    };

    return (
        <div className="h-screen bg-gradient-to-br from-blue-400 to-blue-700 overflow-y-auto">
            <Container>
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
                    <h1 className="text-3xl font-bold mb-6">Homepage</h1>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
                    >
                        {loading ? "Loading..." : "Get All Posts"}
                    </button>
                    {loading && <p className="mt-2 text-gray-600">Loading...</p>}
                    {error && <p className="mt-2 text-red-500">{error}</p>}
                    {formatedData.length > 0 && (
                        <div className="mt-6">
                            {formatedData.map((post) => (
                                
                                <div key={post.id} className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
                                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                                        <p className="mt-2 text-sm text-gray-500">Posted by: {post.username}</p>
                                    </div>

                                    <p className="text-gray-700">{post.content}</p>
                                    <div className="mt-4 text-xs text-gray-400 flex justify-between">
                                        <p>Created At: {post.createdAt.substring(0, 10)}</p>
                                        <p>Updated At: {post.updatedAt.substring(0, 10)}</p>
                                    </div>
                                   
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default GetAllPostsPage;
