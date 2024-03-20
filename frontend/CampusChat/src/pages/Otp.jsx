import { useState } from "react";
import axios from "axios";
import Container from "../components/Container";

function OtpPage() {
    const [email, setEmail] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/otp",
                { email }
            );
            setData(response.data);
        } catch (error) {
          setError(`Error while fetching the data ${error}`);
        }
        setLoading(false);
    };

    return (
        <>
            <Container><h1>Enter your email id</h1></Container>
            <form onSubmit={handelSubmit}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter you email" required />
              <button type="submit" disabled={loading}>Send OTP</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && (
              <div>
                <h2>Data fetched</h2>
                <p>{JSON.stringify(data["data"])}</p>
              </div>
            )}
        </>
    );
}

export default OtpPage;
