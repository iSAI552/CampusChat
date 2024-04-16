import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../components/Container";
import { useLocation } from "react-router-dom";

function GetPostPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const userIdFromURL = searchParams.get("userId");
        if (userIdFromURL) {
            setUserId(userIdFromURL);
        }
    }, [location.search]);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/v1/post/user/${userId}`);
            setData(response.data);
        } catch (error) {
            setError(`Error while fetching the data ${error}`);
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-blue-700">
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
                {data && (
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-2">Data fetched</h2>
                        <p>{JSON.stringify(data)}</p>
                    </div>
                )}
            </div>
        </Container>
    </div>
    );
}

export default GetPostPage;
