import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../components/Container";
import Card from "../../components/Card";

function GetPostPage() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formattedData, setFormatedData] = useState([]);
    // const location = useLocation();

    const getData = async () => {
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

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="h-screen bg-gradient-to-br from-blue-400 to-blue-700 overflow-y-auto">
            <Container>
                <div className=" mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
                    <h1 className="text-3xl font-bold mb-6">User Posts</h1>
                    {loading && <p className="mt-2 text-gray-600">Loading...</p>}
                    {error && <p className="mt-2 text-red-500">{error}</p>}
                    {formattedData.length > 0 && 
                        <Card formattedData={formattedData} />
}
                </div>
            </Container>
        </div>
    );
}

export default GetPostPage;
