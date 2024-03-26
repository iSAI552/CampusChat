import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";

// eslint-disable-next-line react/prop-types
function DeletePostPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [postId, setPostId] = useState(null)


    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.delete(
                `/api/v1/post/${postId}`,
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
                <h1>Delete the Post of ID: </h1>
                <form onSubmit={handelSubmit}>
                    <input type="text" value={postId} onChange={(e) => setPostId(e.target.value)} placeholder="ID of the post" />
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

export default DeletePostPage;
