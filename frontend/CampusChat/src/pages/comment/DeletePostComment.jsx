import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";

// eslint-disable-next-line react/prop-types
function DeletePostCommentPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [commentId, setCommentId] = useState(null)

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.delete(
                `/api/v1/comment/${commentId}`
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
                <h1>Delete comment of a post</h1>
                <form onSubmit={handelSubmit}>
                    <input type="text" value={commentId} onChange={(e) => setCommentId(e.target.value)} placeholder="Id of the comment" required />
                    <br></br>
                    <button type="submit" disabled={loading}>Delete</button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {data && (
                    <div>
                        <h2>Data fetched</h2>
                        <p>{JSON.stringify(data["message"])}</p>
                    </div>
                )}
            </Container>
        </>
    );
}

export default DeletePostCommentPage;
