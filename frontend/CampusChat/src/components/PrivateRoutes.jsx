// import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

// const PrivateRoutes = async () => {
//     const authUrl = "/api/v1/users/check-auth";
//     // const auth = await axios.get(authUrl);
//     // console.log(auth.data.isAuthenticated)
//     const a = {'token': false};
//     return (
//         a.token ? <Outlet /> : <Navigate to="/login" />
//     )
// };

// const checkAuthtication = async () => {
//     const authUrl = "/api/v1/users/check-auth";
//     const auth = await axios.get(authUrl);
//     return auth.data.isAuthenticated;
// }

const PrivateRoutes =  () => {
    const [Authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const auth = await axios.get("/api/v1/users/check-auth");
            console.log(auth.data.isAuthenticated)
            setAuthenticated(auth?.data?.isAuthenticated);
        };
        fetchData();
    },[])
    console.log("Rendered with authenticated:", Authenticated);
  return (
    Authenticated ? <Outlet/> : <Navigate to='/login'/>
    )
  }
  




export default PrivateRoutes;