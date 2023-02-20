import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';


const RequireAuth = ({ children }) => {
    const getToken = window.localStorage.getItem("token");
    // console.log(getToken);

    const location = useLocation();
    /*  if (loading) {
         return <p>Loading....</p>
     } */
    if (!getToken) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;