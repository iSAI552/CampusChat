import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../components/Container";
import { useLocation } from "react-router-dom";

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [username, setUsername] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    // Now Extracting the email from the search params
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const emailFromURL = searchParams.get("email");
        if (emailFromURL) {
            setEmail(emailFromURL);
        }
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/v1/users/register", {
                email,
                password,
                otp,
                username,
            });
            setData(response.data);
        } catch (error) {
            setError(`Error while fetching the data ${error}`);
            console.log(error)
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-blue-700">
            <Container>
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
                    <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                            />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                        />
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>
                    {loading && (
                        <p className="mt-2 text-gray-600">Loading...</p>
                    )}
                    {error && <p className="mt-2 text-red-500">{error}</p>}
                    {data && (
                        <div className="mt-6">
                            <h2 className="text-xl font-bold mb-2">
                                Data fetched
                            </h2>
                            <p>{JSON.stringify(data["data"])}</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default SignUpPage;
