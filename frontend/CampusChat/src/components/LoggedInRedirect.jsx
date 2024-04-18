import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const LoggedInRedirect = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
              const auth = await axios.get("/api/v1/users/check-auth");
              setAuthenticated(auth?.data?.isAuthenticated);
              setUserId(auth?.data?.userId);
            } catch (error) {
              console.error("Authentication check failed", error);
              setAuthenticated(false);
            } finally {
              setLoading(false);
            }
        };
        fetchData();
    },[])
    if (loading) return <h1>Loading...</h1>;

    return (
      authenticated ? <Navigate to={`/getpost?userId=${userId}`} /> : <Outlet />
    )
};

export default LoggedInRedirect;