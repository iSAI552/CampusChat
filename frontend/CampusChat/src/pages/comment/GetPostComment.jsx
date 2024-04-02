import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";

// eslint-disable-next-line react/prop-types
function GetPostCommentPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [postId, setPostId] = useState(null)

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `/api/v1/comment/${postId}`
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
                <h1>Get comment of a post</h1>
                <form onSubmit={handelSubmit}>
                    <input type="text" value={postId} onChange={(e) => setPostId(e.target.value)} placeholder="Id of the post" required />
                    <br></br>
                    <button type="submit" disabled={loading}>Get the Comments</button>
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

export default GetPostCommentPage;
