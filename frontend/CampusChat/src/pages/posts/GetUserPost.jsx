import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";

// eslint-disable-next-line react/prop-types
function GetPostPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const userId = "6617e9f3cfa4332ed2355dc1"

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `/api/v1/post/user/${userId}`,
            );
            setData(response.data);
        } catch (error) {
          setError(`Error while fetching the data ${error}`);
        }
        setLoading(false);
    };

    // useEffect( () => {
    //     const fethData = async () => {
    //         setLoading(true);
    //     setError(null);

    //     try {
    //         const response = await axios.post(
    //             `/api/v1/post/user/${userId}`,
    //         );
    //         setData(response.data);
    //     } catch (error) {
    //       setError(`Error while fetching the data ${error}`);
    //     }
    //     setLoading(false);
    //     }
    //     fethData();
    // },[])

    return (
        <>
            <Container>
                <h1>User Posts</h1>
                <button onClick={handelSubmit}>Get user Posts</button>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {data && (
                    <div>
                        <h2>Data fetched</h2>
                        <p>{JSON.stringify(data)}</p>
                    </div>
                )}

            </Container>
        </>
    );
}

export default GetPostPage;
