// import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const PrivateRoutes =  () => {
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
              const auth = await axios.get("/api/v1/users/check-auth");
              setAuthenticated(auth?.data?.isAuthenticated);
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
    Authenticated ? <Outlet/> : <Navigate to='/login'/>
    )
  }

export default PrivateRoutes;