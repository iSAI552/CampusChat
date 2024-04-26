import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";
import Card from "../../components/Card";

function GetPostPage() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formatedData, setFormatedData] = useState([]);
    // const location = useLocation();

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/v1/post/user/`);
            if (response.data.success) {
                const temp = response.data.data.map((post) => ({
                    id: post._id,
                    title: post.title,
                    content: post.content,
                    user: post.user,
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
                    <h1 className="text-3xl font-bold mb-6">User Posts</h1>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
                    >
                        {loading ? "Loading..." : "Get User Posts"}
                    </button>
                    {loading && <p className="mt-2 text-gray-600">Loading...</p>}
                    {error && <p className="mt-2 text-red-500">{error}</p>}
                    {formatedData.length > 0 && 
                        <Card formatedData={formatedData} />
}
                </div>
            </Container>
        </div>
    );
}

export default GetPostPage;
