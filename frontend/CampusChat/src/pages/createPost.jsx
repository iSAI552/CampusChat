import { useState } from "react";
import axios from "axios";
import Container from "../components/Container";

// eslint-disable-next-line react/prop-types
function CreatePostPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [groupId, setGroupId] = useState("65f2c34dc64f9becf43d4fe7")

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "/api/v1/post/",
                {title, content, groupId}
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
                <h1>Create a new Post</h1>
                <form onSubmit={handelSubmit}>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title of the post" required />
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content of the post" />
                    <input type="text" value={groupId} onChange={(e) => setGroupId(e.target.value)} placeholder="Enter the groupId" />
                    <br></br>
                    <button type="submit" disabled={loading}>Post</button>
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

export default CreatePostPage;
