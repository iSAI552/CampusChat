import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";

// eslint-disable-next-line react/prop-types
function VotePostPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [postId, setPostId] = useState(null)
    const [voteType, setVoteType] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `/api/v1/vote/post/${postId}/${voteType}`
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
                <h1>Vote the Post of ID: </h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={postId} onChange={(e) => setPostId(e.target.value)} placeholder="ID of the post" />
                    <button type="submit" onClick={() => setVoteType("upvote")}>Upvote</button>
                    <button type="submit" onClick={() => setVoteType("downvote")}>Downvote</button>
                    <br></br>
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

export default VotePostPage;
