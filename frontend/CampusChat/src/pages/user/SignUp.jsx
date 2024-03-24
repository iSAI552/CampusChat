import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";

// eslint-disable-next-line react/prop-types
function SignUpPage({myEmail}) {
    const [email, setEmail] = useState(myEmail);
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
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
                "/api/v1/users/register",
                { email, password, otp, username }
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
                <h1>Sign Up</h1>
                <form onSubmit={handelSubmit}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" required />
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
                    <button type="submit" disabled={loading}>Sign Up</button>
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

export default SignUpPage;
