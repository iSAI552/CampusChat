import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";

// eslint-disable-next-line react/prop-types
function VoteCommentPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [commentId, setCommentId] = useState(null)
    const [voteType, setVoteType] = useState(null)


    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `/api/v1/vote/comment/${commentId}/${voteType}`
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
                <h1>Vote the comment of ID: </h1>
                <form onSubmit={handelSubmit}>
                    <input type="text" value={commentId} onChange={(e) => setCommentId(e.target.value)} placeholder="ID of the comment" />
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

export default VoteCommentPage;
