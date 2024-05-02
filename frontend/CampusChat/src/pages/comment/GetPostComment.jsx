import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";
// import Card from "../../components/Card";
import { useRecoilState } from "recoil";
import { postIdAtom } from "../../store/atoms/postId";
import { useNavigate } from "react-router-dom";
import Card from '../../components/Card'

function GetPostCommentPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [postId, setPostId] = useRecoilState(postIdAtom);
    const navigate = useNavigate()

    const handleGetComments = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/v1/comment/${postId}`);
            console.log(response.data.data["docs"][0])
            if(response.data.success){
                const temp = response.data.data["docs"].map((comment) => ({
                    id: comment._id,
                    title: comment.title,
                    content: comment.content,
                    username: comment.username,
                    createdAt: comment.createdAt,
                    updatedAt: comment.updatedAt,
                    upvotes: comment.upvotes,
                    downvotes: comment.downvotes,
                    groupId: comment.groupId,
                    tags: comment.tags,
                }))
                setData(temp)
            }
        } catch (error) {
            setError(`Error while fetching the data ${error}`);
        }
        setLoading(false);
    };

    const handleAddComments = async () => {
        setLoading(true);
        setError(null);

        try {
            navigate(`/addpostcomment`)
        } catch (error) {
            setError(`Error while fetching the data ${error}`)
        }

    }
    
    return (
        <div className="h-screen bg-gradient-to-br from-blue-400 to-blue-700 overflow-y-auto">
            <Container>
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
                    <h1 className="text-3xl font-bold mb-6">Get comment of a post</h1>
                    <div>
                        <input
                            type="text"
                            value={postId}
                            onChange={(e) => setPostId(e.target.value)}
                            placeholder="Id of the post"
                            required
                            className="w-full py-2 px-4 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            onClick={handleGetComments}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
                        >
                            {loading ? "Loading..." : "Get the Comments"}
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            onClick={handleAddComments}
                            className="bg-gray-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-gray-600"
                        >
                            {loading ? "Loading..." : "Add a Comment"}
                        </button>
                    </div>
                    {loading && <p className="mt-2 text-gray-600">Loading...</p>}
                    {error && <p className="mt-2 text-red-500">{error}</p>}
                    {data && (
                        // <div>
                        //     <h2 className="text-xl font-semibold mt-6 mb-2">Data fetched</h2>
                        //     <p className="text-gray-700">{JSON.stringify(data["data"])}</p>
                        // </div>
                        data.map((post) => {
                            <Card key={post.id} post={post} />
                        })
                    )}
                </div>
            </Container>
        </div>
    );
}

export default GetPostCommentPage;
