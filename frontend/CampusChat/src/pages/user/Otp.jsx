import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";

function OtpPage() {
    const [email, setEmail] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/v1/otp", { email });
            setData(response.data);
        } catch (error) {
            setError(`Error while fetching the data ${error}`);
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-blue-700">
            <Container>
                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
                    <h1 className="text-3xl font-bold mb-6">Welcome to Campus Chat</h1>
                    <p className="text-gray-600 mb-6">A platform for students of IITs to interact, connect, and grow anonymously.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {data && (
                        <div className="mt-6">
                            <h2 className="text-xl font-bold mb-2">Data fetched</h2>
                            <p>{JSON.stringify(data["data"])}</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default OtpPage;
