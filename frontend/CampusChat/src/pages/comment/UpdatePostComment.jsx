import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";
import { useRecoilState } from "recoil";
import { commentIdAtom } from "../../store/atoms/commentId";

// eslint-disable-next-line react/prop-types
function UpdatePostCommentPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [commentId, setCommentId] = useRecoilState(commentIdAtom);
    const [content, setContent] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.patch(
                `/api/v1/comment/${commentId}`,
                { content }
            );
            setData(response.data);
        } catch (error) {
          setError(`Error while fetching the data ${error}`);
        }
        setLoading(false);
    };

    return (
        <>
            <Container>
                <h1>Update comment on post</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={commentId} onChange={(e) => setCommentId(e.target.value)} placeholder="Id of the comment" required />
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Updated Comment" />
                    <br></br>
                    <button type="submit" disabled={loading}>Update comment</button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {data && (
                    <div>
                        <h2>Data fetched</h2>
                        <p>{JSON.stringify(data["data"])}</p>
                    </div>
                )}
            </Container>
        </>
    );
}

export default UpdatePostCommentPage;
