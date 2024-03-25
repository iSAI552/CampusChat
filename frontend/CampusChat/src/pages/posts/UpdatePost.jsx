import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";

// eslint-disable-next-line react/prop-types
function UpdatePostPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(null)
    const [postId, setPostId] = useState(null)


    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.patch(
                `/api/v1/post/${postId}`,
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
                <h1>Update the Post of ID: </h1>
                <form onSubmit={handelSubmit}>
                    <input type="text" value={postId} onChange={(e) => setPostId(e.target.value)} placeholder="ID of the post" />
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content of the post" />
                    <br></br>
                    <button type="submit" disabled={loading}>Update Post</button>
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

export default UpdatePostPage;
