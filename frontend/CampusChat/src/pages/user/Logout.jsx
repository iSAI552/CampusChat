import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";
import { useNavigate } from "react-router-dom";

function LogOutPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/v1/users/logout");
            setData(response.data);
            console.log(response.data)
            if(response.data.success) {
                setTimeout(() => {
                    navigate("/login")
                }, 3000);
                
            }
        } catch (error) {
            setError(`Error while fetching the data ${error}`);
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-blue-700">
            <Container>
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
                    <h1 className="text-3xl font-bold mb-6">Log Out</h1>
                    <form onSubmit={handleSubmit}>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
                        >
                            {loading ? "Logging Out..." : "Log Out"}
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
                            <p>{JSON.stringify(data)}</p>

                        </div>
                    )}
                    
                </div>
            </Container>
        </div>
    );
}

export default LogOutPage;
