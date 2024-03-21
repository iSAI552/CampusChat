import { useState } from "react";
import axios from "axios";
import Container from "../components/Container";

// eslint-disable-next-line react/prop-types
function LogInPage() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "/api/v1/users/login",
                { username, password }
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
                <h1>Log In</h1>
                <form onSubmit={handelSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                    <button type="submit" disabled={loading}>Log In</button>
                </form>
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

export default LogInPage;
