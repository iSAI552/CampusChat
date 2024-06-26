import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";
import { useRecoilState } from "recoil";
import { postIdAtom } from "../../store/atoms/postId";

function DeletePostPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [postId, setPostId] = useRecoilState(postIdAtom);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`/api/v1/post/${postId}`);
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
                    <h1 className="text-3xl font-bold mb-6">
                        Delete the Post by ID:
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={postId}
                            onChange={(e) => setPostId(e.target.value)}
                            placeholder="ID of the post"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-red-600"
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </button>
                    </form>
                    {loading && (
                        <p className="mt-2 text-gray-600">Loading...</p>
                    )}
                    {error && <p className="mt-2 text-red-500">{error}</p>}
                    {data && (
                        <div className="mt-6">
                            <h2 className="text-xl font-bold mb-2">
                                Data fetched
                            </h2>
                            <p>{JSON.stringify(data["message"])}</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default DeletePostPage;
